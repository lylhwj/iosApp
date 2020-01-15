<template>
  <div class="bg-white">
    <Header id="JS_sacn_header" title="扫码登录"></Header>
    <div id="JS_scan">
      <div class="clear bg-gray"></div>
      <div class="fct" style="height:10rem;">
        <img class="w500  margin-top-80" src="@/assets/icon_scan_failure@2x.png" alt="">
        <p class="gray font-32 margin-top-60">即将在电脑登录<br>请确认是否本人操作</p>
      </div>
      <div class="flex flex-center margin-top-20">
        <a class="btn-blue btn-big w660" @click.prevent="login">确认登录</a>
      </div>
      <div class="flex flex-center margin-top-20 ">
        <a class="btn-gray2 btn-big w660" @click="jump('/home')">取消</a>
      </div>
    </div>
    
    <!-- <div class="fct" style="height:10rem;">
      <img class="w500" src="@/assets/icon_scan@2x.png" alt="" style="margin-top:2.5rem;">    
    </div>
    <div class="flex flex-center margin-top-20">
      <a class="btn-orange btn-big w660">重新扫描</a>
    </div>
    <div class="flex flex-center margin-top-20 ">
      <a class="btn-gray2 btn-big w660">取消</a>
    </div> -->
    <!--扫描失败 -->
  </div>
</template>
<script>
  import Header from "@/components/Header";
  import api from "@/api/index";
  export default {
    name: "ScanCodeLogin",
    data() {
      return {
        form:{
          op:"qrcode",
          action:"login_qr",
          token:"",
          username:"",
          password:""
        } 
      };
    },
    components: {
      Header
    },
    methods: { 
      login(){
        this.GET({
          api:'/android.php',
          data:this.form,
          success:(response)=>{
            this.$vux.toast.show("登录成功");
            this.getOtherData();
            setTimeout(() => {
              this.jump('/home');
            }, 1800);
          }
        })
      } 
    },
    mounted() {
      $("#JS_scan").height(
        $(window).height() - $("#JS_scan_header").height() - 5
      );
    },
    created() { 
      this.form.token = this.$router.currentRoute.query.token || '';
      api.getUserName().then((response)=>{ 
         this.form.username=response.data.username;
         this.form.password=response.data.p; 
      })
    }
  };

</script>
