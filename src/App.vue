<template>
  <div id="app" class="container mx-auto px-4 py-2">
    <input type="file" class="mb-2" @change="onUploadImage">
    <draggable v-model="images" class="mb-5">
      <transition-group class="flex items-center space-x-4">
        <!-- 為了防止 key 重複，需要改變 key 名稱 -->
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
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import draggable from 'vuedraggable'
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';

  Swiper.use([Navigation, Pagination]);

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
        // 因為我們有更新過 images 的內容，所以我們要等畫面渲染完成後
        // 使用渲染後的 HTML 初始化 Swiper
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
    this.initSwiper()
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
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      })
    },
    onUploadImage(e) {
      const file = e.target.files[0]
      console.log(file)
      this.addImage({
        id: new Date().getTime(),
        file: URL.createObjectURL(file)
      })
    },
    // ajaxDeleteImage(imgId) {
    //   ajax.delete('/api/homework/img', imgId)
    //     .then((res) => {
    //       // this.setImages(res)
    //       // this.deleteImage(imgId)
    //     })
    //     .catch((res) => {
    //       // console.error(res)
    //     })
    // },
    // https://pjchender.blogspot.com/2019/01/js-javascript-input-file-upload-file.html
    // onUploadImage(e) {
    //   const file = e.target.files[0]
    //   const form = new FormData()
    //   img 是跟後端溝通的欄位名稱
    //   form.append('img', file)
    //   ajax.post('/api/homework/img', form)
    //   .then((response) => {
    //     response 裡可能會有 img.id 跟 img.url 
    //     this.addImage({
    //       id: img.id,
    //       file: img.url
    //     })
    //   })
    // },
  }
}
</script>

<style>
</style>
