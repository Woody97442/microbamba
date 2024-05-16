import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from ".";
import About from "./about";
import Contact from "./contact";
import Cart from "./cart";
import Fail from "./fail";
import Success from "./succes";
import ProductPage from "./product/[id]";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Index />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/cart"
          element={<Cart />}
        />
        <Route
          path="/fail"
          element={<Fail />}
        />
        <Route
          path="/succes"
          element={<Success />}
        />
        <Route
          path="/product/:id"
          element={<ProductPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
