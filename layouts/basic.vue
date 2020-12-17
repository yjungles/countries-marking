<template>
    <v-app dark>
        <v-app-bar fixed app flat>
            <v-spacer />
            <MarkerLogo />
            <v-toolbar-title class="ml-2 font-weight-bold">
                {{ title }} <span class="primary--text small">:)</span>
            </v-toolbar-title>
            <v-spacer />
        </v-app-bar>
        <v-main>
            <v-container>
                <v-row
                    class="fill-height"
                    align-content="center"
                    justify="center"
                >
                    <v-col cols="12" sm="6" lg="4">
                        <v-card flat class="pa-10" rounded="lg">
                            <v-alert v-if="errors && errors.length>0" type="error">
                                <ul>
                                    <li v-for="(v, k) in errors" :key="k">
                                        {{ v }}
                                    </li>
                                </ul>
                            </v-alert>
                            <nuxt />
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <Footer />
    </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            title: "Find countries",
        };
    },
    computed: {
        ...mapState({
            errors: (state) => state.errors,
        }),
    },
};
</script>
