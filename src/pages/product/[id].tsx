import React, { useEffect, useState } from "react";
import Footer from "@layout/Footer";
import Header from "@layout/Header";
import { NavLink, useParams } from "react-router-dom";
import { FindProduct, FindSimilarProduct } from "../../utils/tools";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { Product } from "@/types/Product.type";

interface CartItem {
  productId: string;
  quantity: number;
}

const ProductPage: React.FC = () => {
  const [numberProduct, setNumberProduct] = useState<number>(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        // Vérifiez si id est défini
        try {
          const fetchedProduct = await FindProduct(id);
          setProduct(fetchedProduct);
          const fetchedSimilarProducts = await FindSimilarProduct(
            fetchedProduct.console
          );
          setSimilarProducts(fetchedSimilarProducts);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleIncrement = () => {
    setNumberProduct((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (numberProduct > 1) {
      setNumberProduct((prevCount) => prevCount - 1);
    }
  };

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
      </div>
      <main className="px-[10px] lg:px-[30px] xl:px-[200px] mb-5 flex flex-col gap-4 mt-10">
        {/* Produits */}
        <div className="flex flex-row gap-5">
          <section className="bg-white p-4">
            <img
              src={product.imageUrl}
              alt={product.imageAlt}
              className="w-[350px] h-[370px] object-cover"
            />
          </section>
          <section className="flex flex-col gap-5 bg-white p-4 w-full justify-between">
            <div className="flex flex-col gap-4  w-full">
              <div className="flex flex-row  justify-between">
                <h1 className="text-3xl font-primary">{product.title}</h1>
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
                    onClick={handleDecrement}>
                    <FiMinus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-bold w-5 h-5 items-center text-center">
                    {numberProduct}
                  </span>
                  <button
                    className="btn btn-secondary text-white btn-xs "
                    onClick={handleIncrement}>
                    <IoMdAdd className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <h2 className="text-lg font-bold">Description</h2>
              <p>{product.description}</p>
            </div>
            <div>
              <button
                className="btn btn-secondary text-white w-1/2"
                onClick={() => handleAddCart(product._id, numberProduct)}>
                Ajouter au panier
              </button>
            </div>
          </section>
        </div>
        <section className="mt-10 mb-3">
          <h1 className="text-3xl font-primary text-start text-[#191E8F]">
            Produits de la même console
          </h1>
          <div className="flex flex-row gap-5">
            {/* Produits similaires */}
            {similarProducts.map((similardProduct, index) => {
              if (similardProduct._id !== product._id) {
                return (
                  <NavLink
                    className="bg-white p-4 shadow-md hover:shadow-2xl transition-shadow duration-300"
                    key={index}
                    to={`/product/${similardProduct._id}`}>
                    <img
                      src={similardProduct.imageUrl}
                      alt={similardProduct.imageAlt}
                      className="w-[220px] h-[370px] object-cover"
                    />
                  </NavLink>
                );
              }
              return null; // Si l'ID est le même, retourne null pour ne pas rendre ce produit
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
