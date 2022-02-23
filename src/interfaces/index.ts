export interface ISneaker {
  _id: string;
  name: string;
  price: number;
  relaseYear: string;
  posterPathImage: string;
  brand: string;
  createdAt: Date;
  genre: string;
  sizes: number[];
  imgs: string[];
  status: string;
  quantity: number;
}
export interface IProps {
  height?: number | string;
}
export interface IPorcentaje {
  menper?: number;
  womper?: number;
}

export interface IProps {
  sneaker?: ISneaker;
}
export interface ISneakerState {
  sneakers: ISneaker[];
  basket: ISneaker[];
  sneakerActive: ISneaker | null;
  total: number;
  basketQuantity: number;
}

export interface IUser {
  firstName: string;
  email: string;
  password: string;
  id?: string;
  createdAt?: any;
}

export interface IUserState {
  user: null | any;
  autenticated: boolean;
  menu_height: boolean;
  error: string;
}
