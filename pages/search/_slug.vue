<template>
    <v-sheet flat rounded="lg" class="pa-3">
        <loading v-if="$fetchState.pending" />
        <v-row
            justify="center"
            align-content="center"
            v-else-if="countries"
            no-gutters
        >
            <v-col
                v-for="(country, i) in countries"
                :key="i"
                :cols="cardsWidth"
            >
                <v-card flat>
                    <v-img height="250" :src="country.flag"></v-img>

                    <v-card-title v-text="country.name" />
                    <v-card-subtitle
                        v-text="'(' + country.alpha3Code + ')'"
                    ></v-card-subtitle>

                    <v-card-text>
                        <p><strong>Capital:</strong> {{ country.capital }}</p>
                        <p>
                            <strong>População:</strong>
                            {{ country.population }}
                        </p>
                        <p>
                            <strong>Moeda(s):</strong>
                            <span>{{
                                splitCurrencies(country.currencies)
                            }}</span>
                        </p>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <v-card-title>Línguas</v-card-title>

                    <v-card-text>
                        <v-chip-group column>
                            <v-chip
                                class="mr-2"
                                @click="loadLanguage(lang)"
                                v-for="(lang, langKey) in country.languages"
                                :key="langKey"
                            >
                                <v-icon left> mdi-brightness-5 </v-icon>
                                {{ lang.name }}
                            </v-chip>
                        </v-chip-group>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center" align-content="center" v-else>
            <v-col cols="12" sm="8" lg="6">
                <v-alert type="error">
                    Nenhum país encontrado para os parâmetros informados.
                </v-alert>
                <v-img src="../globe-search.svg" class="mt-10" />
            </v-col>
        </v-row>

        <v-dialog v-model="dialog" scrollable max-width="450px">
            <v-card>
                <v-card-title
                    >Países que também falam
                    {{
                        selectedLanguage && selectedLanguage.name
                            ? selectedLanguage.name
                            : ""
                    }}</v-card-title
                >
                <v-divider></v-divider>
                <v-card-text style="height: 350px">
                    <language-country-list
                        v-if="selectedLanguage"
                        :lang="selectedLanguage"
                        :key="selectedLanguage.name"
                    />
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer />
                    <v-btn text color="primary" @click="dialog = false">
                        OK
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-sheet>
</template>


<script>
import _ from "lodash";
import countryService from "~/services/countryService.js";
import LanguageCountryList from "~/components/LanguageCountryList.vue";

export default {
    middleware: "authenticated",
    components: { LanguageCountryList },
    data() {
        return {
            countries: null,
            dialog: false,
            selectedLanguage: null,
        };
    },
    /* Recebe um nome de país pelo parâmetro da URL e pesquisa na API */
    async fetch() {
        this.countries = await new countryService(this.$axios)
            .getCountriesByName(`${this.$route.params.slug}`)
            .then((res) => res.data);
    },
    methods: {
        /* Função para transformar em string todas as moedas de um país */
        splitCurrencies(array) {
            let currencies = _.map(array, "name");

            return _.join(currencies, ", ");
        },
        /* Função para exibir popup com os países que falam determinada língua */
        loadLanguage(lang) {
            this.selectedLanguage = lang;
            this.dialog = true;
        },
    },
    computed: {
        /* Se está exibindo apenas um país, o card ocupa o espaço inteiro */
        cardsWidth: function () {
            return this.countries.length > 1 ? "4" : "12";
        },
    },
};
</script>

