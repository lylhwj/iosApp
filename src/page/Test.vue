<template>
  <div>
    <swiper v-model="index" height="100%" :show-dots="false" :threshold="50">
      <swiper-item>
        <Lixian></Lixian>
      </swiper-item>
      <swiper-item>
        <File></File>
      </swiper-item>
      <swiper-item>
        <Photo></Photo>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
  import Lixian from "@/page/Lixian.vue";
  import File from "@/page/File.vue";
  import Photo from "@/page/Photo.vue";
  import {
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  } from "vux";
  export default {
    name: "tests",
    data() {
      return {
        demo2: "美食",
        list: ["精选", "美食", "电影"],
        index: 0,
        totalMsg: 0,
        display: 1
      };
    },
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Lixian,
      File,
      Photo
    },
    props: ["page"],
    methods: {
      changeDisplay(type) {
        this.display = type;
        this.$emit("change", type);
      },
      goSetting() {
        this.confirm({
          title: "请在设置->边乐云打开权限",
          rightBtnText: "设置",
          rightCallback: () => {
            QRScanner.openSettings();
          }
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
              _this.toast(err);
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
      getHeight() {}
    },
    mounted() {

    },
    created() {}
  };

</script>
<style> 
 .app-warpper .vux-slider{
   height: 100%;
 }
</style>
