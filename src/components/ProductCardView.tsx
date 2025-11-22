import { type Product } from "../types";

type Props = {
  products: Product[];
  onEdit: (p: Product) => void;
};

export default function ProductCardView({ products, onEdit }: Props) {
  return (
  <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 30,
    padding: 40,
    background: "#0a0a0a",
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
  }}
>

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            padding: "2rem",
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.06)",
            background: "#2c2c2d",
            overflow: "hidden",
            transition: "0.3s ease",
            boxShadow: "0 8px 22px rgba(0,0,0,0.35)",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
              height: "280px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 16px 32px rgba(0,0,0,0.65)";
            e.currentTarget.style.background = "#353536";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 22px rgba(0,0,0,0.35)";
            e.currentTarget.style.background = "#2c2c2d";
          }}
        >
          <div>
    
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 600,
                color: "#ffffff",
              }}
            >
              {p.name}
            </h3>


            <div
              style={{
                marginTop: 10,
                fontSize: "20px",
                fontWeight: 700,
                color: "#ffff",
              }}
            >
              ₹ {p.price}
            </div>

          
           <div
  style={{
    marginTop: 8,
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "12px",
    background: "rgba(255, 124, 38, 0.18)", 
    color: "#ff9f55",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.4px",
    border: "1px solid rgba(255, 124, 38, 0.35)", 
  }}
>
  {p.category}
</div>


            <div style={{ marginTop: 16, fontSize: 14, color: "#cfcfcf" }}>
              Stock:{" "}
              <span
                style={{
                  color: p.stock ? "#22c55e" : "#ef4444",
                  fontWeight: 700,
                }}
              >
                {p.stock ?? 0}
              </span>
            </div>
          </div>

          {}
          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "flex-end", 
            }}
          >
            <button
              onClick={() => onEdit(p)}
              style={{
                padding: "10px 16px",
                background: "linear-gradient(90deg, #ff7c26, #ff9547)",
                color: "#fff",
                borderRadius: "10px",
                border: "none",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "0.25s",
                boxShadow: "0 4px 10px rgba(255,124,38,0.45)",
                fontFamily: "Inter, sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, #ff8b3a, #ffad6b)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, #ff7c26, #ff9547)";
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
