import { authHandlers } from './auth';
import { userHandlers } from './user';
import { postHandlers } from './post';
import { heartPostHandlers } from './heartPost';
import { postDetailHandlers, supportProgramHandlers } from './postDetail';
import { commentHandlers } from './comment';
import { missionHandlers } from './mission';

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...postHandlers,
  ...heartPostHandlers,
  ...postDetailHandlers,
  ...commentHandlers,
  ...missionHandlers,
  ...supportProgramHandlers,
];
