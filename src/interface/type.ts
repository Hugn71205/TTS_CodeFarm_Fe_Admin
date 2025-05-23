export interface IUser {
    id:number|string,
    name:string,
    phone:string,
    email:string,
    password:string
}
export type UserRegister = Omit<IUser,"id">
export type UserLogin = Pick<IUser,"email"|"password">