import { Container } from "react-bootstrap";
import AppNavbar from "./components/AppNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Error from "./components/Error"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { useState } from "react";


function App() {


  return (
    <BrowserRouter>
      <AppNavbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="dark"
        />
      </Container >
    </BrowserRouter >
  );
}

export default App;
