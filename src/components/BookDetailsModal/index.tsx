import { IoMdClose } from 'react-icons/io';
import { VscStarFull } from 'react-icons/vsc';
import { useFlipContext } from '../../contexts/useFlipContext';
import { Loader } from '../Loader';
import Modal from '../Modal';
import s from './styles.module.scss';
import { ButtonAddToCart } from '../ButtonAddToCart';

export function BookDetailsModal(): JSX.Element {
  const {
    addBookToCart,
    isBookDetailsOpen,
    closeBookDetailsModal,
    bookDetails,
  } = useFlipContext();

  return (
    <Modal
      isOpen={isBookDetailsOpen}
      setIsOpen={closeBookDetailsModal}
      closeOnOverlay
    >
      <div className={s.bookCardContainer}>
        <IoMdClose onClick={closeBookDetailsModal} />
        {bookDetails ? (
          <>
            <h3 className={s.bookTitle}>{bookDetails.title}</h3>
            <img src={bookDetails.image} alt={bookDetails.title} />
            <div className={s.bookInfos}>
              <legend>{bookDetails.desc}</legend>
              <p className={s.price}>{bookDetails?.price}</p>
              <div className={s.bookDetails}>
                <div>
                  <h3>Autor</h3>
                  <p>{bookDetails.authors}</p>
                </div>
                <div>
                  <h3>Editora</h3>
                  <p>{bookDetails.publisher}</p>
                </div>
                <div>
                  <h3>Ano</h3>
                  <p>{bookDetails.year}</p>
                </div>
                <div>
                  <h3>Idioma</h3>
                  <p>{bookDetails.language}</p>
                </div>
                <div>
                  <h3>Páginas</h3>
                  <p>{bookDetails.pages}</p>
                </div>
                <div>
                  <h3>Avaliação</h3>
                  <p>
                    {bookDetails.rating} <VscStarFull size={18} />
                  </p>
                </div>
              </div>
              <ButtonAddToCart
                data-testid="add-book-button"
                onClick={() => addBookToCart(bookDetails)}
              />
            </div>
          </>
        ) : (
          <div className={s.loaderContainer}>
            <Loader />
          </div>
        )}
      </div>
    </Modal>
  );
}
