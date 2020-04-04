<template>
  <mdb-card dark>
    <mdb-view hover>
      <!-- image -->
      <a href="#!">
        <mdb-card-image
          src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg"
          alt="Card image cap"
        ></mdb-card-image>
        <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
      </a>
    </mdb-view>

    <!--video -->
    <mdb-view hover>
      <iframe
        title="video exercise"
        width="560"
        height="315"
        :src="data.videoUrl"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </mdb-view>
    <mdb-card-body color="elegant" class="white-text">
      <a class="activator mr-4"><mdb-icon icon="share-alt"/></a>
      <mdb-card-title>{{ data.name }}</mdb-card-title>
      <hr class="hr-light" />
      <p class="font-small mb-3">
        {{ data.observations }}
      </p>
      <a class="white-text d-flex justify-content-end"
        ><h5>
          Read more
          <mdb-icon icon="angle-double-right" class="pl-1" /></h5
      ></a>
    </mdb-card-body>
  </mdb-card>
</template>
<script>
import {
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbView,
  mdbMask,
  mdbIcon
} from 'mdbvue';
export default {
  name: 'exercise-card',

  props: {
    data: {
      type: Object
    }
  },
  components: {
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbView,
    mdbMask,
    mdbIcon
  }
};
</script>
<style lang="" scoped></style>
