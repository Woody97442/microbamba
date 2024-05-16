import { FindProduct, FindSimilarProduct, GetProducts } from "./tools";
const invalidApiURL = "http://invalid-url";
const originalApiUrl = process.env.VITE_API_URL;
if (!originalApiUrl) {
  throw new Error("VITE_API_URL is not defined");
}
describe("GetProducts", () => {
  it("récupère les produits avec succès et renvoie une gamme de produits", async () => {
    const products = await GetProducts(originalApiUrl);
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty("_id");
    expect(products[0]).toHaveProperty("title");
    expect(products[0]).toHaveProperty("imageUrl");
    expect(products[0]).toHaveProperty("imageAlt");
    expect(products[0]).toHaveProperty("price");
    expect(products[0]).toHaveProperty("description");
    expect(products[0]).toHaveProperty("console");
  }, 20000);

  it("gère l'erreur de récupération et renvoie un tableau vide", async () => {
    // Modifier URL pour provoquer une erreur
    const products = await GetProducts(invalidApiURL);
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBe(0);
  }, 20000);

  it("vérifie que les produits ont la bonne structure", async () => {
    const products = await GetProducts(originalApiUrl);
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
      expect(typeof product.price).toBe("string");
      expect(product).toHaveProperty("description");
      expect(typeof product.description).toBe("string");
      expect(product).toHaveProperty("console");
      expect(typeof product.console).toBe("string");
    });
  }, 20000);
});

describe("FindProduct", () => {
  const existingProductId = "664114d14df213e3fa5930bd";
  const nonExistingProductId = "456";
  const productWithSpecificTitle = "664114d14df213e3fa5930bf";

  it("récupère un produit avec succès.", async () => {
    const product = await FindProduct(existingProductId);
    expect(product).toBeDefined();
    expect(product._id).toBe(existingProductId);
  });

  it("gère une erreur lors de la récupération du produit.", async () => {
    await expect(FindProduct(nonExistingProductId)).rejects.toThrow(
      "Product not found"
    );
  });

  it("récupère un produit avec un titre spécifique.", async () => {
    const product = await FindProduct(productWithSpecificTitle);
    expect(product).toBeDefined();
    expect(product.title).toBe("Bad Cat");
  });
});

describe("FindSimilarProduct", () => {
  const searchConsole = "PSP";

  it("Récupère avec succès des produits similaires pour une console donnée.", async () => {
    const similarProducts = await FindSimilarProduct(searchConsole);
    expect(Array.isArray(similarProducts)).toBe(true);
    expect(similarProducts.length).toBeGreaterThan(0);
    similarProducts.forEach((product) => {
      expect(product).toHaveProperty("_id");
      expect(product).toHaveProperty("title");
      expect(product).toHaveProperty("imageUrl");
      expect(product).toHaveProperty("imageAlt");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("description");
      expect(product).toHaveProperty("console");
      expect(product.console).toBe(searchConsole);
    });
  });

  it("Console spécifiée n'existe pas.", async () => {
    // Utilisez une console inexistante pour provoquer une erreur de récupération
    const nonExistingConsole = "NeonX";
    const productsConsole = await FindSimilarProduct(nonExistingConsole);
    expect(Array.isArray(productsConsole)).toBe(true);
    expect(productsConsole.length).toBe(0);
  });
});
