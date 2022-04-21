import { Request, Response } from 'express';
import { Attach } from '../../../database/model/order/Attach.model';
import { User } from '../../../database/model/user/User.model';

export async function getAttachesForSection(req: Request, res: Response) {
	const user = req.user as User;
	const section_id = parseInt(req.params.section_id);

	const attaches = await Attach.find({
		where: { section: { id: section_id } },
		relations: ['sender'],
		order: {
			createdAt: 'desc',
		},
	});
	for await (const attach of attaches) {
		if (user.id != attach.sender.id) {
			attach.is_new = false;
			await attach.save();
		}
	}

	res.json(attaches);
}
