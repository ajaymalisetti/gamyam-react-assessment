import React from "react";
import { type Product } from "../types";

type Props = {
  products: Product[];
  onEdit: (p: Product) => void;
};

export default function ProductListView({ products, onEdit }: Props) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: 0,
        background: "#111",
        color: "#f5f5f5",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 40px rgba(0,0,0,0.55)",
      }}
    >
      <thead>
        <tr
          style={{
            background: "linear-gradient(90deg, #ff7c26, #ff9f50)", 
            color: "#fff",
          }}
        >
          <th style={th}>ID</th>
          <th style={th}>Name</th>
          <th style={th}>Price</th>
          <th style={th}>Category</th>
          <th style={th}>Stock</th>
          <th style={th}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr
            key={p.id}
            style={{
              transition: "0.25s ease",
              background: "#111",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,124,38,0.12)"; 
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#111";
            }}
          >
            <td style={td}>{p.id}</td>
            <td style={td}>{p.name}</td>
            <td style={td}>₹ {p.price}</td>
            <td style={td}>{p.category}</td>
            <td style={td}>{p.stock ?? "-"}</td>

            <td style={td}>
              <button
                onClick={() => onEdit(p)}
                style={{
                  padding: "8px 16px",
                  background: "linear-gradient(90deg, #ff7c26, #ff9f50)", 
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "14px",
                  boxShadow: "0 4px 12px rgba(255,124,38,0.4)",
                  transition: "0.25s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(90deg, #ff6a00, #ff8a33)") 
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(90deg, #ff7c26, #ff9f50)")
                }
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th: React.CSSProperties = {
  padding: "16px 18px",
  textAlign: "left",
  borderBottom: "1px solid rgba(255,255,255,0.15)",
  fontSize: "15px",
  fontWeight: 700,
  letterSpacing: "0.5px",
};

const td: React.CSSProperties = {
  padding: "14px 18px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  fontSize: "14px",
  color: "#e5e5e5",
};
