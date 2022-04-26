import { Request, Response } from 'express';
import { ROLES } from '../../../../auth/config';
import { Admin } from '../../../database/model/user/profiles/Admin.model';
import { Client } from '../../../database/model/user/profiles/Client.model';
import { Expert } from '../../../database/model/user/profiles/Expert.model';
import { SendSuccessGetReply } from '../../utils/send-success-reply';

export async function getUsers(req: Request, res: Response) {
	if (req.query.profile) {
		const profile = req.query.profile as string;
		switch (profile) {
			case ROLES.Admin:
				return SendSuccessGetReply(
					res,
					await Admin.find({
						relations: ['user'],
					}),
				);
			case ROLES.Client:
				return SendSuccessGetReply(
					res,
					await Client.find({
						relations: ['user'],
					}),
				);
			case ROLES.Expert:
				return SendSuccessGetReply(
					res,
					await Expert.find({
						relations: ['user'],
					}),
				);
		}
	}

	SendSuccessGetReply(res, {
		admin: await Admin.find({ relations: ['user'] }),
		expert: await Expert.find({ relations: ['user'] }),
		client: await Client.find({ relations: ['user'] }),
	});
}
