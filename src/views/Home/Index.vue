<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <Search />
      </v-col>
    </v-row>

    <v-divider class="my-6" color="black" />

    <v-row>
      <v-col cols="12">
        <v-tabs>
          <v-tab @click.prevent="latestMovies">Últimas películas</v-tab>
          <v-tab @click.prevent="rankedMovies">Mejor calificadas</v-tab>
          <v-tab @click.prevent="popularMovies">Más populares</v-tab>
        </v-tabs>
      </v-col>

      <v-col cols="12" v-if="isLoading">
        <v-alert class="text-center" text> Cargando... </v-alert>
        <v-sheet :color="`grey lighten-4`" class="pa-3">
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-sheet>
      </v-col>

      <v-col
        v-else
        cols="3"
        sm="6"
        md="4"
        lg="3"
        v-for="(item, i) in moviesArray"
        :key="i"
      >
        <v-card class="mx-auto my-12" elevation="6">
          <v-img
            contain
            :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`"
          ></v-img>

          <v-card-title class="font-weight-black">{{
            item.title
          }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="item.vote_average"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">
                {{ item.vote_average }} ({{ item.vote_count }})
              </div>
            </v-row>

            <div class="my-4">
              Fecha lanzamiento:
              <span class="font-weight-bold">{{ item.release_date }}</span>
            </div>

            <div class="col-12 text-truncate">
              {{ item.overview }}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click.prevent="showDetails(item.id)"
            >
              Detalles
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="auto">
        <v-dialog
          v-model="showModal"
          transition="dialog-top-transition"
          max-width="500"
        >
          <v-card class="mx-auto">
            <v-img
              contain
              height="300"
              :src="`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`"
            ></v-img>

            <v-card-title> {{ movieDetail.title }} </v-card-title>

            <v-divider></v-divider>
            <v-card-subtitle class="my-2">
              {{ movieDetail.overview }}
            </v-card-subtitle>

            <v-card-text>
              <p>Fecha lanzamiento: {{ movieDetail.release_date }}</p>

              <v-divider class="my-2"></v-divider>
              <v-chip
                class="mx-2"
                color="light"
                v-for="(item, i) in movieDetail.genres"
                :key="i"
              >
                {{ item.name }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>

      <v-snackbar class="text-center" v-model="snackbarLoading">
        Cargando detalles
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import API from "@/api/movies";
import Search from "./Search.vue";
export default {
  name: "Home",
  components: { Search },
  data() {
    return {
      moviesArray: [],
      movieDetail: {},
      showModal: false,
      isLoading: false,
      snackbarLoading: false,
      selection: 1,
    };
  },
  created() {
    this.getMovies();
  },
  methods: {
    async getMovies(optionMovie = "upcoming") {
      this.isLoading = true;
      try {
        const response = await API.getMovies(optionMovie);
        if (response.status !== 200) {
          alert("Error al obtener los datos.");
        }
        this.moviesArray = response.data.body;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },

    async showDetails(idMovie) {
      this.snackbarLoading = true;
      try {
        const response = await API.getDetailMovie(idMovie);
        if (response.status !== 200) {
          alert("Error al obtener los datos.");
        }
        this.movieDetail = response.data.body;
        console.log(this.movieDetail);
        this.showModal = true;
      } catch (error) {
        console.log(error);
      }
      this.snackbarLoading = false;
    },

    latestMovies() {
      this.getMovies("upcoming");
    },

    rankedMovies() {
      this.getMovies("top_rated");
    },

    popularMovies() {
      this.getMovies("popular");
    },
  },
};
</script>
