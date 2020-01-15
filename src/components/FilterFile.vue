<template>
  <div class="tan_popup">
    <div @click="cancel" class="fcr margin-top-40 margin-right-30"><img class="icon-63"
        src="@/assets/new/icon_tan_shut@2x.png" alt="">
    </div>
    <p class="font-28 gray padding-tb-35">视图列表</p>
    <div class="flex flex-around tan_box">
      <a :class="{btn_tan:true,hover:filterData.display!==2}" @click="change(1,1)"><span class="tan_list"></span>列表</a>
      <a :class="{btn_tan:true,hover:filterData.display==2}" @click="change(1,2)"><span class="tan_view"></span>缩略图</a>
    </div>
    <p class="font-28 gray padding-tb-35 border-top">文件排序</p>
    <div class="flex flex-around tan_box">
      <a :class="{btn_tan:true,hover:filterData.f_time=='new'}" @click="change(2,'new')">最新</a>
      <a :class="{btn_tan:true,hover:filterData.f_time=='old'}" @click="change(2,'old')">最早</a>
    </div>
    <div class="flex flex-around tan_box" v-if="type!=='lixian'">
      <a :class="{btn_tan:true,hover:filterData.f_size=='max'}" @click="change(2,'max')">最大</a>
      <a :class="{btn_tan:true,hover:filterData.f_size=='min'}" @click="change(2,'min')">最小</a>
    </div>
    <div v-if="type=='file'">
      <p class="font-28 gray padding-tb-35 border-top">文件筛选</p>
      <div class="flex flex-around tan_box font-28">
        <a :class="{btn_tan:true,hover:filterData.f_type=='all'}" @click="change(3,'all')"><span
            class="tan_all"></span>全部</a>
        <a :class="{btn_tan:true,hover:filterData.f_type=='video'}" @click="change(3,'video','视频')"><span
            class="tan_play"></span>视频</a>
        <a :class="{btn_tan:true,hover:filterData.f_type=='music'}" @click="change(3,'music','音频')"><span
            class="tan_audio"></span>音频</a>
      </div>
      <div class="flex flex-around tan_box font-28">
        <a :class="{btn_tan:true,hover:filterData.f_type=='document'}" @click="change(3,'document','文档')"><span
            class="tan_file"></span>文档</a>
        <a :class="{btn_tan:true,hover:filterData.f_type=='image'}" @click="change(3,'image','图片')"><span
            class="tan_pic"></span>图片</a>
        <a :class="{btn_tan:true,hover:filterData.f_type=='com'}" @click="change(3,'com','压缩包')"><span
            class="tan_rar"></span>压缩包</a>
      </div>
      <div class="flex flex-around tan_box font-28">
        <a :class="{btn_tan:true,hover:filterData.f_type=='de'}" @click="change(3,'de','不加密')"><span
            class="tan_nojiami"></span>不加密</a>
        <a :class="{btn_tan:true,hover:filterData.f_type=='en'}" @click="change(3,'en','加密')"><span
            class="tan_jiami"></span>加密</a>
        <a class="btn_tan_none">
          <!-- 占位的 --></a>
      </div>
      <div v-if="type=='lixian'">
        <p class="font-28 gray padding-tb-35 border-top">文件筛选</p>
        <div class="flex flex-around tan_box font-28">
          <a :class="{btn_tan:true,hover:filterData.f_type=='all'}" @click="change(3,'all')"><span
              class="tan_all"></span>全部</a>
          <a :class="{btn_tan:true,hover:filterData.f_type=='de'}" @click="change(3,'de','不加密')"><span
              class="tan_nojiami"></span>不加密</a>
          <a :class="{btn_tan:true,hover:filterData.f_type=='en'}" @click="change(3,'en','加密')"><span
              class="tan_jiami"></span>加密</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "FilterFile",
    data() {
      return {};
    },
    props: ["type", "filterData"],
    components: {},
    methods: {
      cancel() {
        this.$emit("close", true);
      },
      change(type, filter, title) {
        if (type == 1) {
          this.filterData.display = filter;
        } else if (type == 2) {
          if (filter == "max" || filter == "min") {
            this.filterData.f_time = "";
            this.filterData.f_size = filter;
          } else {
            this.filterData.f_size = "";
            this.filterData.f_time = filter;
          }
        } else if (type == 3) {
          this.filterData.f_pass = "";
          this.filterData.f_type = filter;
          this.filterData.title = title;
          if (filter == "de") {
            this.filterData.f_pass = "de";
          } else if (filter == "en") {
            this.filterData.f_pass = "en";
          }
        }
        this.filterData.show = false;
        if (this.filterData.f_type !== 'all') {
          this.filterData.show = true;
        }
        this.$emit("clickFilter", this.filterData);
        this.cancel();
      },
      reset() {
        this.filterData = {
          f_time: "",
          f_size: "",
          f_type: "",
          f_pass: ""
        };
      },
      submit() {
        this.$emit("clickFilter", this.filterData);
      }
    }
  };

</script>
<style>
</style>
