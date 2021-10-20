import React, { Component } from "react";
import api from "./API/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery.js";
import Loader from "./components/Loader/Loader";

class App extends Component {
  state = {
    imageName: "",
    images: [],
    page: 1,
    loader: false,
    showModal: false,
    modalImage: "",
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imageName !== this.state.imageName) {
      this.fetchSearch();
    }
  }
  formSubmit = (imageName) => {
    this.setState({ imageName: imageName, page: 1, images: [] });
  };

  fetchSearch = () => {
    const { imageName, page, images } = this.state;
    this.setState({ loader: true });

    api
      .fetchSearch(imageName, page)
      .then((res) => {
        const { hits } = res;

        this.setState((prevState) => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }));

        if (images.length > 12) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loader: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImgClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    this.setState({
      modalImage: e.target.dataset.img,
    });
    this.toggleModal();
  };

  render() {
    const { images, loader, showModal, modalImage } = this.state;
    return (
      <div>
        {loader && <Loader />}
        {this.state.error && <p>{this.state.error.message}</p>}

        <ToastContainer
          position="top-center"
          autoClose={2000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
        />
        <Searchbar onSubmit={this.formSubmit} />
        <ImageGallery images={images} onImgClick={this.onImgClick} />

        {images.length > 0 && !loader && <Button onClick={this.fetchSearch} />}
        {showModal && (
          <Modal modalImage={modalImage} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}
export default App;
