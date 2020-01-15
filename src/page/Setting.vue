<template>
  <div class="bg-grayc">
    <Header title="设置"></Header>
    <p class="padding-20 gray">边乐升级</p>
    <router-link class=" touch_hover" href="javascript:;" to="versions"><div class="list-bar" to="versions">
      <div class="flex">
        <span>版本更新</span>
      </div>
      <span class="gray">v2.3.88</span>
    </div></router-link>
    <div class="flex flex-center w750 w-bottom" @click="logout">
      <a href="javascript:;" class="btn-gray2 btn-big" style=" border-color:#f0f0f0; background:#f0f0f0">退出登录</a>
    </div>
    <!-- 
    <div class="flex flex-around">
      <div class="fct box-shadow set-list">
        <img src="@/assets/btn_set_frid@2x.png" alt="">
        <p class="padding-15">邀请好友</p>
        <p class="orange">立即发送</p>
      </div>
      <div class="fct box-shadow set-list">
        <img src="@/assets/btn_set_cache@2x.png" alt="">
        <p class="padding-15">清除缓存</p>
        <p class="orange">818.01MB</p>
      </div>
    </div> -->
    <!--
    <div class="box-pop">
      <div class="box-bg">
        <div class="flex flex-center margin-top-30"><img style="width:3.84rem; height:3.84rem;" src="@/assets/aa_test.jpg" /></div>
        <div class="flex flex-center margin-top-30"><img style="width:5.12rem; height:2.32rem;" src="@/assets/icon_set_send_frid@2x.png" /></div>  
      </div>
      <div class="flex flex-center"><img style="width:1.2rem; height:2.907rem;" src="@/assets/icon_btn_set_shut@2x.png" /></div>
    </div> 二维码弹出框 -->
  </div>
</template>
<script>
import Header from "@/components/Header";
import api from "@/api/index";
export default {
  name: "Setting",
  data() {
    return {};
  },
  components: {
    Header
  },
  methods: {
    logoutAjax() {
      api.logout().then(response => {
        this.wLoading({ text: "退出登录中..." });
        setTimeout(() => {
          this.jump("/login");
        }, 1500);
      });
    },
    // 退出登录
    logout() {
      api.isPass().then(response => {
        if (response.required_set_password) {
          this.confirm({
            title: "你还没有设置密码,为方便登录，请设置一个密码吧！",
            leftBtnText: "仍要退出",
            leftCallback: () => {
              this.logoutAjax();
            },
            rightBtnText: "设置密码",
            rightCallback: () => {
              this.jump("/settingPassword");
            },
            width: "75%"
          });
        } else {
          this.confirm({
            title: "确定退出登录?",
            rightCallback: () => {
              this.logoutAjax();
            }
          });
        }
      });
    }
  }
};
</script>
<style>
</style>
