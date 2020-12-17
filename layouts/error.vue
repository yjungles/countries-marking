<template>
    <div>
        <div v-if="error.statusCode === 404">
            <h1 class="text-center mb-5">
                {{ pageNotFound }}
            </h1>
            <v-img src="/page-not-found.svg" />
        </div>
        <div v-else>
            <h1 class="text-center mb-5">
                {{ otherError }}
            </h1>
            <v-img src="/error-occurred.svg" max-width="450" />
        </div>
        <div class="text-center">
            <v-btn color="primary" to="/" class="mt-10">
                Voltar ao início
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    layout: "basic",
    props: {
        error: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            pageNotFound: "404 - Página não encontrada",
            otherError: "Um erro ocorreu",
        };
    },
    head() {
        const title =
            this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
        return {
            title,
        };
    },
};
</script>

<style scoped>
h1 {
    font-size: 20px;
}
</style>
