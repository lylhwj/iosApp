<template>
  <div id="page-bt" class="bg-grayc">
    <BHeader title="新建链接任务" @handle="hash=''" :type="headerType" :backType="1" :close="false"></BHeader>
    <div class="bg-yellow padding-20 font-24" style="background:#ffe6b0;color:#af8555;">
      请遵循<span class="blue" @click="openLinkTask">服务协议</span>！严禁存储、处理、传输、发布任何涉密、色情、暴力、侵权等违法违规信息！
    </div>
    <div class="padding-20">
      <textarea ref="focusTextarea" v-model="hash" placeholder="支持HASH值、磁力链，换行可添加多个"></textarea>
    </div>
    <div class="flex flex-center">
      <a class="btn-blue btn-big" @click.prevent="submit">添加</a>
    </div>
    <div class="scan-warpper flex-column flex-center" @click="scan">
      <img  src="@/assets/scanBt@2x.png" alt="">
    </div>
    <div class="pos-fixed w750" style="bottom:0.3rem;">
    <div class="flex flex-center">
      <div @click="hideFun" class="blue_ico blue_ico_mini"><span class="close"></span></div>
    </div></div>
    <div id="JS_bt_popup" class="w-pop">
      <div class="box-bg">
        <div class="pos-rel">
          <input class="font-30 border-all box-input" v-model="code" type="tel" placeholder="验证码">
          <img @click="changeImg" :src="codeImg" alt="" class="code-img">
        </div>
        <p class="margin-top-20 gray font-26">输入验证码后，可继续添加链接任务</p>
      </div>
      <div class="flex flex-around margin-top-30 border-top">
        <a class="btn-white btn-mediume" @click.prevent="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.prevent="codeSubmit">确认</a>
      </div>
    </div>
    <div id="JS_bt_popup2" class="w-pop">
      <div class="box-bg fct">
        <img style="width:4.4rem; height:3.56rem;" src="@/assets/icon_point_ram@2x.png" alt="" />
        <div class="fct margin-top-30">
          <img class="vmid" style="width:0.6rem; height:0.6rem;" src="@/assets/icon_warning.png" alt="" />
          <span class="font-32 margin-left-15">添加失败</span>
        </div>
        <p class="font-30 margin-top-20">网盘存储容量不足，请扩容</p>
        <div class="flex flex-center">
          <a class="btn-blue btn-big w460 margin-top-30" v-if="rlMsg" @click.prevent="jump('/paySpace')">马上扩容</a>
          <a class="btn-blue btn-big w460 margin-top-30" v-else @click.prevent="closePop();showVip=true;">马上升级</a>
        </div>
      </div>
    </div>
    <div  id="JS_bt_popup3" class="w-pop">
      <div class="flex flex-center"><img style="width: 6rem; height: 3.2rem;margin-top: .3rem;" src="@/assets/bg_cardbag_vip_home_point@2x.png"></img></div>
      <div class="box-bg fct" style="padding-top:0.3rem;">
        <p class="font-28">批量添加是年V会员的专属特权</p>
        <p class="font-28 margin-top-20">升级年V会员即可使用</p>
        <div class="flex flex-center">
          <a class="btn-orange btn-big w460 margin-top-30" @click.prevent="closePop();showVip=true;">升级VIP</a>
        </div>
      </div>
    </div> 
     <div id="JS_bt_popup4" class="w-pop">
      <div class="flex flex-center"><img style="width: 6rem; height: 3.2rem;margin-top: .3rem;" src="@/assets/bg_cardbag_vip_home_point@2x.png"></img></div>
      <div class="box-bg fct" style="padding-top:0.3rem;">
        <p class="font-28">没有平衡的盈利和支出就没有长久的服务</p>
        <p class="font-28 margin-top-20">升级VIP才可享有在线预览特权</p>
        <div class="flex flex-center">
          <a class="btn-orange btn-big w460 margin-top-30" @click.stop="closePop();showVip=true;">升级VIP</a>
        </div>
      </div>
    </div>
    <Popup v-model="showVip" :hide-on-blur="true">
      <DredgeVip @closeVip="showVip=false"></DredgeVip>
    </Popup> 
     <div id="JS_clipboard" class="w-pop">
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
        <a class="btn-blue btn-mediume" @click.prevent="closePop();hash=clipboard">添加</a>
      </div>
    </div>
    <div class="bg-guide3" v-if="showGuide" @click="showGuide=false;"></div>
    <div class="bg-c-guide" v-if="showGuide"></div>
  </div>
</template>
<script>
import BHeader from "@/components/BHeader";
import DredgeVip from "@/components/DredgeVip";
import { Popup } from "vux";
const magnet = require("magnet-uri");
export default {
  name: "BT",
  data() {
    return {
      hash: "",
      code: "",
      rlMsg: true,
      showVip: false,
      codeImg: "",
      type: 1,
      clipboard: "",
      showGuide: false
    };
  },
  computed: {
    headerType() {
      if (this.hash) {
        return 3;
      }
      return 1;
    }
  },
  components: {
    BHeader,
    Popup,
    DredgeVip
  },
  methods: {
    openLinkTask() {
      cordova.InAppBrowser.open(
        "http://vip.bianyue.cn/agreementLinkTask",
        "_blank",
        "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
      );
    },
    hideFun() {
      this.$router.back();
    },
    changeImg() {
      this.codeImg =
        "http://api.bianyue.cn/api.php?op=checkcode&code_len=4&font_size=13&width=80&height=26&" +
        Math.random();
    },
    submit() {
      if (!this.hash) {
        this.toast("请添加任务链接");
      } else {
        this.wLoading();
        $.ajax({
          type: "GET",
          url: `http://api.bianyue.cn/pan.php?op=init&action=addmagnet`,
          data: {
            topid: this.topid,
            hash: this.hash,
            os: "iphone",
            iphone: "true"
          },
          dataType: "jsonp",
          success: data => {
            if (data.status == 200) {
              this.setStorage("yunVersions", new Date().getTime());
              this.confirm({
                title: "添加成功",
                leftBtnText: "确定",
                rightBtnText: "查看详情",
                rightCallback: () => {
                  this.jump("/transfer");
                }
              });
            } else if (data.status == "check_code") {
              this.code = "";
              this.changeImg();
              this.openPop({
                dom: $("#JS_bt_popup")
              });
            } else if (
              data.status.indexOf("批量添加是年V会员的专属特权") !== -1
            ) {
              this.openPop({
                dom: $("#JS_bt_popup3"),
                close: true
              });
            } else if (data.status == "upgrade") {
              this.openPop({
                dom: $("#JS_bt_popup4"),
                close: true
              });
            } else if (data.is_vip === "1") {
              this.rlMsg = true;
              this.openPop({
                dom: $("#JS_bt_popup2"),
                close: true
              });
            } else if (data.is_vip === "0") {
              this.rlMsg = false;
              this.openPop({
                dom: $("#JS_bt_popup2"),
                close: true
              });
            } else {
              this.$vux.toast.show({
                text: data.status,
                type: "cancel"
              });
            }
          },
          complete: data => {
            this.wLoading({
              type: "hide"
            });
          }
        });
      }
    },
    codeSubmit() {
      if (!this.code) {
        this.toast("请输入验证码");
      } else {
        this.wLoading();
        $.ajax({
          type: "GET",
          url: `http://api.bianyue.cn/pan.php?op=init&action=addmagnet`,
          data: {
            topid: this.topid,
            hash: this.hash,
            iphone: "true",
            code: this.code
          },
          dataType: "jsonp",
          success: data => {
            if (data.status == 200) {
              this.setStorage("yunVersions", new Date().getTime());
              this.closePop();
              this.confirm({
                title: "添加成功",
                leftBtnText: "确定",
                rightBtnText: "查看详情",
                rightCallback: () => {
                  this.jump("/transfer");
                }
              });
            } else {
              this.$vux.toast.show({
                text: data.status,
                type: "cancel"
              });
            }
          },
          complete: data => {
            this.wLoading({
              type: "hide"
            });
          }
        });
      }
    },
    openClipboard() {
      let _this = this;
      let myHash = _this.getStorage("yun_hash");
      cordova.plugins.clipboard.paste(function(text) {
        const parsed = magnet.decode(text);
        if (myHash && myHash == text) {
          return false;
        } else if (parsed.infoHash) {
          _this.clipboard = text;
          _this.setStorage("yun_hash", text);
          if ($("#JS_clipboard").is(":hidden")) {
            _this.closePop();
            _this.openPop({
              dom: $("#JS_clipboard")
            });
          }
        } else if (/[a-fA-F0-9]{20,50}/.test(text)) {
          _this.clipboard = text;
          _this.setStorage("yun_hash", text);
          if ($("#JS_clipboard").is(":hidden")) {
            _this.closePop();
            _this.openPop({
              dom: $("#JS_clipboard")
            });
          }
        } else {
          return false;
        }
      });
    },
    goSetting() {
      this.confirm({
        title: "请在设置->边乐云打开相机权限",
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
    this.hideToTop();
    document.addEventListener("resume", this.openClipboard, false);
    // this.$refs.focusTextarea.focus();
  },
  created() {
    this.topid = this.$router.currentRoute.query.topid || 0;
    this.type = this.$router.currentRoute.query.type || 1;
    let myScanHash = this.getStorage("yun_scan_hash");
    this.hash = this.$router.currentRoute.query.myHash || "";
    let guide = this.$router.currentRoute.query.guide || "";
    if (this.type == 2 && myScanHash) {
      this.hash = myScanHash;
    }
    if (guide) {
      this.showGuide = true;
    }
  }
};
</script>
<style scoped>
#page-bt textarea {
  width: 100%;
  height: 4rem;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 8px;
}
#page-bt textarea::placeholder {
  color: #9b9b9b;
}
.scan-warpper {
  width: 2.666667rem;
  height: 2.666667rem;
  margin: 1.5rem auto;
}
.scan-warpper img {
  width: 2.666667rem;
  height: 2.666667rem;
  margin: 0 auto;
}
.bg-guide3 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../assets/bg_guide3@2x.png");
  background-size: cover;
  z-index: 100;
}
.bg-c-guide {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(0, 0, 0);
  opacity: 0.3;
  z-index: 99;
}
</style>
