export interface ISneaker {
  _id: string;
  name: string;
  price: number;
  relaseYear: string;
  posterPathImage: string;
  brand: string;
  createdAt: Date;
  genre: string;
  sizes: Size[];
  imgs: string[];
  status: string;
  quantity: number;
  idColecction: string;
  hasModifications: {
    promotionActive: boolean;
    previosPrice: number;
    discountPercentage: number;
  };
}
interface Size {
  size: string;
  qty: string;
}

export interface ISneakerBasket {
  _id: string;
  name: string;
  price: number;
  brand: string;
  genre: string;
  size: string;
  quantity: number;
  limit: number;
  posterPathImage: string;
  hasPromotion: boolean;
  prevPrice: number;
  promotionDiscount: number;
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
  basket: ISneakerBasket[];
  sneakerActive: ISneaker | null;
  total: number;
  basketQuantity: number;
  id: string;
  brands: string[];
  search: string;
  counter: number;
  counterLimit: number;
  sneakersTotal: ISneaker[];
  exceedsLimit: boolean;
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
  id_user: any;
}
