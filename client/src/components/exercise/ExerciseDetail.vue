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
                :src="getImage(info)"
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
                  :src="videoUrl"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </mdb-view>
            </div>
          </div>
        </div>

        <div class="col-lg-6 mt-3">
          <!-- INFO -->
          <div class="row">
            <div v-if="info.sport" class="col-sm-6">
              <!-- SPORT -->
              <h6 class="ft-exercise-detail__label">Actividad</h6>
              <p class="ft-exercise-detail__info">{{ info.sport }}</p>
            </div>

            <div v-if="info.moveType" class="col-sm-6">
              <!-- MOVE TYPE -->
              <h6 class="ft-exercise-detail__label">Tipo de movimiento</h6>
              <p class="ft-exercise-detail__info">{{ info.moveType }}</p>
            </div>

            <div v-if="info.bodyPart" class="col-sm-6">
              <!-- BODY PART -->
              <h6 class="ft-exercise-detail__label">Parte del cuerpo</h6>
              <p class="ft-exercise-detail__info">{{ info.bodyPart }}</p>
            </div>

            <div v-if="info.target" class="col-sm-6">
              <!-- TARGET -->
              <h6 class="ft-exercise-detail__label">Objetivo</h6>
              <p class="ft-exercise-detail__info">{{ info.target }}</p>
            </div>
            <div v-if="info.level" class="col-sm-6">
              <!-- LEVEL -->
              <h6 class="ft-exercise-detail__label">Nivel</h6>
              <p class="ft-exercise-detail__info">{{ info.level }}</p>
            </div>

            <div v-if="info.description" class="col-sm-6">
              <!-- DESCRIPTION -->
              <h6 class="ft-exercise-detail__label">Descripción</h6>
              <p class="ft-exercise-detail__info">{{ info.description }}</p>
            </div>
            <div v-else class="col-sm-6">
              <!-- OBSERVATIONS -->
              <h6 class="ft-exercise-detail__label">Observaciones</h6>
              <p class="ft-exercise-detail__info">{{ info.observations }}</p>
            </div>
          </div>

          <hr class="ft-breakline" />

          <div
            class="row d-flex justify-content-end ft-exercise-detail__time-info"
          >
            <div v-if="info.series" class="ft-exercise-detail__time-info--item">
              <!-- SERIES -->
              <h6 class="ft-exercise-detail__label">Series</h6>
              <p class="ft-exercise-detail__info">{{ info.series }}</p>
            </div>
            <div v-if="info.reps !== ''" class="ft-exercise-detail__time-info--item">
              <!-- REPS -->
              <h6 class="ft-exercise-detail__label">Reps</h6>
              <p class="ft-exercise-detail__info">{{ reps }}</p>
            </div>
            <div v-if="info.rest !== ''" class="ft-exercise-detail__time-info--item">
              <!-- REST -->
              <h6 class="ft-exercise-detail__label">Descanso</h6>
              <p class="ft-exercise-detail__info">{{ rest }}</p>
            </div>
            <div v-if="info.time !== ''" class="ft-exercise-detail__time-info--item">
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
import mediaSource from '../../mixins/mediaSource';

export default {
  name: 'exercise-detail',

  props: {
    info: {
      type: Object
    }
  },

  mixins: [timer, mediaSource],

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
    },
    videoUrl() {
      return this.setLoopInVideo(this.info.videoUrl);
    }
  }
};
</script>

<style lang="scss" scoped>
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
    border: $iframe-border;
  }

  &__icon {
    color: $teal;
  }

  &__is-warm-up {
    text-align: right;
  }
  &__time-info {
    &--item {
      padding: 0 10px;
      h6,
      p {
        text-align: center;
      }
    }
  }
}
</style>
