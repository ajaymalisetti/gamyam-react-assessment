
type Props = {
  total: number;
  page: number;
  setPage: (n: number) => void;
  pageSize: number;
};

export default function Pagination({ total, page, setPage, pageSize }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>Prev</button>
      {pages.map((p) => (
        <button key={p} onClick={() => setPage(p)} style={{ background: p === page ? "#2c2c2d" : undefined, color: p === page ? "white" : undefined }}>
          {p}
        </button>
      ))}
      <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Next</button>
    </div>
  );
}
