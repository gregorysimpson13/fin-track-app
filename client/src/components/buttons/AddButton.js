import React from "react";
import { Link } from "react-router-dom";

const AddButton = () => {
  return (
    <div className="add-button">
      <Link to="/add" className="add-link">
        <i className="fa fa-plus"></i>
      </Link>
    </div>
  );
};

export default AddButton;
