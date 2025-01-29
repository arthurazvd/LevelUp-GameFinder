# LevelUp Game Finder 🎮

Um aplicativo simples para buscar informações sobre jogos, utilizando a [RAWG Video Games Database API](https://rawg.io/apidocs). Este projeto é desenvolvido com **Next.js** e **Tailwind CSS**.

## Funcionalidades 🚀
- **Pesquisar jogos** por nome.
- Exibir **informações básicas** sobre cada jogo:
  - Nome
  - Imagem
  - Avaliação
  - Lançamento
  - Desenvolvedor
  - Gênero
  - Plataformas

## Tecnologias Utilizadas 🛠️
- **Next.js**: Framework React para **Server-Side Rendering (SSR)** e **Static Site Generation (SSG)**.
- **Tailwind CSS**: Framework para estilização rápida e responsiva.
- **RAWG API**: Fonte de dados sobre jogos.
- **JavaScript**: Linguagem de programação.

---

## Como Configurar o Projeto 💻

### 1. Clonar o Repositório
Clone este repositório para sua máquina local com o seguinte comando:

```bash
git clone https://github.com/arthurazvd/levelup-gamefinder.git
cd levelup-gamefinder
````
### 2. Instalar as Dependências
Certifique-se de ter o Node.js instalado em sua máquina. Caso não tenha, você pode baixá-lo em nodejs.org.

Depois de clonar o repositório, instale as dependências do projeto com o seguinte comando:

```bash
npm install
```
Ou, caso prefira usar o Yarn:

```bash
yarn install
```
### 3. Configurar a Chave da API (RAWG)
A API da RAWG exige uma API Key para acessar os dados dos jogos. Siga os passos abaixo para obter e configurar a chave no seu projeto:

Criar uma Conta no RAWG:

Acesse o RAWG API Docs e clique em Sign Up (ou faça login, se já tiver uma conta).
Obter a API Key:

Após o login, vá até a seção API Key no painel de usuário e copie a chave gerada. Ela será algo como: 1234567890abcdef.
Adicionar a Chave ao Projeto:

Crie um arquivo .env.local na raiz do seu projeto, se ele ainda não existir:
```bash
touch .env.local
```
No arquivo .env.local, adicione a seguinte linha, substituindo SUA_API_KEY pela chave copiada:
env
```env
NEXT_PUBLIC_RAWG_API_KEY=SUA_API_KEY
````
Nota: O arquivo .env.local é ignorado pelo controle de versão (via .gitignore), garantindo que a chave da API não seja exposta publicamente.

4. Rodar o Servidor de Desenvolvimento
Após configurar a chave da API, inicie o servidor de desenvolvimento com o comando:

```bash
npm run dev
```
Ou, se estiver utilizando o Yarn:

```bash
yarn dev
```
O aplicativo estará disponível em http://localhost:3000.

Observações 📋
Atualmente, o aplicativo exibe apenas o nome, a imagem e a avaliação dos jogos. Mais informações, como desenvolvedor, data de lançamento e gênero, já estão implementadas e podem ser visualizadas, mas outras informações podem ser adicionadas conforme necessário no futuro.

Comandos Comuns
Instalar dependências:

```bash
npm install
```
Rodar servidor em modo desenvolvimento:

```bash
npm run dev
```
Criar build para produção:

```bash
npm run build
```
Iniciar servidor de produção (após build):

```bash
npm start
```
Contribuindo 🤝
Se você deseja contribuir para o projeto, sinta-se à vontade para fazer um fork do repositório, criar uma branch e enviar um pull request. Ficarei feliz em revisar e integrar melhorias!

Licença 📜
Este projeto está licenciado sob a MIT License.
