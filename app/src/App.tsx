import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { OAuthPopup } from "@tasoskakour/react-use-oauth2";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthComponent from "./AuthComponent";

function App() {
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  const getDataFromApi = async (e: any) => {
    e.preventDefault();
    const data = await fetch(`/api/hello?name=${name}`);
    const json = await data.json();

    if (json.message) {
      setMessage(json.message);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<OAuthPopup />} path="/callback" />
        <Route element={<AuthComponent />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
