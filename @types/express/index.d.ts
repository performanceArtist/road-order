import { UserGroup } from '@shared/types';

interface RequestUser {
  id: number;
  group: UserGroup;
  login?: string;
}

declare namespace Express {
  export interface Request {
    user: RequestUser;
  }
}
