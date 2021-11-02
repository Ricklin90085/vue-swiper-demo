<template>
  <div id="app" class="container mx-auto px-4 py-2">
    <input type="file" class="mb-2" @change="onUploadImage">
    <draggable v-model="images" class="mb-5">
      <transition-group class="flex items-center space-x-4">
        <div v-for="image in images" :key="`${image.id}-preview`" class="relative">
          <button class="absolute top-0 right-0 px-2 py-1 bg-gray-300" @click="deleteImage(image)">X</button>
          <img :src="image.file" alt="" class="w-20 cursor-move">
        </div>
      </transition-group>
    </draggable>
    <div class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div v-for="image in images" :key="`${image.id}-swiper`" class="swiper-slide">
          <img :src="image.file" alt="">
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import draggable from 'vuedraggable'
  import Swiper, { Navigation } from 'swiper';
  import 'swiper/swiper-bundle.min.css';

  Swiper.use([Navigation]);

export default {
  name: 'App',
  components: {
    draggable
  },
  data() {
    return {
      swiper: null
    }
  },
  watch: {
    images() {
      if (this.swiper) {
        this.swiper.destroy()
        this.$nextTick(() => {
          this.initSwiper()
        })
      }
    }
  },
  computed: {
    images: {
      get() {
        return this.$store.state.images
      },
      set(value) {
        this.setImages(value)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initSwiper()
    })
  },
  methods: {
    ...mapMutations({
      addImage: 'ADD_IMAGE',
      deleteImage: 'DELETE_IMAGE',
      setImages: 'SET_IMAGE'
    }),
    initSwiper() {
      this.swiper = new Swiper(".mySwiper", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      })
    },
    onUploadImage(e) {
      const file = e.target.files[0]
      this.addImage({
        id: new Date().getTime(),
        file: URL.createObjectURL(file)
      })
      // this.images.push({
      //   id: new Date().getTime(),
      //   file: URL.createObjectURL(file)
      // })
    },
    // deleteImage(target) {
    //   this.images = this.images.filter((image) => {
    //     return image.id !== target.id
    //   })
    // }
  }
}
</script>

<style>
</style>
