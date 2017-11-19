<template>
  <div id="photography">
    <p class="totalInfo">共 {{ total }} 篇文章</p>
    <div class="articleList">
      <ul>
        <li v-for="article in articles">
          <span>{{ article.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'photography',
  data () {
    return {
      total: 0,
      articles: []
    }
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
