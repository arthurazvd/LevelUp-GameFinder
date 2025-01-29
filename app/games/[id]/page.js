"use client";

import { useState, useEffect } from "react";
import { use } from "react"; // Adicione a importação de React.use()

const genreTranslations = {
  action: "Ação",
  adventure: "Aventura",
  rpg: "RPG",
  shooter: "Tiro",
  sports: "Esportes",
  strategy: "Estratégia",
  fighting: "Luta",
  racing: "Corrida",
  indie: "Indie",
  puzzle: "Quebra-cabeça",
  platformer: "Plataforma",
  simulation: "Simulação",
  arcade: "Arcade",
  board_games: "Jogos de Tabuleiro",
  family: "Família",
  educational: "Educacional",
  music: "Música",
  party: "Festa",
  card: "Cartas",
};

const GameDetails = ({ params }) => {
  // Use o React.use() para descompactar o 'params'
  const { id } = use(params); // Agora o 'id' pode ser acessado corretamente

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
        );

        if (!response.ok) throw new Error("Erro ao buscar detalhes do jogo");

        const data = await response.json();
        setGame(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGameDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-solid" style={{ borderColor: 'var(--primary-color) transparent' }}></div>
      </div>
    );
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      {game && (
        <div className="flex justify-between items-center h-full">
          {/* Informações do jogo */}
          <div className="relative z-10 text-left md:w-1/2 sm:w-full p-6">
            <p className="text-white mt-4"><strong>Descrição: </strong>{game.description_raw}</p>
          </div>

          {/* Imagem do jogo */}
          <div className="relative z-10 md:w-1/2 hidden sm:block p-6">
            <h1 className="text-2xl font-bold mb-4 text-white">{game.name}</h1>
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <p className="text-white mt-4"><strong>Avaliação: </strong> {game.rating || "N/A"}</p>
            <p className="text-white"><strong>Lançamento: </strong> {game.released || "N/A"}</p>
            <p className="text-white"><strong>Desenvolvedor: </strong> {game.developers.map(dev => dev.name).join(', ') || "N/A"}</p>
            <p className="text-white"><strong>Gênero: </strong> {game.genres.map(genre => genreTranslations[genre.slug] || genre.name).join(', ') || "N/A"}</p>
            <p className="text-white"><strong>Plataformas: </strong> {game.platforms.map(platform => platform.platform.name).join(', ') || "N/A"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
