import Header from "@layout/Header";
import Footer from "@layout/Footer";
import Heros from "@partials/Heros";

import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GetProducts } from "@/utils/tools";
import { Product } from "@/types/Product.type";
import { NavLink } from "react-router-dom";

interface CartItem {
  productId: string;
  quantity: number;
}

const Index: React.FC = () => {
  let listConsole: string[] = [];
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedConsole, setSelectedConsole] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await GetProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleConsoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedConsole(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(parseInt(event.target.value));
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(parseInt(event.target.value));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedConsole === "" || product.console === selectedConsole) &&
      (!minPrice || parseFloat(product.price) >= minPrice) &&
      (!maxPrice || parseFloat(product.price) <= maxPrice)
  );

  for (let i = 0; i < products.length; i++) {
    const element = products[i].console;
    if (!listConsole.includes(element)) {
      listConsole.push(element);
    }
  }

  const handleAddCart = (productId: string, quantity: number) => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProductIndex = cart.findIndex(
      (item) => item.productId === productId
    );

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Header />
        <Heros />
        {/* Filtre des produits */}
        <section>
          <div className="flex flex-col md:flex-row justify-between px-[10px] lg:px-[30px] xl:px-[200px] ">
            {/* Barre de reccherce */}
            <div className="w-[400px] flex">
              <button className="btn btn-secondary rounded-r-none ">
                <FiSearch className="w-6 h-6 text-base-100" />
              </button>
              <label className="input input-bordered flex items-center gap-2 rounded-l-none w-full">
                <input
                  type="text"
                  className="grow"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </label>
            </div>
            {/* ------------------ */}
            {/* Min Max filtre de prix */}
            <div>
              <label className="form-control w-full flex-row flex">
                <div className="label me-3">
                  <span className="text-xl">Prix :</span>
                </div>
                <div className="flex flex-row gap-2">
                  <input
                    type="number"
                    placeholder="Minimum"
                    className="input input-bordered w-full max-w-xs"
                    value={minPrice || ""}
                    onChange={handleMinPriceChange}
                  />
                  <input
                    type="number"
                    placeholder="Maximum"
                    className="input input-bordered w-full max-w-xs"
                    value={maxPrice || ""}
                    onChange={handleMaxPriceChange}
                  />
                </div>
              </label>
            </div>
            {/* ------------------ */}
            {/* Selecte par console */}
            <div>
              <label className="form-control  flex-row flex">
                <div className="label w-[100px]">
                  <span className="text-xl">Console : </span>
                </div>
                <select
                  className="select select-bordered w-[300px]"
                  onChange={handleConsoleChange}
                  value={selectedConsole}>
                  <option value="">...</option>
                  {listConsole.map((console, index) => (
                    <option
                      key={index}
                      value={console}>
                      {console}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {/* ------------------ */}
          </div>
        </section>
      </div>
      <main className="px-[10px] lg:px-[30px] xl:px-[200px] mb-5 flex flex-col gap-4 mt-10">
        {/* Liste des produits */}
        <section>
          <div>
            <h1 className="text-2xl text-center font-primary font-bold md:text-start">
              Catalogue
            </h1>
            <div className="divider mt-1 "></div>
            {filteredProducts.map((product, index) => (
              <div
                className="inline-block p-3"
                key={index}>
                <div className="relative max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <NavLink
                    className="flex flex-col items-center gap-2 w-[250px] h-[300px] justify-center mb-4"
                    to={"/product/" + product._id}
                    aria-label={product.title}>
                    <img
                      src={product.imageUrl}
                      alt={product.imageAlt}
                      className="h-[200px] w-full object-cover"
                    />
                    <div className="flex flex-col w-full  text-center">
                      <div className="flex flex-col gap-1 pb-3">
                        <p className="font-bold text-lg font-primary">
                          {product.title}
                        </p>
                        <p className="font-bold font-secondary">
                          Console : {product.console}
                        </p>
                        <p className="font-bold font-secondary">
                          Prix : {product.price}€
                        </p>
                      </div>
                    </div>
                  </NavLink>
                  <div>
                    <button
                      className="btn btn-secondary text-white w-full"
                      onClick={() => handleAddCart(product._id, 1)}>
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
