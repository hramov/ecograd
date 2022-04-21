import { Request, Response, Router } from 'express';
import passport from 'passport';
import { AdminStrategy } from '../../../../auth/strategy/admin.strategy';
import { JWTStrategy } from '../../../../auth/strategy/jwt.strategy';
import { LoginStrategy } from '../../../../auth/strategy/login.strategy';
import { RegisterStrategy } from '../../../../auth/strategy/register.strategy';
import { Feedback } from '../../../database/model/user/Feedback.model';
import { Expert } from '../../../database/model/user/profiles/Expert.model';
import { createUser } from './create-user.router';
import { deleteUser } from './delete-user.router';
import { getProfiles } from './get-profiles.router';
import { getUserInfo } from './get-user-info.router';
import { getUsers } from './get-users.router';
import { login } from './login.router';
import { searchUser } from './search-user.router';

const router = Router();

router.post(
	'/login',
	passport.authenticate(new LoginStrategy(), { session: false }),
	login,
);

router.post(
	'/register',
	passport.authenticate(new RegisterStrategy(), { session: false }),
	login,
);

router.get(
	'/info',
	passport.authenticate(new JWTStrategy(), { session: false }),
	getUserInfo,
);

router.get(
	'/profile',
	passport.authenticate(new AdminStrategy(), { session: false }),
	getProfiles,
);

router.get('/expert', async (req: Request, res: Response) =>
	res.json(await Expert.find({ relations: ['user'] })),
);

router.post('/feedback', async (req: Request, res: Response) => {
	const feedback = Feedback.create({
		name: req.body.name,
		email: req.body.email,
		feedback: req.body.text,
	});
	res.json(await feedback.save());
});

router.delete(
	'/:id',
	passport.authenticate(new AdminStrategy(), { session: false }),
	deleteUser,
);

router.post(
	'/search',
	passport.authenticate(new AdminStrategy(), { session: false }),
	searchUser,
);

router.post(
	'/',
	passport.authenticate(new AdminStrategy(), { session: false }),
	createUser,
);

router.get(
	'/',
	passport.authenticate(new AdminStrategy(), { session: false }),
	getUsers,
);

export { router as userRouter };
