<template>
  <div class="ft-exercise-detail">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <!-- IMAGE -->
          <div v-if="!info.videoUrl && info.imageUrl" class="row">
            <div class="col-12">
              <img
                class="ft-exercise-detail__image mx-auto"
                :src="getImage(info.imageUrl)"
                alt="image exercise"
              />
            </div>
          </div>

          <!-- VIDEO -->
          <div v-else-if="info.videoUrl" class="row">
            <div class="col-12">
              <mdb-view hover>
                <iframe
                  class="ft-exercise-detail__iframe"
                  title="video exercise"
                  width="560"
                  :src="info.videoUrl"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </mdb-view>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <!-- INFO -->
          <div class="row">
            <div v-if="info.sport" class="col-md-6">
              <!-- SPORT -->
              <h6 class="ft-exercise-detail__label">Actividad</h6>
              <p class="ft-exercise-detail__info">{{ info.sport }}</p>
            </div>

            <div v-if="info.moveType" class="col-md-6">
              <!-- MOVE TYPE -->
              <h6 class="ft-exercise-detail__label">Tipo de movimiento</h6>
              <p class="ft-exercise-detail__info">{{ info.moveType }}</p>
            </div>

            <div v-if="info.bodyPart" class="col-md-6">
              <!-- BODY PART -->
              <h6 class="ft-exercise-detail__label">Parte del cuerpo</h6>
              <p class="ft-exercise-detail__info">{{ info.bodyPart }}</p>
            </div>

            <div v-if="info.target" class="col-md-6">
              <!-- TARGET -->
              <h6 class="ft-exercise-detail__label">Objetivo</h6>
              <p class="ft-exercise-detail__info">{{ info.target }}</p>
            </div>
            <div v-if="info.level" class="col-md-6">
              <!-- LEVEL -->
              <h6 class="ft-exercise-detail__label">Nivel</h6>
              <p class="ft-exercise-detail__info">{{ info.level }}</p>
            </div>

            <div v-if="info.description" class="col-md-6">
              <!-- DESCRIPTION -->
              <h6 class="ft-exercise-detail__label">Descripción</h6>
              <p class="ft-exercise-detail__info">{{ info.description }}</p>
            </div>
            <div v-else class="col-md-6">
              <!-- OBSERVATIONS -->
              <h6 class="ft-exercise-detail__label">Observaciones</h6>
              <p class="ft-exercise-detail__info">{{ info.observations }}</p>
            </div>
          </div>

          <hr class="ft-breakline" />

          <div
            class="row d-flex justify-content-end ft-exercise-detail__time-info"
          >
            <div v-if="info.series" class="col-md-3">
              <!-- SERIES -->
              <h6 class="ft-exercise-detail__label">Series</h6>
              <p class="ft-exercise-detail__info">{{ info.series }}</p>
            </div>
            <div v-if="info.reps !== ''" class="col-md-3">
              <!-- REPS -->
              <h6 class="ft-exercise-detail__label">Reps</h6>
              <p class="ft-exercise-detail__info">{{ reps }}</p>
            </div>
            <div v-if="info.rest !== ''" class="col-md-3">
              <!-- REST -->
              <h6 class="ft-exercise-detail__label">Descanso</h6>
              <p class="ft-exercise-detail__info">{{ rest }}</p>
            </div>
            <div v-if="info.time !== ''" class="col-md-3">
              <!-- TIME -->
              <h6 class="ft-exercise-detail__label">Duración</h6>
              <p class="ft-exercise-detail__info">{{ time }}</p>
            </div>
          </div>

          <div class="row ft-exercise-detail__is-warm-up">
            <!-- IS WARM UP -->
            <div v-if="info.isWarmUp" class="col">
              <mdb-icon icon="check" class="ft-exercise-detail__icon" />
              <span class="ft-exercise-detail__label">
                Ejercicio de calentamiento
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbView, mdbIcon } from 'mdbvue';
import timer from '../../mixins/timer';

export default {
  name: 'exercise-detail',

  props: {
    info: {
      type: Object
    }
  },

  mixins: [timer],

  components: {
    mdbView,
    mdbIcon
  },

  computed: {
    time() {
      return this.setTextTime(this.info.time);
    },
    rest() {
      return this.setTextTime(this.info.rest);
    },
    reps() {
      return this.setTextReps(this.info.reps);
    }
  },

  methods: {
    getImage(imageUrl) {
      return `${process.env.VUE_APP_UPLOADS}${imageUrl}`;
    }
  }
};
</script>

<style lang="scss" scoped>
$iframe-height: 315px;

.ft-exercise-detail {
  h6,
  p {
    text-align: left;
  }
  &__image {
    width: auto;
    height: $iframe-height; // heigth equals iframes
  }

  &__iframe {
    height: $iframe-height;
  }

  &__icon {
    color: $teal;
  }

  &__is-warm-up {
    text-align: right;
  }
  &__time-info {
    h6,
    p {
      text-align: right;
    }
  }
}
</style>
