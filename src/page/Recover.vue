<template>
  <div class="bg-white w-lixian">
    <div id="JS_move_header">
      <BHeader title="还原文件至"></BHeader>
      <div class="flex flex-between align-center padding-24">
        <div class="flex align-center" v-if="!dataList[0].backList">
          <span class="font-28 grayc" v-if="type==2">文件</span>
          <span class="font-28 grayc" v-if="type==3">相册</span>
          <span class="font-28 grayc" v-if="type==1">云下载</span>
        </div> 
        <div class="flex align-center" v-else @click="goBack">
          <span class="font-28 grayc">文件 / 返回上一级</span>
        </div> 
      </div>
    </div>
    <ViewBox class="JS_move_list">
      <div class="lixian-list bg-white">
        <div class="flex flex-between align-center list_file" v-for="data in dataList" :key="data.id">
          <div v-if="data.type==1" @click="goDetail(data)">
            <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files39@2x.png" />
            <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
          </div>
          <div v-if="data.type=='dir'" @click="goDetail(data)">
            <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files39@2x.png" />
            <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
          </div>
          <div v-if="data.type=='init'">
            <img class="icon-90" src="@/assets/type/icon_files39@2x.png" /> 
          </div>
          <div v-if="data.type=='init'"  class="w500 margin-left-20"><span class="font-31 black-4 w-title">{{data.title}}</span> 
          </div>
          <div v-else  class="w500 margin-left-20"  @click="goDetail(data)"><span class="font-31 black-4 w-title">{{data.title}}</span>
            <p class="margin-top-10 font-26 gray"><span v-if="data.size">{{data.size?data.size.size:''}}&emsp;</span>{{data.time*1000|timeStamp}}</p>
          </div>
          <div class="move-select-warpper flex-column flex-center" @click="select(data)">
            <div v-if="data.select" class="ico_handle ico_handle_yes"></div>
            <div v-else class="ico_handle ico_handle_kong"></div>
          </div>
        </div>
      </div>
    </ViewBox>
    <div id="JS_footer" style="height: 2.133333rem;position: absolute;bottom: 0;width: 100%;">
      <div class="fixed-btn">
        <a href="javascript:;" class="btn-blue btn-big" @click="move">还原至</a>
      </div>
    </div>
  </div>
</template>
<script>
import BHeader from "@/components/BHeader";
import api from "@/api/index";
import { ViewBox } from "vux";
export default {
  name: "Recover",
  data() {
    return {
      dataList: [
        {
          type: "init",
          title: "根目录",
          id: 0
        }
      ], //列表数据
      id: 0,
      selectId: "",
      type: 1
    };
  },
  components: {
    BHeader,
    ViewBox
  },
  methods: {
    goBack() {
      this.dataList = this.dataList[0].backList;
    },
    goDetail(data) {
      if (data.children && data.children.length > 0) {
        data.children.forEach(element => {
          element.backList = this.dataList;
        });
        this.dataList = data.children;
      } else {
        this.toast("已经没有子文件夹了");
      }
    },
    select(data) {
      let arr = [];
      this.selectId = "";
      this.dataList.forEach(element => {
        if (data.id == element.id) {
          element.select = !element.select;
          if (element.select) {
            this.selectId = data.id;
          }
        } else {
          element.select = false;
        }
        arr.push(element);
      });
      this.dataList = arr;
    },
    move() {
      if (!this.selectId && this.selectId !== 0) {
        this.toast("请选择还原到的文件夹");
      } else if (this.type == 2) {
        api
          .huanyuanFileRecover2({
            "id[0]": this.id,
            topid: this.selectId
          })
          .then(response => {
            this.$vux.toast.show("还原成功");
            this.jump("/recycle");
          });
      } else if (this.type == 3) {
        api
          .huanyuanFileRecover2({
            "id[0]": this.id,
            topid: this.selectId
          })
          .then(response => {
            this.$vux.toast.show("还原成功");
            this.jump("/recycle");
          });
      } else {
        api
          .huanyuanLixianRecover2({
            "id[0]": this.id,
            topid: this.selectId
          })
          .then(response => {
            this.$vux.toast.show("还原成功");
            this.setStorage('yunVersions',new Date().getTime());
            this.jump("/recycle");
          });
      }
    }
  },
  mounted() {
    $(".JS_move_list").height(
      $(window).height() -
        $("#JS_move_header").height() -
        $("#JS_footer").height() -
        5
    );
  },
  created() {
    this.id = this.$router.currentRoute.params.id || 0;
    this.type = this.$router.currentRoute.query.type || 1;
    this.wLoading();
    if(this.type==3){
      api
        .getPhotoTree({
          "id[0]": this.id
        })
        .then(response => {
          response.data.forEach(element => {
            this.dataList.push(element);
          });
        });
    } else if(this.type == 2) {
      api
        .getFileTree({
          "id[0]": this.id
        })
        .then(response => {
          response.data.forEach(element => {
            this.dataList.push(element);
          });
        });
    } else {
      api
        .getLoadTree({
          "id[0]": this.id
        })
        .then(response => {
          response.data.forEach(element => {
            this.dataList.push(element);
          });
        });
    }
  }
};
</script>
<style scoped>
</style>