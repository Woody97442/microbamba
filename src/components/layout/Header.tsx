import React, { useEffect, useState } from "react";
import { IoIosCloseCircle, IoMdAdd } from "react-icons/io";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { FindProduct } from "@/utils/tools";
import { FiMinus } from "react-icons/fi";

interface CartItem {
  productId: string;
  quantity: number;
}

const Header: React.FC = () => {
  let [totalCart, setTotalCart] = useState<number>(0);
  const [disabled, setDisabled] = useState(false);

  const updateCart = () => {
    const storedCart = localStorage.getItem("cart");
    setCart(storedCart ? JSON.parse(storedCart) : []);
  };

  let [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [products, setProducts] = useState<any[]>([]);

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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateTotalCart();
  }, [cart]);

  useEffect(() => {
    updateTotalCart();
  }, [products]);

  const handleQuantityChange = (
    quantity: number,
    productId: string,
    action: "increment" | "decrement"
  ) => {
    setDisabled(true);
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

  return (
    <>
      <header className="px-[10px] lg:px-[30px] xl:px-[200px] bg-[#0B1032] py-4 sticky top-0 z-50">
        <div className="flex justify-between text-white items-center">
          <a
            href="/microbamba/"
            className="text-3xl font-primary">
            MICROBAMBA
          </a>
          <div className="drawer-end z-10">
            <input
              id="my-drawer-4"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-4"
                className="drawer-button">
                <a
                  className="flex flex-col justify-center items-center cursor-pointer"
                  onClick={updateCart}>
                  <div className="indicator z-0">
                    <span className="indicator-item badge badge-secondary">
                      {cart.length}
                    </span>
                    <div className="flex flex-col">
                      <RiShoppingBag3Fill className="text-4xl" />
                      <span className="mt-1">Panier</span>
                    </div>
                  </div>
                </a>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"></label>
              <div className="menu p-5 w-[30rem] min-h-full bg-base-100 text-base-content gap-4">
                <label
                  htmlFor="my-drawer-4"
                  className="drawer-button">
                  <a className="flex flex-col items-end cursor-pointer mx-4">
                    <IoIosCloseCircle className="text-4xl" />
                  </a>
                </label>
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="flex flex-row mx-4 gap-4">
                    <img
                      src={product.imageUrl}
                      alt={product.imageAlt}
                      className="w-[100px] h-auto object-cover"
                    />
                    <div className="flex flex-col w-full justify-between">
                      <div className="flex flex-col">
                        <span className="text-xl text-secondary font-primary">
                          {product.title}
                        </span>
                        <span className="font-bold text-xl ">
                          Prix unité : {product.price}€
                        </span>
                        <span className="font-bold text-xl ">
                          Total :{" "}
                          {(
                            parseFloat(product.price) * product.quantity
                          ).toFixed(2)}
                          €
                        </span>
                      </div>
                      <div className="flex flex-row justify-between">
                        {/* Bouton quantité */}
                        <div className="flex flex-row gap-4 items-center">
                          <span className="text-xl font-bold  ">
                            Quantité :
                          </span>
                          <div className="flex flex-row gap-2 items-center">
                            {disabled ? (
                              <button
                                className="btn btn-secondary text-white btn-xs"
                                onClick={() =>
                                  handleQuantityChange(
                                    product.quantity,
                                    product._id,
                                    "decrement"
                                  )
                                }
                                disabled>
                                <FiMinus />
                              </button>
                            ) : (
                              <button
                                className="btn btn-secondary text-white btn-xs"
                                onClick={() =>
                                  handleQuantityChange(
                                    product.quantity,
                                    product._id,
                                    "decrement"
                                  )
                                }>
                                <FiMinus />
                              </button>
                            )}
                            <span className="text-xl font-bold  ">
                              {product.quantity}
                            </span>
                            {disabled ? (
                              <button
                                className="btn btn-secondary text-white btn-xs "
                                onClick={() =>
                                  handleQuantityChange(
                                    product.quantity,
                                    product._id,
                                    "increment"
                                  )
                                }
                                disabled>
                                <IoMdAdd />
                              </button>
                            ) : (
                              <button
                                className="btn btn-secondary text-white btn-xs "
                                onClick={() =>
                                  handleQuantityChange(
                                    product.quantity,
                                    product._id,
                                    "increment"
                                  )
                                }>
                                <IoMdAdd />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="divider mt-1 "></div>
                <h1 className="text-lg font-primary text-start text-[#191E8F]">
                  Totlal : {totalCart.toFixed(2)}€
                </h1>
                <div className="divider mt-1 "></div>
                <div>
                  <a
                    className="btn btn-secondary text-white w-full "
                    href="/microbamba/cart">
                    Mon Panier
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
