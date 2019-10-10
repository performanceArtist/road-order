import { UserGroup } from '@shared/types';

interface RequestUser {
  login?: string;
  group: UserGroup;
}

declare namespace Express {
  export interface Request {
    user: RequestUser;
  }
}
