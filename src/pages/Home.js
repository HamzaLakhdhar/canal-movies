import React from "react";
import Form from "../components/Form";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="home-page">
      {/* Appeler en-tête */}
      <Header />
      {/* Appeler formulaire de recherche */}
      <Form />
    </div>
  );
};

export default Home;
