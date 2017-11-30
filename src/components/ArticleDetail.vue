
  <template>
  <div id="article-detail">
    <section>
      <div class="img-wrapper" v-for="content, index in contents" :key="index">
        <img :src="content.c_data">
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      contents: [],
      title: '',
      create_time: ''
    }
  },
  created: function () {
    this.getArticle()
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
    }
  }
}
</script>

<style scoped>
section {
  display: flex;
  flex-wrap: wrap;
}
section::after {
  content: '';
  flex-grow: 5;
}
.img-wrapper {
  flex-grow: 1;
  margin: 2px;
  background-color: violet;
  height: 400px;
  position: relative;
}
.img-wrapper img {
  height: 400px;
  object-fit: cover;
  min-width: 100%;
  vertical-align: bottom;
}
.img-wrapper .info {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(77, 77, 77, 0.3);
  transition: all 0.5s;
}
.img-wrapper .info .title {
  transition: height 0.5s;
  padding: 0 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  line-height: 40px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
}
.img-wrapper:hover .info {
  opacity: 1;
}
.img-wrapper:hover .title {
  height: 40px;
}
</style>
