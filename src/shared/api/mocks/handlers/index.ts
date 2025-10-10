import { authHandlers } from './auth';
import { userHandlers } from './user';
import { postHandlers } from './post';

export const handlers = [...authHandlers, ...userHandlers, ...postHandlers];
