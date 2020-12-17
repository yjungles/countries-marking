/**
 * STORE padrão para autenticação
 *
 * não utilizei namespace em arquivo store/auth.js
 * separado por ser uma store única no sistema
 */
import JwtService from "@/services/jwt.service";

import {
  CHECK_AUTH,
  LOGIN,
  LOGOUT,
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR
} from "~/constants/store.actions";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  errors(state) {
    return state.errors;
  },
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context, credentials) {
    this.$axios
      .$post("api/auth/login", credentials)
      .then(res => {
        context.commit(SET_AUTH, res.user);
        this.$router.push("/");
        this.$toast.success("Login efetuado com sucesso!");
      })
      .catch(error => {
        context.commit(SET_ERROR, error.response.data.errors);
      });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
    this.$router.push("/login");
    this.$toast.error("Você saiu do sistema.");
  },
  [CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      this.$axios.setHeader();
      this.$axios
        .$get("api/auth/user")
        .then(data => {
          context.commit(SET_AUTH, data.user);
        })
        .catch(error => {
          context.commit(SET_ERROR, error.response.data.errors);
        });
    } else {
      context.commit(PURGE_AUTH);
      this.$router.push("/login");
      this.$toast.info("Autenticação necessária, faça login na sua conta!");
    }
  },
  nuxtServerInit({ commit }) {
    commit(CHECK_AUTH);
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(state.user.token);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = null;
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
