<template>
  <div id="photography">
    <!-- 页面header -->
    <!-- <div class="header" :style="'background-image: url(' + backgroundImage + ');'">
    </div> -->
    <div class="article-list">
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
  background-color: #dee3e7;
  margin-bottom: 100px;
  overflow: auto;
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
.article-list {
  padding: 40px 0;
  margin: auto;
  min-height: 400px;
  position: relative;
  zoom: 1;
}
.article-card {
  margin-bottom: 20px;
  display: inline;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  float: left;
  border-radius: 2px;
}

@media screen and (max-width: 1550px) {
  .article-list {
    width: 1200px;
  }
}
@media screen and (max-width: 1250px) {
  .article-list {
    width: 900px;
  }
}
@media screen and (max-width: 950px) {
  .article-list {
    width: 600px;
  }
}
</style>
