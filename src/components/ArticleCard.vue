<template>
  <div id="article-card">
    <h2>{{ title}}</h2>
    <p class="cover-desc">{{ cover_desc }}</p>
    <div class="cover-url">
      <img :src="cover_url">
    </div>
    <div class="see-detail">
      <Button @click="seeDetail" type="default" size="large">
        查看本辑全部作品
        <Icon type="chevron-right"></Icon>
      </Button>
    </div>
    <div class="footer">
      <span>发表于</span>
      <span class="create-time">{{ create_time }}</span>
    </div>
    <hr class="split-line" />
  </div>
</template>

<script>
// import utils from '../utils'

export default {
  props: [
    '_id', 'title', 'cover_desc', 'create_time', 'cover_url'
  ],
  methods: {
    seeDetail: function () {
      console.log('abc')
      this.$router.push(`/article/${this._id}`)
    }
  }
}
</script>

<style scoped>
h2 {
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
}
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
}
</style>
