import { Router } from 'express';
import passport from 'passport';
import { ClientStrategy } from '../../../../auth/strategy/client.strategy';
import { JWTStrategy } from '../../../../auth/strategy/jwt.strategy';
import { addOrder } from './add-order.router';
import { checkChanges } from './check-changes.router';
import { uploadFile } from './upload-file.router';

const router = Router();

router.post(
	'/add-order',
	passport.authenticate(new ClientStrategy(), { session: false }),
	addOrder,
);

router.get(
	'/check-changes',
	passport.authenticate(new JWTStrategy(), { session: false }),
	checkChanges,
);

router.post(
	'/upload-file',
	passport.authenticate(new JWTStrategy(), { session: false }),
	uploadFile,
);

export { router as orderRouter };
