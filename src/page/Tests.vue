<template>
  <div>
<!--   
    <div class="box-pop">
      <img style="position:absolute; top:-0.5rem; left:0.61rem; width:7.78rem; height:5.493rem;" src="@/assets/bg_vip_expired@2x.png" alt="" />
      <div class="box-bg" style="padding-top:5.6rem;">
        <p class="fct font-30">糟糕！VIP过期了</p>
        <div class="flex flex-center">
          <a class="btn-orange btn-big w460 margin-top-30">升级VIP</a>
        </div>
      </div>
    </div>提示框 过期 -->

    <div class="box-pop">
      <div class="box-bg">
        <div class="fct"><img style="width:4.453rem; height:5.333rem;" src="@/assets/bg_point_experience@2x.png" alt="" /></div>
        <div class="flex flex-between margin-top-30">
          <div style="width:45%; height:2.9rem;"><a class="font-30">普通用户随机赠送3次在线预览特权，该链接任务系统已释放为免费资源</a></div>
          <div class="border-right" style="width:2px; height:2rem;"></div>
          <div style="width:45%; height:2.9rem;"><a class="font-30">没有平衡的盈利和支出就没有长久的服务 升级VIP才可享有在线预览特权</a></div>
        </div>
        <div class="flex flex-between" style="position:absolute; bottom:0; left:0;">
          <a class="btn-blue btn-big" style=" width:4.5rem;border-radius:0 0 0 0.1rem; border:0">免费体验</a>
          <a class="btn-orange btn-big" style=" width:4.5rem;border-radius:0 0 0.1rem 0; border:0">升级VIP</a>          
        </div>
      </div>
    </div><!-- 提示框 免费体验-升级 -->
<!--
    <div class="box-pop">
      <div class="box-bg fct">
        <img style="width:4.4rem; height:3.56rem;" src="@/assets/icon_point_ram@2x.png" alt="" />
        <div class="fct margin-top-30">
          <img class="vmid" style="width:0.6rem; height:0.6rem;" src="@/assets/icon_warning.png" alt="" />
          <span class="font-32 margin-left-15">添加失败</span>
        </div>
        <p class="font-30 margin-top-20">网盘存储容量不足，请扩容</p>
        <div class="flex flex-center">
          <a class="btn-blue btn-big w460 margin-top-30">马上扩容</a>
        </div>
      </div>
    </div> 提示框 内存不足 -->
    <!-- <div class="box-pop">
      <img style="position:absolute; width:9rem; height:5.56rem; " src="@/assets/bg_cardbag_vip_home_point@2x.png"></img>
      <div class="box-bg fct"  style="padding-top:5.6rem;">
         <p class="font-36">升级会员专享极速传输</p>
         <p class="font-30 margin-top-30">大文件批量传载/在线预览/视频高速通道</p>
        <div class="flex flex-center">
          <a class="btn-orange btn-big w460 margin-top-30">升级VIP</a>
        </div>
      </div>
    </div>提示框 升级会员专享极速传输 -->
    <!--<div class="box-pop">
      <div class="box-bg">
        <div class="pos-rel">
         <input class="font-30 border-all box-input" type="text" placeholder="验证码">  
         <img style=" position:absolute; right:-1px; top:1px; height:0.96rem;border-radius:0 0.1rem 0.1rem 0;" src="http://api.bianyue.cn/api.php?op=checkcode&code_len=4&font_size=13&width=92&height=30" alt=""> 
        </div>
         <p class="margin-top-20 gray font-26">输入验证码后，可继续添加链接任务</p>
      </div>
      <div class="flex flex-around margin-top-30">
        <a class="btn-white btn-mediume">取消</a>
        <a class="btn-blue btn-mediume">确认</a>
      </div>
    </div> 提示框 人机验证 -->
    <div class="flex flex-center w750 w-bottom" @click="newFile">
      <a href="javascript:;" class="btn-blue btn-big">检查更新</a>
    </div>

    <div id="JS_lixian_popup2" class="w-pop">
      <div class="box-bg fct" style="padding:0.8rem 0 0">
        <img style="width:5.787rem;" src="@/assets/banner_updata2@2x.png" alt="">
        <p class="fd font-36"><img class="icon-63 vmid" src="@/assets/banner_updata3@2x.png" alt="">版本更新</p>
        <p class="margin-top-20 gray">边乐云诚邀您体验更好用的新版本！</p>
        <div class="margin-top-40 border-top blue  padding-32 font-36">立即更新</div>
      </div>
    </div><!-- 版本更新提示 -->
  </div>
</template>
<script>
  export default {
    name: 'tests',

    components: {

    },
    methods: {
      //弹出框
      newFile() {
        this.openPop({
          dom: $("#JS_lixian_popup2")
        });
      },
    },
  }
</script>
 