<template>
  <div class="bg-grayc">
    <Header title="问题反馈"></Header>
    <div class="padding-20">
    <p class="flex align-center"><span class="margin-right-20" style="flex-shrink :0"><span class="red">＊</span> 问题类型</span> <select name="" id="" class="feed_select"><option value="">请选择问题类型</option></select></p>
    <p class="margin-top-30"><span class="red">＊</span> 问题描述</p>
    <textarea class="margin-top-20 feed_textarea" v-model="hash" placeholder="请协助填写提示信息和问题描述，将有助于我们更快地发现和解决问题。"></textarea>
    <p class="margin-top-20">截图上传 ≤ 5张</p>
    <img src="" alt="">
    <ul class="flex list_feed_img">
      <li><img src="@/assets/bg_coupon@2x.png" alt=""><span class="close"></span></li>
      <li><img src="@/assets/demo.jpg" alt=""><span class="close"></span></li>
      <li><img src="@/assets/icon_helpcenter_feedback@2x.png" alt=""></li>
    </ul>
    <p class="margin-top-20">联系方式</p>
    <input class="margin-top-20 feed_input" type="" placeholder="（选填）手机/QQ/邮箱/微信">
    </div><!-- 
    <div class="flex flex-center">
      <a class="btn-blue btn-big" @click.prevent="submit">提交反馈</a>
    </div> -->
    <div class="flex flex-center w750 w-bottom">
      <a class="btn-blue btn-big" @click.prevent="submit">提交反馈</a>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  name: "Feedback",
  data() {
    return {};
  },
  components: {
    Header
  },
  methods: {
  },
  mounted() {}
};
</script>
<style>
.feed_textarea { width:100%; height:4rem; padding:10px; box-sizing: border-box; border:0; border-radius: 8px; } 
.feed_textarea::placeholder { color:#9b9b9b; }
.feed_input { width:100%; height:1rem; padding:0 10px; box-sizing: border-box; border:0; border-radius:3px; } 
.feed_input::placeholder { color:#9b9b9b; }
.feed_select { width:100%; height:1rem; padding:0 10px; box-sizing: border-box; border:0; border-radius:3px; } 
.list_feed_img li { position:relative; margin-right:0.267rem; }
.list_feed_img img { width:1.47rem; height:1.47rem; border-radius:5px; }
.list_feed_img .close { display:inline-block; position:absolute; top:-0.2rem; right:-0.2rem; width:0.4rem; height:0.4rem;background: url(../assets/new/icon_popup_wrong@.png); background-size:100%; }
</style>