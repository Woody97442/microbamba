import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { FindProduct, checkout } from "../utils/tools";
import { NavLink } from "react-router-dom";

interface CartItem {
  productId: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [disabled, setDisabled] = useState(false);
  let [totalCart, setTotalCart] = useState<number>(0);
  const updateCart = () => {
    const storedCart = localStorage.getItem("cart");
    setCart(storedCart ? JSON.parse(storedCart) : []);
  };

  let [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    updateTotalCart();
  }, [products]);

  useEffect(() => {
    // Fetch products asynchronously
    const fetchProducts = async () => {
      const fetchedProducts = await Promise.all(
        cart.map(async (item) => {
          const product = await FindProduct(item.productId);
          return { ...product, quantity: item.quantity };
        })
      );
      setProducts(fetchedProducts);
      setDisabled(false);
    };

    fetchProducts();
  }, [cart]);

  const handleQuantityChange = (
    quantity: number,
    productId: string,
    action: "increment" | "decrement"
  ) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.productId === productId
    );

    if (existingProductIndex !== -1) {
      const newCart = [...cart];
      if (action === "increment") {
        newCart[existingProductIndex].quantity = quantity + 1;
      } else if (action === "decrement") {
        if (quantity === 1) {
          newCart.splice(existingProductIndex, 1);
        } else {
          newCart[existingProductIndex].quantity = quantity - 1;
        }
      }
      setCart(newCart);
    } else {
      if (action === "increment") {
        setCart([...cart, { productId, quantity: quantity + 1 }]);
      }
    }
    updateCart;
  };

  const updateTotalCart = () => {
    let total = 0;
    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      if (product && cart[index]) {
        total += parseFloat(product.price) * cart[index].quantity;
      }
    }
    setTotalCart(total);
  };
  const handleCommande = async (totalCart: string) => {
    setDisabled(true);
    try {
      await checkout(totalCart);
      console.log("Commande effectuée avec succès !");
      setCart([]);
      localStorage.removeItem("cart");
      setDisabled(false);
    } catch (error) {
      console.error("Erreur lors de la commande :", error);
      setDisabled(false);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <Header />
      </div>
      <main className="px-[10px] lg:px-[30px] xl:px-[200px] mb-5 flex flex-row gap-4 mt-10">
        <section className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-primary text-start text-[#191E8F]">
              Produits dans votre panier
            </h1>
            <h2 className="text-lg font-bold font-secondary">
              ACHATS EN COURS
            </h2>
          </div>
          {products.map((product, index) => (
            <div
              className="bg-white p-4 gap-4 flex flex-row"
              key={index}>
              <NavLink to={`/product/${product.id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.imageAlt}
                  className="w-[100px] object-cover"
                />
              </NavLink>
              <div className="flex flex-col gap-4  w-full">
                <div className="flex flex-row  justify-between">
                  <h1 className="text-2xl font-primary">{product.title}</h1>
                  <p className="text-lg font-bold">
                    Console :{" "}
                    <span className="font-normal">{product.console}</span>
                  </p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p className="text-lg font-bold">Prix : {product.price}€</p>
                  <div className="flex flex-row gap-2  w-fit my-5">
                    <button
                      className="btn btn-secondary text-white btn-xs"
                      onClick={() => {
                        handleQuantityChange(
                          product.quantity,
                          product._id,
                          "decrement"
                        ),
                          updateCart;
                      }}>
                      <FiMinus className="w-5 h-5" />
                    </button>
                    <span className="text-xl font-bold w-5 h-5 items-center text-center">
                      {product.quantity}
                    </span>
                    <button
                      className="btn btn-secondary text-white btn-xs "
                      onClick={() => {
                        handleQuantityChange(
                          product.quantity,
                          product._id,
                          "increment"
                        ),
                          updateCart;
                      }}>
                      <IoMdAdd className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        <section className="flex flex-col gap-5 w-1/2">
          <h1 className="text-2xl font-primary text-center text-[#191E8F]">
            En résumé
          </h1>
          <form className="bg-white p-4 gap-4 flex flex-col">
            <h2 className="text-lg font-bold font-secondary">
              MONTANT PANIER :
            </h2>
            {products.map((product, index) => (
              <div
                key={index}
                className="flex flex-row mx-4 gap-4">
                <img
                  src={product.imageUrl}
                  alt={product.imageAlt}
                  className="w-[64px] h-auto object-cover"
                />
                <div className="flex flex-col w-full justify-between">
                  <div className="flex flex-col">
                    <span className="text-md text-secondary font-primary">
                      {product.title}
                    </span>
                    <span className="font-bold text-md ">
                      Prix unité : {product.price}€
                    </span>
                    <span className="font-bold text-md ">
                      Total :{" "}
                      {(parseFloat(product.price) * product.quantity).toFixed(
                        2
                      )}
                      €
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="divider mt-1 "></div>
            <h2 className="text-lg font-bold font-secondary">
              TOTAL : {totalCart.toFixed(2)}€
            </h2>
            <div className="divider mt-1 "></div>
            {disabled ? (
              <button
                className="btn btn-secondary text-white w-full"
                type="submit"
                disabled>
                <span className="loading loading-infinity loading-lg"></span>
              </button>
            ) : (
              <button
                className="btn btn-secondary text-white w-full"
                onClick={() => handleCommande(totalCart.toFixed(2))}>
                Commander
              </button>
            )}
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
