import { IoMdClose } from 'react-icons/io';
import { VscStarFull } from 'react-icons/vsc';
import { useFlipContext } from '../../contexts/useFlipContext';
import { Loader } from '../Loader';
import Modal from '../Modal';
import s from './styles.module.scss';
import { ButtonAddToCart } from '../ButtonAddToCart';
import { ErrorRetry } from '../ErrorRetry';
import { bookDetailsInfos } from './bookDetailsInfos';

export function BookDetailsModal(): JSX.Element {
  const {
    addBookToCart,
    isBookDetailsOpen,
    closeBookDetailsModal,
    bookDetails,
    isBookDetailsError,
    isBookDetailsLoading,
    getBookDetails,
    selectedBook,
  } = useFlipContext();

  const detailsInfos = bookDetailsInfos(bookDetails);

  return (
    <Modal
      isOpen={isBookDetailsOpen}
      setIsOpen={closeBookDetailsModal}
      closeOnOverlay
    >
      <div className={s.bookCardContainer}>
        <IoMdClose onClick={closeBookDetailsModal} />
        {bookDetails && (
          <>
            <h3 className={s.bookTitle}>{bookDetails.title}</h3>
            <img src={bookDetails.image} alt={bookDetails.title} />
            <div className={s.bookInfos}>
              <legend>{bookDetails.desc}</legend>
              <p className={s.price}>{bookDetails?.price}</p>
              <div className={s.bookDetails}>
                {detailsInfos.map(info => (
                  <div key={info.title}>
                    <h3>{info.title}</h3>
                    <p>
                      {info.data}{' '}
                      {info.title === 'Avaliação' && <VscStarFull size={18} />}
                    </p>
                  </div>
                ))}
              </div>
              <ButtonAddToCart
                data-testid="add-book-button"
                onClick={() => addBookToCart(bookDetails)}
              />
            </div>
          </>
        )}
        <div className={s.loaderAndErrorContainer}>
          {isBookDetailsLoading && <Loader />}
          {isBookDetailsError && (
            <ErrorRetry retryFunction={() => getBookDetails(selectedBook)} />
          )}
        </div>
      </div>
    </Modal>
  );
}
