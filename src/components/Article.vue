<template>
  <div ref="article" id="article">
    <h2>{{ title }}</h2>
    <div class="photo-list">
      <div class="gallery-row" v-for="row, row_index in rows" :key="row_index">
        <div
          class="gallery-item"
          v-for="photo, photo_index in row.photos" :key="photo_index"
        >
          <img v-if="photo_index === 0"
            :data-ratio="photo.aspect_ratio"
            v-lazy="photo.url"
            :style="'height:' + photo.styleHeight + 'px; width:' + photo.styleWidth + 'px;'"
          >
          <img v-else
            :data-ratio="photo.aspect_ratio"
            v-lazy="photo.url"
            :style="'height:' + photo.styleHeight + 'px; margin-left:' + gap + 'px; width:' + photo.styleWidth + 'px;'"
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
      minHeight: 300,
      minRadio: 0,
      gap: 10,
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
      // 处理最后一行
      for (let i = 0; i < rowPhotos.length; i++) {
        radio += Number(rowPhotos[i].aspect_ratio)
      }
      rows.push({
        radio: radio,
        photos: rowPhotos,
        lastRow: true
      })
      return rows
    },
    generateRows: function (photos) {
      let rows = this.getRows(photos)
      for (let i = 0; i < rows.length; i++) {
        let row = rows[i]
        // 计算实际显示图片的宽度，多出gap / 2用于
        let actualWidth = this.clientWidth - (row.photos.length) * this.gap - this.gap / 2
        for (let j = 0; j < row.photos.length; j++) {
          let photo = row.photos[j]
          if (row.lastRow) {
            photo.styleHeight = this.minHeight
            photo.styleWidth = this.minHeight * photo.aspect_ratio
          } else {
            photo.styleHeight = actualWidth / row.radio
            photo.styleWidth = photo.styleHeight * photo.aspect_ratio
          }
        }
      }
      return rows
    }
  }
}
</script>

<style scoped>
#article {
  margin-left: 100px;
  margin-right: 100px;
  background-color: #fff;
  margin-bottom: 100px;
}
.gallery-row{
	margin-bottom: 8px;
	overflow: hidden;
	white-space: nowrap;
	/*padding-right: 8px;*/
}
.gallery-item{
	height: 100%;
	display: inline-block;
	/*margin-left: 8px;*/
	position: relative;
}
img{
	object-fit: cover;
	border-radius: 5px;
}
.noscroll{
	overflow: hidden;
}
.hide{
	display: none;
}
</style>
