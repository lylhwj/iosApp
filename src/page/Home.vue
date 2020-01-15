<template>
  <div class="bg-grayc">
    <FooterNav id="JS_home_footer" @homeAdd="homeAdd" page="home"></FooterNav>
    <div id="JS_home_header" class="flex flex-between align-center home_head">
      <div class="flex align-center">
        <div class="pos-rel margin-right-20">
          <img class="usre_img" :src="userImg" onerror="this.src='http://api.bianyue.cn/nophoto.gif'">
          <div v-if="userInfo.vip==2" class="usre_vipico">
            <p v-if="userInfo.vip_type==2"><img src="@/assets/icon_vip_year@2x.png" alt=""></p>
            <p v-else-if="userInfo.vip_type==1"><img src="@/assets/icon_vip_month@2x.png" alt=""></p>
            <p v-else><img src="@/assets/icon_vip_old@2x.png" alt=""></p>
          </div>
        </div>
        <div>
          <p class="fd font-34" v-if="userInfo.mobile_all">{{userInfo.mobile_all}}</p>
          <!--手机-->
          <p class="fd font-34" v-else>{{userInfo.username}}</p>
          <!--用户名-->
          <p class="fd font-28 gray margin-top-5">ID:{{userInfo.userid}}</p>
        </div>
      </div>
      <div class="flex align-center">
        <router-link to="message" class="pos-rel head_msg"><span class="font-22" v-if="totalMsg>0">{{totalMsg}}</span>
        </router-link>
        <a href="javascript:;" @click.prevent.stop="showFun" class="head_more"></a>
      </div>
      <div id="JS_header_fun" class="fct head_more_box disn" style="top:1.5rem;">
        <p class="flex align-center" @click="scan"><img src="@/assets/icon_top_scan@2x.png" alt=""><span>扫一扫</span>
        </p>
        <p>
          <router-link class="flex align-center" to="help"><img src="@/assets/icon_top_help@2x.png"
              alt=""><span>帮助中心</span></router-link>
        </p>
      </div>
    </div><!-- 头部 -->

    <div id="JS_home">
      <ViewBox class="box_home">
        <div class="flex flex-between align-center box_search">
          <router-link to="search" class="search_btn">搜索文件</router-link>
          <router-link to="sign" class="blue font-28 flex align-center"><img class="icon-40 margin-right-15"
              src="@/assets/new/icon_home_qiandao@.png" alt="">签到</router-link>
        </div>
        <div class="home_list">
          <router-link to="file?slip=no">
            <div class="flex flex-between align-center">
              <p class="flex align-center">
                <img class="ico" src="@/assets/new/icon_home_file@.png" alt="">
                <span class="font-36 fd">文件</span>
              </p>
              <img class="next" src="@/assets/new/icon_home_next@.png" alt="">
            </div>
          </router-link>
          <div class="process_bar">
            <div class="process">
              <p class="ts-5" :style="{'width':userFileData.baifenbi+'%'}"></p>
            </div>
            <div class="fd font-26">{{userFileData.baifenbi+'%'}}<span
                class="gray padding-left-10">({{userFileData.userallsize}})</span><span
                class="gray fr">{{userFileData.allsize}}</span></div>
          </div>
        </div>
        <div class="home_list" >
          <router-link to="photo?slip=no">
            <div class="flex flex-between align-center">
              <p class="flex align-center">
                <img class="ico" src="@/assets/new/icon_home_pic@.png" alt="">
                <span class="font-36 fd">相册</span>
              </p>
              <img class="next" src="@/assets/new/icon_home_next@.png" alt="">
            </div>
          </router-link>
          <div class="process_bar">
            <div class="process">
              <p class="ts-5" :style="{'width':userPhotoData.baifenbi+'%'}"></p>
            </div>
            <div class="fd font-26">{{userPhotoData.baifenbi+'%'}} <span
                class="gray padding-left-10">({{userPhotoData.userallsize}})</span><span
                class="gray fr">{{userPhotoData.allsize}}</span></div>
          </div>
        </div>
        <div class="home_list">
          <router-link to="lixian?slip=no">
            <div class="flex flex-between align-center">
              <p class="flex align-center">
                <img class="ico" src="@/assets/new/icon_home_cloud@.png" alt="">
                <span class="font-36 fd">云下载</span>
              </p>
              <img class="next" src="@/assets/new/icon_home_next@.png" alt="">
            </div>
          </router-link>
          <div class="process_bar">
            <div class="process">
              <p class="ts-5" :style="{'width':userPanData.baifenbi+'%'}"></p>
            </div>
            <div class="fd font-26">{{userPanData.baifenbi+'%'}} <span
                class="gray padding-left-10">({{userPanData.userallsize}})</span><span
                class="gray fr">{{userPanData.allsize}}</span></div>
          </div>
        </div>
      </ViewBox>
    </div>
    <div id="JS_home_bottom" class="bg-grayc" style="height: 1.066667rem;"></div>
    <Activity id="JS_activity" @handle="closePop();showVip=true"></Activity>
    <Popup v-model="showVip" :hide-on-blur="true">
      <DredgeVip @closeVip="showVip=false" :activity="true"></DredgeVip>
    </Popup> 
    <HomeAdd ref="homeAdd"></HomeAdd> 
    <div class="bg-guide" v-if="showGuide" @click="guideStart"></div>
    <div class="bg-c-guide" v-if="showGuide"></div>
    <div class="bg-c-guide" v-if="showGuide2" style="z-index:1000000" ></div>
    <div class="bg-guide2" v-if="showGuide2" style="z-index:1000001" @click="showGuide2=false;jump(`/bt?guide=true`)"> 
    </div> 
  </div>
</template>

<script>
import FooterNav from "@/components/FooterNav";
import HomeAdd from "@/components/HomeAdd";
import api from "@/api/index";
import DredgeVip from "@/components/DredgeVip";
import Activity from "@/components/Activity";
import { Popup, ViewBox } from "vux";
export default {
  name: "Home",
  data() {
    return {
      totalMsg: 0,
      showVip: false,
      showGuide: false,
      showGuide2: false
    };
  },
  components: {
    FooterNav,
    DredgeVip,
    Popup,
    Activity,
    ViewBox,
    HomeAdd
  },
  methods: {
    homeAdd() {
      this.$refs.homeAdd.goShowFun();
    }, 
    showFun() {
      let $fun = $("#JS_header_fun");
      $fun.fadeToggle();
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
        }
        if (status.authorized) {
          _this.jump("/scan");
        } else if (status.denied) {
          _this.goSetting();
        } else {
          _this.goSetting();
        }
      }
    },
    guideStart() {
      api
        .guidanceMark(
          {},
          {
            failureCallback: response => {
              this.showGuide = false;
            }
          }
        )
        .then(() => {
          this.showGuide = false;
          this.homeAdd(); 
          this.showGuide2=true;
        });
    }
  },
  mounted() {
    $("#JS_home").height(
      $(window).height() -
        $("#JS_home_footer").height() -
        $("#JS_home_header").height() -
        $("#JS_home_bottom").height() -
        5
    );
    $("#JS_home").css({
      "max-height": "14rem"
    });
    document.addEventListener(
      "click",
      () => {
        let $fun = $("#JS_header_fun");
        $fun.fadeOut();
      },
      false
    );
    let isShow = this.getStorage("yun_show_activity");
    if (isShow) {
      this.removeStorage("yun_show_activity");
      this.openPop({
        dom: $("#JS_activity"),
        height: "12.4rem",
        skin: "activity-layer",
        close: true
      });
    }
  },
  created() {
    this.getOtherData();
    this.GET({
      api: "/user.php?op=info",
      data: {
        action: "duanxin",
        page: 1
      },
      success: data => {
        this.totalMsg = data.total;
      }
    });
    let payList = this.getStorage("payList");
    if (!payList) {
      api.payList().then(data => {
        this.payList = data.data || [];
        this.setStorage("payList", JSON.stringify(data.data));
      });
    }
    if (this.userInfo.guidanceStatus == 0) {
      this.showGuide = true;
    }
  }
};
</script>

<style>
.bg-guide {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../assets/bg_guide1@2x.png");
  background-size: cover;
  z-index: 100;
}
.bg-guide2 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../assets/bg_guide2@2x.png");
  background-size: cover;
  background-position-y: -2rem;
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
