export interface IBook {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
  amount: number;
}

export interface IBookDetails extends IBook {
  desc: string;
  authors: string;
  publisher: string;
  year: string;
  language: string;
  pages: string;
  rating: string;
}
