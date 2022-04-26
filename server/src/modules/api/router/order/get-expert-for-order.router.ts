import { Request, Response } from 'express';
import { Expert } from '../../../database/model/user/profiles/Expert.model';
import { BadRequestError } from '../../../error/http/bad-request.error';
import { SendSuccessGetReply } from '../../utils/send-success-reply';

export async function getExpertForOrder(req: Request, res: Response) {
	if (!req.params.order_id) return BadRequestError(res);

	const result = await Expert.query(`
		SELECT e.id, u.name FROM auth.expert e
		JOIN business.order o on o."expertId" = e.id
		JOIN auth.user u on e."userId" = u.id
		WHERE o.id = ${req.params.order_id}
	`);

	SendSuccessGetReply(res, result[0]);
}
