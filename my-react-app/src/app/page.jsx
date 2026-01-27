import { useEffect, useState } from 'react'

export default function Page() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStocks() {
      try {
        const res = await fetch("/api/stocks");
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Request failed");
          return;
        }

        setRows(data.rows || []);
      } catch (e) {
        setError(e.message || "Network error");
      }
    }

    loadStocks();
  }, []);
  return (
    <>
      <header className="app-header">
      <h1 className="app-title">StockDB</h1>
      </header>

      {error && <p style={{padding: 12, color: "red"}}>{error}</p>}
    
      {/* CARDS */}
      <div style={{ padding: 12 }}>
  {rows.map((s) => (
    <div
      key={s.id}
      style={{
        border: "1px solid #ccc",
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        backgroundColor: "#fafafa",
        maxWidth: 400,
      }}
    >
      <h2 style={{ margin: "0 0 8px" }}>{s.stockName}</h2>

      <p>Date: {new Date(s.date).toLocaleDateString()}</p>
      <p>Open: ${s.open.toFixed(2)}</p>
      <p>High: ${s.high.toFixed(2)}</p>
      <p>Low: ${s.low.toFixed(2)}</p>
      <p>Close: ${s.close.toFixed(2)}</p>
      <p>Volume: {s.volume.toLocaleString()}</p>
    </div>
  ))}
</div>
    </>
  )
}

