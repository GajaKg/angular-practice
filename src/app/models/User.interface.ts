export interface IUser {
  // id: number;
  username: string;
  email: string;
  token: string;
}
export interface IUserRegister {
  username: string;
  email: string;
  password: string;
}
export interface IUserLogin {
  username: string;
  password: string;
}
