interface User {
  login: string;
  role: 'admin' | 'user' | 'operator';
}

declare namespace Express {
  export interface Request {
    user: User;
  }
}
