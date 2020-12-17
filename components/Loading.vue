<template>
    <v-row class="fill-height py-10" align-content="center" justify="center">
        <v-col cols="6">
            <v-card flat  class="py-10">
                <p class="subtitle-1 text-center" cols="12">Carregando</p>
                <v-progress-linear
                    color="primary"
                    indeterminate
                    rounded
                    height="6"
                ></v-progress-linear>
            </v-card>
        </v-col>
    </v-row>
</template>