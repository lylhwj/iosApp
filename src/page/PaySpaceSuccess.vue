<template>
  <div>
        <div class="head_gray">
        <div class="head_title">购买成功</div>
    </div>
    <div class="flex flex-center margin-top-70">
      <img class="icon-pay-vip-success" src="@/assets/bg_cardbag_paysuccess@2x.png">
    </div>
    <div class="flex flex-center margin-top-30">
      <img class="icon-point-success" src="@/assets/jfendagou@2x.png">
      <div class="margin-left-10 flex-column flex-center" style="height: .893333rem;"><span class="green font-40">充值成功</span></div>
    </div>
    <div class="flex flex-center margin-top-10">
      <span class="gray font-32">已将{{space}}T空间卡收入您的卡券包中</span>
    </div>
    <div class="flex flex-center w750 margin-top-60">
      <a href="javascript:;" @click="goCoupon" class="w500 btn-blue btn-big">查看卡券包</a>
    </div>
    <div class="flex flex-center w750 margin-top-60">
      <a href="javascript:;" @click="goUser" class="w500 btn-blue btn-big">用户中心</a>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";
export default {
  name: "spaceSuccess",
  data() {
    return {
      space: 1
    };
  },
  components: {
    Header
  },
  methods: {
    goCoupon(){ 
       this.jump("/coupon");
    },
    goUser() {
      this.jump("/user?back=lixian");
    }
  },
  created() {
    let price = this.$router.currentRoute.query.price;
    if (price == 50) {
      this.space = 1;
    } else if (price == 80) {
      this.space = 2;
    } else if (price == 100) {
      this.space = 3;
    }
  }
};
</script>
<style scoped>
</style>
