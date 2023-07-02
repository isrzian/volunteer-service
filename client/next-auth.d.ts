import "next-auth";

declare module "next-auth" {
  export interface User {
    id: number;
    name: string;
    role: string;
  }

  interface JWT {
    id: number;
    name: string;
    role: string;
  }

  interface Session {
    user: User;
  }
}
