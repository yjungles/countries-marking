/**
 * Serviço para controle de token de autenticação
 */
const ID_TOKEN_KEY = "id_token";

//recupera token da local storage do navegador
export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

//salva token na local storage do navegador
export const saveToken = token => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

//apaga token da local storage do navegador
export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };
