<template>
  <div class="fct font-24 nav_bottom">
   <ul>
    <li><router-link to="home?slip=no" :class="['home',page=='home'?'hover':'']">首页</router-link></li>
    <li><router-link to="favorites?slip=no" :class="['biaoji',page=='favorites'?'hover':'']">星标</router-link></li>
    <li style="position: relative;"><a @click.stop="goBT" class="blue_ico"><span></span></a></li>
    <li><router-link to="transfer?slip=no" :class="['popup',page=='transfer'?'hover':'']">传输<span v-if="false" class="num">{{num}}</span></router-link></li>
    <li><router-link to="user?slip=no" :class="['user_center',page=='user'?'hover':'']">我的</router-link></li>
   </ul>
  </div><!-- 导航 -->
</template>

<script>
import api from "@/api/index";
export default {
  name: "FooterNav",
  data() {
    return {
      num:0
    };
  },
  props: ["page","num2","isMain"], 
  methods: {
    goBT(){
      if(this.page=='transfer'){
        this.jump('/bt');
        return false;
      }
      this.$emit('homeAdd',true);
    }
  },
  mounted() {
    
  },
  created() {
    // api
    //   .lixianDown({
    //     page: 1,
    //     f: "working",
    //     topid:0
    //   })
    //   .then(data => {
    //     this.num=data.data.list.total||0; 
    //   });
  }
};
</script> 

<style>
</style>