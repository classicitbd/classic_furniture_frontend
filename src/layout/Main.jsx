import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <header>
        <h1>This is my Header</h1>
      </header>
      <Outlet />
      <footer>
        <h1>This is my footer</h1>
      </footer>
    </>
  );
};

export default Main;
