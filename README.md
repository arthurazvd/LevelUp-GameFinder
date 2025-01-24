# LevelUp Game Finder 🎮

Um aplicativo simples para buscar informações sobre jogos, utilizando a [RAWG Video Games Database API](https://rawg.io/apidocs). Este projeto é desenvolvido com **Next.js** e **Tailwind CSS**.

## Funcionalidades 🚀
- Pesquisar jogos por nome.
- Exibir informações básicas, como:
  - Nome
  - Imagem
  - Avaliação (Rating)

## Tecnologias Utilizadas 🛠️
- **Next.js** - Framework React para SSR e SSG.
- **Tailwind CSS** - Para estilização rápida e responsiva.
- **RAWG API** - Fonte de dados sobre jogos.
- **JavaScript** - Linguagem de programação.

---

## Como Configurar o Projeto 💻

### 1. Clonar o Repositório
Clone este repositório para sua máquina local:
```bash
git clone https://github.com/seu-usuario/rawg-game-finder.git
cd rawg-game-finder

### 2. Instalar Dependências
Certifique-se de ter o Node.js instalado. Depois, instale as dependências do projeto:

bash
Copiar
Editar
npm install
### 3. Configurar a Chave da API (RAWG)
A API da RAWG exige uma API Key para buscar dados. Siga os passos abaixo para obter a chave e configurá-la no projeto:

Passo 1: Criar uma conta no RAWG
Acesse RAWG API Docs.
Clique em Sign Up (ou faça login, se já tiver uma conta).
Após o login, navegue até a seção API Key no painel do usuário.
Passo 2: Obter a API Key
Copie a chave gerada (ela será algo como 1234567890abcdef).
Passo 3: Adicionar a Chave ao Projeto
Crie um arquivo .env.local na raiz do projeto, se ele não existir:
bash
Copiar
Editar
touch .env.local
Adicione a seguinte linha ao arquivo, substituindo SUA_API_KEY pela chave copiada:
env
Copiar
Editar
NEXT_PUBLIC_RAWG_API_KEY=SUA_API_KEY
Nota: O arquivo .env.local é ignorado pelo controle de versão (git), garantindo que a chave da API não seja exposta.

### 4. Rodar o Servidor de Desenvolvimento
Após configurar a chave da API, inicie o servidor de desenvolvimento:

bash
Copiar
Editar
npm run dev
O aplicativo estará disponível em http://localhost:3000.

Estrutura de Pastas 🗂️
plaintext
Copiar
Editar
rawg-game-finder/
├── app/
│   ├── globals.css         # Estilos globais (Tailwind CSS)
│   ├── layout.js           # Layout do aplicativo
│   └── page.js             # Página principal
├── public/                 # Arquivos públicos
├── .env.local              # Chave da API (não incluída no controle de versão)
├── tailwind.config.cjs     # Configuração do Tailwind CSS
├── next.config.mjs         # Configuração do Next.js
├── package.json            # Dependências do projeto
└── README.md               # Este arquivo
Observação 📋
Atualmente, o aplicativo exibe apenas o nome, imagem e avaliação dos jogos. Outras informações podem ser adicionadas conforme necessário no futuro.

