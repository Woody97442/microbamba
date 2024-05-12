interface Product {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  price: string;
  description: string;
  console: string;
}

export function GetProducts(): Product[] {
  const baseUrl = "/src/assets/uploads/";
  const products: Product[] = [
    {
      id: "1",
      title: "Pure Pinball",
      imageUrl: baseUrl + "purepinball.jpg",
      imageAlt: "Pure Pinball",
      price: "16.99",
      description: "des1",
      console: "Xbox",
    },
    {
      id: "2",
      title: "Blanche Neige",
      imageUrl: baseUrl + "blanche.jpg",
      imageAlt: "Blanche Neige",
      price: "15",
      description: "des1",
      console: "PlayStation 2",
    },
    {
      id: "3",
      title: "Cinderella",
      imageUrl: baseUrl + "cinderella.jpg",
      imageAlt: "Cinderella",
      price: "27",
      description: "des1",
      console: "PlayStation 2",
    },
    {
      id: "4",
      title: "Crack Down",
      imageUrl: baseUrl + "crackdown.jpg",
      imageAlt: "Crack Down",
      price: "100",
      description: "des1",
      console: "SEGA",
    },
    {
      id: "5",
      title: "Bad Cat",
      imageUrl: baseUrl + "badcat.jpg",
      imageAlt: "badcat",
      price: "35",
      description: "des1",
      console: "PlayStation 2",
    },
    {
      id: "6",
      title: "Earthling",
      imageUrl: baseUrl + "earthling.jpg",
      imageAlt: "Earthling",
      price: "69",
      description: "des1",
      console: "PC",
    },
    {
      id: "7",
      title: "X-Zone",
      imageUrl: baseUrl + "x-zone.jpg",
      imageAlt: "X-Zone",
      price: "79",
      description: "des1",
      console: "PSP",
    },
    {
      id: "8",
      title: "Zelda",
      imageUrl: baseUrl + "zelda.jpg",
      imageAlt: "Zelda",
      price: "2000",
      description: "des1",
      console: "GameCube",
    },
  ];
  return products;
}

export function FindProduct(id: string): Product {
  const baseUrl = "/src/assets/uploads/";
  const products: Product[] = [
    {
      id: "1",
      title: "Pure Pinball",
      imageUrl: baseUrl + "purepinball.jpg",
      imageAlt: "Pure Pinball",
      price: "16.99",
      description: "des1",
      console: "Xbox",
    },
    {
      id: "2",
      title: "Blanche Neige",
      imageUrl: baseUrl + "blanche.jpg",
      imageAlt: "Blanche Neige",
      price: "15",
      description: "des1",
      console: "PlayStation 2",
    },
    {
      id: "3",
      title: "Cinderella",
      imageUrl: baseUrl + "cinderella.jpg",
      imageAlt: "Cinderella",
      price: "27",
      description: "des1",
      console: "PlayStation 2",
    },
    {
      id: "4",
      title: "Crack Down",
      imageUrl: baseUrl + "crackdown.jpg",
      imageAlt: "Crack Down",
      price: "100",
      description: "des1",
      console: "SEGA",
    },
    {
      id: "5",
      title: "Bad Cat",
      imageUrl: baseUrl + "badcat.jpg",
      imageAlt: "badcat",
      price: "35",
      description: "des1",
      console: "PlayStation 2",
    },
    {
      id: "6",
      title: "Earthling",
      imageUrl: baseUrl + "earthling.jpg",
      imageAlt: "Earthling",
      price: "69",
      description: "des1",
      console: "PC",
    },
    {
      id: "7",
      title: "X-Zone",
      imageUrl: baseUrl + "x-zone.jpg",
      imageAlt: "X-Zone",
      price: "79",
      description: "des1",
      console: "PSP",
    },
    {
      id: "8",
      title: "Zelda",
      imageUrl: baseUrl + "zelda.jpg",
      imageAlt: "Zelda",
      price: "2000",
      description: "des1",
      console: "GameCube",
    },
  ];
  const product = products.find((product) => product.id === id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

export function FindSimilardProduct(console: string): Product[] {
  const baseUrl = "/src/assets/uploads/";

  let listSimilardProduct = [];

  const products: Product[] = [
    {
      id: "1",
      title: "Pure Pinball",
      imageUrl: baseUrl + "purepinball.jpg",
      imageAlt: "Pure Pinball",
      price: "16.99",
      description: "des1",
      console: "Xbox",
    },
    {
      id: "2",
      title: "Blanche Neige",
      imageUrl: baseUrl + "blanche.jpg",
      imageAlt: "Blanche Neige",
      price: "15",
      description: "des1",
      console: "PlayStation 2",
    },
    {
      id: "3",
      title: "Cinderella",
      imageUrl: baseUrl + "cinderella.jpg",
      imageAlt: "Cinderella",
      price: "27",
      description: "des1",
      console: "PlayStation 2",
    },
    {
      id: "4",
      title: "Crack Down",
      imageUrl: baseUrl + "crackdown.jpg",
      imageAlt: "Crack Down",
      price: "100",
      description: "des1",
      console: "SEGA",
    },
    {
      id: "5",
      title: "Bad Cat",
      imageUrl: baseUrl + "badcat.jpg",
      imageAlt: "badcat",
      price: "35",
      description: "des1",
      console: "PlayStation 2",
    },
    {
      id: "6",
      title: "Earthling",
      imageUrl: baseUrl + "earthling.jpg",
      imageAlt: "Earthling",
      price: "69",
      description: "des1",
      console: "PC",
    },
    {
      id: "7",
      title: "X-Zone",
      imageUrl: baseUrl + "x-zone.jpg",
      imageAlt: "X-Zone",
      price: "79",
      description: "des1",
      console: "PSP",
    },
    {
      id: "8",
      title: "Zelda",
      imageUrl: baseUrl + "zelda.jpg",
      imageAlt: "Zelda",
      price: "2000",
      description: "des1",
      console: "GameCube",
    },
  ];

  for (let index = 0; index < products.length; index++) {
    const product = products[index];

    if (product.console === console) {
      listSimilardProduct.push(product);
    }
  }

  return listSimilardProduct;
}
