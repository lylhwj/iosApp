<template>
  <div class="bg-white w-lixian">
    <BHeader id="JS_play_header" title="播放列表"></BHeader>
    <div class="JS_play_list" style="position:relative;">
      <ViewBox class="bg-white">
        <div style="position:absoulte;top:0;">
          <div class="gray padding-top-88" v-if="dataList.length==0&&!loading">
            <p class="margin-top-20 margin-bottom-20 text-center"><img width="50%" src="@/assets/bg_empty_lixian@2x.png"
                alt=""></p>
            <p class="text-center">空空如也…</p>
          </div>
          <div class="flex  padding-32 border-bottom border-color-gray"
            v-for="data in dataList" :key="data.id" @click="playId=data.id;play(1)">
            <div>
              <img class="icon-90" src="@/assets/type/icon_files57@2x.png" />
            </div>
            <div class="w-col-18 margin-left-20 flex-column flex-center" style="height:1.2rem;"> 
                <span class="font-31 black-4 w-title" style="width: 6.5rem">{{data.title}}</span> 
            </div>
            <!-- <div style="height:1.2rem;width:1rem;visibility: hidden;" class="flex-column flex-center">
              <img style="width: .533333rem;height: .373333rem;margin: 0 auto;" src="@/assets/handle@2x.png" />
            </div> -->
          </div>
        </div>
      </ViewBox>
    </div>

    <div id="JS_play_popup" class="w-pop">
      <div class="box-bg">
        <div class="pos-rel">
          <input class="font-30 border-all box-input" v-model="checkCode" type="tel" placeholder="验证码">
          <img @click="changeImg" :src="codeImg" alt="" class="code-img">
        </div>
        <p class="margin-top-20 gray font-26">输入验证码后，可继续播放</p>
      </div>
      <div class="flex flex-around margin-top-30 border-top">
        <a class="btn-white btn-mediume" @click.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.stop="play(2)">确认</a>
      </div>
    </div>
  </div>
</template>
<script>
import BHeader from "@/components/BHeader";
import api from "@/api/index";
import { ViewBox } from "vux";
export default {
  name: "PlayList",
  data() {
    return {
      dataList: [], //列表数据
      hash: 0,
      fid: "",
      loading: true,
      // 播放
      playData: {},
      playId: "",
      checkCode: "",
      codeImg: ""
    };
  },
  components: {
    BHeader,
    ViewBox
  },
  methods: {
    play(type) {
      let params = {
        hash: this.hash,
        id: this.playId,
        p: 0,
        f: this.fid
      };
      if (type == 2 && !this.checkCode) {
        this.toast("请输入图形验证码");
        return false;
      } else if (type == 2) {
        params.code = this.checkCode;
      }
      this.wLoading();
      this.GET({
        api: "/pan.php?op=iphoneplay",
        jsonp:true,
        alertErr: "no",
        data: params,
        success: response => {
          this.wLoading({
            type: "hide"
          });
          this.checkCode = "";
          if (response.status == 200) {
            let font = $("html").css("font-size");
            let _this = this;
            this.closePop();
            let videoUrl = response.data;
            let options = {
              successCallback: function() {
                _this.toast("Video was closed without error.");
              },
              errorCallback: function(errMsg) {
                _this.toast(errMsg);
              },
              orientation: "landscape",
              shouldAutoClose: true, // true(default)/false
              controls: true // true(default)/false. Used to hide controls on fullscreen
            };
            window.plugins.streamingMedia.playVideo(videoUrl, options);
            $("html").css("font-size", font);
            $(window).on("resize", () => {
              $("html").css("font-size", font);
            });
          } else if (response.status == "check_code") {
            let $dom = $("#JS_play_popup");
            this.openPop({
              dom: $dom
            });
            this.changeImg();
          } else if (response.status == "验证码错误！") {
            let $dom = $("#JS_play_popup");
            this.openPop({
              dom: $dom
            });
            this.changeImg();
            if (type == 2) {
              this.$vux.toast.show({
                text: response.status,
                type: "cancel"
              });
            }
          } else {
            this.$vux.toast.show({
              text: response.status,
              type: "cancel"
            });
          }
        }
      });
    },
    changeImg() {
      this.codeImg =
        "http://api.bianyue.cn/api.php?op=checkcode&code_len=4&font_size=13&width=80&height=26&" +
        Math.random();
    }
  },
  mounted() {
    this.hideToTop();
    $(window).unbind("resize");
    $(".JS_play_list").height(
      $(window).height() - $("#JS_play_header").height() - 5
    );
  },
  created() {
    this.hash = this.$router.currentRoute.query.hash || 0;
    this.fid = this.$router.currentRoute.query.fid || 0;
    this.dataList = JSON.parse(this.getStorage("yun_play_list"));
  }
};
</script>
<style scoped>
</style>
