"use client"; 
import { useState, useEffect } from "react";
import Link from "next/link";

// Dicionário de tradução dos gêneros
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

const HomePage = () => {
  const [games, setGames] = useState([]); // Estado para armazenar os jogos
  const [searchQuery, setSearchQuery] = useState(""); // Estado para armazenar o termo de pesquisa
  const [genre, setGenre] = useState(""); // Estado para o gênero selecionado
  const [genres, setGenres] = useState([]); // Estado para armazenar os gêneros disponíveis
  const [error, setError] = useState(null); // Estado para armazenar erros
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const [page, setPage] = useState(1); // Estado para controlar a página de jogos

  // Função para buscar os gêneros disponíveis
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/genres?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
      );
      if (!response.ok) throw new Error("Erro ao buscar gêneros");
      const data = await response.json();
      setGenres(data.results); // Armazena os gêneros disponíveis no estado
    } catch (err) {
      setError(err.message); // Define o erro no estado
    }
  };

  // Função para buscar os jogos com base no termo de pesquisa e gênero
  const fetchGames = async (query = "", newPage = 1, selectedGenre = "") => {
    setLoading(true); // Inicia o carregamento
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${query}&page=${newPage}&page_size=20${selectedGenre ? `&genres=${selectedGenre}` : ""}`
      );
      if (!response.ok) throw new Error("Erro ao buscar jogos");

      const data = await response.json();
      const newResults = newPage === 1 ? data.results : [...games, ...data.results];
      setGames(newResults); // Armazena os jogos no estado
      setError(null); // Limpa o erro, se houver
      setPage(newPage); // Atualiza a página
    } catch (err) {
      setError(err.message); // Define o erro no estado
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Carrega os jogos e gêneros ao abrir a página
  useEffect(() => {
    fetchGames(); // Busca jogos iniciais
    fetchGenres(); // Busca gêneros
  }, []);

  // Função para realizar a pesquisa
  const handleSearch = () => {
    if (!searchQuery) {
      setError("Por favor, insira um termo de pesquisa."); // Mensagem de erro caso o campo de pesquisa esteja vazio
      return;
    }
    fetchGames(searchQuery, 1, genre); // Busca os jogos com base no termo de pesquisa
  };

  // Função para tratar a tecla Enter na pesquisa
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Previne o comportamento padrão
      handleSearch(); // Realiza a pesquisa
    }
  };

  // Função para alterar o gênero e atualizar a lista de jogos
  const handleGenreChange = (selectedGenre) => {
    setGenre(selectedGenre); // Atualiza o gênero selecionado
    fetchGames(searchQuery, 1, selectedGenre); // Atualiza os jogos com base no novo gênero
  };

  // Função para carregar mais jogos ao clicar no botão
  const loadMore = () => {
    fetchGames(searchQuery, page + 1, genre); // Carrega mais jogos
  };

  return (
    <div className="relative min-h-screen px-4 sm:px-6 lg:px-8 mt-6">
      {/* Loader centralizado */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-solid" style={{ borderColor: 'var(--primary-color) transparent' }}></div>
        </div>
      )}

      {/* Barra de Pesquisa e Filtro */}
      <div className="flex gap-4 mb-8 sm:flex-row">
        {/* Barra de Pesquisa */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Pesquisar Jogos..."
          className="w-full sm:w-5/6" // 4/5 da largura
        />

        {/* Filtro de Gênero */}
        <div className="w-full sm:w-1/6">
          <select
            id="genre"
            className="p-2 border rounded w-full"
            value={genre}
            onChange={(e) => handleGenreChange(e.target.value)}
          >
            <option value="">Todos</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genreTranslations[genre.slug] || genre.name} {/* Exibe o nome traduzido ou original do gênero */}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mensagem de erro */}
      {error && <div className="text-red-500 text-center my-4">{error}</div>}

      {/* Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {games
          .filter(game => game.rating && game.released) // Filtra jogos sem avaliação e sem data de lançamento
          .map((game) => (
            <Link href={`/games/${game.id}`} key={game.id}>
              <div
                className="p-4 rounded text-center flex flex-col cursor-pointer hover:shadow-md transition"
                style={{ backgroundColor: 'var(--bg-color2)', height: '20rem' }}
              >
                <div className="flex-shrink-0 h-40 overflow-hidden">
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-center items-center text-center">
                  <h2 className="text-lg font-semibold mt-2">{game.name}</h2>
                  <p>Avaliação: {game.rating}</p>
                  <p>Lançamento: {game.released || "N/A"}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>

      {/* Botão de carregar mais */}
      {games.length > 0 && (
        <div className="text-center mt-8 mb-8">
          <button
            onClick={loadMore}
            className="padrao-btn"
          >
            Carregar Mais
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
