/**
 * Serviço de Servidor fake para simular requisições de backend
 */

import { createServer, Model, Response } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model
    },

    seeds(server) {
      //cria um usuário aleatório
      server.create("user", {
        gender: "male",
        name: {
          first: "Ben",
          last: "Alexander"
        },
        location: {
          street: {
            number: 854,
            name: "Avenida Brasil "
          },
          city: "Curitiba",
          state: "Paraná",
          country: "Brazil",
          postcode: 39650080
        },
        token: "90709fcb0ecde32ca17c8ec873986c0ff3bcff8579e15cec4dqqqqqqqqqqqq",
        login: {
          uuid: "14910995-8192-40a0-829b-de8ab2f04cb1",
          email: "admin@admin.com",
          username: "orangeostrich868"
        },
        picture: {
          large: "https://randomuser.me/api/portraits/men/68.jpg",
          medium: "https://randomuser.me/api/portraits/med/men/68.jpg",
          thumbnail: "https://randomuser.me/api/portraits/thumb/men/68.jpg"
        },
        nat: "BR"
      });
    },

    //ENDPOINTS
    routes() {
      // coloca /api antes de todas as endpoints
      this.namespace = "api";

      //rota de login
      this.post("/auth/login", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        /**
         * simula uma autenticação backend onde verificaria os
         * dados de usuário e retornaria uma chave para a API
         */
        if (attrs.email == "admin@admin.com" && attrs.password == "123456") {
          return schema.users.find(1);
        }

        return new Response(401, {}, { errors: ["Credenciais inválidas"] });
      });

      //rota de logout
      this.post("/auth/logout", (schema, request) => {
        return new Response(204);
      });

      //recupera um usuário
      this.get("/auth/user", schema => {
        return schema.users.first();
      });

      //recupera todos os usuários
      this.get("/users", schema => {
        return schema.users.all();
      });

      //URLS onde as requests não serão interceptadas pelo server fake
      this.passthrough("https://api.nuxtjs.dev/**");
      this.passthrough("https://restcountries.eu/**");
    }
  });

  return server;
}
