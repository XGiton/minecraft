<template>
  <div id="create-article">
    <div class="layout-left">
      <ul class="content-list">
        <li class="content-item" v-for="content, index in contents" :key="index">
          <div v-if="content.uploading" class="uploading">
            <Spin fix style="background-color: #FF9933;"></Spin>
          </div>
          <div v-else>
            <img :src="content.c_data">
            <div class="mask" style="width: 186px; height: 270px;">
              <a class="icon-close"></a>
            </div>
          </div>
        </li>
        <li class="upload-item">
          <div class="upload-photo">
            <Icon type="plus" size="32" color="#e0e0e0"></Icon>
            <p>
              最大支持20MB的JPEG格式照片
              <br>
              不建议加画框和水印签名
            </p>
          </div>
          <input
            type="file" class="file-input"
            multiple_accept="image/jpeg,image/jpg"
            @change="onPhotoSelect"
          >
          </input>
        </li>
      </ul>
    </div>
    <div class="layout-right">
      <Form label-position="top">
        <FormItem
          label="标题" :error="titleError"
          :show-message="showTitleError">
          <Input v-model="title" @on-focus="titleOnFocus"></Input>
        </FormItem>
        <FormItem
          label="作品描述" :error="descError"
          :show-message="showDescError"
        >
          <Input
            type="textarea" :rows="4" v-model="cover_desc"
            placeholder="说说你的拍摄经历" @on-focus="descOnFocus"
          >
          </Input>
        </FormItem>
        <FormItem label="标签">
          <Input>
            <Tag v-for="tag, index in tags" :key="index" closable @on-close="handleClose">tag</Tag>
          </Input>
        </FormItem>
      </Form>
      <Button class="publish-btn" @click="publish">发布</Button>
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
      tags: ['风光', '广州'],
      title: '',
      a_type: 'photography',
      cover_desc: '',
      cover_url: '',
      contents: [],
      titleError: '',
      showTitleError: false,
      descError: '',
      showDescError: false
    }
  },
  created: function () {
  },
  methods: {
    titleOnFocus: function () {
      this.showTitleError = false
      this.titleError = ''
    },
    descOnFocus: function () {
      this.showDescError = false
      this.descError = ''
    },
    onPhotoSelect: async function ($event) {
      let content = {
        'c_type': 'photo',
        'c_data': '',
        'uploading': true
      }
      const index = this.contents.length
      Vue.set(this.contents, index, content)
      const file = $event.target.files[0]
      const url = await this.uploadImage(file)
      if (url === '') {
        return
      }
      content.c_data = url
      content.uploading = false
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
    publish: async function () {
      if (this.title.trim() === '') {
        this.showTitleError = true
        this.titleError = '请输入标题'
        return
      }
      if (this.cover_desc.trim() === '') {
        this.showDescError = true
        this.descError = '请输入描述'
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
          this.$Message.warning('内容不能为空')
          return
        }
        if (content.uploading) {
          this.$Message.warning('图片正在上传，请稍等')
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
        this.$Message.error(data.msg)
      } else {
        this.$Message.success('success')
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
  font-size: 14px;
  font-weight: 500;
}
.layout-left {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 340px;
  height: 100%;
  overflow-y: auto;
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
.publish-btn {
  width: 100%;
  /*position: fixed;*/
  bottom: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  height: 48px;
  padding: 13px 0;
  border: 0;
  text-align: center;
  outline: 0;
  color: #fff;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 10px;
  text-indent: 10px;
  background-color: #5cadff;
  cursor: pointer;
  box-sizing: border-box;
}
.content-list {
  margin-top: 32px;
  margin-left: -40px;
  font-size: 0;
}

.content-item {
  position: relative;
  display: inline-block;
  width: 250px;
  height: 250px;
  margin-left: 40px;
  margin-bottom: 40px;
  vertical-align: top;
}

.content-item img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 250px;
  max-height: 250px;
  margin: auto;
}
.mask {
  position: absolute;
  left: 50%;
  top: 50px;
  transform: translate(-50%,-50%);
  border: 3px solid transparent;
  cursor: move;
}
.icon-close {
  position: absolute;
  right: 18px;
  top: 18px;
  display: none;
  width: 19px;
  height: 19px;
  padding-top: 4px;
  text-align: center;
  background-color: rgba(0,0,0,.5);
}
.upload-item {
  position: relative;
  display: inline-block;
  width: 250px;
  height: 250px;
  margin-left: 40px;
  margin-bottom: 40px;
  vertical-align: top;
}
.upload-photo, .uploading {
  height: 168px;
  padding: 47px 0;
  border: 2px solid #e0e0e0;
  margin: 41px 0;
  text-align: center;
  color: #85888a;
  font-size: 12px;
}
.icon-add {
  color: #e0e0e0;
}
.icon-add::before {
  content: "\e914";
  font-size: 32px;
}
.file-input {
  position: absolute;
  top: 41px;
  left: 0;
  width: 100%;
  height: 168px;
  opacity: 0;
  cursor: pointer;
}
</style>
