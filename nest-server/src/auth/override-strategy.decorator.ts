import { SetMetadata } from '@nestjs/common';

export const OVERRIDE_KEY = 'override-global-strategy';
export const OverrideGlobalStrategy = () => SetMetadata(OVERRIDE_KEY, true);
