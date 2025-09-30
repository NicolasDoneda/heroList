import React, { useEffect, useState } from "react";

const API_KEY = "fabaedea9453c95dc5080c8e557efa1a";
const API_BASE_URL = `https://superheroapi.com/api/${API_KEY}`;

export default function SuperHeroList() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const heroPromises = [];
        
        // Busca os primeiros 20 heróis
        for (let id = 1; id <= 20; id++) {
          heroPromises.push(
            fetch(`${API_BASE_URL}/${id}`)
              .then((res) => res.json())
              .catch(() => null)
          );
        }

        const heroesData = await Promise.all(heroPromises);
        
        // Filtra heróis que foram encontrados com sucesso
        const validHeroes = heroesData.filter(
          (hero) => hero && hero.response === "success"
        );
        
        if (validHeroes.length === 0) {
          setError("Não foi possível carregar os heróis");
        } else {
          setHeroes(validHeroes);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar heróis:", err);
        setError("Erro ao carregar heróis");
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  if (loading) {
    return <div className="loading">Carregando super heróis...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="superhero-list">
      {heroes.map((hero) => (
        <div key={hero.id} className="superhero-card">
          <img
            src={hero.image.url}
            alt={hero.name}
            className="superhero-image"
          />
          <h3 className="superhero-name">{hero.name}</h3>
          <p className="superhero-fullname">
            {hero.biography["full-name"] || "Nome desconhecido"}
          </p>
        </div>
      ))}
    </div>
  );
}