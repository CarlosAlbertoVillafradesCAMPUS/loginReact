import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-use";
import ProtectedRoute from "../utils/ProtectedRoute";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Singup from "../pages/Singup";

function App() {
  const [activateLogin, setActivateLogin] = useState(true)
  const [activatePages, setActivatePages] = useState(false)
  const locationRoute = useLocation()

  const activate = () =>{
    const infoLocalStorage = localStorage.getItem("token")
    if (infoLocalStorage) {
      setActivateLogin(false)
      setActivatePages(true)
    }else{
      setActivateLogin(true)
      setActivatePages(false)
    }
  }

  useEffect(() => {
    activate();
  }, [locationRoute]);

  return (
    <BrowserRouter>
      <Routes>
      <Route element={<ProtectedRoute canActivate={activateLogin} redirectPath="/home" />}>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<Singup />} />
      </Route>
      <Route element={<ProtectedRoute canActivate={activatePages} redirectPath="/" />}>
          <Route path="/home" element={<Home />} />
      </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
