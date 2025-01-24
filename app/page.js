"use client";

import { useState, useEffect } from "react";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Função para buscar jogos
  const fetchGames = async (query, newPage) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${query}&page=${newPage}&page_size=10`
      );
      if (!response.ok) throw new Error("Erro ao buscar jogos");

      const data = await response.json();
      const newResults = newPage === 1 ? data.results : [...games, ...data.results];

      setGames(newResults);
      setError(null);
      setPage(newPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Carrega os jogos mais bem ranqueados ao iniciar o app
  useEffect(() => {
    fetchGames("", 1); // Busca sem um termo de pesquisa para retornar os jogos mais bem ranqueados
  }, []);

  const handleSearch = () => {
    if (!searchQuery) {
      setError("Por favor, insira um termo de pesquisa.");
      return;
    }
    fetchGames(searchQuery, 1); // Faz a busca com o termo digitado
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const loadMore = () => {
    fetchGames(searchQuery, page + 1); // Carrega a próxima página com o termo atual
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">LevelUp - Game Finder</h1>
      <div className="flex gap-4 mb-4">
        {/* Campo de pesquisa */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Pesquisar Jogos..."
          className="p-2 border rounded w-full"
        />
        {/* Botão de pesquisa */}
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Pesquisar
        </button>
      </div>
      {/* Mensagem de erro */}
      {error && <div className="text-red-500 text-center my-4">{error}</div>}
      {/* Indicador de carregamento */}
      {loading && <div className="text-center my-4">Carregando...</div>}
      {/* Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="border p-2 rounded text-center bg-white flex flex-col"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <h2 className="text-lg font-semibold mt-2">{game.name}</h2>
            <p>Rating: {game.rating}</p>
            <p>Data de Lançamento: {game.released || "N/A"}</p>
          </div>
        ))}
      </div>
      {/* Botão de carregar mais */}
      {games.length > 0 && !loading && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Carregar Mais
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
