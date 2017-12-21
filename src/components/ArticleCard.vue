<template>
  <div id="article-card">
    <div class="card">
      <div class="cover" :style="'background-image: url(' + cover_url + ');'">
        <!-- <img :src="cover_url"> -->
      </div>
      <div class="intro">
        <span>{{ title }}</span>
      </div>
    </div>
    <!-- <h2>{{ title}}</h2>
    <p class="cover-desc">{{ cover_desc }}</p>
    <div class="cover-url">
      <img :src="cover_url">
    </div>
    <div class="see-detail">
      <Button @click="toDetail" type="default" size="large">
        查看本辑全部作品
        <Icon type="chevron-right"></Icon>
      </Button>
    </div>
    <div class="footer">
      <span>发表于</span>
      <span class="create-time">{{ create_time | timestampToDate }}</span>
    </div>
    <hr class="split-line" /> -->
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
}
.card {
  box-shadow: 1px 1px 2px rgba(0,0,0,.2);
  background-color: #fff;
  width: 280px;
  height: 330px;
  text-align: center;
  position: relative;
}
.cover {
  text-align: center;
  width: 280px;
  height: 280px;
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
  bottom: 0;
  width: 100%;
  left: 0;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-family: PingFang SC,Helvetica neue,Helvetica,Tahoma,lantinghei sc,Microsoft Yahei,sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #000;
}
/*h2 {
  font-size: 28px;
  transition: -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(163, 163, 163, 0.73)), to(rgba(0, 0, 0, 1)));
}
.cover-desc {
  overflow: hidden;
  font-size: 16px;
  padding-top: 16px;
}
.cover-url {
  padding-top: 16px;
  margin: 0 auto;
}
img {
  margin: 0 auto;
  width: 100%;
}
.see-detail {
  margin-top: 30px;
}
.footer {
  margin-top: 30px;
  /*padding-left: 15px;*/
/*}
.footer span {
  font-size: 12px;
  color: #969696;
}
.footer .create-time {
  font-weight: bold;
}
.split-line {
  margin-top: 40px;
  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, .2), rgba(0, 0, 0, .0));
  height: 1px;
  border: 0;
}*/
</style>
