<template>
  <div>
    <div class="title-bar" style="border: none;background: transparent;color: #fff;">
      <div class="back-warpper" @click.prevent="back">
        <img class="title-back" style="background:none;" src="@/assets/btm_center_backhome2@2x.png"> 
      </div>
      <span class="font-32">二维码</span> 
    </div>
    <img class="scan-warpper" src="@/assets/scan@2x.gif">  
  </div>
</template>
<script>
export default {
  name: "ScanCodeLogin",
  data() {
    return {};
  },
  components: {},
  methods: {
    back() {
      QRScanner.destroy();
      $("body").css("background", "#f3f3f3");
      this.$router.back();
    },
    // 扫一扫
    scan() {
      let _this=this;
      QRScanner.scan(displayContents);
      function displayContents(err, text) {
        if (err) {
          QRScanner.destroy();
          _this.toast("扫描错误");
          _this.back();
        } else {
          QRScanner.destroy();
          if(text.indexOf('magnet:?xt=urn:btih:')!==-1){ 
            $("body").css("background", "#f3f3f3");
            _this.setStorage('yun_scan_hash',text);
            _this.jump(`/bt?type=2`);
            return false;
          }
          let token = _this.getParam("token", text);
          $("body").css("background", "#f3f3f3");
          if(!token){
            _this.toast("无法识别该链接");
            _this.back();
            return false;
          }
          _this.jump(`/scanCodeLogin?token=${token}`);
        }
      }
      QRScanner.show();
    },
    // 获取参数
    getParam(param, url) {
      //获取url参数
      let reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
      let r = window.location.search.substr(1).match(reg);
      if (url) {
        r = url.substr(1).match(reg);
      }
      if (r != null) {
        return unescape(r[2]);
      } else {
        return null;
      }
    }
  },
  mounted() {
    this.hideToTop();
    $("body,html").css("background", "transparent");
  },
  created() {
    this.scan();
  }
};
</script>
<style scoped>
.scan-warpper {
  width: 6rem;
  height: 6rem;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -3rem;
  margin-left: -3rem;
}
</style>
