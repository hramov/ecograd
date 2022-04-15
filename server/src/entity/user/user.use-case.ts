import { UserAccess } from '../../modules/database/access/user.access';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class UserUseCase {
	constructor(private readonly userAccess?: UserAccess) {}
}
