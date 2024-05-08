import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const BackButton = ({ destination }) => {
  const route = destination ? destination : "/";
  return (
    <div className="p-2 my-2 bg-blue-600 rounded-md md:text-lg lg:text-xl w-fit">
      <Link to={route}>
        <IoArrowBackSharp className="text-white" />
      </Link>
    </div>
  );
};

export default BackButton;
