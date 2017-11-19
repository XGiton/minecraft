<template>
  <div id="header">
    <Menu @on-select="onMenuSelect" mode="horizontal" theme="light">
      <div class="logo"></div>
      <div class="nav">
        <MenuItem name="photography">
          <Icon type="videocamera"></Icon>
          摄影
        </MenuItem>
        <MenuItem name="program">
          <Icon type="wineglass"></Icon>
          编程
        </MenuItem>
        <MenuItem name="essay">
          <Icon type="ios-analytics"></Icon>
          散文
        </MenuItem>
      </div>
      <div class="create-btn-wrapper">
        <Button @click="onCreateBtnClick" type="ghost" shape="circle" icon="edit">新建</Button>
      </div>
    </Menu>
  </div>
</template>

<script>
export default {
  methods: {
    onMenuSelect: function (name) {
      this.$router.push(`/` + name)
    },
    onCreateBtnClick: function () {
      this.$router.push('/article/create')
    }
  }
}
</script>

<style scoped>
.logo{
  width: 100px;
  height: 30px;
  background: white;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
  margin-right: 60px;
}
.nav{
  float: left;
}

.create-btn-wrapper {
  float: right;
  margin-right: 60px;
  vertical-align: middle;
}
</style>
