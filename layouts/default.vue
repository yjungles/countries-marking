<template>
    <v-app dark>
        <v-navigation-drawer v-model="drawer" app temporary>
            <v-list color="grey lighten-4">
                <v-list-item>
                    <SearchField />
                </v-list-item>
            </v-list>

            <v-list >
                <v-list-item-group color="primary">
                    <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        :to="item.to"
                        router
                        exact
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" />
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar fixed app flat>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
                v-show="$vuetify.breakpoint.smAndDown"
            />
            <v-container class="py-0 fill-height container-1200">
                <span @click="$router.push('/')" class="d-flex pointer">
                    <MarkerLogo />
                    <v-toolbar-title class="ml-2 font-weight-bold">
                        {{ title }} <span class="primary--text small">:)</span>
                    </v-toolbar-title>
                </span>
                <v-spacer />
                <SearchField  v-show="$vuetify.breakpoint.mdAndUp"/>
                <v-spacer />
                <div class="text-center">
                    <v-menu
                        :close-on-content-click="false"
                        :nudge-width="200"
                        offset-x
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-avatar
                                v-bind="attrs"
                                v-on="on"
                                size="36"
                                class="bordered"
                            >
                                <img src="/male-avatar.svg" alt="John" />
                            </v-avatar>
                        </template>

                        <v-card>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-avatar>
                                        <img
                                            src="/male-avatar.svg"
                                            alt="John"
                                        />
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title
                                            >John Leider</v-list-item-title
                                        >
                                        <v-list-item-subtitle
                                            >Founder of
                                            Vuetify</v-list-item-subtitle
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>

                            <v-divider></v-divider>

                            <v-list>
                                <v-list-item>
                                    <v-list-item-avatar>
                                        <v-icon left>mdi-brightness-4</v-icon>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title
                                            >Modo noturno</v-list-item-title
                                        >
                                    </v-list-item-content>

                                    <v-list-item-action>
                                        <v-switch
                                            v-model="$vuetify.theme.dark"
                                            color="primary"
                                        ></v-switch>
                                    </v-list-item-action>
                                </v-list-item>
                                <v-list-item @click="logout()">
                                    <v-list-item-avatar>
                                        <v-icon left>mdi-logout-variant</v-icon>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title
                                            >Sair</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>
                </div>
            </v-container>
        </v-app-bar>
        <v-main>
            <v-container>
                <v-row>
                    <v-col cols="3" v-show="$vuetify.breakpoint.mdAndUp">
                        <v-card  flat rounded="lg">
                            <v-list nav dense>
                                <v-list-item-group color="primary">
                                    <v-list-item
                                        v-for="(item, i) in items"
                                        :key="i"
                                        :to="item.to"
                                        router
                                        exact
                                    >
                                        <v-list-item-action>
                                            <v-icon>{{ item.icon }}</v-icon>
                                        </v-list-item-action>
                                        <v-list-item-content>
                                            <v-list-item-title
                                                v-text="item.title"
                                            />
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="9">
                        <v-alert
                            v-if="errors && errors.length > 0"
                            type="error"
                        >
                            <ul>
                                <li v-for="(v, k) in errors" :key="k">
                                    {{ v }}
                                </li>
                            </ul>
                        </v-alert>
                        <nuxt />
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

        <Footer />
    </v-app>
</template>
<style scoped>
.pointer {
    cursor: pointer;
}
</style>
<script>
import { mapState } from "vuex";
import { LOGOUT } from "~/constants/store.actions";
export default {
    data() {
        return {
            drawer: false,
            items: [
                {
                    icon: "mdi-earth",
                    title: "Países",
                    to: "/",
                },
                // {
                //     icon: "mdi-magnify",
                //     title: "Pesquisa",
                //     to: "search",
                // },
                {
                    icon: "mdi-chart-bar",
                    title: "Gráficos",
                    to: "/charts",
                },
            ],
            title: "Find Countries",
        };
    },
    computed: {
        ...mapState({
            errors: (state) => state.errors,
        }),
    },
    methods: {
        async logout() {
            await this.$store.dispatch(LOGOUT, this.login);
        },
    },
};
</script>
