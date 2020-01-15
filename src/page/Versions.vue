<template>
  <div>
    <Header title="版本更新"></Header>
    <div class="fct bg-grayc">
      <div class="bg_Versions font-48">v2.3.88</div>
    </div>
    <div class="flex flex-between align-center border-tb padding-32 bg-white" @click="open">
      <div><span class="font-30">当前版本主要更新内容</span>
        <p class="margin-top-10 font-26 gray">v2.3.88</p>
      </div>
      <img class="icon-63" src="@/assets/icon_nav_right@2x.png" />
    </div>
    <div class="copyright">Copyright©2017 - 2020 边乐云网盘 版权所有</div>
    <div class="flex flex-center w750 w-bottom" @click="submit">
      <a href="javascript:;" class="btn-blue btn-big">检查更新</a>
    </div> 
    <Alert title="已经是最新版本"></Alert> 
  </div>
</template>
<script>
import Header from "@/components/Header";
import Alert from "@/components/Alert"; 
export default {
  name: "Versions",
  data() {
    return {
      show: true
    };
  },
  components: {
    Header,
    Alert
  },
  methods: {
    open() {
      cordova.InAppBrowser.open(
        "http://help.bianyue.cn/bbgx/28.html",
        "_blank",
        "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
      );
    },
    submit() {
      this.openPop({
        dom: $("#JS_alert"),
        width: "60%"
      });
    }
  },
  mounted() {
  }
};
</script>
<style>
  .copyright{
    font-size: .3rem;
    text-align: center;
    color: #999;
    margin-top: 5.8rem;
  }
</style>

