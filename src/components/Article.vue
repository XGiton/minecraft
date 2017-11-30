<template>
  <div ref="article" id="article">
    <h2>{{ title }}</h2>
    <div class="photo-list">
      <div v-for="row, row_index in rows" :key="row_index">
        <div
          class="photo-wrap"
          v-for="photo, photo_index in row.photos" :key="photo_index"
        >
          <img v-if="photo_index === 0"
            :data-ratio="photo.aspect_ratio"
            :src="photo.url"
            :style="'height:' + photo.styleHeight + 'px;'"
          >
          <img v-else
            :data-ratio="photo.aspect_ratio"
            :src="photo.url"
            :style="'height:' + photo.styleHeight + 'px; padding-left:' + gap + 'px;'"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      contents: [],
      title: '',
      create_time: '',
      rows: [],  // 二维数组，存放每一行的图片,
      minHeight: 400,
      minRadio: 0,
      gap: 12,
      clientWidth: 0
    }
  },
  created: function () {
    this.getArticle()
  },
  watch: {
    clientWidth: function () {
      console.log(this.$refs.article.clientWidth)
    }
  },
  mounted: function () {
    console.log(this.$refs.article.clientWidth)
    this.clientWidth = this.$refs.article.clientWidth
    this.minRadio = this.clientWidth / this.minHeight
  },
  methods: {
    getArticle: async function () {
      const url = `api/article/${this.$route.params.id}`
      const res = await fetch(url)
      const data = await res.json()
      if (res.status >= 400) {
        this.$Message.error(data.msg)
      } else {
        this.title = data.title
        this.contents = data.contents
        this.create_time = data.create_time
      }
      // 计算宽高
      this.rows = this.generateRows(this.contents)
    },
    getRows: function (photos) {
      let radio = 0
      let rows = []
      let rowPhotos = []  // 存放一行的图片
      for (let i = 0; i < photos.length; i++) {
        rowPhotos.push(photos[i])
        radio += Number(photos[i].aspect_ratio)
        if (radio > this.minRadio) {
          // 累加的长宽比大于minRadio时，则之前累加的图片作为一行
          rows.push({
            radio: radio,
            photos: rowPhotos
          })
          rowPhotos = []
          radio = 0
        }
      }
      for (let i = 0; i < rowPhotos.length; i++) {
        radio += Number(rowPhotos[i].aspect_ratio)
      }
      rows.push({
        radio: radio,
        photos: rowPhotos
      })
      return rows
    },
    generateRows: function (photos) {
      let rows = this.getRows(photos)
      for (let i = 0; i < rows.length; i++) {
        let row = rows[i]
        let actualWidth = this.clientWidth - (row.photos.length + 1) * this.gap
        for (let j = 0; j < row.photos.length; j++) {
          let photo = row.photos[j]
          photo.styleHeight = actualWidth / row.radio
        }
      }
      return rows
    }
  }
}
</script>

<style scoped>
#article {
  margin-left: 5%;
  margin-right: 5%;
  background-color: #fff;
  /*padding-left: 8%;
  padding-right: 8%;*/
  margin-bottom: 100px;
}
.photo-list {
  margin: 0 auto;
}
.photo-wrap {
  display: inline-block;
}
</style>
