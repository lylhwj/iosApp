<template>
     <div class="fixed-btn">
      <div>
        <div class="flex flex-center w750 " @click="handle">
          <span class="btn-blue btn-big">{{text||'立即支付'}}</span>
        </div>
        <div class="flex flex-center margin-top-20" style="width:100%;">
          <div class="flex-column flex-center" style="height: .4rem;">
            <img class="icon-agree" src="@/assets/icon_agree@2x.png">
          </div>
          <div class="flex-column flex-center margin-left-10" style="height: .4rem;">
            <div class="flex"><span class="font-28">开通视为同意</span><span class="blue font-28" @click="open(1)">《服务协议》</span><span class="blue font-28" @click="open(2)">《隐私政策》</span></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "PayFooter",
  data() {
    return {};
  },
  props:['text'],
  methods: {
    handle() {
      this.$emit("handle", true);
    },
    open(type) {
      if (type == 1) {
        cordova.InAppBrowser.open(
          "http://vip.bianyue.cn/Agreementuser",
          "_blank",
          "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
        );
      } else {
        cordova.InAppBrowser.open(
          "http://yun.bianyue.cn/privacy.html",
          "_blank",
          "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
        );
      }
    }
  },
  created() {}
};
</script> 
<style scoped>
</style>
