import { useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { type  Product } from "../types";
import ProductListView from "../components/ProductListView";
import ProductCardView from "../components/ProductCardView";
import ProductForm from "../components/ProductForm";
import Pagination from "../components/Pagination";

type Props = {
  products: Product[];
  setProducts: (p: Product[]) => void;
};

const PAGE_SIZE = 10;

export default function Home({ products, setProducts }: Props) {
  const [view, setView] = useState<"list" | "card">("list");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);


  const debouncedSetQuery = useMemo(
    () => debounce((v: string) => { setQuery(v); setPage(1); }, 500),
    []
  );

  const onSearchChange = (v: string) => debouncedSetQuery(v);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const total = filtered.length;
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (p: Product) => {
    setEditing(p);
    setShowForm(true);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
        <input
          placeholder="Search by product name..."
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ padding: 8, width: 320, borderRadius: 6, border: "1px solid #ccc" }}
        />

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setView("list")} style={{ padding: "8px 12px" }}>
            List
          </button>
          <button onClick={() => setView("card")} style={{ padding: "8px 12px" }}>
            Card
          </button>
          <button onClick={handleAdd} style={{ background: "#ff7c26", color: "white", padding: "8px 12px", borderRadius: 6 }}>
            + Add Product
          </button>
        </div>
      </div>

      {view === "list" ? (
        <ProductListView products={paginated} onEdit={handleEdit} />
      ) : (
        <ProductCardView products={paginated} onEdit={handleEdit} />
      )}

      <div style={{ marginTop: 16 }}>
        <Pagination page={page} setPage={setPage} total={total} pageSize={PAGE_SIZE} />
      </div>

      {showForm && (
        <ProductForm
          products={products}
          setProducts={setProducts}
          onClose={() => setShowForm(false)}
          editing={editing}
        />
      )}
    </div>
  );
}
