<template>
  <div>
    <Popup v-model="showFun" :hide-on-blur="true" :is-transparent="true" style="height:6.4rem;" @on-hide="hideFun">
      <div class="box_function h_oflow">
        <ul class="flex flex-around fct font-28 black margin-top-40 list_operate">
          <li class="touch_hover" @click="hideFun"><img class="w90" src="@/assets/function/btn_home_features9@2x.png" />上传文件
            <Upload  topid="0" @progress="progress" @start="startUpload" @success="uploadSuccess" ref="uploadFile"></Upload>
          </li> 
          <li class="touch_hover" @click="hideFun();jump(`/bt`)"><img class="w90"
              src="@/assets/function/btn_home_features10@2x.png" alt="">链接任务</li>
          <li class="touch_hover" @click="hideFun"><img class="w90" src="@/assets/function/btn_home_features12@2x.png" />上传相册
            <UploadPhoto topid="0" @progress="progress" @start="startUpload(2)" @success="uploadSuccess" ref="uploadFile2" uploadType="image"></UploadPhoto>
          </li>
        </ul> 
        <p class="fct margin-top-70 gray">&nbsp;</p>
        <div class="flex flex-center margin-top-60">
          <div @click="hideFun" class="blue_ico blue_ico_mini"><span class="close"></span></div>
        </div>
      </div>
    </Popup>
     <div id="JS_home_add_popup" class="w-pop" style="width: 2.666667rem;height: 2.666667rem;background: transparent;">
      <x-circle v-if="circleInit" :percent="percent" :stroke-width="6" :trail-width="6"
        :stroke-color="['#36D1DC', '#5B86E5']" trail-color="#ececec">
        <span style="color:#fff">{{ percent }}%</span>
      </x-circle>
      <div v-else></div>
    </div> 
  </div>
</template>

<script>
import { Popup, XCircle } from "vux";
import Upload from "@/components/Upload";
import UploadPhoto from "@/components/UploadPhoto";
export default {
  name: "HomeAdd",
  data() {
    return {
      showFun: false,
      percent: "",
      circleInit: false  
    };
  },
  components: {
    Popup,
    XCircle,
    Upload,
    UploadPhoto
  },
  props: [],
  methods: {
    // 显示功能栏
    goShowFun() {
      this.showFun = true;
      $(".vux-popup-mask").css(
        "background",
        "linear-gradient(to top, rgba(255,255,255,1) , rgba(255,255,255,0.9) 75% , rgba(255,255,255,0.75) 100%)"
      );
    },
    // 隐藏功能栏
    hideFun() {
      this.showFun = false;
      setTimeout(() => {
        $(".vux-popup-mask").css("background", "rgba(0, 0, 0, 0.3)");
      }, 300);
    },
    // 文件上传
    startUpload(type) {
      let _this = this;
      this.percent = 0;
      this.circleInit = true;
      this.openPop({
        dom: $("#JS_home_add_popup"),
        skin: "circle-layer",
        width: "2.666667rem",
        height: "2.8rem",
        end: () => {
          if (type == 2) {
            _this.$refs.uploadFile2.uploadCancel = true;
          } else {
            _this.$refs.uploadFile.uploadCancel = true;
          }
          _this.percent = 0;
          _this.circleInit = false;
        }
      });
    },
    progress(data) {
      this.percent = parseInt(data) || 0;
    },
    uploadSuccess() {
      this.percent = 0;
      this.circleInit = false;
    }
  },
  mounted() {},
  created() {
   
  }
};
</script>

<style>
</style>
