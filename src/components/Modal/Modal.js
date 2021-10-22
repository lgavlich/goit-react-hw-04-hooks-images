import React, { useEffect } from "react";
import PropTypes from "prop-types";
//import { createPortal } from "react-dom";

//const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, modalImage: { modalImage } }) {
  useEffect(() => {
    //const handleKeyDown = (e) => {
    //if (e.code === "Escape") {
    //onClose();
    //}
    //};
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  //const handleBackdropClick = (e) => {
  //if (e.currentTarget === e.target) {
  //onClose();
  //}
  //};

  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={modalImage} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalImage: PropTypes.object.isRequired,
};
