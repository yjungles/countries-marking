/**
 * Middleware para páginas onde é necessária a autenticação
 */

import { CHECK_AUTH } from "~/constants/store.actions";

export default function({ store }) {
  //verifica a autenticação
  store.dispatch(CHECK_AUTH);
}
