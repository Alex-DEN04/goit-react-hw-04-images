import React from 'react';
import { ToastContainer } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { getImages } from '../services/api';
import { Button } from '../Button/Button';
import { AppStyled, Spiner } from './App.styled';
import { Modal } from '../Modal/Modal';
import { GlobalStyle } from 'components/Global/GlobalStyled';

export class App extends React.Component {
  state = {
    imageName: '',
    page: 1,
    images: [],
    loading: false,
    showModal: false,
    largeImage: '',
  };
  componentDidUpdate = async (prevProps, prevState) => {
    const prevImageName = prevState.imageName;
    const nextImageName = this.state.imageName.trim();
    if (prevImageName !== nextImageName || prevState.page !== this.state.page) {
      try {
        const { page } = this.state;
        this.setState({ loading: true });
        const data = await getImages(nextImageName, page);
        this.setState({
          images: [...this.state.images, ...data],
          loading: false,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleSubmit = ({ input }) => {
    this.setState({ imageName: input, page: 1, images: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = ({ largeImageURL }) => {
    this.setState(({ showModal }) => ({ showModal: true }));
    this.setState(({ largeImage }) => ({ largeImage: largeImageURL }));
  };

  closeModal = () => {
    this.setState(({ showModal }) => ({ showModal: false }));
    this.setState(({ largeImage }) => ({ largeImage: '' }));
  };

  render() {
    const { images, loading, showModal, largeImage } = this.state;
    return (
      <>
        <GlobalStyle />
        <AppStyled>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery images={images} onClick={this.openModal} />
          {loading && (
            <Spiner>
              <RotatingLines />
            </Spiner>
          )}
          {images.length !== 0 && <Button onClick={this.loadMore} />}
          {showModal && (
            <Modal onClose={this.closeModal} modalImage={largeImage} />
          )}
          <ToastContainer autoClose={3000} />
        </AppStyled>
      </>
    );
  }
}
export default App;
