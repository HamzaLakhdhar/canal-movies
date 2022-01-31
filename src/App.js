import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserList from "./pages/UserList";


const App = () => {
  return (
    <BrowserRouter>
    {/* Navigation */}
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<Home />} />
        {/* Page de favoris */}
        <Route path="/favoris" element={<UserList />} />
        {/* Page par defaut: pour tout les chemins -> Home*/}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
