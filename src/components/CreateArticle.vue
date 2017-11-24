<template>
  <div id="create-article">
    <div class="layout-left">
      <ul class="content-list">
        <li class="content-item" v-for="content, index in contents" :key="index">
          <img :src="content.c_data">
          <div class="mask" style="width: 186px; height: 270px;">
            <a class="icon-close"></a>
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
          <input type="file" class="file-input" multiple_accept="image/jpeg,image/jpg">
        </li>
      </ul>
    </div>
    <div class="layout-right">
      <Form label-position="top">
        <FormItem label="标题">
          <Input v-model="title"></Input>
        </FormItem>
        <FormItem label="作品描述">
          <Input
            type="textarea" :rows="4" v-model="cover_desc"
            placeholder="说说你的拍摄经历">
          </Input>
        </FormItem>
        <FormItem label="标签">
          <Input>
            <Tag v-for="tag in tags" closable @on-close="handleClose">tag</Tag>
          </Input>
        </FormItem>
      </Form>
      <Button class="publish-btn">发布</Button>
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
      contents: [
        {
          c_data: 'https://photo.tuchong.com/1669085/l/21008324.webp'
        },
        {
          c_data: 'https://photo.tuchong.com/1669085/l/21008339.webp'
        },
        {
          c_data: 'https://photo.tuchong.com/1669085/l/21008338.webp'
        }
      ],
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
.upload-photo {
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
