<template>
  <div id="photography">
    <!-- 页面header -->
    <div class="header" :style="'background-image: url(' + backgroundImage + ');'">

    </div>
    <div class="articleList">
      <ul>
        <li v-for="article, index in articles">
          <ArticleCard
            class="article-card"
            v-bind="article"
          >
          </ArticleCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ArticleCard from './ArticleCard';
import backgroundImage from './../assets/photography-background.jpeg';

export default {
  name: 'photography',
  data () {
    return {
      total: 0,
      articles: [],
      backgroundImage: backgroundImage
    }
  },
  components: {
    ArticleCard
  },
  created: function () {
    this.getArticles()
  },
  methods: {
    getArticles: async function () {
      const url = '/api/articles?skip=0&limit=10&a_type=photography'
      const res = await fetch(url)
      const data = await res.json()
      if (res.status >= 400) {
        console.log(data.msg)
      } else {
        this.total = data.total
        this.articles = data.articles
      }
    }
  }
}
</script>

<style scoped>
#photography {
  background-color: #fff;
  margin-bottom: 100px;
}
.header {
  background: no-repeat 50% #f4f1ec;
  min-height: 320px;
  max-height: 400px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background-position: 50%;
  background-size: cover;
}
.article-card {
  padding-top: 20px;
}

</style>
