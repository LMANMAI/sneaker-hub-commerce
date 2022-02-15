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
}

export interface IProps {
  sneaker?: ISneaker;
}
