export interface IUser {
    id:number|string,
    name:string,
    phone:string,
    address:string,
    email:string,
    password:string
}
export type UserRegister = Pick<IUser, "name" | "email" | "password">;

export type UserLogin = Pick<IUser, "email" | "password">;

//////////////////
export interface Category {
  _id: string; 
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
//////////////////
export interface Brand {
  _id: string;          
  name: string;
  origin?: string;
  logo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Volume {
  _id: string; 
  size: string;
  label: string;
  createdAt?: string;
  updatedAt?: string;
}

