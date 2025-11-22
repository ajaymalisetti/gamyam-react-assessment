import  { useEffect, useState } from "react";
import { type Product } from "../types";

type Props = {
  products: Product[];
  setProducts: (p: Product[]) => void;
  onClose: () => void;
  editing: Product | null;
};

type FormState = {
  name: string;
  price: string;
  category: string;
  stock: string;
  description: string;
};

export default function ProductForm({ products, setProducts, onClose, editing }: Props) {
  const [form, setForm] = useState<FormState>({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        price: String(editing.price),
        category: editing.category,
        stock: String(editing.stock ?? ""),
        description: editing.description ?? "",
      });
    }
  }, [editing]);

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.price.trim()) e.price = "Price is required";
    else if (Number.isNaN(Number(form.price)) || Number(form.price) < 0) e.price = "Price must be a number >= 0";
    if (!form.category.trim()) e.category = "Category is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = () => {
    if (!validate()) return;

    if (editing) {
      const updated = products.map((p) =>
        p.id === editing.id
          ? { ...p, name: form.name, price: Number(form.price), category: form.category, stock: Number(form.stock || 0), description: form.description }
          : p
      );
      setProducts(updated);
    } else {
      const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      const newProduct: Product = {
        id: newId,
        name: form.name,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock || 0),
        description: form.description,
        createdAt: new Date().toISOString(),
        isActive: true,
      };
      setProducts([...products, newProduct]);
    }

    onClose();
  };

  return (
   <div className="modal-overlay">
  <div className="modal-box">
    <h3>{editing ? "Edit Product" : "Add Product"}</h3>

    <div style={{ marginTop: 8 }}>
      <label>Name *</label>
      <input
        className="modal-input"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />
      {errors.name && <div className="modal-error">{errors.name}</div>}
    </div>

    <div style={{ marginTop: 8 }}>
      <label>Price *</label>
      <input
        className="modal-input"
        type="number"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />
      {errors.price && <div className="modal-error">{errors.price}</div>}
    </div>

    <div style={{ marginTop: 8 }}>
      <label>Category *</label>
      <input
        className="modal-input"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      />
      {errors.category && <div className="modal-error">{errors.category}</div>}
    </div>

    <div style={{ marginTop: 8 }}>
      <label>Stock</label>
      <input
        className="modal-input"
        type="number"
        value={form.stock}
        onChange={(e) =>
          setForm({ ...form, stock: e.target.value })
        }
      />
    </div>

    <div style={{ marginTop: 8 }}>
      <label>Description</label>
      <textarea
        className="modal-input"
        style={{ height: 80 }}
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />
    </div>

    <div className="modal-footer">
      <button onClick={onClose} className="modal-btn modal-cancel">
        Cancel
      </button>
      <button onClick={onSubmit} className="">
        Save
      </button>
    </div>
  </div>
</div>

  );
}


