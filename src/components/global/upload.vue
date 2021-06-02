<template>
  <div class="box" :style="{'width': width + 'px'}">
    <div v-if="src" class="preivew-img" :style="{'width': width + 'px', 'height':height + 'px'}">
      <el-image :src="localUrl || src" fit="contain" class="image-box"></el-image>
      <div class="mask" v-if="!isDisabled">
        <i class="iconfont icon-delete" @click="deleteImg"></i>
      </div>
    </div>
    <label v-else :for="inputId">
      <div
        class="upload-area"
        :style="{'height':height + 'px'}">
      <i class="iconfont icon-add"></i>
      <slot></slot>
      </div>
    </label>
    <div v-if="showFileName" class="file-name">{{fileName}}</div>
    <input :id="inputId" :disabled="isDisabled" :accept="tansformType" style="display: none" @change="uploadChange" type="file"/>
  </div>
</template>
<script>
import { upload_func_private as privateUp, upload_func_public as publicUp } from '@/api/upload'
const uploadApi = {
  private: privateUp,
  public: publicUp
}
export default {
  props: {
    height: {
      type: String,
      default: '120'
    },
    width: {
      type: String,
      default: '120'
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: ''
    },
    showFileName: {
      type: Boolean,
      default: true
    },
    uploadType: {
      type: String,
      default: 'private'
    },
    accept: {
      type: Array,
      default () {
        return ['.png', '.jpeg', '.jpg']
      }
    }
  },
  computed: {
    tansformType () {
      return this.accept.join(',')
    },
    accountId () {
      return this.$store.state.userInfo.accountId
    }
  },
  data () {
    return {
      fileName: '',
      file: null,
      url: '',
      localUrl: '',
      inputId: 'upload' + Date.now()
    }
  },
  methods: {
    uploadChange (e) {
      let fileInfo = e.target.files[0]
      this.file = fileInfo
      this.fileName = fileInfo.name
      this.remoteUpload()
    },
    deleteImg () {
      this.localUrl = ''
      this.url = ''
      this.fileName = ''
      this.file = null
      this.$emit('update:src', '')
    },
    async remoteUpload () {
      if (!this.file) return
      let url = await uploadApi[this.uploadType]({
        file: this.file,
        accountId: this.accountId
      })
      if (url) {
        this.localUrl = window.URL.createObjectURL(this.file)
        this.url = url
        this.$emit('update:src', url)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.upload-area {
  cursor: pointer;
  display: flex;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px dotted #ccc;
  &:hover {
    border-color: @sys-theme;
  }
}
.file-name {
  font-size: 12px;
  color: #ccc;
  padding: 5px;
}
.box {
  display: inline-block;
}
.image-box {
  width: 100%;
  height: 100%;
}
.preivew-img {
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border: 1px dotted #ccc;
  .mask {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    color: #fff;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    .mask {
      display: flex;
    }
  }
}
.icon-delete {
  font-size: 30px;
}
.icon-add {
  font-size: 50px;
  color: #ccc;
}
</style>
