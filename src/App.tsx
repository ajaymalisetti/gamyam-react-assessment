import  { useState } from "react";
import Home from "./pages/Home";
import productsData from "./data/product.json";
import { type Product } from "./types";

function App() {
  const [products, setProducts] = useState<Product[]>(
    (productsData as Product[]) || []
  );

  return (
    <div style={{ padding: 20, fontFamily: "Inter, Arial" }}>
      <h1>Product Manager</h1>
      <Home products={products} setProducts={setProducts} />
    </div>
  );
}

export default App;
