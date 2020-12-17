<template>
    <div>
        <v-list dense>
            <v-list-item-group color="primary">
                <v-list-item
                    v-for="(country, i) in countries"
                    :key="i"
                    @click="goToCountry(country)"
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
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>
<script>
import countryService from "~/services/countryService.js";
export default {
    props: {
        lang: {
            required: true,
            type: Object,
        },
    },
    data() {
        return {
            countries: [],
        };
    },
    async fetch() {
        this.countries = await new countryService(this.$axios)
            .getCountriesByLanguage(this.lang.iso639_1)
            .then((res) => res.data);
    },
    methods: {
        goToCountry(country) {
            this.$router.push("/search/" + country.name);
        },
    },
};
</script>