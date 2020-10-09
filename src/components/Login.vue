<template>
  <div>
    <div class="box">
      <div class="logo">Logo</div>
      <div class="title">欢迎回来</div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <el-form-item class="mail" prop="phone">
          <el-input
            placeholder="邮箱或手机"
            v-model="loginForm.phone"
            name="phone"
          ></el-input>
        </el-form-item>
        <el-form-item class="pwd" prop="password">
          <el-input type="password"
            placeholder="密码"
            v-model="loginForm.password"
            name="password"
          ></el-input>
        </el-form-item>
        <div class="rember">
          <div class="rember-pwd">
            <input
              type="checkbox"  @click="change($event)"            />记住我
            <a href="#">了解更多</a>
          </div>
        </div>
          <el-form-item class="login">
            <el-button type="info" @click="login">登录</el-button>
          </el-form-item>
      </el-form>
      <div class="forget-pwd">忘记密码</div>
      <router-link to="/register">
        <div class="toRegister">没有账号？立即加入</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkMobile = (rule, value, callback) => {
      // const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      const regMobile = /^1[3578]\d{9}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的手机号"));
    };
    return {
      loginForm: {
        phone: "",
        password: "",
      },
      loginFormRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      check: 'checked'
    };
  },
  created() {
    this.getData()
  },
  methods: {
    async login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const res = await this.$request.post("/login", {
          phone: this.loginForm.phone,
          password: this.loginForm.password,
        });
        console.log(res);
        if (res.status === 200) {
          this.$message.success("登录成功");
          this.$router.push('/home')
        } else if(res.status === 202) {
            this.$message.error(res.data)
        } else {
          this.$message.error("登录失败");
        }
        window.localStorage.setItem("token", res.data.token);
       
        
      });
    },
    getData() {
      this.loginForm.phone = window.localStorage.getItem('phone')
      this.loginForm.password = window.localStorage.getItem('password')
    },
    change(e) {
      console.log(e.target.checked);
      if(e.target.checked) {
        console.log('1');
      window.localStorage.setItem("phone", this.loginForm.phone);
        window.localStorage.setItem("password", this.loginForm.password);
      } else {
        console.log('2');
        window.localStorage.removeItem('phone')
        window.localStorage.removeItem('password')
      }
      console.log(e.target.checked);
    }
  },
};
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

.mail {
  position: absolute;
  top: 5.5rem;
  width: 100%;
  height: 4rem;
}
.pwd {
  position: absolute;
  top: 10rem;
  width: 100%;
}
.input,
.el-input__inner {
  border-radius: 0%;
}
.rember {
  position: absolute;
  top: 15rem;
  width: 100%;
  padding: 0.5rem 0;
  height: 2.5rem;
  line-height: 2.5rem;
  background: #fff;

  .rember-pwd {
    float: left;
  }
}

.login {
  position: absolute;
  top: 20rem;
  left: 3rem;
  width: 80%;

  .el-button {
    background-color: #f3f3f3;
    border: 1px solid #ccc;
    width: 100%;
    color: #000;
  }
}

.forget-pwd {
  position: absolute;
  top: 24rem;
  color: #fff;
  width: 100%;
}

.toRegister {
  position: absolute;
  top: 27rem;
  color: #fff;
  width: 100%;
}
</style>
