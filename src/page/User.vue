<template>
<div class="bg-grayc">
  <FooterNav id="JS_user_footer" @homeAdd="homeAdd"  page="user"></FooterNav>
  <div id="JS_user_header">
    <div v-if="userInfo.vip=='2'" class="user_bg">
      <div class="flex align-center">
        <img class="icon_user" :src="userImg" onerror="this.src='https://api.bianyue.cn/nophoto.gif'">
        <div class="margin-left-25 white"> 
          <div class="margin-bottom-10 fd font-38">
            <p v-if="userInfo.vipcart_type=='2'">年V<img class="vip_img" src="@/assets/icon_vip_year@2x.png" alt=""></p>
            <p v-else-if="userInfo.vipcart_type=='1'">月V<img class="vip_img" src="@/assets/icon_vip_month@2x.png" alt=""></p>
            <p v-else>会员<img class="vip_img" src="@/assets/icon_vip_old@2x.png" alt=""></p>
          </div>
            <p class="font-30" v-if="userInfo.mobile_all">手机：{{userInfo.mobile_all}}</p>
            <p class="font-30" v-else>用户名：{{userInfo.username}}</p>
            <p class="font-24 margin-top-5">UID ：{{userInfo.userid}}</p>
        </div>
      </div>
      <div class="flex align-center margin-top-60">
        <div class="font-28 btn_vip" @click="showVip=true">续费VIP</div>
        <span class=" margin-left-20 white font-28">{{userInfo.overduedate*1000,2|timeStamp}}过期</span>
      </div>
    </div>
    <div v-else class="user_bg">
      <div class="flex align-center">
        <img class="icon_user" :src="userImg" onerror="this.src='https://api.bianyue.cn/nophoto.gif'">
        <div class="margin-left-25 white">
          <div class="margin-bottom-10 fd font-44">非VIP</div>
            <p class="font-30" v-if="userInfo.mobile_all">手机：{{userInfo.mobile_all}}</p>
            <p class="font-30" v-else>用户名：{{userInfo.username}}</p>
            <p class="font-24 margin-top-5">UID ：{{userInfo.userid}}</p>
        </div>
      </div>
      <div class="flex align-center margin-top-60">
        <div class="font-32 btn_vip" @click="showVip=true">升级VIP</div>
      </div>
    </div>
  </div>    
  <div id="JS_user" class="box_home">
    <div >
      <div class="flex flex-around height-290 margin-top-20 margin-left-30 margin-right-30 fct border-bottom">
        <router-link class="flex-column flex-center height-290 flex-number1" href="javascript:;" to="recycle">
          <div class="pos-rel">
            <img class="icon-user-point disb m_auto" src="@/assets/icon_user_recover@2x.png">
            <!-- <span class="font-20 white tip_point">{{userInfo.point}}积分</span> -->
          </div>
          <div class="margin-top-5 font-34 black">回收站 </div>
        </router-link>
        <router-link class="flex-column flex-center height-290 flex-number1" href="javascript:;" to="coupon">
          <div class="pos-rel">
            <img class="icon-user-card disb m_auto" src="@/assets/icon_user_card@2x.png">
          </div>
          <div class="margin-top-5 font-34 black">我的卡券包</div>
        </router-link>
      </div>
      <div class="flex flex-around height-200 fct margin-top-20">
        <router-link class="flex-column flex-center height-200 flex-number1" href="javascript:;" to="info">
          <img class="icon-user-nav" src="@/assets/icon_user_nav1@2x.png">
          <div class="font-32 black">个人资料</div>
        </router-link>
        <router-link class="flex-column flex-center height-200 flex-number1" href="javascript:;" to="security">
          <img class="icon-user-nav" src="@/assets/icon_user_nav2@2x.png">
          <div class="font-32 black">账号安全</div>
        </router-link>
        <router-link class="flex-column flex-center height-200 flex-number1" href="javascript:;" to="data">
          <img class="icon-user-nav" src="@/assets/icon_user_nav3@2x.png">
          <div class="font-32 black">数据报告</div>
        </router-link>
      </div>
      <div class="flex flex-around height-200 fct">
        <router-link class="flex-column flex-center height-200 flex-number1" href="javascript:;" to="setting">
          <img class="icon-user-nav" src="@/assets/icon_user_nav4@2x.png">
          <div class="font-32 black">设置</div>
        </router-link>
        <router-link class="flex-column flex-center height-200 flex-number1" href="javascript:;" to="help">
          <img class="icon-user-nav" src="@/assets/icon_user_nav5@2x.png">
          <div class="font-32 black">帮助中心</div>
        </router-link>
        <router-link class="flex-column flex-center height-200 flex-number1" href="javascript:;" to="point">
          <img class="icon-user-nav" src="@/assets/icon_user_nav8@2x.png">
          <div class="font-32 black">我的积分</div>
        </router-link>
      </div>
    </div>
    <Popup v-model="showVip" :hide-on-blur="true">
      <DredgeVip @closeVip="showVip=false"></DredgeVip>
    </Popup> 
  </div>
  <div id="JS_user_bottom" class="bg-grayc" style="height:0.74rem;"></div>
  <HomeAdd ref="homeAdd"></HomeAdd> 
</div>
</template>

<script>
import FooterNav from "@/components/FooterNav";
import HomeAdd from "@/components/HomeAdd";
import api from "@/api/index";
import DredgeVip from "@/components/DredgeVip";
import { ViewBox, Popup } from "vux";
export default {
  name: "User",
  data() {
    return {
      showVip: false,
      totalMsg: 0
    };
  },
  computed: {},
  components: {
    FooterNav,
    ViewBox,
    DredgeVip,
    Popup,
    HomeAdd
  },
  methods: {
    homeAdd() {
      this.$refs.homeAdd.goShowFun();
    },
    back() {
      if (this.$router.currentRoute.query.back == "lixian") {
        this.jump("lixian");
      } else {
        this.$router.back();
      }
    }
  },
  updated() {
    $("#JS_user").height(
      $(window).height() -
        $("#JS_user_footer").height() -
        $("#JS_user_header").height() -
        $("#JS_user_bottom").height() -
        5
    );
  },
  mounted() {
    $("#JS_user").height(
      $(window).height() -
        $("#JS_user_footer").height() -
        $("#JS_user_header").height() -
        $("#JS_user_bottom").height() -
        5
    );
    $("#JS_user").css({
        "max-height":"10rem" 
    })
  },
  created() {
    this.getUser({});
  }
};
</script>

<style scoped>
</style>