<template>
  <div>
    <div class="box">
      <div class="logo">Logo</div>
      <div class="title">立即免费加入</div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" >
        <el-form-item class="userName" prop="username">
          <el-input placeholder="真实姓名" v-model="loginForm.username" name="username"></el-input>
        </el-form-item>
        <el-form-item class="phone" prop="phone">
          <el-input placeholder="手机" v-model="loginForm.phone" name="phone"></el-input>
        </el-form-item>
        <el-form-item class="pwd" prop="password">
          <el-input type="password" placeholder="密码" v-model="loginForm.password" name="password"></el-input>
        </el-form-item>
        <div class="message">
          点击“同意加入”，即表示您同意遵守《用户协议》，《隐私政策》及《Cookie政策》
        </div>
          <el-form-item class="agree">
            <el-button type="primary" @click="register">同意并加入</el-button>
          </el-form-item>
      </el-form>
      <router-link to="/login">
        <div class="toLogin">已有账号？立即登录</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var checkMobile = (rule, value, callback) => {
      // const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      const regMobile = /^1[3578]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的手机号'))
    }
    return {
      loginForm: {
        username: '',
        phone: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async register () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const res = await this.$request.post('/register', {
          username: this.loginForm.username,
          phone: this.loginForm.phone,
          password: this.loginForm.password
        })
        console.log(res)
        if (res.status === 200) {
          this.$message.success('注册成功')
          this.$router.push('/login')
        } else if (res.status === 201) {
          this.$message.error(res.data)
        } else {
          this.$message.error('注册失败')
        }
      })
      // const res = this.$request.get('/test')
      // console.log(res);
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  position: relative;
  width: 23rem;
  height: 35rem;
  background-color: #199ed8;
  border: 1px solid #000;
  margin: 0 auto;

  .logo {
    position: absolute;
    top: 0;
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    background-color: #fff;
  }

  .title {
    position: absolute;
    top: 3rem;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    color: #fff;
  }
}

.userName {
  position: absolute;
  top: 5.5rem;
  width: 100%;
  height: 4rem;
}
.phone {
  position: absolute;
  top: 10rem;
  width: 100%;
}
.pwd {
  position: absolute;
  top: 14.5rem;
  width: 100%;
}

.message {
  position: absolute;
  top: 20rem;
  color: #fff;
}

.agree {
  position: absolute;
  top: 24rem;
  left: 3rem;
  width: 80%;

  .el-button {
    border: 1px solid #fff;
    width: 100%;
  }
}

.toLogin {
  position: absolute;
  top: 29rem;
  color: #fff;
  width: 100%;
}
</style>
