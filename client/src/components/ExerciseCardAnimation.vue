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

.grid {
  position: relative;
  margin: 0 auto;
  // padding: 1em 0 4em;
  // max-width: 1000px;
  min-width: 174px;
  min-height: 205px;
  /* width: 230px; */
  max-width: 300px;
  max-height: 300px;
  border: 1px solid red;
  background-color: #fff;
  list-style: none;
  text-align: center;
}

/* Common style */
.grid figure {
  // position: relative;
  /* float: left; */
  margin: 0 auto;
  /* margin: 10px 1%; */
  overflow: hidden;
  width: 100%;
  height: auto;
  border: 1px solid green;
  background: #3085a3;
  text-align: center;
  cursor: pointer;
}

.grid figure img {
  /* position: relative; */
  /* display: block; */
  /* margin: 0 auto; */
  width: 100%;
  height: 140px;
  opacity: 1;
}

.grid figure figcaption {
  padding: 2em;
  color: #fff;
  // text-transform: uppercase;
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

@media screen and (max-width: 50em) {
  .content {
    padding: 0 10px;
    text-align: center;
  }
  .grid figure {
    // display: inline-block;
    // float: none;
    // margin: 10px auto;
    // width: 100%;
  }
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
  background: linear-gradient(
    to bottom,
    rgba(72, 76, 97, 0) 0%,
    rgba(72, 76, 97, 0.8) 75%
  );
  content: '';
  opacity: 0;
  -webkit-transform: translate3d(0, 50%, 0);
  transform: translate3d(0, 50%, 0);
}

figure.effect-sadie h6 {
  position: absolute;
  top: 86%;
  left: 0;
  width: 100%;
  color: #484c61;
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

/*---------------*/
/***** Bubba *****/
/*---------------*/

figure.effect-bubba {
  background: #9e5406;
}

figure.effect-bubba img {
  opacity: 0.7;
  -webkit-transition: opacity 0.35s;
  transition: opacity 0.35s;
}

figure.effect-bubba:hover img {
  opacity: 0.4;
}

figure.effect-bubba figcaption::before,
figure.effect-bubba figcaption::after {
  position: absolute;
  top: 30px;
  right: 30px;
  bottom: 30px;
  left: 30px;
  content: '';
  opacity: 0;
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
}

figure.effect-bubba figcaption::before {
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  -webkit-transform: scale(0, 1);
  transform: scale(0, 1);
}

figure.effect-bubba figcaption::after {
  border-right: 1px solid #fff;
  border-left: 1px solid #fff;
  -webkit-transform: scale(1, 0);
  transform: scale(1, 0);
}

figure.effect-bubba h6 {
  padding-top: 30%;
  -webkit-transition: -webkit-transform 0.35s;
  transition: transform 0.35s;
  -webkit-transform: translate3d(0, -20px, 0);
  transform: translate3d(0, -20px, 0);
}

figure.effect-bubba p {
  padding: 20px 2.5em;
  opacity: 0;
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
  -webkit-transform: translate3d(0, 20px, 0);
  transform: translate3d(0, 20px, 0);
}

figure.effect-bubba:hover figcaption::before,
figure.effect-bubba:hover figcaption::after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}

figure.effect-bubba:hover h6,
figure.effect-bubba:hover p {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

/*---------------*/
/***** Marley *****/
/*---------------*/

figure.effect-marley figcaption {
  text-align: right;
}

figure.effect-marley h6,
figure.effect-marley p {
  position: absolute;
  right: 30px;
  left: 30px;
  padding: 10px 0;
}

figure.effect-marley p {
  bottom: 30px;
  line-height: 1.5;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}

figure.effect-marley h6 {
  top: 30px;
  -webkit-transition: -webkit-transform 0.35s;
  transition: transform 0.35s;
  -webkit-transform: translate3d(0, 20px, 0);
  transform: translate3d(0, 20px, 0);
}

figure.effect-marley:hover h6 {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

figure.effect-marley h6::after {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 4px;
  background: #fff;
  content: '';
  -webkit-transform: translate3d(0, 40px, 0);
  transform: translate3d(0, 40px, 0);
}

figure.effect-marley h6::after,
figure.effect-marley p {
  opacity: 0;
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
}

figure.effect-marley:hover h6::after,
figure.effect-marley:hover p {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
</style>
