<template>
  <div id="article-card">
    <div class="card">
      <!-- 把图片作为背景图片，解决图片适配问题 -->
      <div class="cover" :style="'background-image: url(' + cover_url + ');'">
        <!-- <img :src="cover_url"> -->
      </div>
      <div class="intro">
        <p class="title">{{ title }}</p>
        <p class="desc">{{ cover_desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../utils'

export default {
  props: [
    '_id', 'title', 'cover_desc', 'create_time', 'cover_url'
  ],
  filters: {
    timestampToDate: utils.timestampToDate
  },
  created: function () {
  },
  methods: {
    toDetail: function () {
      this.$router.push(`article-detail/${this._id}`)
    }
  }
}
</script>

<style scoped>
#article-card {
  display: inline-block;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 1px 1px 2px rgba(3,44,49,.06);
  transition: all .5s ease;
}
.card {
  background-color: #fff;
  width: 200px;
  height: 230px;
  text-align: center;
  position: relative;
}
#article-card:hover {
  box-shadow: 8px 8px 32px #FF66FF;
}
.cover {
  text-align: center;
  width: 200px;
  height: 160px;
  display: block;
  overflow: hidden;
  vertical-align: middle;
  background-size: cover;
  background-position: center;
}
.cover img {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: block;
}
.intro {
  position: absolute;;
  -webkit-font-smoothing: antialiased;
  text-align: left;
  width: 100%;
}
.intro p {
  font-family: PingFang SC,Helvetica neue,Helvetica,Tahoma,lantinghei sc,Microsoft Yahei,sans-serif;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.intro .title {
  width: 100%;
  color: #000;
  font-size: 16px;
  padding: 8px 10px 0 10px;
}
.intro .desc {
  width: 100%;
  font-size: 13px;
  padding: 4px 10px;
  color: #80848f;
}
</style>
