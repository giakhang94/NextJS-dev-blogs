import React from "react";
import style from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <h2
      // className={`${style.container} ${style.bgRed} text-green-300 font-bold text-[32px]`}
      className="text-green-300 font-bold text-3xl flex justify-center items-center h-[100vh]"
    >
      404 Page Not 2Found
    </h2>
  );
};

export default NotFound;
