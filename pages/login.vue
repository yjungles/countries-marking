<template>
    <div>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="userLogin"
        >
            <v-text-field
                v-model="login.email"
                :rules="rules.emailRules"
                label="E-mail"
                required
            ></v-text-field>

            <v-text-field
                v-model="login.password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="showPass ? 'text' : 'password'"
                label="Senha"
                @click:append="showPass = !showPass"
            ></v-text-field>

            <v-btn type="submit" color="primary" :disabled="!valid"
                >Entrar</v-btn
            >
        </v-form>
    </div>
</template>
<script>
import { LOGIN } from "~/constants/store.actions";

export default {
    middleware: "notAuthenticated",

    layout: "basic",

    data() {
        return {
            /* formulário */
            login: {
                email: "",
                password: "",
            },

            /* exibir senha */
            showPass: false,

            /* validações */
            rules: {
                required: (value) => !!value || "Campo obrigatório",
                min: (v) => v.length >= 6 || "Mínimo de 6 caracteres",
                emailRules: [
                    (v) => !!v || "O E-mail é obrigatório",
                    (v) => /.+@.+\..+/.test(v) || "O E-mail precisa ser válido",
                ],
            },
            valid: true,
        };
    },

    methods: {
        /* valida o formulário e faz tentativa de login */
        async userLogin() {
            if (this.$refs.form.validate()) {
                await this.$store.dispatch(LOGIN, this.login);
            }
        },
    },
};
</script>
