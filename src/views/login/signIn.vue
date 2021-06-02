<template>
  <div class="login-box">
    <div class="form-box">
      <div class="form-title">账号密码登录</div>
      <div class="form-data">
        <el-form ref="form" :model="formData" label-width="0px" :rules="rules">
          <el-row>
            <el-col :span="24">
              <el-form-item prop="userName">
                <el-input
                  ref="usernameInput"
                  v-model="formData.userName"
                  placeholder="账号">
                  <i slot="prefix" class="iconfont icon-zhanghao icon-style"></i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="password">
                <el-input
                  ref="passwordInput"
                  v-model="formData.password"
                  @keyup.native.enter="loginBtn"
                  placeholder="密码" :type="isShowPW">
                  <i slot="prefix" class="iconfont icon-mima icon-style"></i>
                  <i slot="suffix" :class="pwIcon" @click="isHide=!isHide"></i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="login-btn" @click="loginBtn">登录</div>
      </div>
    </div>
  </div>
</template>
<script>
import { goLogin } from '@/api/user'
import storage from '@/util/storage'
export default {
  data () {
    return {
      formData: {
        userName: '',
        password: ''
      },
      isHide: true,
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_]{6,32}$/, message: '账号长度6~32位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_]{6,32}$/, message: '密码长度6~32位', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    pwIcon () {
      return this.isHide ? 'iconfont cusor icon-hide' : 'iconfont cusor icon-show'
    },
    isShowPW () {
      return this.isHide ? 'password' : 'text'
    }
  },
  created () {
    let username = storage.getStorage('username')
    if (username) {
      this.formData.userName = username
    }
  },
  mounted () {
    if (this.formData.userName) {
      this.$refs.passwordInput.focus()
    } else {
      this.$refs.usernameInput.focus()
    }
  },
  methods: {
    async loginBtn () {
      let isPass = true
      this.$refs.form.validate(valid => (isPass = valid))
      if (isPass) {
        let { result } = await goLogin({
          ...this.formData
        })
        // 登录成功
        if (result) {
          // 保存token
          storage.setStorage('token', result.token)
          // 保存用户名
          storage.setStorage('username', this.formData.userName)
          this.$store.commit('saveToken', result.token)
          let tempPath = this.$route.query.redirect
          if (tempPath) {
            let path = decodeURIComponent(tempPath)
            if (path !== '/') {
              window.open(path, '_self')
              return
            }
          }
          window.open('/', '_self')
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url('../../assets/login-bg.png') center no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cusor {
  cursor: pointer;
}
.form-title {
  color: @sys-theme;
  font-size: 16px;
  padding: 10px 0;
  display: inline-block;
  border-bottom: 2px solid @sys-theme;
  margin-bottom: 20px;
}
.form-data {
  width: 450px;
  margin-bottom: 100px;
}
.login-btn {
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  padding: 10px 0;
  color: #fff;
  text-align: center;
  background-color: @sys-theme;
}
@media only screen and(max-width:1200px) {
  .form-data {
    width: 380px;
  }
}
@media only screen and(min-width:1920px) {
  .form-data {
    width: 500px;
  }
}
</style>
