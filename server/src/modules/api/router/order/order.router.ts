import { Request, Response, Router } from 'express';
import passport from 'passport';
import { AdminStrategy } from '../../../../auth/strategy/admin.strategy';
import { ClientStrategy } from '../../../../auth/strategy/client.strategy';
import { ExpertStrategy } from '../../../../auth/strategy/expert.strategy';
import { JWTStrategy } from '../../../../auth/strategy/jwt.strategy';
import { Attach } from '../../../database/model/order/Attach.model';
import { Order } from '../../../database/model/order/Order.model';
import { Section } from '../../../database/model/order/Section.model';
import { BadRequestError } from '../../../error/http/bad-request.error';
import { NotFoundError } from '../../../error/http/not-found.error';
import { Logger } from '../../../logger';
import {
	SendSuccessGetReply,
	SendSuccessPostReply,
} from '../../utils/send-success-reply';
import { addOrder } from './add-order.router';
import { appointExpert } from './appoint-expert.router';
import { changeOrderStatus } from './change-order-status.router';
import { changeSectionStatus } from './change-section-status.router';
import { checkChanges } from './check-changes.router';
import { getAttachesForSection } from './get-attaches-for-section.router';
import { getExpertForOrder } from './get-expert-for-order.router';
import { getInquire } from './get-inquire.router';
import { getOrdersForClient } from './get-orders-for-client.router';
import { getOrdersForExpert } from './get-orders-for-expert.router';
import { getOrdersWithoutExpert } from './get-orders-without-expert.router';
import { getSections } from './get-sections.router';
import { uploadFileForSection } from './upload-file-for-section.router';
import { uploadFile } from './upload-file.router';
import { uploadInquire } from './upload-inquire.router';

const router = Router();

router.get(
	'/check-changes',
	passport.authenticate(new JWTStrategy(), { session: false }),
	checkChanges,
);

router.post(
	'/upload-file/:order_id',
	passport.authenticate(new JWTStrategy(), { session: false }),
	uploadFile,
);

router.post(
	'/upload-file-for-section',
	passport.authenticate(new JWTStrategy(), { session: false }),
	uploadFileForSection,
);

router.put(
	'/appoint-expert/:order_id',
	passport.authenticate(new AdminStrategy(), { session: false }),
	appointExpert,
);

router.put(
	'/change-order-status',
	passport.authenticate(new ExpertStrategy(), { session: false }),
	changeOrderStatus,
);

router.put(
	'/set-attach-opened/:attach_id',
	passport.authenticate(new JWTStrategy(), { session: false }),
	async (req: Request, res: Response) =>
		SendSuccessPostReply(res, await Attach.save(req.body)),
);

router.put(
	'/change-section-status/:section_id',
	passport.authenticate(new JWTStrategy(), { session: false }),
	changeSectionStatus,
);

router.get(
	'/no-expert',
	passport.authenticate(new JWTStrategy(), { session: false }),
	getOrdersWithoutExpert,
);

router.get(
	'/sections-dict/:exp_type/:object_type',
	passport.authenticate(new JWTStrategy(), { session: false }),
	getSections,
);

router.get(
	'/attaches-for-section/:section_id',
	passport.authenticate(new JWTStrategy(), { session: false }),
	getAttachesForSection,
);

router.get(
	'/client',
	passport.authenticate(new ClientStrategy(), { session: false }),
	getOrdersForClient,
);

router.get(
	'/expert',
	passport.authenticate(new ExpertStrategy(), { session: false }),
	getOrdersForExpert,
);

router.get(
	'/expert-for-order/:order_id',
	passport.authenticate(new JWTStrategy(), { session: false }),
	getExpertForOrder,
);

router.get(
	'/expert/:order_id',
	passport.authenticate(new AdminStrategy(), { session: false }),
	async (req: Request, res: Response) => {
		if (!req.params.order_id) return BadRequestError(res);
		SendSuccessGetReply(
			res,
			(
				await Order.query(
					`
				SELECT e.id, u.name
				FROM auth.expert e
				JOIN auth.user u on e."userId" = u.id
				JOIN business.order o on o."expertId" = e.id
				WHERE o.id = ${req.params.order_id};
				`,
				)
			)[0],
		);
	},
);

router.get(
	'/section/:section_id',
	passport.authenticate(new JWTStrategy(), { session: false }),
	async (req: Request, res: Response) => {
		if (!req.params.section_id) {
			return BadRequestError(res);
		}
		SendSuccessGetReply(
			res,
			await Section.findOne({
				where: {
					id: parseInt(req.params.section_id),
				},
			}),
		);
	},
);

router.post(
	'/upload-inquire',
	passport.authenticate(new JWTStrategy(), { session: false }),
	uploadInquire,
);

router.get(
	'/inquire/:order_id',
	passport.authenticate(new JWTStrategy(), { session: false }),
	getInquire,
);

router.get(
	'/sections/:order_id',
	passport.authenticate(new JWTStrategy(), { session: false }),
	async (req: Request, res: Response) => {
		if (!req.params.order_id) {
			return BadRequestError(res);
		}
		const sections = await Section.find({
			where: {
				order: {
					id: parseInt(req.params.order_id),
				},
			},
			order: {
				arrange: 'ASC',
			},
		});

		for await (const section of sections) {
			section.attach = await Attach.findBy({
				section: { id: section.id },
			});
		}

		SendSuccessGetReply(
			res,
			sections.filter((section: Section) => section.attach.length),
		);
	},
);

router.post(
	'/',
	passport.authenticate(new ClientStrategy(), { session: false }),
	addOrder,
);

router.get(
	'/:order_id',
	passport.authenticate(new JWTStrategy(), { session: false }),
	async (req: Request, res: Response) => {
		if (!req.params.order_id) return BadRequestError(res);
		try {
			SendSuccessGetReply(
				res,
				(
					await Order.query(
						`SELECT o.id, o.title, o.exp_type, o.object_type, o.status, o."createdAt", 
						c.phone as client_phone, 
						u.name as client_name, u.email as client_email,
						array_to_string(array_agg(distinct(concat(s.arrange, ' ', s.title))), ';') as sections
				FROM business.order o 
				JOIN auth.client c on o."clientId" = c.id
				JOIN auth.user u on u.id = c."userId"
				JOIN business.section s on s."orderId" = o.id
				JOIN business.attach a on a."sectionId" = s.id
				WHERE a.id > 0 AND o.id = ${req.params.order_id}
				GROUP BY o.id, c.id, u.id
				`,
					)
				)[0],
			);
		} catch (_err) {
			const err = _err as Error;
			Logger.writeError('getOrder', err.message);
			NotFoundError(res, 'order', err.message);
		}
	},
);

router.get(
	'/',
	passport.authenticate(new AdminStrategy(), { session: false }),
	async (req: Request, res: Response) =>
		SendSuccessGetReply<Order[]>(
			res,
			await Order.query(
				`SELECT o.id, o.title, o.exp_type, o.object_type, o.status, o."createdAt", 
						c.phone as client_phone, 
						u.name, u.email as client_email,
						array_to_string(array_agg(distinct(concat(s.arrange, ' ', s.title))), ';') as sections
				FROM business.order o 
				JOIN auth.client c on o."clientId" = c.id
				JOIN auth.user u on u.id = c."userId"
				JOIN business.section s on s."orderId" = o.id
				JOIN business.attach a on a."sectionId" = s.id
				WHERE a.id > 0
				GROUP BY o.id, c.id, u.id
				ORDER BY o.id desc
				`,
			),
		),
);
export { router as orderRouter };
