import { Role } from "../role/role";

export class User {
  id: Number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}
