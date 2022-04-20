import { Request, Response } from 'express';
import { Section } from '../../../database/model/order/Section.model';

export async function changeSectionStatus(req: Request, res: Response) {
	const section_id = req.body.section_id as string;
	const status = req.body.status as string;

	const section = await Section.findOneBy({ id: parseInt(section_id) });

	if (!section) {
		return res.json({
			message: 'Cannot find section with id ' + section_id,
		});
	}

	section.status = status;
	await section.save();

	res.json({
		message: 'Successfully updated section with status ' + status,
	});
}
