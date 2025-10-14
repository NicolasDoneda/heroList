// src/services/ApiSuperHero.js

const ACCESS_TOKEN = "fabaedea9453c95dc5080c8e557efa1a";
const BASE_URL = `https://www.superheroapi.com/api.php/${ACCESS_TOKEN}`;

/**
 * 🔹 Busca heróis pelo nome
 */
async function searchByName(name) {
  const res = await fetch(`${BASE_URL}/search/${name}`);
  if (!res.ok) throw new Error("Erro ao buscar herói por nome");
  
  const data = await res.json();
  if (data.response === "success") {
    return data.results;
  } else {
    return [];
  }
}

export default { searchByName };