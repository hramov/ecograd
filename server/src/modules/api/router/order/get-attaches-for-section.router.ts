import { Request, Response } from 'express';
import { Attach } from '../../../database/model/order/Attach.model';

export async function getAttachesForSection(req: Request, res: Response) {
	const section_id = parseInt(req.params.section_id);
	res.json(await Attach.findBy({ section: { id: section_id } }));
}
