export default {
  SET_IMAGE(state, images) {
    state.images = [...images]
  },
  ADD_IMAGE(state, image) {
    state.images.push(image)
  },
  DELETE_IMAGE(state, target) {
    state.images = state.images.filter((image) => {
      return image.id !== target.id
    })
  }
}