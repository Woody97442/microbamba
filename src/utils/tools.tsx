import { Product } from "@/types/Product.type";
import Stripe from "stripe";

// Initialisation de Stripe avec votre clé secrète
const stripe = new Stripe(process.env.STRAPI_KEY || "");
const API_URL = process.env.API_URL;
const API_IMAGE_URL = process.env.API_IMAGE_URL;

export async function GetProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/product/all`);

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
      success_url: `https://woody97442.github.io/succes`,
      cancel_url: `https://woody97442.github.io/fail`,
    });

    if (session && session.url) {
      window.location.href = session.url;
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
