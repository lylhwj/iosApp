<template>
  <div>
    <FooterNav id="JS_transfer_footer" @homeAdd="homeAdd" page="transfer"></FooterNav>
    <div id="JS_transfer_header">
      <div class="head_gray font-32">
        <a href="javascript:;" class="head_all " @click="openHandle"></a>
        <i class="fl head_back" @click.prevent="back" title="返回"></i>
        <p class="transfer_tab">
          <span :class="{hover:tabIndex==1}" @click="tabIndex=1">上传</span>
          <span :class="{hover:tabIndex==2}" @click="tabIndex=2">下载</span>
          <span :class="{hover:tabIndex==3}" @click="tabIndex=3">链接任务<i v-if="showDownNum>0"></i></span>
        </p>
      </div>
      <div class="bg-yellow padding-20 font-24" style="background:#ffe6b0;color:#af8555;">
        请遵循<span class="blue" @click="openLinkTask">服务协议</span>！严禁存储、处理、传输、发布任何涉密、色情、暴力、侵权等违法违规信息！
      </div>
    </div>
    <div class="JS_transfer_list" style="position:relative;">
      <div class="lixian-list mescroll bg-white edit-swiperout" ref="mescroll">
        <div style="position:absoulte;top:0;">
          <div class="gray padding-top-88" v-if="tabIndex==1">
            <p class="margin-top-20 margin-bottom-20 text-center"><img width="50%" src="@/assets/bg_empty_popup@2x.png"
                alt=""></p>
            <p class="text-center">暂无上传记录</p>
          </div>
          <div class="gray padding-top-88" v-else-if="tabIndex==2">
            <p class="margin-top-20 margin-bottom-20 text-center"><img width="50%" src="@/assets/bg_empty_popup@2x.png"
                alt=""></p>
            <p class="text-center">暂无下载记录</p>
          </div>
          <div class="gray padding-top-88" v-else-if="tabIndex==3&&dataList.length==0&&!loading">
            <p class="margin-top-20 margin-bottom-20 text-center"><img width="50%" src="@/assets/bg_empty_popup@2x.png"
                alt=""></p>
            <p class="text-center">暂无链接记录</p>
          </div>
          <swipeout v-else-if="tabIndex==3" class="da">
            <swipeout-item class="xiao" v-for="data in dataList" :key="data.id" v-tap="(e)=>vueTouch(e)">
              <div slot="right-menu">
                <swipeout-button type="warn" @click.native="rightMenuClick(data)"><span class="s_del">删除任务</span>
                </swipeout-button>
              </div>
              <div slot="content" class="flex flex-between align-center list_file">

                <!-- <div class="ico_handle ico_handle_kong"></div> -->
                <div v-if="data.type==1" @click="goDetail(data)">
                  <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files39@2x.png" />
                  <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
                </div>
                <div v-else @click="goDetail(data)">
                  <img class="icon-90" src="@/assets/type/icon_files39@2x.png" />
                  <!-- <div v-if="data.cTime<=5000">
                    <img class="icon-90" src="@/assets/type/icon_files54@2x.png" />
                  </div>
                  <div
                    v-else-if="data.jindu?data.jindu.status==5:false||data.jindu?data.jindu.status==2:false||data.jindu?data.jindu.jindu==-1:false">
                    <img class="icon-90" src="@/assets/type/icon_files58@2x.png" />
                  </div>
                  <div v-else-if="data.jindu?data.jindu.status==-3:false||data.jindu?data.jindu.status==-4:false">
                    <img class="icon-90" src="@/assets/type/icon_files58@2x.png" />
                  </div>
                  <div v-else-if="data.jindu?data.jindu.jindu=='100':false">
                    <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files39@2x.png" />
                    <img class="icon-90" v-else src="@/assets/type/icon_files39@2x.png" />
                  </div>
                  <div v-else>
                    <img class="icon-90" src="@/assets/type/icon_files54@2x.png" />
                  </div> -->
                </div>
                <div class="w500 padding-top-10 padding-bottom-5" @click="goDetail(data)">
                  <div class="flex">
                    <div class="flex-column flex-center" v-if="data.experience">
                      <img style="width: .6rem;height: .333333rem;" src="http://img.bianyue.cn/new/pan/icon_free.gif"
                        alt="">
                    </div>
                    <span class="font-31 black-4 w-title text-over">{{data.title}}</span>
                  </div>
                  <div class="margin-top-10 margin-bottom-10 pos-rel" style="line-height: .533333rem;">
                    <!-- <div v-if="data.cTime<=5000">
                      <img class="vmid icon-25" src="@/assets/new/icon_popup_time@2x.png" alt="">
                      <span class="blue font-26 margin-left-10">正在分配服务器</span>
                    </div>
                    <div v-else-if="5000>=data.cTime&&data.cTime<=8000">
                      <img class="vmid icon-25" src="@/assets/new/icon_popup_time@2x.png" alt="">
                      <span class="blue font-26 margin-left-10">下载中</span>
                    </div> -->
                    <div v-if="data.jindu?data.jindu.status==5:false">
                      <img class="vmid icon-25" src="@/assets/new/icon_popup_wrong@.png" alt=""><span
                        class="red font-26  margin-left-10">任务失败</span><span class="gray font-26">
                        &emsp; <span v-if="data.size">{{data.size?data.size.size:''}}</span> 
                      </span></div>
                    <div v-else-if="data.jindu?data.jindu.status==2:false">
                      <img class="vmid icon-25" src="@/assets/new/icon_popup_wrong@.png" alt=""><span
                        class="red font-26  margin-left-10">任务失败</span><span class="gray font-26">
                        &emsp; <span v-if="data.size">{{data.size?data.size.size:''}}</span> 
                      </span></div>
                    <div v-else-if="data.jindu?data.jindu.jindu==-1:false">
                      <img class="vmid icon-25" src="@/assets/new/icon_popup_wrong@.png" alt=""><span
                        class="red font-26  margin-left-10">任务失败</span><span class="gray font-26">
                        &emsp; <span v-if="data.size">{{data.size?data.size.size:''}}</span> 
                      </span></div>
                    <div v-else-if="data.jindu?data.jindu.jindu==-3:false">
                      <img class="vmid icon-25" src="@/assets/new/icon_popup_wrong@.png" alt=""><span
                        class="red font-26  margin-left-10">任务失败</span><span class="gray font-26">
                        &emsp; <span v-if="data.size">{{data.size?data.size.size:''}}</span> 
                      </span></div>
                    <div v-else-if="data.jindu?data.jindu.jindu==-4:false">
                      <img class="vmid icon-25" src="@/assets/new/icon_popup_wrong@.png" alt=""><span
                        class="red font-26  margin-left-10">任务失败</span><span class="gray font-26">
                        &emsp; <span v-if="data.size">{{data.size?data.size.size:''}}</span> 
                      </span></div>
                    <div v-else-if="data.jindu?data.jindu.jindu==-2:false">
                      <img class="vmid icon-25" src="@/assets/new/icon_popup_wrong@.png" alt=""><span
                        class="red font-26 margin-left-10">任务失败</span><span class="gray font-26">
                        &emsp; <span v-if="data.size">{{data.size?data.size.size:''}}</span> 
                      </span></div>
                    <div v-else-if="data.jindu?data.jindu.jindu=='100':false"><img class="vmid icon-25"
                        src="@/assets/new/icon_popup_success@.png" alt=""><span
                        class="green font-26 margin-left-10">任务完成</span><span class="gray font-26">
                        &emsp; <span v-if="data.size">{{data.size?data.size.size:''}}</span> 
                      </span></div>
                    <div v-else>
                      <img class="vmid icon-25" src="@/assets/new/icon_popup_download@.png" alt="">
                      <span class="blue font-26 margin-left-10">
                        <span class="font-26">{{data,2|progress}} </span> 
                        <span
                          class="gray font-26">
                          &emsp; <span v-if="data.size">{{data.size?data.size.size:''}}</span>

                          <!-- <span
                            v-if="data.jindu?data.jindu.status==5:false||data.jindu?data.jindu.status==2:false||data.jindu?data.jindu.jindu==-1:false"></span>
                          <span
                            v-else-if="data.jindu?data.jindu.status==-3:false||data.jindu?data.jindu.status==-4:false"></span>
                          <span v-else-if="data.jindu?data.jindu.jindu=='100':false"></span>
                          <span v-else>{{data,3|progress}}</span> -->
                        </span></span>
                    </div>
                  </div>
                </div>
                <div @click="copy(data.hash)" class="ico_handle ico_handle_link"></div>
              </div>
            </swipeout-item>
          </swipeout>
        </div>
      </div>
    </div>
    <div id="JS_lixian_popup2" class="w-pop">
      <div class="box-bg border-bottom border-box">
        <div class="flex flex-center">
          <div v-if="handleData.type==1">
            <img class="icon-90" v-if="!handleData.pass" src="@/assets/type/icon_files39@2x.png" />
            <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
          </div>
          <div v-else>
            <div v-if="handleData.jindu?handleData.jindu.jindu=='100':false">
              <img class="icon-90" v-if="!handleData.pass" src="@/assets/type/icon_files39@2x.png" />
              <img class="icon-90" v-else src="@/assets/type/icon_files39@2x.png" />
            </div>
            <div v-else>
              <img class="icon-90" src="@/assets/type/icon_files54@2x.png" />
            </div>
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
    <div id="JS_lixian_popup5" class="w-pop">
      <div class="box-bg border-bottom border-box">
        <div class="flex flex-center">
          <div v-if="playData.type==1">
            <img class="icon-90" v-if="!playData.pass" src="@/assets/type/icon_files39@2x.png" />
            <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
          </div>
          <div v-else>
            <div v-if="playData.jindu?playData.jindu.jindu=='100':false">
              <img class="icon-90" v-if="!playData.pass" src="@/assets/type/icon_files39@2x.png" />
              <img class="icon-90" v-else src="@/assets/type/icon_files39@2x.png" />
            </div>
            <div v-else>
              <img class="icon-90" src="@/assets/type/icon_files54@2x.png" />
            </div>
          </div>
        </div>
        <p class="text-over text-center" style="width: 80%;margin: 0 auto;">{{playData.title}}</p>
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.stop="playSubmit()">播放</a>
      </div>
    </div>
    <div id="JS_lixian_popup6" class="w-pop">
      <div class="padding-24">
        <div class="flex flex-center"><img style="width:3rem; height:4rem;" src="@/assets/bg_point_experience@2x.png"
            alt="" /></div>
        <div class="flex flex-between">
          <div style="width:45%; height:2.9rem;"><a class="font-24">普通用户随机赠送1次在线预览特权，该链接任务系统已释放为免费资源</a></div>
          <div class="border-right" style="width:2px; height:2rem;"></div>
          <div style="width:45%; height:2.9rem;"><a class="font-24">没有平衡的盈利和支出就没有长久的服务 升级VIP才可享有在线预览特权</a></div>
        </div>
        <div class="flex flex-between" style="position:absolute; bottom:0; left:0;width: 100%;">
          <a class="btn-blue btn-big experience" style="width:50%; border-radius:0 0 0 8px; border:0"
            @click.stop="experience">免费体验</a>
          <a class="btn-orange btn-big experience" style="width:50%; border-radius:0 0 8px 0; border:0"
            @click.stop="closePop();showVip=true">升级VIP</a>
        </div>
      </div>
    </div>
    <div id="JS_lixian_popup7" class="w-pop">
      <div class="flex flex-center"><img style="width: 6rem; height: 3.2rem;margin-top: .3rem;"
          src="@/assets/bg_cardbag_vip_home_point@2x.png"></img></div>
      <div class="box-bg fct" style="padding-top:0.3rem;">
        <p class="font-28">没有平衡的盈利和支出就没有长久的服务</p>
        <p class="font-28 margin-top-20">升级VIP才可享有在线预览特权</p>
        <div class="flex flex-center">
          <a class="btn-orange btn-big w460 margin-top-30" @click.stop="closePop();showVip=true;">升级VIP</a>
        </div>
      </div>
    </div>
    <div id="JS_lixian_popup8" class="w-pop">
      <div class="flex flex-center"><img style="width: 6rem; height: 3.2rem;margin-top: .3rem;"
          src="@/assets/bg_cardbag_vip_home_point@2x.png"></img></div>
      <div class="box-bg fct" style="padding-top:0.3rem;">
        <p class="font-28">VIP过期时间：{{userInfo.overduedate*1000,1|timeStamp}}</p>
        <div class="flex flex-center">
          <a class="btn-orange btn-big w460 margin-top-30" @click.stop="closePop();showVip=true;">续费VIP</a>
        </div>
      </div>
    </div>
    <div id="JS_lixian_popup9" class="w-pop">
      <div class="box-bg">
        <div class="pos-rel">
          <input class="font-30 border-all box-input" v-model="checkCode" type="tel" placeholder="验证码">
          <img @click="changeImg" :src="codeImg" alt="" class="code-img">
        </div>
        <p class="margin-top-20 gray font-26">输入验证码后，可继续播放</p>
      </div>
      <div class="flex flex-around margin-top-30 border-top">
        <a class="btn-white btn-mediume" @click.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.stop="play(2)">确认</a>
      </div>
    </div>
    <div id="JS_lixian_popup10" class="w-pop">
      <div class="box-bg border-bottom fct">
        <img class="icon-h39 vmid" src="@/assets/icon_warning.png" />
        {{playErr}}
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.stop="closePop">返回</a>
        <a class="btn-blue btn-mediume" @click="handleDel">删除</a>
      </div>
    </div>
    <div id="JS_lixian_popup11" class="w-pop">
      <div class="box-bg fct flex flex-center">
        <div class="flex-column flex-center ">
          <img class="icon-h39 vmid" src="@/assets/icon_warning.png" />
        </div>
        <div class="flex-column flex-center margin-left-10 margin-right-10">
          <span>该链接任务正在离线转码</span>
        </div>
        <div class="flex-column flex-center ">
          <a @click.prevent="openHlep"><img class="icon-39" src="@/assets/lixian_help@2x.png" alt=""></a>
        </div>  
      </div>
      <p class="grayc  border-bottom font-26 text-center" style="margin-top:-0.5rem;padding-bottom:.5rem;">完成后自动导入云下载列表</p>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.prevent.stop="closePop">返回</a>
        <a class="btn-blue btn-mediume" @click.prevent="jump('/bt')">继续添加</a>
      </div>
    </div>
    <HomeAdd ref="homeAdd"></HomeAdd>
    <Popup v-model="showHandle" :hide-on-blur="true" :is-transparent="true"
      style="overflow: hidden;background: rgba(255, 255, 255, 0.93); ">
      <Action @close="showHandle=false" type="transferClear" :isPass="'no'" @clickMenu="clickMenu"></Action>
    </Popup>
  </div>
</template>
<script>
import FooterNav from "@/components/FooterNav";
import HomeAdd from "@/components/HomeAdd";
import FileHeader from "@/components/FileHeader";
import DredgeVip from "@/components/DredgeVip";
import Action from "@/components/Action";
import Activity from "@/components/Activity";
import Progress from "@/components/Progress";
import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";
import api from "@/api/index";
import {
  Popup,
  Actionsheet,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  XCircle
} from "vux";

export default {
  name: "Transfer",
  data() {
    return {
      mescroll: null, //mescroll实例对象
      dataList: [], //列表数据
      total: 0,
      newName: "",
      showHandle: false,
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
      display: 1,
      editName: "",
      // 加密解密
      oldPass: "",
      newPass: "",
      loading: true,
      // 打开文件
      openPassFileData: {},
      openPass: "",
      // 播放
      playData: {},
      playId: "",
      showVip: false,
      experienceId: "",
      checkCode: "",
      codeImg: "",
      playErr: "",
      checkList: [],
      checkAll: false,
      filter: "all",
      msg: "全部任务",
      delFilter: "all",
      showDownNum: 0,
      tabIndex: 3
    };
  },
  components: {
    FileHeader,
    Popup,
    Actionsheet,
    DredgeVip,
    Activity,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Action,
    FooterNav,
    XCircle,
    HomeAdd,
    Progress
  },
  filters: {
    progress(data, type) {
      if (data.size) {
        let size = data.size.size || "";
        if (size.indexOf("GB") !== -1) {
          size =
            parseFloat(size.substring(0, size.length - 2)) * 1024 * 1024 * 1024;
        } else if (size.indexOf("MB") !== -1) {
          size = parseFloat(size.substring(0, size.length - 2)) * 1024 * 1024;
        } else if (size.indexOf("KB") !== -1) {
          size = parseFloat(size.substring(0, size.length - 2)) * 1024;
        } else {
          if (type == 2) {
            return "50%";
          } else if (type == 3) {
            return "";
          }
          return 50;
        }
        let speed =
          350 * 1024 +
          101 *
            String(size).substring(
              String(size).length - 1,
              String(size).length
            );
        let time = parseInt((new Date().getTime() - data.time * 1000) / 1000);
        let bili = speed * time / size * 100;
        if (type == 3) {
          let random = Math.floor(Math.random() * 200) - 100;
          return parseInt(speed / 1024) + random + "KB/s";
        }
        if (bili >= 99) {
          return "任务转码中";
          if (type == 2) {
            let baifenbi =
              90 +
              parseInt(
                String(size).substring(
                  String(size).length - 1,
                  String(size).length
                )
              );
            if (baifenbi > 99) {
              return "99%";
            } else {
              return baifenbi + "%";
            }
          }
          return 98;
        } else {
          if (type == 2) {
            if (parseInt(bili) <= 0) {
              return "0%";
            }
            return parseInt(bili) + "%";
          }
          if (parseInt(bili) < 0) {
            return 0;
          } else {
            return parseInt(bili);
          }
        }
      } else {
        if (type == 2) {
          return "50%";
        }
        return 50;
      }
    }
  },
  methods: {
    openLinkTask() {
      cordova.InAppBrowser.open(
        "http://vip.bianyue.cn/agreementLinkTask",
        "_blank",
        "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
      );
    },
    vueTouch(e) {},
    back() {
      this.jump(`/home?slip=no`);
    },
    homeAdd() {
      this.$refs.homeAdd.goShowFun();
    },
    showFun() {
      let $fun = $("#JS_tranfer_header_fun");
      $fun.fadeToggle();
    },
    // 复制链接
    copy(text) {
      cordova.plugins.clipboard.copy("magnet:?xt=urn:btih:" + text, () => {
        this.$vux.toast.show("链接已复制");
      });
    },
    // 查看
    select(type) {
      this.filter = type;
      this.delFilter = type;
      this.dataList = [];
      this.newMescroll(1);
    },
    upCallback(page) {
      let versions = this.getStorage("yunVersions");
      if (!versions) {
        versions = new Date().getTime() + "";
        this.setStorage("yunVersions", new Date().getTime());
      }
      this.loading = true;
      api
        .lixianDown({
          page: page.num,
          f: this.filter,
          per_page: 10
          // v:versions,
          // cache:1
        })
        .then(data => {
          //请求的列表数据
          let arr = data.data.list.data;
          if (page.num == 1) {
            this.dataList = [];
          }
          arr.forEach(el => {
            el.cTime = new Date().getTime() - el.time * 1000;
          });
          //把请求到的数据添加到列表
          this.dataList = this.dataList.concat(arr);
          this.total = data.data.list.total || 0;
          switch (this.filter) {
            case "all":
              this.msg = "全部任务";
              break;
            case "working":
              this.msg = "下载中";
              break;
            case "completed":
              this.msg = "任务完成";
              break;
            case "failed":
              this.msg = "任务失败";
              break;
            default:
              break;
          }
          this.loading = false;
          this.$nextTick(() => {
            this.init();
            this.mescroll.endSuccess(arr.length);
          });
        })
        .catch(error => {
          this.mescroll.endErr();
          this.loading = false;
          if (
            String(error).indexOf("timeout") !== -1 &&
            this.$router.currentRoute.name == "Transfer"
          ) {
            this.$vux.toast.show({
              text: "请求超时，请刷新重试！",
              type: "cancel"
            });
          }
        });
      api
        .lixianDown({
          page: 1,
          f: "working",
          topid: 0
        })
        .then(data => {
          this.showDownNum = data.data.list.total || 0;
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
            size: 10
          }
        }
      });
    },
    // 左滑删除
    rightMenuClick(data) {
      this.handleData = data;
      this.handleDel();
    },
    //重命名
    editSubmit() {
      if (!this.editName) {
        this.toast("请输入新文件名");
        return false;
      }
      api
        .editLoad({
          title: this.editName,
          id: this.handleData.id
        })
        .then(response => {
          this.$vux.toast.show("重命名成功");
          this.closePop();
          this.dataList.forEach(element => {
            if (element.id == this.handleData.id) {
              element.title = this.editName;
            }
          });
        });
    },
    // 打开离线转码帮助
    openHlep() {
      cordova.InAppBrowser.open(
        "http://help.bianyue.cn/syzn/6.html",
        "_blank",
        "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
      );
    },
    // 打开文件夹
    goDetail(data) {
      if (
        data.jindu
          ? data.jindu.status == 5
          : false || data.jindu
            ? data.jindu.status == 2
            : false && data.jindu
              ? data.jindu.jindu == -1
              : false || data.jindu ? data.jindu.jindu == -3 : false
      ) {
        this.playErr = "该链接任务HASH值无效";
        this.closePop();
        this.openPop({
          dom: $("#JS_lixian_popup10"),
          width: "70%"
        });
        this.handleData = data;
      } else if (data.jindu ? data.jindu.jindu == -2 : false) {
        this.playErr = "该链接任务无视频文件";
        this.closePop();
        this.openPop({
          dom: $("#JS_lixian_popup10"),
          width: "70%"
        });
        this.handleData = data;
      } else if (data.jindu ? data.jindu.jindu == -4 : false) {
        this.playErr = "该链接任务被多次举报，已被系统屏蔽";
        this.closePop();
        this.openPop({
          dom: $("#JS_lixian_popup10"),
          width: "70%"
        });
        this.handleData = data;
      } else if (data.jindu ? data.jindu.jindu == "100" : false) {
        // if (data.cTime <= 8000) {
        //   return false;
        // }
        api
          .getFamily({
            topid: data.topid
          })
          .then(response => {
            let familyData = response.data.family_tree_data || [];
            this.setStorage("myYunPlayData", JSON.stringify(data));
            this.setStorage("myYunFamilyData", JSON.stringify(familyData));
            this.jump(`/lixian2?yunid=${data.id}`);
          });
      } else {
          this.openPop({
              dom: $("#JS_lixian_popup11")
            });
        // this.playData = data;
        // this.playSubmit();
      }
    },
    // 打开加密文件
    openPassSubmit() {
      if (this.openPass == this.openPassFileData.pass) {
        if (this.openPassFileData.type == 1) {
          this.jump(`/lixian?topid=${this.openPassFileData.id}`);
        } else {
          this.openPlay(this.openPassFileData);
        }
      } else {
        this.$vux.toast.show({
          text: "密码错误",
          type: "cancel"
        });
      }
    },
    //打开播放
    openPlay(data) {
      this.closePop();
      this.playData = data;
      this.openPop({
        dom: $("#JS_lixian_popup5"),
        width: "70%"
      });
    },
    playSubmit() {
      this.closePop();
      this.wLoading();
      this.GET({
        api: "/pan.php?op=init",
        data: {
          action: "playlist",
          id: this.playData.hash
        },
        alertErr: "no",
        success: response => {
          if (response.status == 200) {
            if (response.data.length == 0) {
              this.$vux.toast.show({
                text: "播放数据错误",
                type: "cancel"
              });
            } else {
              // 只有一条直接播放 两条以上跳转到播放列表
              if (response.data.length == 1) {
                this.playId = response.data[0].id;
                this.play();
              } else {
                this.setStorage("yun_play_list", JSON.stringify(response.data));
                this.jump(
                  `/playList?hash=${this.playData.hash}&fid=${
                    this.playData.fid
                  }`
                );
              }
            }
          } else if (response.try == "try_allow") {
            this.experienceId = this.playData.hash || "";
            this.openPop({
              dom: $("#JS_lixian_popup6")
            });
          } else if (
            response.try == "try_forbid_exists" ||
            response.try == "try_end" ||
            response.try == "try_forbid_unsupported"
          ) {
            if (parseInt(this.userInfo.overduedate) > 0) {
              this.openPop({
                dom: $("#JS_lixian_popup8")
              });
            } else {
              this.openPop({
                dom: $("#JS_lixian_popup7")
              });
            }
          } else if (response.status == "该资源正在离线转码") {
            this.openPop({
              dom: $("#JS_lixian_popup11")
            });
          } else {
            this.$vux.toast.show({
              text: response.status,
              type: "cancel"
            });
          }
        },
        complete: data => {
          this.wLoading({
            type: "hide"
          });
        }
      });
    },
    play(type) {
      let params = {
        hash: this.playData.hash,
        id: this.playId,
        p: 0,
        f: this.playData.fid
      };
      if (type == 2 && !this.checkCode) {
        this.toast("请输入图形验证码");
        return false;
      } else if (type == 2) {
        params.code = this.checkCode;
      }
      this.wLoading();
      this.GET({
        api: "/pan.php?op=iphoneplay",
        jsonp: true,
        alertErr: "no",
        data: params,
        success: response => {
          this.wLoading({
            type: "hide"
          });
          this.checkCode = "";
          if (response.status == 200) {
            let font = $("html").css("font-size");
            let _this = this;
            this.closePop();
            let videoUrl = response.data;
            let options = {
              successCallback: function() {
                _this.toast("Video was closed without error.");
              },
              errorCallback: function(errMsg) {
                _this.toast(errMsg);
              },
              orientation: "landscape",
              shouldAutoClose: true, // true(default)/false
              controls: true // true(default)/false. Used to hide controls on fullscreen
            };
            window.plugins.streamingMedia.playVideo(videoUrl, options);
            $("html").css("font-size", font);
            $(window).on("resize", () => {
              $("html").css("font-size", font);
            });
          } else if (response.status == "check_code") {
            let $dom = $("#JS_lixian_popup9");
            this.openPop({
              dom: $dom
            });
            this.changeImg();
          } else if (response.status == "验证码错误！") {
            let $dom = $("#JS_lixian_popup9");
            this.openPop({
              dom: $dom
            });
            this.changeImg();
            if (type == 2) {
              this.$vux.toast.show({
                text: response.status,
                type: "cancel"
              });
            }
          } else {
            this.$vux.toast.show({
              text: response.status,
              type: "cancel"
            });
          }
        },
        error: error => {
          this.wLoading({
            type: "hide"
          });
          this.toast(error);
        }
      });
    },
    // 体验
    experience() {
      $.ajax({
        type: "POST",
        url: "http://api2.bianyue.cn/api_phpcms/get_vip_experience?type=1",
        data: {
          bt_play_hash: this.experienceId
        },
        beforeSend: () => {
          this.wLoading();
        },
        timeout: 8000,
        xhrFields: {
          withCredentials: true
        },
        success: data => {
          if (data.code == 200) {
            setTimeout(() => {
              this.wLoading({
                type: "hide"
              });
              this.closePop();
              this.$vux.toast.show("该链接任务已免费赠送");
              this.newMescroll(1);
            }, 500);
          } else {
            setTimeout(() => {
              this.wLoading({
                type: "hide"
              });
              this.$vux.toast.show({
                text: data.msg,
                type: "cancel"
              });
            }, 500);
          }
        },
        error: error => {
          this.wLoading({
            type: "hide"
          });
          this.toast(error);
        }
      });
    },
    changeImg() {
      this.codeImg =
        "http://api.bianyue.cn/api.php?op=checkcode&code_len=4&font_size=13&width=80&height=26&" +
        Math.random();
    },
    // 打开操作栏
    openHandle() {
      this.showHandle = true;
    },
    // 删除文件
    handleDel() {
      if (
        this.handleData.jindu ? this.handleData.jindu.jindu == "100" : false
      ) {
        api
          .delLixanList({
            "clearIds[0]": this.handleData.id
          })
          .then(response => {
            this.$vux.toast.show("删除成功");
            this.dataList.forEach((element, index) => {
              if (element.id == this.handleData.id) {
                this.dataList.splice(index, 1);
                this.total = this.total - 1;
              }
            });
          });
      } else {
        api
          .delLoad({
            "id[0]": this.handleData.id
          })
          .then(response => {
            this.closePop();
            this.$vux.toast.show("删除成功");
            this.dataList.forEach((element, index) => {
              if (element.id == this.handleData.id) {
                this.dataList.splice(index, 1);
                this.total = this.total - 1;
              }
            });
          });
      }
    },
    // 清空
    clickMenu(index) {
      this.showHandle = false;
      let _this = this;
      let clearMsg = "清空转码中任务？";
      switch (index) {
        case 1:
          clearMsg = "清空失败任务？";
          this.delFilter = "failed";
          break;
        case 2:
          clearMsg = "清空转码中任务？";
          this.delFilter = "working";
          break;
        case 3:
          clearMsg = "清空已完成任务？";
          this.delFilter = "completed";
          break;

        default:
          break;
      }
      this.confirm({
        title: `${clearMsg}`,
        rightBtnText: "清空",
        delete: true,
        rightCallback: () => {
          api
            .clearLixanList({
              f: this.delFilter
            })
            .then(response => {
              _this.closePop();
              _this.$vux.toast.show("清空成功");
              _this.newMescroll(1);
            });
        }
      });
    },
    init() {
      $.fn.wave = function(options) {
        var defaults = {
          lineColor: "white", //默认下标线颜色
          lineHeight: 4, //默认下标线高度
          waveColor: "lightblue", //默认波浪颜色
          index: 0 //默认选中标签下标
        };
        var options = $.extend({}, defaults, options);
        this.each(function() {
          var $this = $(this);
          var $buttons = $("." + options.btnClass, $this);
          $this.append(
            `<div class="line" style="position:absolute;transition:.5s;-webkit-transition:.5s;-moz-transition:.5s;-o-transition:.5s;bottom:0;left:${
              $buttons[options.index].offsetLeft
            }px;width:${$buttons[options.index].clientWidth}px;height:${
              options.lineHeight
            }px;background:${options.lineColor};"><div>`
          );
          var $line = $(".line", $this); //下标线
          $buttons.each(function() {
            $(this)
              .css("overflow", "hidden")
              .unbind("click")
              .click(function(e) {
                var event = e || event;
                var $this = $(this);
                $(".wave", $this).remove();
                $this.append(
                  `<div class="wave" style="position:absolute;transform:scale(0);-webkit-transform:scale(0);border-radius:50%;background:${
                    options.waveColor
                  };opacity:0.4;"></div>`
                );
                var x = event.pageX; //鼠标位置到页面左边的距离(包括滚动距离)
                var y = event.pageY; //鼠标位置到页面顶端的距离(包括滚动距离)
                var w = this.clientWidth; //按钮的宽
                var h = this.clientHeight; //按钮的高
                var offsetLeft = $(this).offset().left; //按钮到其父元素左边的距离
                var offsetTop = $(this).offset().top; //按钮到其父元素顶端的距离
                var left = offsetLeft;
                var top = offsetTop;
                if (w > h) {
                  h = w;
                } else {
                  w = h;
                }
                var left = x - w - left;
                var top = y - h - top;
                var $wave = $(".wave", $this);
                if (!$this.hasClass("active")) {
                  $this
                    .addClass("active")
                    .siblings()
                    .removeClass("active");
                  $line.css({
                    left: offsetLeft,
                    width: w
                  });
                }
                var transition = prefixStyle("transition");
                var transform = prefixStyle("transform");
                var css_first = {
                  width: w * 2 + "px",
                  height: h * 2 + "px",
                  left: left + "px",
                  top: top + "px"
                };
                var css_second = {
                  opacity: 0
                };
                css_first[transition] = ".4s linear";
                css_second[transform] = "scale(1.5)";
                $wave
                  .css(css_first)
                  .css(css_second)
                  .animate(
                    {
                      opacity: 0
                    },
                    400,
                    function() {
                      $(this).remove();
                    }
                  );
              });
          });
        });
        return this;
      };
      $(".da").wave({
        waveColor: "lightgray", //波浪颜色
        index: 0, //选中标签下标
        btnClass: "xiao" //按钮类名(必须传)
      });
      //获取标签距离文档左边的距离：
      var elementStyle = document.createElement("div").style;
      //获取样式前缀
      var vendor = (() => {
        var transformNames = {
          webkit: "webkitTransform",
          Moz: "MozTransform",
          O: "OTransform",
          ms: "msTransform",
          standard: "transform"
        };
        for (var key in transformNames) {
          if (elementStyle[transformNames[key]] !== undefined) {
            return key;
          }
        }
        return false;
      })();
      //获取样式属性(带前缀)
      function prefixStyle(style) {
        if (vendor === false) {
          return false;
        }
        if (vendor === "standard") {
          return style;
        }
        return vendor + style.charAt(0).toUpperCase() + style.substr(1);
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
      this.mescroll.hideTopBtn(0);
      // 隐藏回到顶部按钮,无渐隐动画
    }
    next();
  },
  destroyed() {
    layer.closeAll();
  },
  mounted() {
    $(window).unbind("resize");
    $(".JS_transfer_list").height(
      $(window).height() -
        $("#JS_transfer_header").height() -
        $("#JS_transfer_footer").height() -
        5
    );
    this.newMescroll();
    document.addEventListener(
      "click",
      () => {
        let $fun = $("#JS_tranfer_header_fun");
        $fun.fadeOut();
      },
      false
    );
  },
  created() {}
};
</script>
<style>
.transfer_tab span {
  display: inline-block;
  position: relative;
  margin-right: 0.3rem;
  color: #9f9f9f;
}

.transfer_tab span i {
  display: inline-block;
  position: absolute;
  top: 0.4rem;
  right: -0.2rem;
  width: 0.14rem;
  height: 0.14rem;
  border-radius: 0.14rem;
  background-color: #e36863;
}

.transfer_tab span.hover {
  color: #000;
  border-bottom: 2px solid #000;
  font-weight: bold;
}

.list_file_task.list_file .icon-90 {
  margin: 0.45rem 0.13rem 0.45rem 0;
}

.task_up,
.task_down {
  display: inline-block;
  width: 0.34rem;
  height: 0.34rem;
  background: url(../assets/new/icon_home_next@.png) no-repeat center;
  background-size: 50%;
  transform: rotate(90deg);
}

.task_down {
  transform: rotate(-90deg);
}

.head_all {
  position: absolute;
  right: 0;
  top: 0;
}

.waves .waves-animation {
  position: absolute;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  opacity: 0;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.7s ease-out;
  transition-property: transform, opacity, -webkit-transform;
  -webkit-transform: scale(0);
  transform: scale(0);
  pointer-events: none;
}
</style>
