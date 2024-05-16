import { GetProducts } from "./tools";
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
