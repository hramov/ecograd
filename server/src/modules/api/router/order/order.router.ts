import { Request, Response, Router } from 'express';
import passport from 'passport';
import { AdminStrategy } from '../../../../auth/strategy/admin.strategy';
import { ClientStrategy } from '../../../../auth/strategy/client.strategy';
import { JWTStrategy } from '../../../../auth/strategy/jwt.strategy';
import { Order } from '../../../database/model/order/Order.model';
import { addOrder } from './add-order.router';
import { appointExpert } from './appoint-expert.router';
import { changeOrderStatus } from './change-order-status.router';
import { changeSectionStatus } from './change-section-status.router';
import { checkChanges } from './check-changes.router';
import { getAttachesForSection } from './get-attaches-for-section.router';
import { getOrdersForClient } from './get-orders-for-client.router';
import { getOrdersWithoutExpert } from './get-orders-without-expert.router';
import { getSections } from './get-sections.router';
import { uploadFile } from './upload-file.router';

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

router.patch(
	'/appoint-expert/:order_id',
	passport.authenticate(new JWTStrategy(), { session: false }),
	appointExpert,
);

router.patch(
	'/change-order-status',
	passport.authenticate(new JWTStrategy(), { session: false }),
	changeOrderStatus,
);

router.patch(
	'/change-section-status',
	passport.authenticate(new JWTStrategy(), { session: false }),
	changeSectionStatus,
);

router.get(
	'/no-expert',
	passport.authenticate(new JWTStrategy(), { session: false }),
	getOrdersWithoutExpert,
);

router.get(
	'/sections-dict/:order_type',
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

router.post(
	'/',
	passport.authenticate(new ClientStrategy(), { session: false }),
	addOrder,
);

router.get(
	'/',
	passport.authenticate(new AdminStrategy(), { session: false }),
	async (req: Request, res: Response) => res.json(await Order.find()),
);

export { router as orderRouter };
