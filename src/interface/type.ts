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

export interface Product {
  _id: string;          
  name: string;
  image?: string;
  gender?: string;
  description?: string;
  category_id?: string;
  brand_id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Variant {
  _id: string;          
  product_id?: string;
  volume_id?: string;
  price?: string;
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

