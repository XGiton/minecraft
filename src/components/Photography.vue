<template>
  <div id="photography">
    <div class="articleList">
      <ul>
        <li v-for="article, index in articles">
          <ArticleCard class="article-card"></ArticleCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ArticleCard from './ArticleCard'

export default {
  name: 'photography',
  data () {
    return {
      total: 0,
      articles: []
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
  margin-left: 16%;
  margin-right: 16%;
  background-color: #fff;
  padding-left: 8%;
  padding-right: 8%;
  margin-bottom: 100px;
}
.article-card {
  padding-top: 20px;
}

</style>
