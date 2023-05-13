import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import picturesApi from './services/apiImg';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState([]);
  const [total, setTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const onFormSubmit = imgName => {
    setQuery(imgName);
    setPage(1);
    setImages([]);
    setTotal(0);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    try {
      setIsLoading(true);
      const pictures = picturesApi.fetchPictures(query, page);
      pictures.then(picture => {
        if (picture.totalHits === 0) {
          return toast.info(
            `Nothing was found for ${query}. Try something else`
          );
        }
        setImages(prevState => [...prevState, ...picture.hits]);
        setTotal(picture.totalHits);
      });
    } catch (error) {
      setErrorMessage(error.message);
      console.log(errorMessage);
      return toast.error('An error occurred on the server. Try again later');
    } finally {
      setIsLoading(false);
    }
  }, [query, page, errorMessage]);

  const clickLearnMore = () => {
    setPage(prevState => prevState + 1);
    setIsLoading(true);
  };

  const onOpenkModal = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    const src = e.target.src;
    images.find(img => {
      if (img.webformatURL === src) {
        setLargeImg(img);
        setShowModal(true);
      }
      return null;
    });
  };

  const onCloseModal = () => {
    setShowModal(false);
    setLargeImg([]);
  };

  const totalPage = total / images.length;
  const showButton = totalPage > 1 && total !== images.length;

  return (
    <div className="app">
      <Searchbar onSubmit={onFormSubmit} />
      {images.length !== 0 && (
        <ImageGallery images={images} onClick={onOpenkModal} />
      )}
      {isLoading && (
        <ThreeDots
          height="90"
          width="90"
          color="#3f51b5"
          wrapperStyle={{ justifyContent: 'center', marginTop: '10px' }}
        />
      )}
      {showButton && !isLoading && <Button onClick={clickLearnMore} />}
      {showModal && (
        <Modal onClose={onCloseModal}>
          <img src={largeImg.largeImageURL} alt={largeImg.tags} />
        </Modal>
      )}
      <ToastContainer autoClose={2000} theme={'colored'} />
    </div>
  );
};
