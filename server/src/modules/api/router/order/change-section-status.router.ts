import { Request, Response } from 'express';
import { Section } from '../../../database/model/order/Section.model';
import { BadRequestError } from '../../../error/http/bad-request.error';
import { NotFoundError } from '../../../error/http/not-found.error';

export async function changeSectionStatus(req: Request, res: Response) {
	const section_id = req.params.section_id as string;
	const status = req.body.new_status as string;

	if (!section_id || !status) return BadRequestError(res);

	const section = await Section.findOneBy({ id: parseInt(section_id) });

	if (!section) {
		return NotFoundError(
			res,
			'section',
			'Cannot find section with id ' + section_id,
		);
	}

	section.status = status;
	console.log(section);
	await section.save();

	res.json({
		message: 'Successfully updated section with status ' + status,
	});
}
