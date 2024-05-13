import { Product } from "@/types/Product.type";
import Stripe from "stripe";

// Initialisation de Stripe avec votre clé secrète
const stripe = new Stripe(
  "sk_test_51OeAJeKemilxQoxQsumqwtlUXV3dCg5QeTvtRNHaDVYsdFRxVAZGooNBd3xoirYEjW5aSyRkBDoQ97a7Bl9yw6If00d1S824ky"
);

export async function GetProducts(): Promise<Product[]> {
  const baseUrl = "http://localhost:5000/image/";

  try {
    const headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    };

    const response = await fetch("http://localhost:5000/product/all", {
      method: "GET",
      headers: headersList,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data.map((product: any) => ({
      _id: product._id,
      title: product.title,
      imageUrl: baseUrl + product.imageUrl,
      imageAlt: product.imageAlt,
      price: product.price,
      description: product.description,
      console: product.console,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function FindProduct(id: string): Promise<Product> {
  const ImageUrl = "http://localhost:5000/image/";
  try {
    const baseUrl = "http://localhost:5000";
    const response = await fetch(`${baseUrl}/product/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const productData = await response.json();
    const product: Product = {
      _id: productData._id,
      title: productData.title,
      imageUrl: ImageUrl + productData.imageUrl,
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
  const ImageUrl = "http://localhost:5000/image/";
  try {
    const baseUrl = "http://localhost:5000";
    const response = await fetch(`${baseUrl}/product/console/${searchConsole}`);
    if (!response.ok) {
      throw new Error("Failed to fetch similar products");
    }
    const similarProductsData = await response.json();

    const similarProducts: Product[] = similarProductsData.map(
      (productData: any) => ({
        _id: productData._id,
        title: productData.title,
        imageUrl: ImageUrl + productData.imageUrl,
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
    // Convertir le montant en centimes (stripe attend le montant en centimes)
    const amountInCents = Math.round(parseFloat(totalCart) * 100);

    // Créer une session de paiement avec Stripe
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
      success_url: "http://localhost:5173/succes",
      cancel_url: "http://localhost:5173/fail",
    });

    if (session && session.url) {
      window.location.href = session.url;
    } else {
      console.error(
        "La session de paiement avec Stripe n'a pas été créée avec succès !"
      );
    }

    // Retourner true pour indiquer que le paiement a été initié avec succès
    return true;
  } catch (error) {
    console.error("Error during checkout:", error);
    // Si une erreur se produit pendant le processus de paiement, retournez false
    return false;
  }
}
