import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorRoutes = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <button onClick={() => navigate("/")}> Home </button>
      </div>

      <h1>Opps , page Does not exist</h1>
    </>
  );
};

export default ErrorRoutes;
