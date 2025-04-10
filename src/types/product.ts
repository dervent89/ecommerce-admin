export type TProductReview = {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
};

export type TProductsResponse = {
  limit: number,
  skip: number,
  total: number,
  products: IProduct[],
}
export type TProductResponse = {
  product: IProduct,
  error?: any,
  success: boolean,
}

export type TProductCategory = {
  slug: string;
  name: string;
  url:string;
}

export interface FetchProductsParams {
  page: number;
  limit: number;
  sortBy: string;
  order: 'asc' | 'desc';
  search?: string;
  category?: string;
}

export type IProductImage = {
  uid: string;
  name: string;
  status: string;
  url: string;
  thumbUrl: string;
}

export type IProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number | null;
  stock: number | null;
  brand: string;
  images: IProductImage[] | string[];
  thumbnail: string;
}
