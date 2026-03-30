export interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  shop: string;
  quantity: number;
}

export interface ICustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface IOrder {
  customer: ICustomer;
  items: IProduct[];
  totalPrice: number;
  _id: string,
}