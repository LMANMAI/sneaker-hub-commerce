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
  sneaker?: ISneaker;
}
export interface ISneakerState {
  sneakers: ISneaker[];
  basket: ISneaker[];
  sneakerActive: ISneaker | null;
  total: number;
  gender: string;
}
