<template>
  <!-- <div class="container"> -->
  <!-- <div class="content"> -->
  <div class="grid">
    <figure :class="effectClass">
      <!-- src="http://localhost:9000/uploads/61acb654-a044-44fc-9c66-4ff842f74fab" -->
      <img :src="getImage(data.imageUrl)" alt="img02" />
      <figcaption>
        <h6>{{ data.name }}</h6>
        <div>
          <div class="d-flex space-between">
            <div @click="selectExercise()">
              <!-- <mdb-icon icon="info" size="2x" /> -->
              <mdb-icon icon="info-circle" size="5x" />
            </div>
            <div @click="selectExercise()">
              <mdb-icon icon="arrows-alt" size="5x" />
            </div>
            <div @click="shareExercise()">
              <mdb-icon icon="share-alt-square" size="5x" />
            </div>
          </div>
        </div>
      </figcaption>
    </figure>
  </div>
  <!-- </div> -->
  <!-- </div> -->
</template>
<script>
import { mdbIcon } from 'mdbvue';

export default {
  name: 'exercise-card-animation',

  props: {
    data: {
      type: Object
    },
    effect: {
      type: String,
      default: 'sadie'
    }
  },

  components: {
    mdbIcon
  },

  computed: {
    effectClass() {
      return `effect-${this.effect}`;
    }
  },

  methods: {
    getImage(imageUrl) {
      return `${process.env.VUE_APP_UPLOADS}${imageUrl}`;
    },
    showExercesice() {},

    selectExercise() {},

    shareExercise() {}
  }
};
</script>

<style lang="scss" scoped>
/** Source:  https://bootsnipp.com/snippets/3Meen **/

// MOVE TO main.scss
$dark-blue: #375a7f;
$second-dark-grey: #444;
$grid-grey: #151515; // equals to third-dark-grey
$figcaption-grey: #303030;
$white: #fff;
$mandarine: #f39c12;
$mandarine-gradient: #7f4e00;

.grid {
  position: relative;
  margin: 0 auto;
  min-width: 174px;
  min-height: 205px;
  max-width: 300px;
  max-height: 300px;
  border: 1px solid #2c2c2c;
  background-color: $grid-grey;
  list-style: none;
  text-align: center;
}

/* Common style */
.grid figure {
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
  height: auto;
  background-color: $white; // #949494;
  text-align: center;
  cursor: pointer;
}

.grid figure img {
  width: 100%;
  height: 140px;
  opacity: 0.8;
}

.grid figure figcaption {
  padding: 2em;
  color: $white;
  overflow: hidden;
  font-size: 0.3em;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.grid figure figcaption::before,
.grid figure figcaption::after {
  pointer-events: none;
}

.grid figure figcaption,
.grid figure figcaption > a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Anchor will cover the whole item by default */
/* For some effects it will show as a button */
.grid figure figcaption > a {
  z-index: 1000;
  text-indent: 200%;
  white-space: nowrap;
  font-size: 0;
  opacity: 0;
}

.grid figure h6 {
  word-spacing: -0.15em;
  font-weight: 300;
}

.grid figure h6 span {
  font-weight: 800;
}

.grid figure h6,
.grid figure p {
  margin: 0;
}

.grid figure p {
  letter-spacing: 1px;
  font-size: 68.5%;
}

/* Individual effects */

/*---------------*/
/***** Sadie *****/
/*---------------*/

figure.effect-sadie figcaption::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: -webkit-linear-gradient(
    top,
    rgba(72, 76, 97, 0) 0%,
    rgba(72, 76, 97, 0.8) 75%
  );
  // background: linear-gradient(
  //   to bottom,
  //   rgba(72, 76, 97, 0) 0%,
  //   rgba(72, 76, 97, 0.8) 75%
  // );
  background: linear-gradient(
    to bottom,
    rgba(72, 76, 97, 0) 0%,
    $mandarine-gradient 75%
  );
  content: '';
  opacity: 0;
  -webkit-transform: translate3d(0, 50%, 0);
  transform: translate3d(0, 50%, 0);
}

figure.effect-sadie h6 {
  position: absolute;
  top: 172px;
  left: 0;
  width: 100%;
  color: $mandarine; //#484c61;
  -webkit-transition: -webkit-transform 0.35s, color 0.35s;
  transition: transform 0.35s, color 0.35s;
  -webkit-transform: translate3d(0, -50%, 0);
  transform: translate3d(0, -50%, 0);
}

figure.effect-sadie figcaption::before,
figure.effect-sadie div {
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
}

figure.effect-sadie div {
  position: relative;
  bottom: 0;
  top: 10px;
  left: 0;
  padding: 2em;
  width: 100%;
  opacity: 0;
  -webkit-transform: translate3d(0, 10px, 0);
  transform: translate3d(0, 10px, 0);
}

figure.effect-sadie:hover h6 {
  color: #fff;
  -webkit-transform: translate3d(0, -50%, 0) translate3d(0, -40px, 0);
  transform: translate3d(0, -50%, 0) translate3d(0, -40px, 0);
}

figure.effect-sadie:hover figcaption::before,
figure.effect-sadie:hover div {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
</style>
