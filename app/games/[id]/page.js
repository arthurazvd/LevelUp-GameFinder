import { notFound } from 'next/navigation';

// Gera os parâmetros estáticos para as rotas dinâmicas
export async function generateStaticParams() {
  const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page_size=10`);
  const data = await response.json();

  return data.results.map((game) => ({
    id: game.id.toString(), // Converte o ID do jogo para string
  }));
}

export default async function GameDetailsPage({ params }) {
  const { id } = params;
  
  // Faz a requisição para obter os detalhes do jogo
  const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`);
  const game = await response.json();

  if (!game) {
    notFound(); // Retorna erro 404 se o jogo não for encontrado
  }

  return (
    <div className="flex justify-between items-center h-full">
      {/* Renderiza os detalhes do jogo */}
      <div className="relative z-10 text-left md:w-1/2 sm:w-full p-6">
        <p className="text-white mt-4"><strong>Descrição: </strong>{game.description_raw}</p>
      </div>

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
        <p className="text-white"><strong>Gênero: </strong> {game.genres.map(genre => genre.name).join(', ') || "N/A"}</p>
        
        {/* Renderiza as plataformas do jogo */}
        <p className="text-white">
          <strong>Plataformas: </strong> 
          {game.platforms ? game.platforms.map(platform => platform.platform.name).join(', ') : "N/A"}
        </p>
      </div>
    </div>
  );
}
