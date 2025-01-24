"use client"; 
// Declara que este componente será executado no cliente (React Client Component).

import { useState } from "react";
// Importa o hook useState do React para gerenciar estados no componente.

const HomePage = () => {
  // Define o componente funcional HomePage.d

  const [games, setGames] = useState([]);
  // Estado para armazenar a lista de jogos retornados pela API.

  const [searchQuery, setSearchQuery] = useState("");
  // Estado para armazenar a consulta de pesquisa inserida pelo usuário.

  const [error, setError] = useState(null);
  // Estado para armazenar mensagens de erro, caso ocorra algum problema na busca.

  const handleSearch = async () => {
    // Função assíncrona para buscar jogos na API RAWG.

    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${searchQuery}`
      );
      // Faz uma chamada à API RAWG com a chave de API e o termo de pesquisa.

      if (!response.ok) {
        throw new Error("Erro ao buscar jogos");
        // Caso a resposta da API não seja OK, lança um erro.
      }

      const data = await response.json();
      // Converte a resposta da API em JSON.

      setGames(data.results);
      // Atualiza o estado com os resultados retornados pela API.

      setError(null);
      // Reseta qualquer erro anterior.
    } catch (err) {
      setError(err.message);
      // Atualiza o estado de erro com a mensagem do erro capturado.
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Container principal da página com estilos aplicados via Tailwind CSS. */}

      <h1 className="text-2xl font-bold mb-4 text-center">LevelUp - Game Finder</h1>
      {/* Cabeçalho com o título da aplicação. */}

      <div className="flex gap-4 mb-4">
        {/* Div para agrupar o campo de entrada e o botão de pesquisa. */}

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          // Atualiza o estado de `searchQuery` com o valor digitado no campo.

          placeholder="Pesquisar Jogos..."
          // Texto exibido no campo de entrada antes de o usuário digitar.

          className="p-2 border rounded w-full"
          // Estilos aplicados ao campo de entrada usando Tailwind CSS.
        />

        <button
          onClick={handleSearch}
          // Chama a função handleSearch ao clicar no botão.

          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          // Estilos aplicados ao botão, incluindo transições para hover.
        >
          Pesquisar
        </button>
        {/* Botão para disparar a busca dos jogos. */}
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {/* Se houver um erro, exibe a mensagem de erro com estilos de texto vermelho. */}

      <div className="grid grid-cols-5 gap-4">
        {/* Div para exibir os resultados em uma grade com 5 colunas e espaçamento entre os itens. */}

        {games.map((game) => (
          // Mapeia a lista de jogos retornados pela API e cria um card para cada jogo.

          <div
            key={game.id}
            // Chave única para cada item da lista, baseada no ID do jogo.

            className="border p-2 rounded shadow-lg text-center bg-white flex flex-col"
            // Estilos aplicados a cada card do jogo.
          >
            <div className="h-40 overflow-hidden">
              {/* Div para conter a imagem do jogo com altura fixa e comportamento de overflow. */}

              <img
                src={game.background_image}
                // URL da imagem de fundo do jogo.

                alt={game.name}
                // Texto alternativo para a imagem (nome do jogo).

                className="w-full h-full object-cover rounded"
                // Estilos para a imagem, garantindo que ela ocupe todo o espaço disponível.
              />
            </div>

            <h2 className="text-lg font-semibold mt-2">{game.name}</h2>
            {/* Nome do jogo exibido abaixo da imagem, com estilo de texto maior e negrito. */}

            <p>Rating: {game.rating}</p>
            {/* Avaliação (rating) do jogo exibida como texto. */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
// Exporta o componente HomePage como padrão para ser usado em outras partes da aplicação.
