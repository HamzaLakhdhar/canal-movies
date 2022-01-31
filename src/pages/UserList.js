import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Card from "../components/Card";
import Header from "../components/Header";

const UserList = () => {

  // Données de la liste
  const [listData, setListData] = useState([]);

  useEffect(() => {
    
    // Stocker les id depuis le localStorage navigateur -> moviesId
    let moviesId = window.localStorage.movies
      // Si existe -> split
      ? window.localStorage.movies.split(",")
      // Sinon tableau vide
      : [];

    // chercher un film par son Id
    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=b2ee0afae7757bcb024f7dbdf1ab083a&language=fr-FR`
        )
        // Ajouter res.date -> listData (sans ecraser les données dèjà existant)
        .then((res) => setListData((listData) => [...listData, res.data]))
        .catch(err => console.log(err.response));
    }
  }, []);

  return (
    <div className="user-list-page">
      <Header />
      <h2>
        Favoris
      </h2>

      {/* Afficher les resultats -> faire appel au compoasant Card */}
      <div className="result">
        {listData.length > 0 ? (
          listData.map((movie) => <Card movie={movie} key={movie.id} />)
        ) : (
          <h2>Vous n'avez pas encore choisie vos films préférés</h2>
        )}
      </div>
    </div>
  );
};

export default UserList;
