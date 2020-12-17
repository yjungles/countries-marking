/**
 * Middleware para páginas que, como no login,
 * se o usuário já está logado não há necessidade de logar novamente
 */

import JwtService from "@/services/jwt.service";
export default function({ store, redirect }) {
  // Já está logado, vai para a home
  if (!!JwtService.getToken()) {
    return redirect("/");
  }
}
