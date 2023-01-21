import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthComponent from "./AuthComponent";
import OAuth2Popup from "./OAuth2Popup";

function App() {
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
