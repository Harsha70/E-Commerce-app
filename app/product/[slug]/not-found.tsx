"use client";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "2rem",
        margin: "2rem auto",
        maxWidth: "480px",
      }}
    >
      <svg
        width="64"
        height="64"
        fill="none"
        viewBox="0 0 24 24"
        style={{ marginBottom: "1rem" }}
      >
        <circle cx="12" cy="12" r="10" fill="#e2e8f0" />
        <path
          d="M9 9h6M9 13h6"
          stroke="#64748b"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="9" stroke="#94a3b8" strokeWidth="2" />
      </svg>
      <h1
        style={{
          color: "#334155",
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "0.5rem",
        }}
      >
        Product Not Found
      </h1>
      <p
        style={{
          color: "#64748b",
          fontSize: "1.1rem",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        We couldn&apos;t find the product you&apos;re looking for.
        <br />
        Please check the URL or explore our catalog.
      </p>
      <a
        href="/products"
        style={{
          display: "inline-block",
          background: "#2563eb",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
          transition: "background 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#1d4ed8")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#2563eb")}
      >
        Back to Products
      </a>
    </div>
  );
}
