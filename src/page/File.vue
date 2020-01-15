<template>
  <div class="bg-white w-lixian">
    <FileHeader :title="''" id="JS_file_header" page="file" :display="filterData.display"
      @change="changeDisplay"></FileHeader>
    <div v-if="filterData.show" id="JS_file_gl" class="flex flex-between"><a style="visibility: hidden;" href="javascript:;"
        class="flex align-center font-30 all_manage">
        <span class="all_manage_no"></span><span><span>管理</span></span></a>
      <p class="flex font-30" v-if="filterData.show">
        <a :class="{flex:true,'align-center':true,btn_tan2:true,hover:filterData.f_pass=='de'}"
          @click="changeFilter2('de')"><span class="tan_nojiami3"></span>不加密</a>
        <a :class="{flex:true,'align-center':true,btn_tan2:true,hover:filterData.f_pass=='en'}"
          @click="changeFilter2('en')"><span class="tan_jiami3"></span>加密</a>
      </p>
    </div>
    <div v-else id="JS_file_gl"  class="flex" style="background:#f6f6f6;">
      <a href="javascript:;" @click="familyJump('home')" class="flex align-center font-30 all_name" style="width:1.1rem;">文件&nbsp;&nbsp;<span v-if="familyData.length>0" class="arrow">></span></a>
      <ul class="flex align-center gray file_nav recent_nav"   >
        <span class="flex" v-for="(data,index) in familyData" @click="familyJump(data)" :key="index"><li ><span>{{data.title}}</span></li><span v-if="index!==familyData.length-1" class="arrow">></span></span>
      </ul>
    </div> 
    <div v-if="filterData.show&&!manageStatus" class="w750 pos-fixed" style="top:0">
      <div class="head_gray" style="border:0;">
        <i class="fl head_back" @click.prevent="back" title="返回"></i>
        <a class="fl btn_tan hover hover2" @click="filterBack"><span class="tan_play"></span>{{filterData.title}}<img class="margin-left-15"
            style="height:.28rem;" src="@/assets/new/icon_bottom__back_home2@.png" alt=""></a>
        <a href="javascript:;" class="fr head_more" @click="changeDisplay"></a>
      </div>
    </div>
    <div v-if="manageStatus" class="w750 pos-fixed" style="top:0;background:#f9f9f9;">
      <div class="head_gray" style="border:0; padding:0 0.45rem;">
        <a class="fl blue" @click.prevent="manageClose" title="取消">取消</a>
        <div class="head_title">已选中{{checkList.length}}个</div>
        <span class="fr blue" v-if="!checkAll" @click="manageAll">全选</span>
        <span class="fr blue" v-else @click="manageAll">不全选</span>
      </div>
    </div>
    <div v-if="filterData.display==1" class="JS_file_list" style="position:relative;">
      <div class="file-list mescroll bg-white favorites-swiperout" ref="mescroll">
        <div style="position:absoulte;top:0;">
          <div class="gray padding-top-88" v-if="dataList.length==0&&!loading">
            <p class="margin-top-20 margin-bottom-20 text-center"><img width="50%" src="@/assets/bg_empty_file@2x.png"
                alt=""></p>
            <p class="text-center">空空如也…</p>
          </div>
          <swipeout>
            <swipeout-item v-for="(data,index) in dataList" :key="index" v-longtap="(e)=>vueTouch(data)" >
              <div slot="right-menu"> 
                
                <swipeout-button v-if="data.collection.length>0"  type="primary" @click.native="rightMenuClick3(data)"><span class="s_remove">取消星标</span>
                </swipeout-button>
                <swipeout-button v-else type="primary" @click.native="rightMenuClick(data)"><span class="s_mark">星标</span>
                </swipeout-button>
                <swipeout-button type="warn" @click.native="rightMenuClick2(data)"><span class="s_del">删除</span>
                </swipeout-button>
              </div>
              <div slot="content" class="flex flex-between align-center list_file">
                <div v-if="data.type=='dir'" @click="goDetail(data)">
                  <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files39@2x.png" />
                  <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
                </div>
                <div v-else @click="goDetail(data)">
                  <img class="icon-90" v-if="data.pass" src="@/assets/type/icon_files16@2x.png" />
                  <img class="icon-90" v-else :src="'http://cdnres.bianyue.cn/lyl/img/type/icon_'+data.type+'@2x.png'"
                    onerror="this.src='http://cdnres.bianyue.cn/lyl/img/type/icon_files11@2x.png'" />
                </div>
                <div class="w500" @click="goDetail(data)">
                  <div class="flex">
                    <span class="font-31 black-4 w-title" style="width: 5.6rem">{{data.title}}</span>
                  </div>
                   <p class="flex align-center margin-top-10 font-26 gray"><img v-if="data.collection.length>0" class="icon-h39" src="@/assets/new/icon_fav@2x.png" alt=""><span class="diin w230">{{data.time*1000,3|timeStamp}}</span><span v-if="data.size">{{data.size|formatBytes}}</span></p>
                </div>
                <div v-if="manageStatus" @click="checkOne(data)">
                  <div v-if="data.checked" class="ico_handle ico_handle_yes"></div>
                  <div v-else class="ico_handle ico_handle_kong"></div>
                </div>
                <div v-else @click="openHandle(data)" class="ico_handle"></div>
              </div>
            </swipeout-item>
          </swipeout>
        </div>
      </div>
    </div>
    <div v-else class="JS_file_list" style="position:relative;">
      <div class="flie-list mescroll bg-white" ref="mescroll">
        <div class="gray padding-top-88" v-if="dataList.length==0&&!loading">
          <div class="margin-top-20 margin-bottom-20 text-center"><img width="50%" src="@/assets/bg_empty_file@2x.png"
              alt=""></div>
          <div class="text-center">空空如也…</div>
        </div>
        <div class="flex flex-wrap" style="position:absoulte;top:0;">
          <div v-for="(data,index) in dataList" :key="index">
            <div class="pos-rel align-center fct margin-top-15 padding-10 w230">
              <div v-if="data.type=='dir'" @click="goDetail(data)">
                <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files39@2x.png" />
                <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
              </div>
              <div v-else @click="goDetail(data)">
                <img class="icon-90" v-if="data.pass" src="@/assets/type/icon_files16@2x.png" />
                <img class="icon-90" v-else :src="'http://cdnres.bianyue.cn/lyl/img/type/icon_'+data.type+'@2x.png'"
                  onerror="this.src='http://cdnres.bianyue.cn/lyl/img/type/icon_files11@2x.png'" />
              </div>
              <p class="margin-top-15 font-31 w-title text-center w750" @click="goDetail(data)">{{data.title}}</p>
              <p class="margin-top-10 font-26 gray"><img v-if="data.collection.length>0" class="icon-h39" style="width:.4rem;height:.4rem;" src="@/assets/new/icon_fav@2x.png" alt="">{{data.time*1000,3|timeStamp}}</p>
              <p class="margin-top-10 font-26 gray">{{data.size|formatBytes}}</p>
              <span v-if="manageStatus" @click="checkOne(data)">
                <span v-if="data.checked" class="pos_grid_radio ico_handle_yes"></span>
                <span v-else class="pos_grid_radio ico_handle_kong"></span>
              </span>
              <span v-else class="pos_grid_radio" @click="openHandle(data)"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="JS_tip" class="tip_more">
       <FooterNav v-if="!manageStatus" id="JS_file_footer" @homeAdd="goShowFun"></FooterNav>
      <Action v-else :type="ActionType" :isPass="handleData.pass" :isSc="handleData.collection.length>0" @clickMenu="clickMenu"></Action>
    </div><!-- 更多 -->
    <Popup v-model="showFun" :hide-on-blur="true" :is-transparent="true" style="height:6.4rem;" @on-hide="hideFun">
      <div class="box_function h_oflow">
        <ul class="flex flex-around fct font-28 black margin-top-40 list_operate">
          <li class="touch_hover" @click="newFile"><img class="w90" src="@/assets/function/btn_home_features8@2x.png"
              alt="">新建</li>
          <li class="touch_hover" @click="hideFun();"><img class="w90"
              src="@/assets/function/btn_home_features9@2x.png" />上传
            <Upload :topid="topid"  @progress="progress" @start="startUpload" @success="uploadSuccess" ref="uploadFile">
            </Upload>
          </li>
        </ul>
        <p class="fct margin-top-70">&nbsp;</p>
        <div class="flex flex-center margin-top-60">
          <div @click="hideFun" class="blue_ico blue_ico_mini"><span class="close"></span></div>
        </div>
      </div>
    </Popup>
    <div id="JS_file_popup" class="w-pop">
      <div class="box-bg border-bottom">
        <div class="flex flex-center"><img class="icon-90" src="@/assets/type/icon_files39@2x.png" /></div>
        <input class="border-all box-input margin-top-30" type="text" placeholder="请输入新建文件名" v-model="newName">
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.stop="newSubmit">确认</a>
      </div>
    </div>
    <div id="JS_file_popup2" class="w-pop">
      <div class="box-bg border-bottom border-box">
        <div class="flex flex-center">
          <div v-if="handleData.type=='dir'">
            <img class="icon-90" v-if="!handleData.pass" src="@/assets/type/icon_files39@2x.png" />
            <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
          </div>
          <div v-else>
            <img class="icon-90" v-if="handleData.pass" src="@/assets/type/icon_files16@2x.png" />
            <img class="icon-90" v-else :src="'http://cdnres.bianyue.cn/lyl/img/type/icon_'+handleData.type+'@2x.png'"
              onerror="this.src='http://cdnres.bianyue.cn/lyl/img/type/icon_files11@2x.png'" />
          </div>
        </div>
        <p class="text-over text-center" style="width: 80%;margin: 0 auto;">{{handleData.title}}</p>
        <input class="border-all box-input margin-top-30" type="text" placeholder="请输入新的文件名" v-model="editName">
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.stop="editSubmit">确认</a>
      </div>
    </div>
    <div id="JS_file_popup3" class="w-pop">
      <div class="box-bg border-bottom border-box">
        <div class="flex flex-center">
          <div v-if="openPassFileData.type=='dir'">
            <img class="icon-90" v-if="!openPassFileData.pass" src="@/assets/type/icon_files39@2x.png" />
            <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
          </div>
          <div v-else>
            <img class="icon-90" v-if="openPassFileData.pass" src="@/assets/type/icon_files16@2x.png" />
            <img class="icon-90" v-else
              :src="'http://cdnres.bianyue.cn/lyl/img/type/icon_'+openPassFileData.type+'@2x.png'"
              onerror="this.src='http://cdnres.bianyue.cn/lyl/img/type/icon_files11@2x.png'" />
          </div>
        </div>
        <p class="text-over text-center" style="width: 80%;margin: 0 auto;">{{openPassFileData.title}}</p>
        <input class="border-all box-input margin-top-30" type="text" placeholder="请输入文件密码" v-model="openPass">
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.stop="openPassSubmit">确认</a>
      </div>
    </div>
    <div id="JS_file_popup4" class="w-pop">
      <div class="box-bg border-bottom border-box">
        <div class="flex flex-center">
          <div v-if="handleData.type=='dir'">
            <img class="icon-90" v-if="!handleData.pass" src="@/assets/type/icon_files39@2x.png" />
            <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
          </div>
          <div v-else>
            <img class="icon-90" v-if="handleData.pass" src="@/assets/type/icon_files16@2x.png" />
            <img class="icon-90" v-else :src="'http://cdnres.bianyue.cn/lyl/img/type/icon_'+handleData.type+'@2x.png'"
              onerror="this.src='http://cdnres.bianyue.cn/lyl/img/type/icon_files11@2x.png'" />
          </div>
        </div>
        <p class="text-over text-center" style="width: 80%;margin: 0 auto;">{{handleData.title}}</p>
        <input class="border-all box-input margin-top-30" v-if="handleData.pass" type="password" placeholder="请输入原密码"
          v-model="oldPass">
        <input class="border-all box-input margin-top-30" v-else type="text" placeholder="请输入新密码" v-model="newPass">
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" v-if="handleData.pass" @click.stop="passSubmit">解密</a>
        <a class="btn-blue btn-mediume" v-else @click.stop="passSubmit">加密</a>
      </div>
    </div>
    <div id="JS_file_popup5" class="w-pop" style="width: 2.666667rem;height: 2.666667rem;background: transparent;">
      <x-circle v-if="circleInit" :percent="percent" :stroke-width="6" :trail-width="6"
        :stroke-color="['#36D1DC', '#5B86E5']" trail-color="#ececec">
        <span style="color:#fff">{{ percent }}%</span>
      </x-circle>
      <div v-else></div>
    </div>
    <div id="JS_file_popup6" class="w-pop">
      <div class="box-bg border-bottom">
        <div class="flex flex-center"><img class="icon-90" src="@/assets/type/icon_files39@2x.png" /></div>
        <input class="border-all box-input margin-top-30" type="text" placeholder="请输入新建收藏夹名" v-model="newFaName">
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.stop="newFaSubmit">确认</a>
      </div>
    </div> 
    <Popup v-model="showFilter" :hide-on-blur="true" position="right" style="overflow: hidden;background:#fff;">
      <FilterFile @close="showFilter=false" type="file" :filterData="filterData" @clickFilter="clickFilter">
      </FilterFile>
    </Popup>
  </div>
</template>
<script>
import FileHeader from "@/components/FileHeader";
import Action from "@/components/Action";
import FilterFile from "@/components/FilterFile";
import Upload from "@/components/Upload";
import FooterNav from "@/components/FooterNav";
import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";
import api from "@/api/index";
import {
  Popup,
  Actionsheet,
  XCircle,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton
} from "vux";
export default {
  name: "File",
  data() {
    return {
      mescroll: null, //mescroll实例对象
      dataList: [], //列表数据
      familyData: [],
      fileTitle: "文件",
      showFun: false,
      topid: 0,
      newName: "",
      newFaName: "",
      showFilter: false,
      menu: [
        {
          label: "移动",
          index: 0
        },
        {
          label: "重命名",
          index: 1
        },
        {
          label: "加密",
          index: 2
        },
        {
          label: "删除",
          index: 3
        }
      ],
      handleData: {},
      filterData: {
        display: 1,
        f_time: "new",
        f_size: "",
        f_type: "all",
        f_pass: "",
        show: false,
        title: ""
      },
      editName: "",
      // 加密解密
      oldPass: "",
      newPass: "",
      loading: true,
      // 打开文件
      openPassFileData: {},
      openPass: "",
      // 上传
      percent: 0,
      circleInit: false,

      manageStatus: false,
      checkList: [],
      checkAll: false,

      ActionType: "file"
    };
  },
  components: {
    FileHeader,
    Popup,
    Action,
    Actionsheet,
    Upload,
    XCircle,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    FilterFile,
    FooterNav
  },
  methods: {
    back() {
      this.$router.back();
    },
    familyJump(data) {
      if (data == "home" && this.familyData.length !== 0) {
        this.jump("/file");
        return false;
      }
      this.setStorage("yunTitle", data.title);
      this.jump(`/file?topid=${data.id}`);
    },
    upCallback(page) {
      let f_type = this.filterData.f_type;
      if (f_type == "all" || f_type == "de" || f_type == "en") {
        f_type = "";
      }
      this.loading = true;
      api
        .getFile({
          page: page.num,
          topid: this.topid,
          f_time: this.filterData.f_time,
          f_size: this.filterData.f_size,
          f_type: f_type,
          f_pass: this.filterData.f_pass
        })
        .then(data => {
          //请求的列表数据
          let arr = data.data.list.data;
          this.familyData = data.data.family_tree_data;
          if (page.num == 1) {
            this.dataList = [];
          }
          //把请求到的数据添加到列表
          this.dataList = this.dataList.concat(arr);
          this.loading = false;
          this.$nextTick(() => {
            this.mescroll.endSuccess(arr.length);
          });
        })
        .catch(data => {
          this.mescroll.endErr();
          this.loading = false;
        });
    },
    // Mescroll
    newMescroll(type) {
      if (type == 1) {
        this.mescroll.destroy();
      }
      this.mescroll = new MeScroll(this.$refs.mescroll, {
        up: {
          callback: this.upCallback,
          page: {
            num: 0,
            size: "15"
          }
        }
      });
    },
    // 筛选排序
    changeFilter2(filter) {
      if (
        this.filterData.f_pass == filter &&
        this.filterData.f_type !== "en" &&
        this.filterData.f_type !== "de"
      ) {
        this.filterData.f_pass = "";
        this.newMescroll(1);
        return false;
      } else if (this.filterData.f_pass == filter) {
        return false;
      }
      this.filterData.f_pass = filter;
      if (this.filterData.f_type == "en") {
        this.filterData.f_type = "de";
        this.filterData.title = "不加密";
      } else if (this.filterData.f_type == "de") {
        this.filterData.f_type = "en";
        this.filterData.title = "加密";
      }
      this.newMescroll(1);
    },
    filterBack() {
      this.filterData = {
        display: 1,
        f_time: "new",
        f_size: "",
        f_type: "all",
        f_pass: "",
        show: false,
        title: ""
      };
      this.newMescroll(1);
    },
    vueTouch(data) {
      this.manage();
      this.checkOne(data);
    },
    // 管理
    manage() {
      this.manageStatus = true;
      this.checkList = [];
      this.checkAll = false;
      let arr = [];
      this.dataList.forEach(el => {
        el.checked = false;
        arr.push(el);
      });
      this.dataList = arr;
    },
    manageClose() {
      this.manageStatus = false;
    },
    manageAll() {
      let arr = [];
      this.checkAll = !this.checkAll;
      this.dataList.forEach(el => {
        el.checked = this.checkAll;
        arr.push(el);
      });
      this.dataList = arr;
      if (this.checkAll) {
        this.checkList = this.dataList;
      } else {
        this.checkList = [];
      }
      this.ActionType = "file";
      if (this.checkList.length == 0) {
        this.ActionType = "file";
      } else if (this.checkList.length == 1) {
        this.handleData = this.checkList[0];
      } else {
        this.ActionType = "batchFile";
      }
    },
    checkOne(data) {
      let arr = [];
      this.dataList.forEach(el => {
        if (el.id == data.id) {
          el.checked = !el.checked;
        }
        arr.push(el);
      });
      this.dataList = arr;
      this.checkList = [];
      this.dataList.forEach(el => {
        if (el.checked) {
          this.checkList.push(el);
        }
      });
      this.ActionType = "file";
      if (this.checkList.length == 0) {
        this.manageStatus = false;
      } else if (this.checkList.length == 1) {
        this.handleData = this.checkList[0];
      } else {
        this.ActionType = "batchFile";
      }
      this.checkAll = this.checkList.length == this.dataList.length;
    },
    goShowFun() {
      this.showFun = true;
      $(".vux-popup-mask").css(
        "background",
        "linear-gradient(to top, rgba(255,255,255,1) , rgba(255,255,255,0.9) 75% , rgba(255,255,255,0.75) 100%)"
      );
    },
    hideFun() {
      this.showFun = false;
      setTimeout(() => {
        $(".vux-popup-mask").css("background", "rgba(0, 0, 0, 0.3)");
      }, 300);
    },
    // 切换显示
    changeDisplay(type) {
      this.showFilter = true;
    },
    // 左滑收藏
    rightMenuClick(data) {
      this.handleData = data;
      this.handleSC();
    },
    // 左滑删除
    rightMenuClick2(data) {
      this.handleData = data;
      this.handleDel();
    },
    rightMenuClick3(data) {
      this.handleData = data;
      this.handleYC();
    },
    // 上传
    startUpload() {
      let _this = this;
      this.percent = 0;
      this.circleInit = true;
      this.openPop({
        dom: $("#JS_file_popup5"),
        skin: "circle-layer",
        width: "2.666667rem",
        height: "2.8rem",
        end: () => {
          _this.$refs.uploadFile.uploadCancel = true;
          _this.percent = 0;
          _this.circleInit = false;
        }
      });
    },
    progress(data) {
      this.percent = parseInt(data) || 0;
    },
    uploadSuccess() {
      this.percent = 0;
      this.circleInit = false;
      this.newMescroll(1);
    },
    // 打开文件夹
    goDetail(data) {
      if (this.manageStatus) {
        this.checkOne(data);
        return false;
      }
      if (data.pass) {
        this.openPass = "";
        this.openPop({
          dom: $("#JS_file_popup3")
        });
        this.openPassFileData = data;
      } else {
        if (data.type == "dir") {
          this.setStorage("yunTitle", data.title);
          this.jump(`/file?topid=${data.id}`);
        } else {
          this.preview(data);
        }
      }
    },
    // 预览
    preview(row) {
      let ResponseContentType = "";
      switch (row.type) {
        case "jpg":
          ResponseContentType = "image/jpeg";
          break;
        case "jpeg":
          ResponseContentType = "image/jpeg";
          break;
        case "js":
          ResponseContentType = "text/javascript";
          break;
        case "css":
          ResponseContentType = "text/css";
          break;
        case "php":
          ResponseContentType = "text/plain";
          break;
        case "png":
          ResponseContentType = "image/png";
          break;
        case "gif":
          ResponseContentType = "image/gif";
          break;
        case "pdf":
          ResponseContentType = "application/pdf";
          break;
        case "txt":
          ResponseContentType = "text/plain";
          break;
        default:
          break;
      }

      if (ResponseContentType) {
        api
          .getFileStream({
            id: row.id,
            filename: row.title,
            ResponseContentDisposition: "filename=" + row.title,
            ResponseContentType: ResponseContentType
          })
          .then(response => {
            if (
              row.type == "pdf" ||
              row.type == "txt" ||
              row.type == "php" ||
              row.type == "css" ||
              row.type == "js"
            ) {
              cordova.InAppBrowser.open(
                response.data.url,
                "_blank",
                "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
              );
            } else {
              let imgs = [];
              imgs.push(response.data.url);
              this.$createImagePreview({
                imgs: imgs,
                initialIndex: 0,
                loop: true,
                speed: 500
              }).show();
            }
          });
      } else {
        this.toast("暂不支持该格式预览~");
      }
    },
    // 打开加密文件
    openPassSubmit() {
      if (this.openPass == this.openPassFileData.pass) {
        if (this.openPassFileData.type == "dir") {
          this.setStorage("yunTitle", this.openPassFileData.title);
          this.jump(`/file?topid=${this.openPassFileData.id}`);
        } else {
          this.closePop();
          this.preview(this.openPassFileData);
        }
      } else {
        this.$vux.toast.show({
          text: "密码错误",
          type: "cancel"
        });
      }
    },
    // 打开新建文件夹
    newFile() {
      this.hideFun();
      this.newName = "";
      this.openPop({
        dom: $("#JS_file_popup")
      });
    },
    // 新建文件名
    newSubmit() {
      if (!this.newName) {
        this.toast("请输入新建文件名");
        return false;
      }
      api
        .addFile({
          title: this.newName,
          topid: this.topid
        })
        .then(response => {
          this.newMescroll(1);
          this.$vux.toast.show("创建成功");
          this.closePop();
        });
    },
    //重命名
    editSubmit() {
      if (!this.editName) {
        this.toast("请输入新文件名");
        return false;
      }
      api
        .editFile({
          title: this.editName,
          id: this.handleData.id
        })
        .then(response => {
          this.$vux.toast.show("重命名成功");
          this.manageClose();
          this.closePop();
          this.dataList.forEach(element => {
            if (element.id == this.handleData.id) {
              element.title = this.editName;
            }
          });
        });
    },
    //加密/解密
    passSubmit() {
      let pass = this.newPass;
      let msg = "加密成功";
      if (this.handleData.pass) {
        let pass = this.oldPass;
        msg = "解密成功";
        if (!pass) {
          this.toast("请输入原密码");
          return false;
        } else if (pass !== this.handleData.pass) {
          this.toast("密码错误");
          return false;
        }
      } else {
        if (!this.newPass) {
          this.toast("请输入新密码");
          return false;
        }
      }
      api
        .editFile({
          pass: pass,
          id: this.handleData.id
        })
        .then(response => {
          this.$vux.toast.show(msg);
          this.closePop();
          this.dataList.forEach(element => {
            if (element.id == this.handleData.id) {
              element.pass = pass;
            }
          });
          this.manageStatus = false;
        });
    },
    // 收藏文件
    handleSC() {
      api
        .addToMask({
          resource_type: "file",
          resource_id: this.handleData.id
        })
        .then(data => {
          this.$vux.toast.show("星标成功");
          this.dataList.forEach((element, index) => {
            if (element.id == this.handleData.id) {
              this.dataList[index].collection.push({
                catalog_id: this.userInfo.default_collection_id
              });
            }
          });
          this.manageClose();
        });
    },
    // 取消收藏
    handleYC() {
      if (
        this.handleData.collection[0].catalog_id ==
        this.userInfo.default_collection_id
      ) {
        api
          .removeMask({
            id: this.handleData.collection[0].id
          })
          .then(response => {
            this.$vux.toast.show("取消星标成功");
            this.dataList.forEach((element, index) => {
              if (element.id == this.handleData.id) {
                this.dataList[index].collection.shift();
              }
            });
            this.manageClose();
          });
      } else {
        let _this = this;
        this.confirm({
          title: `确认取消${
            _this.handleData.collection[0].title
          }星标夹的星标？`,
          rightBtnText: "确定",
          delete: true,
          rightCallback: () => {
            api
              .removeMask({
                id: _this.handleData.collection[0].id
              })
              .then(response => {
                _this.$vux.toast.show("取消星标成功");
                _this.dataList.forEach((element, index) => {
                  if (element.id == _this.handleData.id) {
                    _this.dataList[index].collection.unshift(1);
                  }
                });
                _this.manageClose();
              });
          }
        });
      }
    },
    // 打开新建收藏夹
    newFaFile() {
      this.newFaName = "";
      this.openPop({
        dom: $("#JS_file_popup6")
      });
    },
    // 新建文件名
    newFaSubmit() {
      if (!this.newFaName) {
        this.toast("请输入新建收藏夹名");
        return false;
      }
      api
        .addMask({
          title: this.newFaName
        })
        .then(response => {
          this.$vux.toast.show("创建成功");
          this.closePop();
        });
    },
    // 删除文件
    handleDel() {
      api
        .delFile({
          "id[0]": this.handleData.id
        })
        .then(response => {
          this.$vux.toast.show("删除成功");
          this.manageClose();
          this.dataList.forEach((element, index) => {
            if (element.id == this.handleData.id) {
              this.dataList.splice(index, 1);
            }
          });
        });
    },
    // 打开操作栏
    openHandle(data) {
      this.manage();
      this.checkOne(data);
    },
    // 点击
    clickMenu(index) {
      if (this.checkList.length == 0) {
        this.toast("请选择文件~");
        return false;
      }
      if (index == 1) {
        if (this.checkList.length > 1) {
          this.batchHandle(1);
          return false;
        }
        this.jump(`/move?id=${this.handleData.id}&type=2`);
      } else if (index == 2) {
        this.handleSC();
      } else if (index == 3) {
        this.editName = "";
        this.openPop({
          dom: $("#JS_file_popup2")
        });
      } else if (index == 4) {
        this.oldPass = "";
        this.newPass = "";
        this.openPop({
          dom: $("#JS_file_popup4")
        });
      } else if (index == 5) {
        if (this.checkList.length > 1) {
          this.batchHandle(2);
          return false;
        }
        this.handleDel();
      } else if (index == 6) {
        this.handleYC();
      }
    },
    clickFilter(data) {
      this.filterData = data;
      this.newMescroll(1);
    },
    // 批量操作
    batchHandle(type) {
      if (type == 1) {
        this.setStorage("yunMoveList", JSON.stringify(this.checkList));
        this.jump("/move?batch=true&type=2");
      } else if (type == 2) {
        let _this = this;
        let idParams = {};
        this.checkList.forEach((el, index) => {
          idParams["id[" + index + "]"] = el.id;
        });
        api.delFile(idParams).then(response => {
          this.$vux.toast.show("删除成功");
          this.newMescroll(1);
          this.manageClose();
        });
      }
    }
  },
  // // 进入路由时,恢复列表状态
  beforeRouteEnter(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      if (vm.mescroll) {
        // 恢复到之前设置的isBounce状态
        if (vm.mescroll.lastBounce != null)
          vm.mescroll.setBounce(vm.mescroll.lastBounce);
        // 滚动到之前列表的位置 (注意:路由使用keep-alive才生效)
        if (vm.mescroll.lastScrollTop) {
          vm.mescroll.setScrollTop(vm.mescroll.lastScrollTop);
          setTimeout(() => {
            // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
            vm.mescroll.setTopBtnFadeDuration(0); // 设置回到顶部按钮显示时无渐显动画
          }, 16);
        }
      }
    });
  },
  // // 离开路由时,记录列表状态
  beforeRouteLeave(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    if (this.mescroll) {
      this.mescroll.lastBounce = this.mescroll.optUp.isBounce; // 记录当前是否禁止ios回弹
      this.mescroll.setBounce(true); // 允许bounce
      this.mescroll.lastScrollTop = this.mescroll.getScrollTop(); // 记录当前滚动条的位置
      this.mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
    }
    next();
  },
  mounted() {
    $(".JS_file_list").height(
      $(window).height() -
        $("#JS_file_header").height() -
        $("#JS_file_gl").height() -
        5
    );
    this.newMescroll();
  },
  created() {
    let topid = this.$router.currentRoute.query.topid;
    this.topid = topid || 0;
    let title = this.getStorage("yunTitle");
    if (title) {
      this.fileTitle = title;
      this.removeStorage("yunTitle");
    }
  }
};
</script>
<style scoped>
</style>
