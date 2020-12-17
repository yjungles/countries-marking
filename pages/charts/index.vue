<template>
    <div>
        <v-card flat rounded="lg">
            <v-card-text>
                <v-row align="center">
                    <v-col class="d-flex" cols="12" sm="6">
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
                            Não foi possível carregar o gráfico dos países
                        </v-col>
                        <v-col class="shrink">
                            <v-btn @click="$fetch">
                                <v-icon left>mdi-refresh</v-icon>

                                Tentar novamente</v-btn
                            >
                        </v-col>
                    </v-row>
                </v-alert>
                <div v-else class="fill-height">
                    <apexchart
                        width="100%"
                        :height="chartHeight"
                        type="bar"
                        :options="chartOptions"
                        :series="series"
                    />
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import { ALLREGIONS } from "~/constants/regions";
import countryService from "~/services/countryService.js";
import VueApexCharts from "vue-apexcharts";
import _ from "lodash";

export default {
    middleware: "authenticated",
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return {
            selectedRegion: "Americas",
            countries: [],

            /* Variáveis de configuração do gráfico */
            series: [],
            responsive: [
                {
                    breakpoint: 300,
                    options: {},
                },
            ],
            chartOptions: {
                colors: ["#FD003A", "#2f2e41"],
                fill: {
                    colors: ["#FD003A", "#2f2e41"],
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        dataLabels: {
                            position: "top",
                        },
                    },
                },
                dataLabels: {
                    enabled: true,
                    offsetX: 70,
                    style: {
                        fontSize: "12px",
                        colors: ["#333"],
                    },
                },

                xaxis: {
                    categories: [],
                },
            },
        };
    },

    computed: {
        /* todas as regiões */
        regions() {
            return ALLREGIONS;
        },
        /* variável para controle dinâmico da altura do gráfico */
        chartHeight() {
            let count = this.countries.length;
            return count > 0 ? count * 60 : "auto";
        },
    },
    /* Carrega os países de determinada região */
    async fetch() {
        this.countries = await new countryService(this.$axios)
            .getCountriesByRegion(this.selectedRegion)
            .then((res) => res.data);

        this.populateChart();
    },
    methods: {
        /* Função para inserir no gráfico os dados dos países carregados */
        populateChart() {
            let allCountriesCategories = _.map(this.countries, "name");
            this.chartOptions.xaxis.categories = allCountriesCategories;

            let allCountriesAreas = _.map(this.countries, "area");
            let allCountriesPopulations = _.map(this.countries, "population");

            this.series = [
                {
                    name: "Area",
                    data: allCountriesAreas,
                },
                {
                    name: "População",
                    data: allCountriesPopulations,
                },
            ];
        },
    },
};
</script>