import { Entity } from 'typeorm';
import { Profile } from './Profile.model';

@Entity({
	schema: 'auth',
})
export class Admin extends Profile {}
