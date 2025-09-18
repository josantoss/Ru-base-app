import React from "react";
import { Navigate } from "react-router-dom";

const Landing: React.FC = () => {
  return <Navigate to="/home" replace />;
};

export default Landing;