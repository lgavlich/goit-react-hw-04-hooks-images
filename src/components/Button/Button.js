import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick }) => {
  return (
    <div className="Button-Click">
      <button type="button" className="Button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
