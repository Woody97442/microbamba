import { GetProducts } from "./tools";

describe("GetProducts", () => {
  it("récupère les produits avec succès et renvoie une gamme de produits", async () => {
    const products = await GetProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty("_id");
    expect(products[0]).toHaveProperty("title");
    expect(products[0]).toHaveProperty("imageUrl");
    expect(products[0]).toHaveProperty("imageAlt");
    expect(products[0]).toHaveProperty("price");
    expect(products[0]).toHaveProperty("description");
    expect(products[0]).toHaveProperty("console");
  });

  it("gère l'erreur de récupération et renvoie un tableau vide", async () => {
    // Modifier temporairement l'URL pour provoquer une erreur
    const originalApiUrl = process.env.API_URL;
    process.env.API_URL = "http://invalid-url";

    const products = await GetProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBe(0);

    // Restaurer l'URL d'origine
    process.env.API_URL = originalApiUrl;
  });

  it("gère l'API qui ne répond pas et renvoie un tableau vide", async () => {
    // Modifier temporairement l'URL pour pointer vers une URL inaccessible
    const originalApiUrl = process.env.API_URL;
    process.env.API_URL = "http://unresponsive-api";

    const products = await GetProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBe(0);

    // Restaurer l'URL d'origine
    process.env.API_URL = originalApiUrl;
  });

  it("vérifie que les produits ont la bonne structure", async () => {
    const products = await GetProducts();
    products.forEach((product) => {
      expect(product).toHaveProperty("_id");
      expect(typeof product._id).toBe("string");
      expect(product).toHaveProperty("title");
      expect(typeof product.title).toBe("string");
      expect(product).toHaveProperty("imageUrl");
      expect(typeof product.imageUrl).toBe("string");
      expect(product).toHaveProperty("imageAlt");
      expect(typeof product.imageAlt).toBe("string");
      expect(product).toHaveProperty("price");
      expect(typeof product.price).toBe("number");
      expect(product).toHaveProperty("description");
      expect(typeof product.description).toBe("string");
      expect(product).toHaveProperty("console");
      expect(typeof product.console).toBe("string");
    });
  });
});
