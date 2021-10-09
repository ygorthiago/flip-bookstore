import { IBookDetails } from '../../types';

interface IBookDetailsInfos {
  title: string;
  data: string | undefined;
}

export function bookDetailsInfos(
  bookDetails: IBookDetails | undefined,
): IBookDetailsInfos[] {
  return [
    {
      title: 'Autor',
      data: bookDetails?.authors,
    },
    {
      title: 'Editora',
      data: bookDetails?.publisher,
    },
    {
      title: 'Ano',
      data: bookDetails?.year,
    },
    {
      title: 'Idiomas',
      data: bookDetails?.language,
    },
    {
      title: 'Páginas',
      data: bookDetails?.pages,
    },
    {
      title: 'Avaliação',
      data: bookDetails?.rating,
    },
  ];
}
