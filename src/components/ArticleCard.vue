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
  data () {
    return {
      _id: '123',
      title: '夜色布尔津',
      cover_desc: '拍摄完喀纳斯，便踏上回程之路。回到布尔津附近时已是深夜。没有月光，除了远处县城依稀的灯光和偶尔驶过的车灯外，便是一片漆黑，伸手不见五指，只能在满天繁星的映衬下依稀看见些随风而动的树影。而这，正是拍摄银河的最佳时机。',
      cover_url: 'https://cdn.camarts.cn/2016/01/IMG_2956.jpg?imageView/2/w/800/h/800/q/90',
      create_time: '2017年11月22日'
    }
  },
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
