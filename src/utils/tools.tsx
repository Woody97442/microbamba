import { Product } from "@/types/Product.type";
import { useNavigate } from "react-router-dom";
import Stripe from "stripe";

// Initialisation de Stripe avec votre clé secrète
const stripe = new Stripe(process.env.VITE_STRAPI_KEY || "");
// Variable d'environnement
const API_URL = process.env.VITE_API_URL;
const API_IMAGE_URL = process.env.VITE_API_IMAGE_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined");
}

if (!API_IMAGE_URL) {
  throw new Error("API_IMAGE_URL is not defined");
}

export async function GetProducts(ApiUrl: string): Promise<Product[]> {
  try {
    const response = await fetch(`${ApiUrl}/product/all`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    const products: Product[] = data.map((product: any) => ({
      _id: product._id,
      title: product.title,
      imageUrl: API_IMAGE_URL + product.imageUrl,
      imageAlt: product.imageAlt,
      price: product.price,
      description: product.description,
      console: product.console,
    }));
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function FindProduct(id: string): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/product/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const productData = await response.json();
    const product: Product = {
      _id: productData._id,
      title: productData.title,
      imageUrl: API_IMAGE_URL + productData.imageUrl,
      imageAlt: productData.imageAlt,
      price: productData.price,
      description: productData.description,
      console: productData.console,
    };
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Product not found");
  }
}

export async function FindSimilarProduct(
  searchConsole: string
): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/product/console/${searchConsole}`);
    if (!response.ok) {
      throw new Error("Failed to fetch similar products");
    }
    const similarProductsData = await response.json();

    const similarProducts: Product[] = similarProductsData.map(
      (productData: any) => ({
        _id: productData._id,
        title: productData.title,
        imageUrl: API_IMAGE_URL + productData.imageUrl,
        imageAlt: productData.imageAlt,
        price: productData.price,
        description: productData.description,
        console: productData.console, // Utilise searchConsole ici au lieu de productData.searchConsole
      })
    );
    return similarProducts;
  } catch (error) {
    console.error("Error fetching similar products:", error);
    throw new Error("Failed to fetch similar products");
  }
}

export async function checkout(totalCart: string): Promise<boolean> {
  try {
    const navigate = useNavigate();
    const amountInCents = Math.round(parseFloat(totalCart) * 100);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Achat de MicroBamBa",
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `/succes`,
      cancel_url: `/fail`,
    });

    if (session && session.url) {
      navigate(session.url);
    } else {
      console.error(
        "La session de paiement avec Stripe n'a pas été créée avec succès !"
      );
    }

    return true;
  } catch (error) {
    console.error("Error during checkout:", error);
    return false;
  }
}
