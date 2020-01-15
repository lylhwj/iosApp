<template>
  <div>
    <!-- <div class="touch-warpper" v-swipeleft="{fn:vuetouch,name:'left'}" v-swiperight="{fn:vuetouch,name:'right'}"> -->
    <transition :name="transitionName">
      <navigation>
        <router-view class="app-warpper" />
      </navigation>
    </transition>
    <!-- </div> -->
    <Loading></Loading>
<div id="JS_clipboard2" class="w-pop">
      <div class="border-bottom padding-24 ">
        <div class="text-center margin-top-20 font-30">
          是否载入剪切板链接:
        </div>
        <p class="text-center padding-24" style="width: 6.666667rem;word-wrap:break-word;">
          {{clipboard}}
        </p>
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.prevent="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.prevent="closePop();toBT()">添加</a>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/public.css";
import "@/assets/icon.css";
import "@/assets/cube.css";
import "@/assets/main.css";
import "@/assets/layer/layer.css";
import Loading from "@/components/Loading";
const magnet = require("magnet-uri");
export default {
  name: "App",
  components: {
    Loading
  },
  data() {
    return {
      transitionName: "fade", 
      clipboard: ""
    };
  },
  methods: {
    vuetouch(s, e) {
      if (s.name == "right") {
        this.$router.back();
      }
    },
    openClipboard() {
      if (this.$router.currentRoute.name == "BT"||!this.userInfo.userid) { 
        return false;
      }
      let _this = this;
      let myHash = _this.getStorage("yun_hash"); 
      cordova.plugins.clipboard.paste(function(text) {
        const parsed = magnet.decode(text);
        if (myHash && myHash == text) { 
          return false;
        } else if (parsed.infoHash) { 
          _this.clipboard = text;
          _this.setStorage("yun_hash", text);
          if ($("#JS_clipboard2").is(":hidden")) {
            _this.closePop();
            _this.openPop({
              dom: $("#JS_clipboard2")
            });
          }
        } else if (/[a-fA-F0-9]{20,50}/.test(text)) { 
          _this.clipboard = text;
          _this.setStorage("yun_hash", text);
          if ($("#JS_clipboard2").is(":hidden")) {
            _this.closePop();
            _this.openPop({
              dom: $("#JS_clipboard2")
            });
          }
        } else { 
          return false;
        }
      });
    },
    toBT(){
      this.jump(`/bt?myHash=${this.clipboard}`);
    }
  },
  created() {
    this.setStorage("yun_show_activity", "true");
    // bind event
    this.$navigation.on("forward", (to, from) => {  
      if(to.route.name=="User"&&from.route.name == "Recycle"){
        this.transitionName = "slide-right";
        return false;
      }
      if (from.route && to.route) {  
        if (to.route.query.slip == "no") { 
          this.transitionName = "";
        } else if (to.route.name == "BT") {
          this.transitionName = "slide-top";
        } else {
          this.transitionName = "slide-left";
        }
      } else {
        this.transitionName = "slide-left";
      }
    });
    this.$navigation.on("back", (to, from) => { 
      if (from.route.name == "BT") {
        this.transitionName = "slide-bottom";
      }else if(from.route.name == "Favorites2"||from.route.name == "Transfer"){
        this.transitionName = "";
      } else {
        this.transitionName = "slide-right";
      } 
    });
    this.$navigation.on("replace", (to, from) => {});
    this.$navigation.on("refresh", (to, from) => {});
    this.$navigation.on("reset", () => {});
    // and use [once, off] methods
    this.$navigation.once("forward", () => {});
    const off = () => {};
    this.$navigation.on("forward", off);
    this.$navigation.off("forward", off);
  },
  mounted() {
    document.addEventListener(
      "deviceready",
      () => {
        StatusBar.styleDefault();
        this.setStorage("device_uuid", device.uuid);
        this.setStorage("device_model", device.model);
      },
      false
    );
    $("#layuicss-layer").remove();
    document.addEventListener("resume", this.openClipboard, false);
  }
};
</script>

<style>
.touch-warpper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.app-warpper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-right-enter,
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-100%, 0);
}

.slide-top-enter {
  opacity: 1;
  transform: translate(0, 100%);
}

.slide-bottom-enter {
  opacity: 1;
}

.loading-warpper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: none;
}

.w-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  display: none;
}

.w-loading {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 2.88rem;
  height: 2.88rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  pointer-events: auto;
  border-radius: 5px;
  text-align: center;
  margin: -1.44rem 0 0 -1.44rem;
}
</style>
