
<template>
  <div class="head_gray" style="background:#fff;border-bottom:none;">
      <i class="fl head_back" @click.prevent="back" title="返回"></i>
      <i class="fl head_close" title="关闭" @click="close"></i>
      <div class="head_title">{{title}}</div>
      <a class="fr head_more"  @click="changeDisplay" title="列表"></a> 
      <router-link v-if="page=='lixian'" to="transfer?slip=no" class="fr head_chuanshu"></router-link>
      <router-link v-if="page=='lixian'" to="search?slip=no" style="background-position-x: right;" class="fr head_search"></router-link> 
  </div>
</template>

<script>
import { Popover } from "vux";
export default {
  name: "FileHeader",
  data() {
    return {
       
    };
  },
  components: {
    Popover
  },
  props: ["title", "type", "text", "page","display"],
  methods: {
    back() {
      this.$router.back();
    },
    close() {
      this.jump("/home?slip=no");
    },
    showFun() {
      let $fun = $("#JS_header_fun");
      $fun.fadeToggle();
    },
    changeDisplay() {  
      this.$emit("change", true);
    },
    goSetting() {
      this.confirm({
        title: "请在设置->边乐云打开权限",
        rightBtnText: "设置",
        rightCallback: () => {
          QRScanner.openSettings();
        },
        width: "70%"
      });
    },
    // 扫一扫
    scan() {
      let _this = this;
      QRScanner.prepare(onDone); // show the prompt
      function onDone(err, status) {
        if (err) {
          if (err.code == 1) {
            _this.goSetting();
          } else {
            _this.toast("扫描失败");
          }
        } else {
          if (status.authorized) {
            _this.jump("/scan");
          } else if (status.denied) {
            _this.goSetting();
          } else {
            _this.goSetting();
          }
        }
      }
    }
  },
  mounted() {
    document.addEventListener(
      "click",
      () => {
        let $fun = $("#JS_header_fun");
        $fun.fadeOut();
      },
      false
    );
  },
  created() {}
};
</script>

<style>
</style>