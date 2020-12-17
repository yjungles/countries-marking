<template>
    <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
        item-text="name"
        item-value="name"
        :search-input.sync="search"
        cache-items
        flat
        hide-no-data
        hide-details
        label="Por qual país você está procurando?"
        solo
        clearable
        prepend-inner-icon="mdi-magnify"
        @click:prepend-inner="searchCountry()"
        @input="loadSelectedCountry()"
    >
        <template v-slot:item="{ item }">
            <v-list-item-avatar>
                <img :src="item.flag" />
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
        </template>
        <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip v-bind="attr" :input-value="selected" v-on="on">
                <v-avatar left>
                    <v-img :src="item.flag"></v-img>
                </v-avatar>
                {{ item.name }}
            </v-chip>
        </template>
    </v-autocomplete>
</template>
<script>
import countryService from "~/services/countryService.js";
import _ from "lodash";

export default {
    data() {
        return {
            loading: false,
            items: [],
            search: null,
            select: null,
            states: [],
        };
    },
    watch: {
        search(val) {
            val && val !== this.select && this.querySelections(val);
        },
    },
    async fetch() {
        let response = await new countryService(this.$axios)
            .getCountriesNames()
            .then((res) => res.data);

        // this.states = _.map(response, "name");
        this.states = response;
    },
    methods: {
        querySelections(v) {
            this.loading = true;
            this.items = this.states.filter((e) => {
                return (
                    (e.name || "")
                        .toLowerCase()
                        .indexOf((v || "").toLowerCase()) > -1
                );
            });
            this.loading = false;
        },
        loadSelectedCountry() {
            if (!!this.select) {
                this.$router.push("/search/" + this.select);
            }
        },
        searchCountry() {
            if (!!this.search) {
                this.$router.push("/search/" + this.search);
            }
                        if (!!this.select) {
                this.$router.push("/search/" + this.select);
            }
        },
    },
};
</script>