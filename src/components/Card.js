import React from "react";

const Card = ({ movie }) => {

  // Formater la date de yyyy-mm-dd -> dd/mm/yyyy
  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  // Mettre les genres du film dans un tableau suivant l'id du genre
  const genreFinder = () => {
    let genreArray = [];
    for (let i = 0; i < movie.genre_ids.length; i++) {
      switch (movie.genre_ids[i]) {
        case 28:
          genreArray.push(`Action`);
          break;
        case 12:
          genreArray.push(`Aventure`);
          break;
        case 16:
          genreArray.push(`Animation`);
          break;
        case 35:
          genreArray.push(`Comédie`);
          break;
        case 80:
          genreArray.push(`Policier`);
          break;
        case 99:
          genreArray.push(`Documentaire`);
          break;
        case 18:
          genreArray.push(`Drame`);
          break;
        case 10751:
          genreArray.push(`Famille`);
          break;
        case 14:
          genreArray.push(`Fantasy`);
          break;
        case 36:
          genreArray.push(`Histoire`);
          break;
        case 27:
          genreArray.push(`Horreur`);
          break;
        case 10402:
          genreArray.push(`Musique`);
          break;
        case 9648:
          genreArray.push(`Mystère`);
          break;
        case 10749:
          genreArray.push(`Romance`);
          break;
        case 878:
          genreArray.push(`Science-fiction`);
          break;
        case 10770:
          genreArray.push(`Téléfilm`);
          break;
        case 53:
          genreArray.push(`Thriller`);
          break;
        case 10752:
          genreArray.push(`Guerre`);
          break;
        case 37:
          genreArray.push(`Western`);
          break;
        default:
          break;
      }
    }
    // retourner une liste de genre
    return genreArray.map((genre) => <li key={genre}>{genre}</li>);
  };

  // Stocker les id des films favoris dans l'espace de stockage du navigateur
  const addStorage = () => {
    // Récupérer ce qui dèja était stocker
    let storedData = window.localStorage.movies
      // si storedData existe -> split tableau
      ? window.localStorage.movies.split(",")
      // sinon crée un tableau vide
      : [];

      // Ajouter l'id (s'il n'existe pas) -> storedData
      if (!storedData.includes(movie.id.toString())) {
      storedData.push(movie.id);
      window.localStorage.movies = storedData;
    }
  };

  // Supprimer un élément de l'espace de stockage
  const deleteStorage = () => {
    let storedData = window.localStorage.movies.split(",");
    // filter le storedData sans l'id du film à supprimer
    let newData = storedData.filter((id) => id != movie.id);
    // Restocker les nouveaux données filtrés -> espace de stockage navigateur
    window.localStorage.movies = newData;
  };

  return (
    <div className="card">

      {/* si pas d'affiche -> mettre photo générique */}
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
            : "./img/poster.jpg"
        }
        alt="affiche film"
      />

      {/* Titre du film */}
      <h2>{movie.title}</h2>

      {/* Date de sortie : si pas de date -> "" */}
      {movie.release_date ? (
        <h5>Sorti le : {dateFormater(movie.release_date)}</h5>
      ) : (
        ""
      )}

      {/* Note/classement du film */}
      <h4>
        {movie.vote_average}/10 <span>⭐</span>
      </h4>

      {/* Genre du film */}
      <ul>
        {movie.genre_ids
          // case : API search by name film
          ? genreFinder()
          // case : API search by id
          : movie.genres.map((genre, index) => (
              <li key={index}>{genre.name}</li>
            ))}
      </ul>

      {/* Synopsis : si elle n'existe pas -> "" */}
      {movie.overview ? <h3>Synopsis</h3> : ""}
      <p>{movie.overview}</p>

      {/* Conditionner l'affichage du bouton */}
      {movie.genre_ids ? (
        // si existe btn ajouter l'élément (page d'accueil)
        // onClick : ajouter l'élément à l'espace de stockage
        <div className="btn" onClick={() => addStorage()}>
          Ajouter aux favoris
        </div>
      ) : (
        // sinon btn supprimer l'élément (page favoris)
        <div
          className="btn"
          // onClick : supprimer l'élément de l'espace de stockage
          onClick={() => {
            deleteStorage();
            // Recharger la page pour supprimer l'élément de la page
            // pas une bonne pratique -> (useContext / Redux)
            window.location.reload();
          }}
        >
          Supprimer de la liste
        </div>
      )}
    </div>
  );
};

export default Card;
