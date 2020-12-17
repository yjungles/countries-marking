<template>
    <div>
        <v-card flat rounded="lg">
            <v-card-text>
                <v-row align="center" >
                    <v-col class="d-flex" cols="12" sm="8" lg="6">
                        <v-select
                            v-model="selectedRegion"
                            :items="this.regions"
                            prepend-icon="mdi-map-search-outline"
                            menu-props="auto"
                            label="Selecione uma região"
                            outlined
                            @input="$fetch"
                        ></v-select>
                    </v-col>
                </v-row>
                <loading v-if="$fetchState.pending" />

                <v-alert prominent type="error" v-else-if="$fetchState.error">
                    <v-row align="center">
                        <v-col class="grow">
                            Não foi possível carregar os países
                        </v-col>
                        <v-col class="shrink">
                            <v-btn @click="$fetch">
                                <v-icon left>mdi-refresh</v-icon>

                                Tentar novamente</v-btn
                            >
                        </v-col>
                    </v-row>
                </v-alert>
                <div v-else>
                    <v-list>
                        <v-list-item-group color="primary">
                            <v-list-item
                                v-for="(country, i) in countries"
                                :key="i"
                                @click="showMap(country)"
                            >
                                <v-list-item-avatar>
                                    <v-avatar>
                                        <v-img :src="country.flag"></v-img>
                                    </v-avatar>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title
                                        v-text="country.name"
                                    ></v-list-item-title>

                                    <v-list-item-subtitle
                                        v-text="country.capital"
                                    ></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-btn
                                        small
                                        depressed
                                        @click="showMap(country)"
                                    >
                                        <v-icon left>mdi-map-search</v-icon>
                                        ver no mapa
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </div>
            </v-card-text>
        </v-card>
        <v-dialog v-model="dialog" width="500">
            <google-maps :location.sync="selectedLocation" :key="countryCode" />
        </v-dialog>
    </div>
</template>
<script>
import { ALLREGIONS } from "~/constants/regions";
import countryService from "~/services/countryService.js";
import GoogleMaps from "~/components/GoogleMaps.vue";

export default {
    middleware: "authenticated",
    components: { GoogleMaps },
    data() {
        return {
            countries: [],

            /* América é a região padrão para esta tela */
            selectedRegion: "Americas",

            dialog: false,
            selectedLocation: { lat: 0, lng: 0 },
            countryCode: 0,
        };
    },
    computed: {
        regions() {
            return ALLREGIONS;
        },
    },
    /* Busca todos os países de determinada região selecionada */
    async fetch() {
        this.countries = await new countryService(this.$axios)
            .getCountriesByRegion(this.selectedRegion)
            .then((res) => res.data);
    },
    methods: {
        /* Exibe janela com o mapa centralizado do país clicado */
        showMap(country) {
            this.selectedLocation = {
                lat: country.latlng[0],
                lng: country.latlng[1],
            };
            this.countryCode = country.numericCode;
            this.dialog = true;
        },
    },
};
</script>
