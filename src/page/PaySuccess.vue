<template>
  <div>
    <div class="head_gray">
        <div class="head_title">支付成功</div>
    </div>
    <div class="flex flex-center margin-top-70">
      <img class="icon-pay-vip-success" src="@/assets/icon_pay_vip_success@2x.png">
    </div>
    <div class="flex flex-center margin-top-30">
      <img class="icon-point-success" src="@/assets/jfendagou@2x.png">
      <div class="margin-left-10 flex-column flex-center" style="height: .893333rem;"><span class="green font-40">充值成功</span></div>
    </div>
    <div class="flex flex-center margin-top-10">
      <span class="gray font-32">恭喜！您已成我们尊贵的VIP会员！</span>
    </div>
    <div class="flex flex-center w750 margin-top-60">
      <a href="javascript:;" @click="goLixian" class="w500 btn-blue btn-big">马上盘它</a>
    </div>
  </div>
</template>
<script>
  //import Header from "@/components/Header";
  export default {
    name: "paySuccess",
    data() {
      return {

      };
    },
    components: {
      //Header
    },
    methods: {
      goLixian(){ 
        this.jump('/lixian');
      }
    },
    created() {}
  };

</script>
<style scoped>
.head_back { display: none;}
</style>
