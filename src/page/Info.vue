<template>
  <div>
    <Header title="个人资料"></Header>
    <div class="list-bar align-center">
      <span>头像</span>
      <p class="pos-rel">
        <img @click="showImg=true" class="icon-user" :src="userImg" onerror="this.src='https://api.bianyue.cn/nophoto.gif'" />
        <img @click="showImg=true" style="position:absolute; bottom:0.1rem; right:0rem; width:0.4rem;" src="@/assets/icon_edit_profile@2x.png"
          alt="">
      </p>
    </div>
    <div class="list-bar">
      <span>昵称</span>
      <div @click="showName">
        <span class="gray">{{userInfo.nickname}}</span>
        <img class="icon-h30" src="@/assets/icon_home_edit_rename2@2x.png" />
      </div>
    </div>
    <div class="list-bar" v-if="userInfo.vip!=='2'">
      <div class="flex">
        <span>非会员</span>
      </div>
      <span class="blue" @click="showVip=true">开通VIP</span>
    </div>
    <div class="list-bar" v-else-if="userInfo.vip_type==2">
      <div class="flex">
        <span>年VIP</span>
        <img class="padding-left-10 icon-h39" src="@/assets/icon_vip_year@2x.png" />
      </div>
      <span class="blue" @click="showVip=true">续费VIP</span>
    </div>
    <div class="list-bar" v-else-if="userInfo.vip_type==1">
      <div class="flex">
        <span>月VIP</span>
        <img class="padding-left-10 icon-h39" src="@/assets/icon_vip_month@2x.png" />
      </div>
      <span class="blue" @click="showVip=true">续费VIP</span>
    </div>
    <div class="list-bar" v-else>
      <div class="flex">
        <span>会员</span>
        <img class="padding-left-10 icon-h39" src="@/assets/icon_vip_old@2x.png" />
      </div>
      <span class="blue" @click="showVip=true">续费VIP</span>
    </div>
    <div class="clear bg-gray"></div>
    <div class="list-bar">
      <span>生日</span>
      <div @click="openTime">
        <span>{{birthday}}</span>
        <img class="icon-h30" src="@/assets/icon_home_edit_rename2@2x.png" />
      </div>
    </div>
    <div id="JS_info_popup" class="w-pop">
      <div class="box-bg border-bottom">
        <input class="border-all box-input" type="text" placeholder="编辑昵称" v-model="nickname">
        <p class="margin-top-30 grays">昵称填写须知：与边乐云业务或产品有冲突的昵称，边乐云将有可能回收</p>
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.prevent="editName">确认</a>
      </div>
    </div>
    <Popup v-model="showVip" :hide-on-blur="true">
      <DredgeVip @closeVip="showVip=false"></DredgeVip>
    </Popup>
    <Popup v-model="showImg" :hide-on-blur="true">
      <div>
        <div class="flex-column flex-center">
          <img class="icon-user-big2" style="margin:.5rem auto ;border-width:1px;" id="JS_img" :src="userImg" onerror="this.src='https://api.bianyue.cn/nophoto.gif'"></image>
        </div>
        <ul class="bg-white text-center w750 list_btn"> 
          <li><a @click.prevent="getPhoto">本地上传</a></li>
          <li>
            <router-link to="avatar">边乐头像</router-link>
          </li>
          <div class="bg-gray clear"></div>
          <li><a @click.prevent="showImg=false">取消</a></li>
        </ul>
      </div>
    </Popup>
  </div>
</template>
<script>
import Header from "@/components/Header";
import DredgeVip from "@/components/DredgeVip";
import { Popup } from "vux";
export default {
  name: "Info",
  data() {
    return {
      nickname: "",
      value: "",
      showVip: false,
      showImg: false,
      pictureSource: "",
      destinationType: ""
    };
  },
  computed: {
    birthday() {
      if (
        parseInt(this.userInfo.year) > 0 &&
        parseInt(this.userInfo.month) > 0 &&
        parseInt(this.userInfo.date) > 0
      ) {
        return (
          this.userInfo.year +
          "-" +
          this.userInfo.month +
          "-" +
          this.userInfo.date
        );
      } else {
        return "";
      }
    }
  },
  components: {
    Header,
    DredgeVip,
    Popup
  },
  methods: {
    onDeviceReady() {
      this.pictureSource = navigator.camera.PictureSourceType;
      this.destinationType = navigator.camera.DestinationType;
    },
    //获取照片
    getPhoto() {
      let _this = this;
      //quality : 图像的质量，范围是[0,100]
      navigator.camera.getPicture(
        this.onPhotoURISuccess,
        function(error) {
          _this.toast("照片获取失败！");
        },
        {
          quality: 50,
          destinationType: this.destinationType.FILE_URI,
          sourceType: this.pictureSource.PHOTOLIBRARY
        }
      );
    },
    //获取照片成功
    onPhotoURISuccess(imageURI) {
      //显示照片
      let largeImage = document.getElementById("JS_img");
      largeImage.src = imageURI;
      this.upload(imageURI);
    },
    //上传文件
    upload(fileURL) {
      let _this = this;
      cordova.plugin.http.uploadFile(
        "http://api.bianyue.cn/api.php?op=upavatar_new",
        {
          avatar: fileURL
        },
        { Authorization: "Bearer " + localStorage.getItem("access_token") },
        fileURL,
        "picture",
        function(response) {
          _this.showImg = false;
          _this.toast("上传成功");
          _this.getUser({});
        },
        function(response) {
          _this.showImg = false;
          _this.$vux.toast.show({
            text: "上传失败",
            type: "cancel"
          });
        }
      );
    },
    showName() {
      this.nickname = "";
      this.openPop({
        dom: $("#JS_info_popup")
      });
    },
    editName() {
      if (!this.nickname) {
        this.toast("请输入昵称~");
        return false;
      } else {
        this.GET({
          api: "/user.php?op=info&action=updateinfo",
          data: {
            nickname: this.nickname
          },
          success: data => {
            this.$vux.toast.show("保存成功");
            this.closePop();
            this.getUser({});
          },
          error: data => {
            this.toast(data.status);
          }
        });
      }
    },
    openTime() {
      let _this = this;
      this.$vux.datetime.show({
        confirmText: "确定",
        cancelText: "取消",
        onConfirm(value) {
          let year = String(value).split("-")[0];
          let month = String(value).split("-")[1];
          let date = String(value).split("-")[2];
          _this.GET({
            api: "/user.php?op=info&action=updateinfo",
            data: {
              year,
              month,
              date
            },
            success: data => {
              _this.$vux.toast.show("保存成功");
              _this.getUser({});
            },
            error: data => {
              _this.toast(data.status);
            }
          });
        }
      });
    }
  },
  mounted() { 
    document.addEventListener("deviceready", this.onDeviceReady, false);
  }
};
</script>
<style scoped>
</style>
