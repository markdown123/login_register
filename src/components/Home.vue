<template>
  <div>
    <div class="box">
      <div class="logo">Logo</div>
      <div class="logout">
        <div class="clogout" @click="clear()">安全退出</div>
      </div>
      <div class="table">
        <span>用户列表</span>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column  prop="username" label="真实姓名" width="80">
          </el-table-column>
          <el-table-column prop="phone" label="手机" width="80">
          </el-table-column>
          <el-table-column prop="password" label="密码" width="120"> </el-table-column>
          <el-table-column prop="createdDate" label="注册时间" width="100"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {},
      tableData: [],
      clearToken: false,
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await this.$request.get('/current')
      console.log(res)
      var createdDate = res.data.createdDate.substr(0, 10)
      console.log(createdDate)
      var obj = {
        username: res.data.username,
        phone: res.data.phone,
        password: res.data.password,
        createdDate: createdDate
      }
      this.tableData.push(obj)
    },
    clear () {
      // 
      // window.localStorage.setItem('clearToken',true)
      this.clearToken = true
      if(this.clearToken) {
        window.localStorage.removeItem("token")
      }
      console.log('ddd');
      this.$router.push('/login')
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

  .logout {
    position: absolute;
    top: 2.5rem;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    color: #fff;
    text-align: right;

    .clogout {
      padding: 0.5rem 1rem;
      width: 30%;
      margin-left: 13rem;
    }
  }

  .table {
    position: absolute;
    top: 7rem;
    background-color: #fff;

    .el-table td, .el-table th {
      width: 1rem;
    }
  }
}
</style>
