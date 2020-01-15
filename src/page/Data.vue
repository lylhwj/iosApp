<template>
  <div>
    <Header title="数据报告"></Header>
    <div class="flex flex-around align-center bg-white padding-tb-50 fct">
      <div class="align-center">
        <p class="font-30 blue">{{userInfo.regdate*1000,1|timeStamp}}</p>
        <p class="font-30 gray margin-top-10">注册</p>
      </div>
      <div class="align-center border-left border-right padding-10" style="width:2.867rem;">
        <p class="font-30 blue">{{userInfo.used}}天</p>
        <p class="font-28 gray margin-top-10">已使用</p>
      </div>
      <div class="align-center" v-if="userInfo.vip!=='2'"><img style="width:0.547rem; height:0.427rem;" src="@/assets/icon_info_vip2@2x.png" />
        <a @click.prevent="showVip=true" class="btn-button margin-top-15">开通VIP</a>
      </div>
      <div class="align-center" v-else>
        <img style="width:0.547rem; height:0.427rem;" src="@/assets/icon_info_vip@2x.png" />
        <a @click.prevent="showVip=true" class="btn-button margin-top-15">续费VIP</a>
      </div>
    </div>
    <div class="padding-24 bg-gray">容量</div>
    <div class="flex flex-between bg-white padding-32">
      <div class="w460">
        <div class="flex flex-between font-30">文件空间<span class="font-28 gray">总容量:{{userFileData.allsize}}</span></div>
        <div class="margin-top-20 bar-progress"><span class="font-24 bar-progress-text" :style="{'width':userFileData.baifenbi+'%'}">{{userFileData.baifenbi}}%</span></div>
      </div>
      <div class="text-center"><span class="font-24 gray">剩余:{{userFileData.keyong}}</span> <a class="margin-top-20 btn-blue btn-radius" @click.prevent="jump('/paySpace')">+增加容量</a></div>
    </div>
    <div class="clear bg-gray"></div>
    <div class="flex flex-between bg-white padding-32">
      <div class="w460">
        <div class="flex flex-between font-30">相册空间<span class="font-28 gray">总容量:{{userPhotoData.allsize}}</span></div>
        <div class="margin-top-20 bar-progress"><span class="font-24 bar-progress-text" :style="{'width':userPhotoData.baifenbi+'%'}">{{userPhotoData.baifenbi}}%</span></div>
      </div>
      <div class="text-center"><span class="font-24 gray">剩余:{{userPhotoData.keyong}}</span><a class="margin-top-20 btn-blue btn-radius" @click.prevent="jump('/paySpace')">+增加容量</a></div>
    </div>
    <div class="clear bg-gray"></div>
    <div class="flex flex-between bg-white padding-32">
      <div class="w460">
        <div class="flex flex-between font-30">云下载空间<span class="font-28 gray">总容量:{{userPanData.allsize}}</span></div>
        <div class="margin-top-20 bar-progress"><span class="font-24 bar-progress-text" :style="{'width':userPanData.baifenbi+'%'}">{{userPanData.baifenbi}}%</span></div>
      </div>
      <div class="text-center"><span class="font-24 gray">剩余:{{userPanData.keyong}}</span><a class="margin-top-20 btn-blue btn-radius" @click.prevent="jump('/paySpace')">+增加容量</a></div>
    </div>
    <Popup v-model="showVip" :hide-on-blur="true"><DredgeVip @closeVip="showVip=false"></DredgeVip></Popup>
  </div>
</template>
<script>
  import Header from "@/components/Header";
  import DredgeVip from "@/components/DredgeVip";
  import {
    Popup
  } from "vux";
  export default {
    name: "Data",
    data() {
      return {
        showVip: false 
      };
    },
    components: {
      Header,
      DredgeVip,
      Popup
    },
    methods: {},
    created() {
      this.getOtherData(); 
    }
  };

</script>
