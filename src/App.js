import { useEffect, useState } from "react";
import api from "./API/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery.js";
import Loader from "./components/Loader/Loader";

export default function App() {
  const [imageName, setImageName] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (imageName === "") {
      return;
    }
    fetchSearch();
  }, [imageName]);

  const fetchSearch = () => {
    setLoader(true);
    api
      .fetchSearch(imageName, page)
      .then((res) => {
        const { hits } = res;

        setImages((prevState) => [...prevState, ...hits]);
        setPage((prevState) => prevState + 1);

        if (images.length > 12) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoader(false));
  };
  const formSubmit = (query) => {
    if (query !== imageName) {
      setImageName(query);
      setPage(1);
      setImages([]);
      setError(null);
    }
  };

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };

  const onImgClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    setModalImage({
      modalImage: e.target.dataset.img,
    });
    toggleModal();
  };

  return (
    <div>
      {loader && <Loader />}
      {error && <p>{error.message}</p>}

      <ToastContainer
        position="top-center"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <Searchbar onSubmit={formSubmit} />
      <ImageGallery images={images} onImgClick={onImgClick} />

      {images.length > 0 && !loader && <Button onClick={fetchSearch} />}
      {showModal && <Modal modalImage={modalImage} onClose={toggleModal} />}
    </div>
  );
}
