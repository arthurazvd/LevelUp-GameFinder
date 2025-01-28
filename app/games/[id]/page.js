"use client";

import { useState, useEffect } from "react";

const GameDetails = ({ params }) => {
  const { id } = params; // O ID do jogo vindo da URL
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

    fetchGameDetails();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {game && (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-64 object-cover rounded mb-6"
          />
          <h1 className="text-2xl font-bold mb-4">{game.name}</h1>
          <p><strong>Rating:</strong> {game.rating}</p>
          <p><strong>Data de Lançamento:</strong> {game.released}</p>
          <p className="mt-4">{game.description_raw}</p>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
