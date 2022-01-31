import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("code");
  const [sortGoodBad, setSortGoodBad] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=b2ee0afae7757bcb024f7dbdf1ab083a&query=${search}&language=fr-FR`
      )
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
          .slice(0, 12)
          .sort((a, b) => {
            if (sortGoodBad === "goodToBad") {
              return b.vote_average - a.vote_average;
            } else if (sortGoodBad === "badToGood") {
              return a.vote_average - b.vote_average;
            }
          })
          .map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Form;
