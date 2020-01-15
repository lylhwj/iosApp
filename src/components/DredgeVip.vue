<template> 
  <div id="JS_dredge" class="list_vip">
    <div @click="close" class="close-warpper"> 
      <a href="javascript:;"  class="close"></a>
    </div>
    <div class="bar">
      <span class="f16">开通VIP</span><a href="javascript:;" @click.prevent="goPrivilege" class="JS_scan_privilege fr blue">查看VIP特权></a>
    </div>
    <div style="height:7.2rem; overflow-y:scroll;">
    <dl @click="vipIndex=1" :class="{hover:vipIndex==1}"><span class="ico_tehui"></span>
      <dt>
        <div class="fl f16 text-center">12个月<img class="mt4" height="20" src="@/assets/VIP_year@2.png" alt=""></div>
        <div class="fr fct margin-right-20 margin-top-5">
          <p class="blue fd font-40">￥180</p>
          <p class="mline gray mt4">￥240</p>
        </div>
      </dt>
      <dd class="flex-column flex-center">充一年送半年<br>送6TB永久云下载空间<br>开放所有特权</dd>
    </dl>
    <dl @click="vipIndex=2" :class="{hover:vipIndex==2}"><span class="ico_tehui"></span>
      <dt>
        <div class="fl f16 text-center">6个月<img class="mt4" height="20" src="@/assets/VIP_half@2.png" alt=""></div>
        <div class="fr fct margin-right-20 margin-top-5">
          <p class="blue fd font-40">￥100</p>
          <p class="mline gray mt4">￥120</p>
        </div>
      </dt>
      <dd class="flex-column flex-center">充半年送3个月<br>送3TB永久云下载空间<br></dd>
    </dl>
    <dl @click="vipIndex=3" :class="{hover:vipIndex==3}" v-if="userInfo.overduedate * 1000 == 0">
      <dt>
        <div class="fl f16 text-center">1个月<img class="mt4" height="20" src="@/assets/VIP_month@2.png" alt=""></div>
        <div class="fr fct margin-right-20 margin-top-20">
          <p class="blue fd font-40">￥20</p>
        </div>
      </dt> 
      <dd class="flex-column flex-center">选半年或年V更实惠哦<br>月仅10硬币，超大空间<br>更多下载配额及特权！</dd> 
    </dl>
    <dl @click="vipIndex=4" :class="{hover:vipIndex==4}"><span class="ico_tehui"></span>
      <dt>
        <div class="fl f16 text-center">3个月<img class="mt4" height="20" src="@/assets/VIP_month@2.png" alt=""></div>
        <div class="fr fct margin-right-20 margin-top-5">
          <p class="blue fd font-40">￥50</p>
          <p class="mline gray mt4">￥60</p>
        </div>
      </dt> 
      <dd class="flex-column flex-center">充3个月送1个月<br>送1TB永久云下载空间</dd> 
    </dl>
        <dl @click="vipIndex=3" :class="{hover:vipIndex==3}" v-if="userInfo.overduedate * 1000 !== 0">
      <dt>
        <div class="fl f16 text-center">1个月<img class="mt4" height="20" src="@/assets/VIP_month@2.png" alt=""></div>
        <div class="fr fct margin-right-20 margin-top-20">
          <p class="blue fd font-40">￥20</p>
        </div>
      </dt> 
      <dd class="flex-column flex-center">选半年或年V更实惠哦<br>月仅10硬币，超大空间<br>更多下载配额及特权！</dd> 
    </dl>
    </div>
    <div class="flex flex-center  margin-top-20">
      <a class="btn-blue btn-big" @click.prevent="submit">立即开通</a>
    </div>
    <p class="fct padding-20"><span class="vmid ico_yes2"></span> 开通视为同意<a href="javascript:;" class="blue" @click="open(1)">《服务协议》</a><a
        href="javascript:;" class="blue"  @click="open(2)">《隐私政策》</a></p>
  </div>
</template>

<script>
export default {
  name: "DredgeVip",
  data() {
    return {
      vipIndex: 3
    };
  },
  props:["activity"],
  components: {},
  methods: {
    goPrivilege() {
      this.jump("/privileges");
    },
    close() {
      this.$emit("closeVip", true);
    },
    submit() {
      this.jump(`/pay?month=${this.vipIndex}`);
    },
    open(type) {
      if (type == 1) {
        cordova.InAppBrowser.open(
          "http://vip.bianyue.cn/Agreementuser",
          "_blank",
          "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
        );
      } else {
        cordova.InAppBrowser.open(
          "http://yun.bianyue.cn/privacy.html",
          "_blank",
          "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
        );
      }
    }
  },
  created() { 
    if (this.userInfo.overduedate * 1000 !== 0) {
      this.vipIndex = 4;
    }
    if(this.activity){
       this.vipIndex=1;
    } 
  }
};
</script>
<style>
.list_vip .bar {
  padding-top: 1rem;
}
.close-warpper {
  position: absolute;
  top: 0.2rem;
  right: 0;
  width: 0.666667rem;
  height: 0.666667rem;
  padding: 0 0.24rem;
}

.list_vip .close {
  width: 0.4rem;
  height: 0.4rem;
  top: 0.133333rem;
  right: 0.24rem;
}

.mline {
  text-decoration: line-through;
  text-align: center;
}
</style>
