import { useState } from "react";
import ApiSuperHero from "../services/ApiSuperHero";

export default function Home() {
  const [search, setSearch] = useState("");
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const name = search.trim();
    if (!name) return;

    try {
      setLoading(true);
      setError(null);
      setHeroes([]);

      const results = await ApiSuperHero.searchByName(name);

      if (results.length === 0) {
        setError("Nenhum herói encontrado");
      } else {
        setHeroes(results);
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar heróis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🕸️Super-Heróis</h1>

      {/* Input de busca */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Digite o nome do herói"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Buscar
        </button>
      </div>

      {/* Feedback */}
      {loading && <p style={styles.loading}>Carregando heróis...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {/* Lista de heróis */}
      <div style={styles.grid}>
        {heroes.map((hero) => (
          <div key={hero.id} style={styles.card}>
            <div style={styles.imageContainer}>
              <img
                src={hero.image?.url}
                alt={hero.name}
                style={styles.image}
              />
            </div>
            <h2 style={styles.name}>{hero.name}</h2>
            <div style={styles.stats}>
              <p><strong>Inteligência:</strong> {hero.powerstats?.intelligence}</p>
              <p><strong>Força:</strong> {hero.powerstats?.strength}</p>
              <p><strong>Velocidade:</strong> {hero.powerstats?.speed}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "2.5rem",
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textAlign: "center",
    marginBottom: "2rem",
    fontWeight: "bold",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
    marginBottom: "2rem",
  },
  input: {
    padding: "0.7rem 1rem",
    fontSize: "1rem",
    width: "300px",
    borderRadius: "10px",
    border: "1px solid #334155",
    outline: "none",
    backgroundColor: "#1e293b",
    color: "#e2e8f0",
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
    transition: "0.3s",
  },
  button: {
    padding: "0.7rem 1.2rem",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
    transition: "0.3s",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2rem",
    width: "100%",
    maxWidth: "1200px",
    justifyItems: "center",
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
    textAlign: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
    border: "1px solid #334155",
    width: "100%",
    maxWidth: "400px",
  },
  imageContainer: {
    overflow: "hidden",
    height: "250px",
    backgroundColor: "#0f172a",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    transition: "transform 0.3s",
  },
  name: {
    margin: "0.8rem 0 0.5rem",
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#f1f5f9",
  },
  stats: {
    padding: "0 1rem 1rem",
    fontSize: "0.95rem",
    color: "#cbd5e1",
    lineHeight: "1.5",
  },
  loading: {
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "1.1rem",
    color: "#3b82f6",
    fontWeight: "500",
  },
  error: {
    textAlign: "center",
    marginTop: "1rem",
    fontSize: "1.1rem",
    color: "#ef4444",
    fontWeight: "500",
  },
};