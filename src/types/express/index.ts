interface RequestUser {
  id: string;
  role: "admin" | "user";
}

declare namespace Express {
  export interface Request {
    user: RequestUser;
  }
}
