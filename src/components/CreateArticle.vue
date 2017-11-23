<template>
  <div id="create-article">
    <div class="layout-left">
      <Card dis-hover v-for="(item, index) in list1" :key="index">
        Content {{ item }}
      </Card>
    </div>
    <div class="layout-right">
      hellow world
    </div>
    <!-- <Form class="form">
      <FormItem prop="title" :error="titleError" :show-message="showTitleError">
        <Input v-model="title" size="large" placeholder="请输入标题"></Input>
      </FormItem>
      <FormItem>
        <RadioGroup v-model="a_type">
          <Radio label="photography">摄影</Radio>
          <Radio label="program">编程</Radio>
          <Radio label="essay">散文</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem prop="cover_desc">
        <Input v-model="cover_desc" type="textarea" class="cover-desc-input" :rows="4" placeholder="请输入封面描述"></Input>
      </FormItem>
      <FormItem class="upload-btn" prop="cover_url">
        <label for="file">
          <img v-if="cover_url" :src="cover_url" class="photo"/>
          <div v-else>
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>请选择封面</p>
          </div>
        </label>
        <input id="file" type="file" style="display: none" @change="onCoverSelect"></input>
      </FormItem>
      <FormItem v-for="content, index in contents" :key="index" prop="content">
        <div v-if="content.c_type === 'photo'">
          <label>
            <img v-if="content.c_data" :src="content.c_data" class="photo"/>
            <div v-else>
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>请选择图片</p>
            </div>
            <input id="file" type="file" style="display: none" @change="onContentSelect($event, index)"></input>
          </label>
        </div>
        <Input v-else v-model="content.c_data" type="textarea" :rows="4" placeholder="请输入文字"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" class="save-btn" long @click="save">保存</Button>
      </FormItem>
    </Form> -->
    <!-- <div class="tool">
      <Button type="primary" @click="addPhoto">添加图片</Button>
      <Button type="primary" @click="addText">添加文字</Button>
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'create-article',
  components: {
  },
  data () {
    return {
      list1: [1, 2, 4, 5, 6],
      title: '',
      a_type: 'photography',
      cover_desc: '',
      cover_url: '',
      contents: [],
      editTitle: false,
      editCoverDesc: false,
      titleError: '',
      showTitleError: false,
      windowHeight: window.screen.availHeight - 60,
      windowWidth: window.screen.availWidth
    }
  },
  created: function () {
    console.log(window)
  },
  methods: {
    onCoverSelect: async function ($event) {
      const file = $event.target.files[0]
      const url = await this.uploadImage(file)
      if (url === '') {
        return
      }
      this.cover_url = url
    },
    addPhoto: function () {
      const content = {
        c_type: 'photo',
        c_data: ''
      }
      Vue.set(this.contents, this.contents.length, content)
      console.log(this.contents)
    },
    addText: function () {
      const content = {
        c_type: 'text',
        c_data: ''
      }
      Vue.set(this.contents, this.contents.length, content)
      console.log(this.contents)
    },
    onContentSelect: async function ($event, index) {
      const file = $event.target.files[0]
      const url = await this.uploadImage(file)
      if (url === '') {
        return
      }
      const content = this.contents[index]
      content.c_data = url
      Vue.set(this.contents, index, content)
    },
    uploadImage: async function (file) {
      const suffix = file.name.split('.').pop()
      const url = `api/photo/tokens?count=1&suffixes=${suffix}`
      const res = await fetch(url)
      const data = await res.json()
      if (res.status >= 400) {
        return ''
      }
      const imageUrl = data.urls[0]
      const token = data.tokens[0]
      const key = data.keys[0]
      const formData = new FormData()
      formData.append('token', token)
      formData.append('file', file)
      formData.append('key', key)
      const qiniuUrl = 'https://upload-z2.qbox.me'
      const uploadRes = await fetch(qiniuUrl, {
        method: 'POST',
        body: formData
      })
      if (uploadRes.status >= 400) {
        return ''
      }
      return imageUrl
    },
    save: async function () {
      if (this.title.trim() === '') {
        this.showTitleError = true
        this.titleError = '请输入标题'
        return
      }
      if (this.cover_url === '') {
        this.showTitleError = true
        this.titleError = '请输入封面图片'
        return
      }
      if (this.cover_desc.trim() === '') {
        this.showTitleError = true
        this.titleError = '请输入封面描述'
        return
      }
      if (this.contents.length === 0) {
        this.showTitleError = true
        this.titleError = '内容不能为空'
        return
      }
      for (let i = 0; i < this.contents.length; i += 1) {
        const content = this.contents[i]
        if (content.c_data.trim() === '') {
          this.showTitleError = true
          this.titleError = '内容不能为空'
          return
        }
      }
      const url = 'api/article'
      const formData = new FormData()
      formData.append('title', this.title)
      formData.append('a_type', this.a_type)
      formData.append('cover_desc', this.cover_desc)
      formData.append('cover_url', this.cover_url)
      formData.append('contents', JSON.stringify(this.contents))
      const res = await fetch(url, {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (res.status >= 400) {
        console.log(data.msg)
      } else {
        console.log('success')
      }
    }
  }
}
</script>

<style scoped>
#create-article {
  position: relative;
  box-sizing: border-box;
  min-height: 100%;
}
.layout-left {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 340px;
  height: 100%;
  overflow-y: auto;
  background-color: #5cadff;
  padding: 22px 30px 80px;
  box-sizing: border-box;
}
.layout-right {
  width: 340px;
  height: 100%;
  padding: 18px 20px 140px;
  margin-left: auto;
  font-size: 13px;
  line-height: 18px;
  overflow-y: auto;
  color: #222;
  background-color: #fff;
  box-sizing: border-box;
}
</style>
