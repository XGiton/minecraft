<template>
  <div id="article-detail">
    <section>
      <div class="img-wrapper" v-for="img, index in imgs" :key="index">
        <img :src="img.url">
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      imgs: [
        {
          url: 'http://photo.tuchong.com/1175071/ft640/9229406.webp',
          width: 414,
          height: 311
        },
        {
          url: 'http://photo.tuchong.com/1175071/ft640/9231429.webp',
          width: 414,
          height: 311
        },
        {
          url: 'http://photo.tuchong.com/1175071/ft640/9231374.webp',
          width: 414,
          height: 311
        },
        {
          url: 'http://photo.tuchong.com/1175071/ft640/9231354.webp',
          width: 330,
          height: 440
        },
        {
          url: 'http:////photo.tuchong.com/1175071/ft640/9231081.webp',
          width: 330,
          height: 440
        },
        {
          url: 'http:////photo.tuchong.com/1175071/ft640/9230317.webp',
          width: 586,
          height: 440
        }
      ]
    }
  }
}
</script>

<style scoped>
section {
  display: flex;
  flex-wrap: wrap;
}
section::after {
  content: '';
  flex-grow: 999999999;
}
.img-wrapper {
  flex-grow: 1;
  margin: 2px;
  background-color: violet;
  height: 300px;
  position: relative;
}
.img-wrapper img {
  height: 300px;
  object-fit: cover;
  min-width: 100%;
  vertical-align: bottom;
}
.img-wrapper .info {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(77, 77, 77, 0.3);
  transition: all 0.5s;
}
.img-wrapper .info .title {
  transition: height 0.5s;
  padding: 0 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  line-height: 40px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
}
.img-wrapper:hover .info {
  opacity: 1;
}
.img-wrapper:hover .title {
  height: 40px;
}
</style>
