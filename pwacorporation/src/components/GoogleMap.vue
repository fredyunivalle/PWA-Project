<template>
  <gmap-map
    :center="center"
    :zoom="16"
    style="width: 90%; height: 500px"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :title="m.title"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
      @dragend="updatePosition"
    ></gmap-marker>
  </gmap-map>
</template>
<script>
  export default {
    data () {
      return {
        
        center: {lat: this.latitude, lng: this.longitude},
        markers: [{
          position: {lat: this.latitude, lng: this.longitude},
          title: this.title
        }]
      }
    },

    props: {
        latitude: Number,
        longitude: Number,
        title: String
    },
    methods:{
        updatePosition(evt){
            console.log( evt.latLng.lat());
            this.$emit('update', evt.latLng.lng(), evt.latLng.lat());
        }
    }
  }
</script>