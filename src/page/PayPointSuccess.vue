<template>
  <div>
    <div class="head_gray">
        <div class="head_title">充值成功</div>
    </div>
    <div class="flex flex-center margin-top-70">
      <img class="icon-pay-vip-success" src="@/assets/icon_jfen_pig@2x.png">
    </div>
    <div class="flex flex-center margin-top-30">
      <img class="icon-point-success" src="@/assets/jfendagou@2x.png">
      <div class="margin-left-10 flex-column flex-center" style="height: .893333rem;"><span class="green font-40">充值成功</span></div>
    </div>
    <div class="flex flex-center margin-top-10">
      <span class="gray font-32">系统已将{{price*10}}积分积存入您的账户中</span>
    </div>
    <div class="flex flex-center w750 margin-top-60">
      <a href="javascript:;" @click="goDh" class="w500 btn-blue btn-big">马上兑换</a>
    </div>
    <div class="flex flex-center w750 margin-top-60">
      <a href="javascript:;" @click="goUser" class="w500 btn-blue btn-big">用户中心</a>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  name: "paySuccess",
  data() {
    return {
      price: 0
    };
  },
  components: {
    Header
  },
  methods: {
    goDh(){ 
       this.jump("/exchange");
    },
    goUser() {
      this.jump("/user?back=lixian");
    }
  },
  created() {
    this.price = this.$router.currentRoute.query.price || 0;
  }
};
</script>
<style scoped>
</style>
