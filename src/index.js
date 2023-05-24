import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import MyRecipes from './pages/MyRecipes'
import AuthProvider from "./utils/AuthProvider";
import RouteProvider from "./utils/RouteProvider";
import React from "react";
import './design/Main.css'

export default function App() {
  return (
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route index element={
              <section>
                <Home />
              </section>
            } />
            <Route path="signup" element={
              <RouteProvider Component={SignUp} Protected={false}/>
            } />
            <Route path="login" element={
              <RouteProvider Component={LogIn} Protected={false}/>
            } />
            <Route path="my-recipes" element={
              <RouteProvider Component={MyRecipes} Protected={true}/>
            } />
          </Route>
          
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);