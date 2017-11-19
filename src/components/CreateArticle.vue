<template>
  <div id="create-article">
    <Form class="form">
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
    </Form>
    <div class="tool">
      <Button type="primary" @click="addPhoto">添加图片</Button>
      <Button type="primary" @click="addText">添加文字</Button>
    </div>
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
      title: '',
      a_type: 'photography',
      cover_desc: '',
      cover_url: '',
      contents: [],
      editTitle: false,
      editCoverDesc: false,
      titleError: '',
      showTitleError: false
    }
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
.form {
  width: 50%;
  margin: 0 auto;
  padding: 20px 100px 0px;
}

.cover-desc-input {
  width: 100%;
  margin: 20px 0 0;
}

.upload-btn {
  margin: 20px 0 0;
  text-align: center;
  border: 1px dashed #dddee1;
  vertical-align: middle;
  height: 100%;
}

.upload-btn:hover {
  border: 1px dashed #3399ff;
  transition: border-color .2s ease;
}

.photo {
  width: 100%;
}

.save-btn {
  margin: 20px 0 0;
}

.tool {
  /*padding-top: 20px;*/
  width: 200px;
  margin: 0 auto;
}
</style>
