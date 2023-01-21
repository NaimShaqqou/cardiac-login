import React from "react";

import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthComponent from "./AuthComponent";
import OAuth2Popup from "./OAuth2Popup";

function App() {
  // const [name, setName] = React.useState("");
  // const [message, setMessage] = React.useState("");

  // const getDataFromApi = async (e: any) => {
  //   e.preventDefault();
  //   const data = await fetch(`/api/hello?name=${name}`);
  //   const json = await data.json();

  //   if (json.message) {
  //     setMessage(json.message);
  //   }
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<OAuth2Popup />} path="/callback" />
        <Route element={<AuthComponent />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
