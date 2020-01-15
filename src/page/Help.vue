<template>
  <div>
    <Header title="帮助中心"></Header>
    <p class="fct"><img class="w750" src="@/assets/bg_helpcenter@2x.png" alt=""></p>
    <div class="clear"></div>
    <div class="flex flex-around padding-tb-50">
      <div class="fct" @click.prevent="open(1)"><img class="icon-help-tip" src="@/assets/icon_helpcenter_aboutus@2x.png" />
        <p class="margin-top-15 font-30">关于我们</p>
      </div>
      <div class="fct" @click.prevent="open(2)"><img class="icon-help-tip" src="@/assets/icon_helpcenter_service@2x.png" />
        <p class="margin-top-15 font-30">联系</p>
      </div>
      <div class="fct" @click="open(3)"><img class="icon-help-tip" src="@/assets/icon_helpcenter_report@2x.png" />
        <p class="margin-top-15 font-30">举报</p>
      </div>
      <!-- <div class="fct" to="user"><router-link href="javascript:;" to="Feedback"><img class="icon-help-tip" src="@/assets/icon_helpcenter_feedback@2.png" />
        </router-link><p class="margin-top-15 font-30">问题反馈</p>
      </div> -->
    </div>
    <div class="clear bg-gray"></div>
    <div class="flex flex-between align-center padding-32 border-bottom" @click="open(4)">
      <div><span class="font-32">使用指南</span>
        <p class="margin-top-10 font-26 gray"></p>
      </div>
      <img class="icon-50" src="@/assets/icon_nav_right@2x.png" />
    </div>
    <div class="flex flex-between align-center padding-32 border-bottom" @click="open(5)">
      <div><span class="font-32">增值服务</span>
        <p class="margin-top-10 font-26 gray"></p>
      </div>
      <img class="icon-50" src="@/assets/icon_nav_right@2x.png" />
    </div>
    <div class="flex flex-between align-center padding-32 border-bottom border-bf" @click="open(6)">
      <div><span class="font-32">账号安全</span>
        <p class="margin-top-10 font-26 gray"></p>
      </div>
      <img class="icon-50" src="@/assets/icon_nav_right@2x.png" />
    </div> 
    <div class="flex flex-between align-center padding-32 border-bottom border-bf" @click="open(7)">
      <div><span class="font-32">客户端</span>
        <p class="margin-top-10 font-26 gray"></p>
      </div>
      <img class="icon-50" src="@/assets/icon_nav_right@2x.png" />
    </div> 
    <div id="JS_help_popup" class="w-pop">
      <div class="box-bg">
        <div class="margin-top-30"><span class="line50">支付遇到问题？密码遗忘？请及时通过以下联系方式联系我们，我们将尽快为您服务！</span></div>
        <div class="flex flex-between align-center padding-10 margin-left-20 margin-top-30">
          <p>
            <img style="width:0.453rem; height:0.427rem;" src="@/assets/btn_helpcenter_QQ@2x.png" />
            <span class="margin-left-15 font-30 gray">Q Q：<span class="fd blue">3510015853</span></span>
          </p>
          <img style="width:0.48rem; height:0.48rem;" @click="copy('3510015853')" src="@/assets/icon_copy@2x.png" /> 
        </div>
        <div class="flex flex-between align-center padding-10 margin-left-20 margin-top-5">
          <p>
            <img style="width:0.453rem; height:0.28rem;" src="@/assets/btn_helpcenter_email@2x.png" />
            <span class="margin-left-15 font-30 gray">邮箱：kefu@bianyue.cn</span>
          </p>
          <img style="width:0.48rem; height:0.48rem;" @click="copy('kefu@bianyue.cn')" src="@/assets/icon_copy@2x.png" /> 
        </div>
        <div class="flex flex-between align-center padding-10 margin-left-20 margin-top-5">
          <p>
            <img style="width:0.453rem; height:0.427rem;" src="@/assets/btn_helpcenter_phone@2x.png" />
            <span class="margin-left-15 font-30 gray">电话：0596-2170223</span> 
          </p>
          <img style="width:0.48rem; height:0.48rem;" @click="copy('0596-2170223')" src="@/assets/icon_copy@2x.png" />   
        </div>
      </div>
    </div>
    <div id="JS_help_popup2" class="w-pop">
      <div class="box-bg">
        <div class="flex flex-center"><img style="width:1.013rem; height:0.933rem;" src="@/assets/btn_helpcenter_jvbao@2x.png"
            alt="" /></div>
        <div class="flex flex-center margin-top-30">举报邮箱：jubao@bianyue.cn</div>
      </div>
    </div> 
  </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  name: "Help",
  data() {
    return {};
  },
  components: {
    Header
  },
  methods: {
    open(type) {
      switch (type) {
        case 1:
          cordova.InAppBrowser.open(
            "http://vip.bianyue.cn/aboutus",
            "_blank",
            "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
          );
          break;
        case 2:
          this.openPop({
            dom: $("#JS_help_popup"),
            close: true
          });
          break;
        case 3:
          this.openPop({
            dom: $("#JS_help_popup2"),
            close: true
          });
          break;
        case 4:
          cordova.InAppBrowser.open(
            "http://help.bianyue.cn/syzn/",
            "_blank",
            "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
          );
          break;
        case 5:
          cordova.InAppBrowser.open(
            "http://help.bianyue.cn/zzfw/",
            "_blank",
            "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
          );
          break;
        case 6:
          cordova.InAppBrowser.open(
            "http://help.bianyue.cn/zhaq/",
            "_blank",
            "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
          );
          break;
        case 7:
          cordova.InAppBrowser.open(
            "http://help.bianyue.cn/kehuduan/",
            "_blank",
            "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
          );
          break;
        default:
          break;
      }
    },
    copy(text) {
      cordova.plugins.clipboard.copy(text, () => {
        this.$vux.toast.show("复制成功");
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>
.article_head {
  height: 1.2rem;
  border-radius: 5px 5px 0 0;
  background: #3381f0;
  line-height: 1.2rem;
}

.article_foot {
  border-top: 1px solid #d9d9d9;
  border-radius: 0 0 5px 5px;
  background: #f3f3f3;
  line-height: 1.2rem;
}
</style>
