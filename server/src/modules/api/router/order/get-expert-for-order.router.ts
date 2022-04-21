import { Request, Response } from 'express';
import { Expert } from '../../../database/model/user/profiles/Expert.model';

export async function getExpertForOrder(req: Request, res: Response) {
	const result = await Expert.query(`
		SELECT e.id, u.name FROM auth.expert e
		JOIN business.order o on o."expertId" = e.id
		JOIN auth.user u on e."userId" = u.id
		WHERE o.id = ${req.params.order_id}
	`);

	res.json(result[0]);
}
