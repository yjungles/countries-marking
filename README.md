# Find Countries
> Uma pequena aplicação web que seja capaz de obter uma lista de dados de uma API pública com dados de países ( https://restcountries.eu/ ) e mostrá-los em tela.

## Objetivos
- A aplicação deve ter o próprio sistema de autenticação, necessitando de usuário e senha para ser acessada.
- Uma lista apenas com o nome de cada país da América e a capital do mesmo. Ao clicar em um país, deverá abrir uma aba com o Google Maps centralizado no país em questão;
- Uma função de busca por país. O usuário deve poder digitar o nome de um país em um campo de texto, e a aplicação deve conseguir encontrar o país em questão ou qualquer país de nome similar, mostrando em tela seu nome correto e quais são seus idiomas oficiais;
- Ao clicar em um dos idiomas na tela, a aplicação deve listar os nomes de todos os países que possuem o idioma em comum;
- A aplicação precisa de uma página onde é disponibilizado um gráfico mostrando a área e população de cada país de uma região geográfica, para fins de comparação.

## Funcionalidades Implementadas
- 🔐 Login e Autenticação
- 🌎 Listagem de países por determinada região
- 🗺 Exibição de países selecionados em um mapa
- 🔍 Pesquisa de países pelo nome
- 💬 Exibição de países que falam a mesma língua
- 📊 Gráfico da área e população dos países de determinada região

#### Funcionalidades extras
- ✔ Autocomplete
- 🌗 Tema claro/escuro

## Instruções

```bash
# instalar dependencias
npm install

# rodar servidor na porta localhost:3000
npm run dev

```
## Configurações
Altere o arquivo ```nuxt.config.js``` inserindo sua chave de API Google para a utilização da API Google maps 

## Informações de login
#### Email 
```c
admin@admin.com
```
##### Senha 
```c
123456
```

## Tecnologias Utilizadas

- Axios 
- ApexCharts
- Lodash
- Nuxt
- Google Maps API
- Vuetify
- MirageJS

## Outras informações

A barra de pesquisa de países possui dois modos de funcionamento:
- Pelo termo ou nome parcial - digitando o termo e em seguida clicando no ícone de lupa do campo.
- Pelo nome exato - digitando o termo e o campo auto completa, exibindo a bandeira junto com o nome do país

> Exemplo (1): digitando o termo "bra" e clicando na lupa serão exibidos em lista os países "Brazil e Gibraltar".

> Exemplo (2): digitando o termo "bra" e clicando sobre o item e bandeira "Brazil", será exibido apenas o país "Brazil" detalhadamente.
