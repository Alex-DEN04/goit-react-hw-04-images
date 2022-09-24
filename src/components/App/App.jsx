import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { getImages } from '../services/api';
import { Button } from '../Button/Button';
import { AppStyled, Spiner } from './App.styled';
import { Modal } from '../Modal/Modal';
import { GlobalStyle } from 'components/Global/GlobalStyled';

const App = () => {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    const nextImageName = imageName.trim();
    try {
      setLoading(true);
      if (imageName === '') {
        setLoading(false);
        return;
      }
      getImages(nextImageName, page).then(response => {
        setImages(images => [...images, ...response.data.hits]);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [imageName, page]);

  const handleSubmit = ({ input }) => {
    setImageName(input.trim());
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  const openModal = ({ largeImageURL }) => {
    setShowModal(true);
    setLargeImage(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImage('');
  };

  return (
    <>
      <GlobalStyle />
      <AppStyled>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={images} onClick={openModal} />
        {loading && (
          <Spiner>
            <RotatingLines />
          </Spiner>
        )}
        {images.length !== 0 && <Button onClick={loadMore} />}
        {showModal && <Modal onClose={closeModal} modalImage={largeImage} />}
        <ToastContainer autoClose={3000} />
      </AppStyled>
    </>
  );
};
export default App;
