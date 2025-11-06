import { authHandlers } from './auth';
import { userHandlers } from './user';
import { postHandlers } from './post';
import { heartPostHandlers } from './heartPost';
import {
  postDetailHandlers,
  supportProgramDetailHandlers,
  supportProgramHandlers,
} from './postDetail';
import { commentHandlers } from './comment';
import { missionHandlers } from './mission';
import { activityHandlers } from './activity';
import { badgeHandlers } from './badge';
import { notificationHandlers } from './notification';

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...postHandlers,
  ...heartPostHandlers,
  ...postDetailHandlers,
  ...commentHandlers,
  ...missionHandlers,
  ...supportProgramHandlers,
  ...supportProgramDetailHandlers,
  ...activityHandlers,
  ...badgeHandlers,
  ...notificationHandlers,
];
