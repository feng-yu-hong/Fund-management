<template>
  <div class="home">
    <HeadNav class="header"></HeadNav>
    <LeftMenu class="leftMenu"></LeftMenu>
    <!-- <div class="rightContainer">
      <router-view class="routerView"></router-view>
    </div> -->
    <router-view class="routerView"></router-view>
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav";
import LeftMenu from "../components/LeftMenu";

export default {
  name: "Home",
  components: {
    HeadNav,
    LeftMenu
  }
};
</script>

<style>
.home {
  width: 100%;
  float: left;
  position: relative;
}
.header{
  width: 100%;
  float: left;
}
.leftMenu {
  width:30%;
  float: left;
  position: relative;
  z-index: 999999;
}
.routerView{
  width: 100%;
  position: absolute;
  right: 0;
  top: 120px;
  /* z-index: 999999; */
}
.rightContainer{
  position: relative;
  top:0;
  left: 190px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>>


