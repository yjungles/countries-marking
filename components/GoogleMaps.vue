<template>
    <div>
        <GMap
            v-if="location.lat && location.lng"
            ref="gMap"
            language="pt"
            :center="{ lat: location.lat, lng: location.lng }"
            :options="{ fullscreenControl: false }"
            :zoom="4"
        >
            <GMapMarker
                v-if="location.lat && location.lng"
                :position="{ lat: location.lat, lng: location.lng }"
                @click="currentLocation = location"
            >
                <GMapInfoWindow :options="{ maxWidth: 200 }">
                    <code>
                        lat: {{ location.lat }}, lng: {{ location.lng }}
                    </code>
                </GMapInfoWindow>
            </GMapMarker>
        </GMap>
        <v-alert v-else type="error" prominent class="mb-0">
            Não foi possível exibir o mapa, coordenadas inválidas.
        </v-alert>
    </div>
</template>
<script>
export default {
    props: {
        location: {
            type: Object,
            default: () => ({
                lat: null,
                lng: null,
            }),
        },
    },
    data() {
        return {
            currentLocation: {},
        };
    },
};
</script>