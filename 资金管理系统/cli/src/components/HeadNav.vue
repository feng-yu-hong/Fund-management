<template>
  <header>
    <div class="head-nav">
      <div class="logo-container">
        <img src="../assets/logo.png" class="logo" />
        <span class="title">FX资金后台管理系统</span>
      </div>
      <div class="user">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar" />
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.phone}}</p>
          </div>
        </div>
        <span class="username">
          <!-- 下拉菜单 -->
          <el-dropdown trigger="click" @command="setDialogInfo">
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
    </div>
  </header>
</template>


<script>
export default {
  name: "head-nav",
  computed: {
    user() {
      console.log("132");
      console.log(this.$store.getters.user);
      return this.$store.getters.user;
    }
  },
  methods: {
    setDialogInfo(cmdItem) {
      // console.log(cmdItem);
      switch (cmdItem) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfoList() {
      this.$router.push("/infoshow");
    },
    logout() {
      //清除token
      localStorage.removeItem("eleToken");
      //清除vuex store
      this.$store.dispatch("clearCurrentState");
      //跳转
      this.$router.push("/login");
    }
  }
};
</script>



<style scoped>
.head-nav {
  width: 100%;
  /* min-width: 600px; */
  height: 60px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding:0 24px;
  box-sizing: border-box;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.logo {
  height: 50px;
  width: 50px;
}
.title {
  margin: 0 12px;
  font-size: 22px;
}
.user {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.userinfo {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.welcome {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  margin:0 12px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>