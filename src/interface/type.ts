export interface IUser {
    id:number|string,
    name:string,
    phone:string,
    email:string,
    password:string
}
export type UserRegister = Omit<IUser,"id">
export type UserLogin = Pick<IUser,"email"|"password">
export interface IPro {
    id:number|string,
    name:string,
    image:string,
    gender: 'Nam' | 'Nữ' | 'Unisex',
    description:string,
    category_id:string,
    brand_id:string
}
export interface ICate {
    id:number|string,
    name:string,
    description:string,
}
export interface IBrand {
    id:number|string,
    name:string,
    origin:string,
    logo:string
}