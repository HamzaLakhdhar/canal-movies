import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Form = () => {

  // Données des films
  const [moviesData, setMoviesData] = useState([]);

  // search -> recupere la donnée de l'input et l'initialiser à potter
  const [search, setSearch] = useState("potter");

  // sortGoodBad : Comment treir (goodToBad où badToGood) 
  const [sortGoodBad, setSortGoodBad] = useState(null);

  // Hook : quand le composant est appelé
  // se relance à chaque fois que le search change
  useEffect(() => {
    // axios pour appeler l'API avec l'input taper par l'user -> search (Chercher un film par un nom)
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=b2ee0afae7757bcb024f7dbdf1ab083a&query=${search}&language=fr-FR`
      )
      // stocker les données récupérées dans moviesData
      .then((res) => setMoviesData(res.data.results))
      .catch(err => console.log(err.response));
  }, [search]);

  return (
    <div className="form-component">
      <div className="form-container">

        {/* Formulaire de recherche */}
        <form className="form-inline">

          {/* Champ de recherche */}
          <input
            type="text"
            placeholder="Entrez le titre"
            id="search-input"
            // Récupérer ce qui a été tapé par l'user et le stocker dans search
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Bouton envoyer */}
          <input type="submit" value="Rechercher" />
        </form>

        <div className="btn-sort-container">

          {/* Trier les films du meilleur au pire */}
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodBad("goodToBad")}
          >
            Haut<span>➜</span>
          </div>

          {/* Trier les films du pire au meilleur */}
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodBad("badToGood")}
          >
            Bas<span>➜</span>
          </div>
        </div>
      </div>

      {/* Injecter le resultat de la recherche */}
      <div className="result">
        {moviesData
          // produire 12 carte
          .slice(0, 12)
          // Appliquer un tri (a : plus petit / b : plus grand) suivant sortGoodBad
          .sort((a, b) => {
            if (sortGoodBad === "goodToBad") {
              // plus grande note -> plus petite note
              return b.vote_average - a.vote_average;
            } else if (sortGoodBad === "badToGood") {
              // plus petit note -> plus grande note
              return a.vote_average - b.vote_average;
            }
          })
          .map((movie) => (
            // appeler le composant card en lui passant des données de chaque tour de boucles (props : movie)
            // Card : design et logique JS des cartes
            <Card key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Form;
