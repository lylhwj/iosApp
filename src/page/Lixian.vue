<template>
  <div class="bg-white w-lixian">
   <FileHeader :title="''" id="JS_lixian_header" page="lixian"  :display="filterData.display"
      @change="changeDisplay"></FileHeader> 
    <div v-if="filterData.show" id="JS_lixian_gl" class="flex flex-between"><a  style="visibility: hidden;" href="javascript:;"
        class="flex align-center font-30 all_manage">
        <span class="all_manage_no"></span><span><span>管理</span></span></a>
      <p class="flex font-30" v-if="filterData.show">
        <a :class="{flex:true,'align-center':true,btn_tan2:true,hover:filterData.f_pass=='de'}"
          @click="changeFilter2('de')"><span class="tan_nojiami3"></span>不加密</a>
        <a :class="{flex:true,'align-center':true,btn_tan2:true,hover:filterData.f_pass=='en'}"
          @click="changeFilter2('en')"><span class="tan_jiami3"></span>加密</a>
      </p>
    </div>
    <div v-else id="JS_lixian_gl" class="flex" style="background:#f6f6f6;">
      <a href="javascript:;" @click="familyJump('home')" class="flex align-center font-30 all_name" style="width:1.4rem;">云下载&nbsp;&nbsp;<span v-if="familyData.length>0" class="arrow">></span></a>
      <ul class="flex align-center gray file_nav recent_nav" >
        <span class="flex" v-for="(data,index) in familyData" @click="familyJump(data)" :key="index"><li class="text-over" style="max-width:3rem; "><span>{{data.title}}</span></li><span v-if="index!==familyData.length-1" class="arrow">>&nbsp;</span></span>
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
    <div v-if="filterData.display==1" class="JS_lixian_list" style="position:relative;">
      <div class="lixian-list mescroll bg-white" ref="mescroll">
        <div style="position:absoulte;top:0;">
          <div class="gray padding-top-88" v-if="dataList.length==0&&!loading">
            <p class="margin-top-20 margin-bottom-20 text-center"><img width="50%" src="@/assets/bg_empty_lixian@2x.png"
                alt=""></p>
            <p class="text-center">空空如也…</p>
          </div>
          <swipeout>
            <swipeout-item v-for="(data,index) in dataList" :class="[data.collection.length>0?'edit-swiperout':'favorites-swiperout']" :key="index"   v-longtap="(e)=>vueTouch(data)">
              <div slot="right-menu">  
                <swipeout-button v-if="data.collection.length>0"  type="primary" @click.native="rightMenuClick3(data)"><span class="s_remove">取消星标</span>
                </swipeout-button>
                <swipeout-button v-else type="primary" @click.native="rightMenuClick(data)"><span class="s_mark">星标</span>
                </swipeout-button>
                <swipeout-button type="warn" @click.native="rightMenuClick2(data)"><span class="s_del">删除</span>
                </swipeout-button>
              </div>
              <div slot="content" class="flex flex-between align-center list_file">
                <div v-if="isMain" @click="goDetail(data)">
                  <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files39@2x.png" />
                  <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
                </div>
                <div v-else @click="goDetail(data)">
                  <div
                    v-if="data.jindu?data.jindu.status==5:false||data.jindu?data.jindu.status==2:false||data.jindu?data.jindu.jindu==-1:false">
                    <img class="icon-90" src="@/assets/type/icon_files58@2x.png" />
                  </div>
                  <div v-else-if="data.jindu?data.jindu.status==-3:false||data.jindu?data.jindu.status==-4:false">
                    <img class="icon-90" src="@/assets/type/icon_files58@2x.png" />
                  </div>
                  <div v-else-if="data.jindu?data.jindu.jindu=='100':false">
                    <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files57@2x.png" />
                    <img class="icon-90" v-else src="@/assets/type/icon_files16@2x.png" />
                  </div>
                  <div v-else>
                    <img class="icon-90" src="@/assets/type/icon_files54@2x.png" />
                  </div>
                </div>
                <div class="w500" @click="goDetail(data)">
                  <div class="flex">
                    <div class="flex-column flex-center" v-if="data.experience">
                      <img style="width: .6rem;height: .333333rem;" src="http://img.bianyue.cn/new/pan/icon_free.gif"
                        alt="">
                    </div>
                    <span class="font-31 black-4 w-title">{{data.title}}</span>
                  </div>
                  <p class="flex align-center margin-top-10 font-26 gray"><img v-if="data.collection.length>0" class="icon-h39" src="@/assets/new/icon_fav@2x.png" alt=""><span class="diin w230">{{data.time*1000,3|timeStamp}}</span><span v-if="data.size">{{data.size?data.size.size:''}}</span></p>
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
    <div v-else class="JS_lixian_list" style="position:relative;">
      <div class="lixian-list mescroll bg-white favorites-swiperout" ref="mescroll">
        <div class="gray padding-top-88" v-if="dataList.length==0&&!loading">
          <div class="margin-top-20 margin-bottom-20 text-center"><img width="50%" src="@/assets/bg_empty_lixian@2x.png"
              alt=""></div>
          <div class="text-center">空空如也…</div>
        </div>
        <div class="flex flex-wrap" style="position:absoulte;top:0;">
          <div v-for="(data,index) in dataList" :key="index">
            <div class="pos-rel align-center fct margin-top-15 padding-10 w230">
              <div v-if="data.type==1" @click="goDetail(data)">
                <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files39@2x.png" />
                <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
              </div>
              <div v-else @click="goDetail(data)">
                <div
                  v-if="data.jindu?data.jindu.status==5:false||data.jindu?data.jindu.status==2:false||data.jindu?data.jindu.jindu==-1:false">
                  <img class="icon-90" src="@/assets/type/icon_files58@2x.png" />
                </div>
                <div v-else-if="data.jindu?data.jindu.status==-3:false||data.jindu?data.jindu.status==-4:false">
                  <img class="icon-90" src="@/assets/type/icon_files58@2x.png" />
                </div>
                <div v-else-if="data.jindu?data.jindu.jindu=='100':false">
                  <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files57@2x.png" />
                  <img class="icon-90" v-else src="@/assets/type/icon_files16@2x.png" />
                </div>
                <div v-else>
                  <img class="icon-90" src="@/assets/type/icon_files54@2x.png" />
                </div>
              </div>
              <p class="margin-top-15 font-30 w-title text-center w750" @click="goDetail(data)"> <img
                  v-if="data.experience" style="width: .6rem;height: .333333rem;"
                  src="http://img.bianyue.cn/new/pan/icon_free.gif" alt="">{{data.title}}</p>
              <p class="margin-top-10 font-26 gray"><img v-if="data.collection.length>0" class="icon-h39" style="width:.4rem;height:.4rem;" src="@/assets/new/icon_fav@2x.png" alt="">{{data.time*1000,3|timeStamp}}</p>
              <p class="margin-top-10 font-26 gray">{{data.size?data.size.size:''}}</p>
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
      <FooterNav v-if="!manageStatus" id="JS_lixian_footer" @homeAdd="goShowFun"></FooterNav>
      <Action v-else :type="ActionType" :isPass="handleData.pass" :isSc="handleData.collection.length>0" @clickMenu="clickMenu"></Action>
    </div><!-- 更多 --> 
    <Popup v-model="showFun" :hide-on-blur="true" :is-transparent="true" style="height:6.4rem;" @on-hide="hideFun">
      <div class="box_function h_oflow">
        <ul class="flex flex-around fct font-28 black margin-top-40 list_operate">
          <li class="touch_hover" @click="newFile" v-if="isMain"><img class="w90" src="@/assets/function/btn_home_features8@2x.png"
              alt="">新建</li>
          <li class="touch_hover" @click="hideFun();jump(`/bt?topid=${topid}`)"><img class="w90"
              src="@/assets/function/btn_home_features10@2x.png" alt="">链接任务</li>
          <!-- <li class="touch_hover" @click.prevent="jump('/paySpace')"><img class="w90"
              src="@/assets/function/btn_home_features11@2x.png" alt="">扩容</li> -->
        </ul>
        <!-- <p class="fct margin-top-70 gray">&nbsp;云下载容量：<span class="blue">{{userPanData.userallsize}}</span> /
          {{userPanData.allsize}}</p> -->
          <p class="fct margin-top-70 gray">&nbsp;</p>
        <div class="flex flex-center margin-top-60">
          <div @click="hideFun" class="blue_ico blue_ico_mini"><span class="close"></span></div>
        </div>
      </div>
    </Popup>
    <div id="JS_lixian_popup" class="w-pop">
      <div class="box-bg border-bottom">
        <div class="flex flex-center"><img class="icon-90" src="@/assets/type/icon_files39@2x.png" /></div>
        <input class="border-all box-input margin-top-30" type="text" placeholder="请输入新建文件夹名" v-model="newName">
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.stop="newSubmit">确认</a>
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
              <img class="icon-90" v-if="!handleData.pass" src="@/assets/type/icon_files57@2x.png" />
              <img class="icon-90" v-else src="@/assets/type/icon_files16@2x.png" />
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
    <div id="JS_lixian_popup3" class="w-pop">
      <div class="box-bg border-bottom border-box">
        <div class="flex flex-center">
          <div v-if="openPassFileData.type==1">
            <img class="icon-90" v-if="!openPassFileData.pass" src="@/assets/type/icon_files39@2x.png" />
            <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
          </div>
          <div v-else>
            <div v-if="openPassFileData.jindu?openPassFileData.jindu.jindu=='100':false">
              <img class="icon-90" v-if="!openPassFileData.pass" src="@/assets/type/icon_files39@2x.png" />
              <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
            </div>
            <div v-else>
              <img class="icon-90" src="@/assets/type/icon_files54@2x.png" />
            </div>
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
    <div id="JS_lixian_popup4" class="w-pop">
      <div class="box-bg border-bottom border-box">
        <div class="flex flex-center">
          <div v-if="handleData.type==1">
            <img class="icon-90" v-if="!handleData.pass" src="@/assets/type/icon_files39@2x.png" />
            <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
          </div>
          <div v-else>
            <div v-if="handleData.jindu?handleData.jindu.jindu=='100':false">
              <img class="icon-90" v-if="!handleData.pass" src="@/assets/type/icon_files57@2x.png" />
              <img class="icon-90" v-else src="@/assets/type/icon_files16@2x.png" />
            </div>
            <div v-else>
              <img class="icon-90" src="@/assets/type/icon_files54@2x.png" />
            </div>
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
    <div id="JS_lixian_popup5" class="w-pop">
      <div class="box-bg border-bottom border-box">
        <div class="flex flex-center">
          <div v-if="playData.type==1">
            <img class="icon-90" v-if="!playData.pass" src="@/assets/type/icon_files39@2x.png" />
            <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
          </div>
          <div v-else>
            <div v-if="playData.jindu?playData.jindu.jindu=='100':false">
              <img class="icon-90" v-if="!playData.pass" src="@/assets/type/icon_files57@2x.png" />
              <img class="icon-90" v-else src="@/assets/type/icon_files16@2x.png" />
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
        <a class="btn-white btn-mediume" @click.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click="handleDel">删除</a>
      </div>
    </div>
    <div id="JS_lixian_popup11" class="w-pop">
      <div class="box-bg border-bottom fct flex flex-center">
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
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.prevent.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.prevent="jump('/bt')">继续添加</a>
      </div>
    </div>
    <div id="JS_lixian_popup12" class="w-pop">
      <div class="box-bg border-bottom">
        <div class="flex flex-center"><img class="icon-90" src="@/assets/type/icon_files39@2x.png" /></div>
        <input class="border-all box-input margin-top-30" type="text" placeholder="请输入新建收藏夹名" v-model="newFaName">
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.stop="newFaSubmit">确认</a>
      </div>
    </div>
    <Popup v-model="showVip" :hide-on-blur="true">
      <DredgeVip @closeVip="showVip=false"></DredgeVip>
    </Popup> 
    <Popup v-model="showFilter" :hide-on-blur="true" position="right" style="overflow: hidden;background:#fff;">
      <FilterFile @close="showFilter=false" type="lixian" :filterData="filterData" @clickFilter="clickFilter">
      </FilterFile>
    </Popup>
  </div>
</template>
<script>
import FileHeader from "@/components/FileHeader";
import DredgeVip from "@/components/DredgeVip";
import Action from "@/components/Action";
import FilterFile from "@/components/FilterFile";
import Activity from "@/components/Activity";
import FooterNav from "@/components/FooterNav";
import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";
import api from "@/api/index";
import {
  Popup,
  Actionsheet,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton
} from "vux";

export default {
  name: "Lixian",
  data() {
    return {
      mescroll: null, //mescroll实例对象
      dataList: [], //列表数据
      familyData: [],
      showFun: false,
      topid: 0,
      topid2: null,
      newName: "",
      newFaName: "",
      showFilter: false,
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
      manageStatus: false,
      checkList: [],
      checkAll: false,

      filterData: {
        display: 1,
        f_time: "new",
        f_size: "",
        f_type: "all",
        f_pass: "",
        show: false,
        title: ""
      },
      ActionType: "file",

      isMain: true
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
    FilterFile,
    FooterNav
  },
  methods: {
    back() {
      this.$router.back();
    },
    familyJump(data) {
      if (data == "home" && this.familyData.length !== 0) {
        this.jump("/lixian");
        return false;
      }
      if (data.userid) {
        return false;
      }
      if (this.topid2) {
        this.jump(`/lixian?topid=${data.id}`);
      } else {
        this.jump(`/lixian/${data.id}`);
      }
    },
    upCallback(page) {
      let versions = this.getStorage("yunVersions");
      if (!versions) {
        versions = new Date().getTime() + "";
        this.setStorage("yunVersions", new Date().getTime());
      }
      let f_type = this.filterData.f_type;
      if (f_type == "all" || f_type == "de" || f_type == "en") {
        f_type = "";
      }
      this.loading = true;
      api
        .getLixianList({
          page: page.num,
          topid: this.topid,
          per_page: 15,
          f_time: this.filterData.f_time,
          f_size: this.filterData.f_size,
          f_type: f_type,
          f_pass: this.filterData.f_pass
          // v:versions,
          // cache:1
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
            $(".recent_nav")
              .children(":last-child")
              .addClass("nav_active");
            this.mescroll.endSuccess(arr.length);
          });
        })
        .catch(error => {
          this.mescroll.endErr();
          this.loading = false;
          if (
            String(error).indexOf("timeout") !== -1 &&
            this.$router.currentRoute.name == "Lixian"
          ) {
            this.$vux.toast.show({
              text: "请求超时，请刷新重试！",
              type: "cancel"
            });
          }
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
            size: 15
          }
        }
      });
    },
    // 筛选排序
    clickFilter(data) {
      this.filterData = data;
      this.newMescroll(1);
    },
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
        this.filterData.title = "不加密筛选";
      } else if (this.filterData.f_type == "de") {
        this.filterData.f_type = "en";
        this.filterData.title = "加密筛选";
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
    // 显示功能栏
    goShowFun() {
      this.showFun = true;
      this.getOtherData("pan");
      $(".vux-popup-mask").css(
        "background",
        "linear-gradient(to top, rgba(255,255,255,1) , rgba(255,255,255,0.9) 75% , rgba(255,255,255,0.75) 100%)"
      );
    },
    // 隐藏功能栏
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
      if (this.manageStatus) {
        this.checkOne(data);
        return false;
      }
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
      } else if (data.jindu ? data.jindu.status == -2 : false) {
        this.playErr = "该链接任务无视频文件";
        this.closePop();
        this.openPop({
          dom: $("#JS_lixian_popup10"),
          width: "70%"
        });
        this.handleData = data;
      } else if (data.jindu ? data.jindu.status == -4 : false) {
        this.playErr = "该链接任务被多次举报，已被系统屏蔽";
        this.closePop();
        this.openPop({
          dom: $("#JS_lixian_popup10"),
          width: "70%"
        });
        this.handleData = data;
      } else {
        if (data.pass) {
          this.openPass = "";
          this.openPop({
            dom: $("#JS_lixian_popup3")
          });
          this.openPassFileData = data;
        } else {
          if (this.isMain) {
            if (data.type == 1) {
              if (this.topid2) {
                this.jump(`/lixian?topid=${data.id}`);
              } else {
                this.jump(`/lixian/${data.id}`);
              }
            } else {
              this.setStorage("myYunPlayData", JSON.stringify(data));
              this.setStorage(
                "myYunFamilyData",
                JSON.stringify(this.familyData)
              );
              this.jump(`/lixian2?yunid=${data.id}`);
            }
          } else {
            this.openPlay(data);
          }
        }
      }
    },
    // 打开加密文件
    openPassSubmit() {
      if (this.openPass == this.openPassFileData.pass) {
        if (this.openPassFileData.type == 1) {
          if (this.topid2) {
            this.jump(`/lixian?topid=${this.openPassFileData.id}`);
          } else {
            this.jump(`/lixian/${this.openPassFileData.id}`);
          }
        } else {
          this.setStorage(
            "myYunPlayData",
            JSON.stringify(this.openPassFileData)
          );
          this.setStorage("myYunFamilyData", JSON.stringify(this.familyData));
          this.jump(`/lixian2?yunid=${this.openPassFileData.id}`);
          // this.openPlay(this.openPassFileData);
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
      this.playSubmit();
      // this.openPop({
      //   dom: $("#JS_lixian_popup5"),
      //   width: "70%"
      // });
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
    // 打开新建文件夹
    newFile() {
      this.hideFun();
      this.newName = "";
      setTimeout(() => {
        this.openPop({
          dom: $("#JS_lixian_popup")
        });
      }, 300);
    },
    // 新建文件名
    newSubmit() {
      if (!this.newName) {
        this.toast("请输入新建文件夹名");
        return false;
      }
      api
        .addLoad({
          title: this.newName,
          topid: this.topid
        })
        .then(response => {
          this.newMescroll(1);
          this.$vux.toast.show("创建成功");
          this.closePop();
        });
    },
    // 打开新建收藏夹
    newFaFile() {
      this.newFaName = "";
      this.openPop({
        dom: $("#JS_lixian_popup12")
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
          this.manageClose();
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
        .editLoad({
          pass: pass,
          id: this.handleData.id
        })
        .then(response => {
          this.$vux.toast.show(msg);
          this.closePop();
          this.manageClose();
          this.dataList.forEach(element => {
            if (element.id == this.handleData.id) {
              element.pass = pass;
            }
          });
        });
    },
    // 删除文件
    handleDel() {
      api
        .delLoad({
          "id[0]": this.handleData.id
        })
        .then(response => {
          this.closePop();
          this.$vux.toast.show("删除成功");
          this.manageClose();
          this.dataList.forEach((element, index) => {
            if (element.id == this.handleData.id) {
              this.dataList.splice(index, 1);
            }
          });
          if (!this.isMain) {
            if (this.familyData.length == 1) {
              this.jump(`/lixian?slip=no`);
            } else if (this.familyData.length > 1) {
              let topid = this.familyData[this.familyData.length - 2].id;
              this.jump(`/lixian?topid=${topid}&slip=no`);
            }
          }
        });
    },
    // 收藏文件
    handleSC() {
      api
        .addToMask({
          resource_type: "pan",
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
        this.jump(`/move?id=${this.handleData.id}`);
      } else if (index == 2) {
        this.handleSC();
      } else if (index == 3) {
        this.editName = "";
        this.openPop({
          dom: $("#JS_lixian_popup2")
        });
      } else if (index == 4) {
        this.oldPass = "";
        this.newPass = "";
        this.openPop({
          dom: $("#JS_lixian_popup4")
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
    // 批量操作
    batchHandle(type) {
      if (type == 1) {
        this.setStorage("yunMoveList", JSON.stringify(this.checkList));
        this.jump("/move?batch=true");
      } else if (type == 2) {
        let _this = this;
        let idParams = {};
        this.checkList.forEach((el, index) => {
          idParams["id[" + index + "]"] = el.id;
        });
        api.delLoad(idParams).then(response => {
          this.$vux.toast.show("删除成功");
          this.newMescroll(1);
          this.manageStatus = false;
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
    $(".JS_lixian_list").height(
      $(window).height() -
        $("#JS_lixian_header").height() -
        $("#JS_lixian_gl").height() -
        5
    );
    let yunid = this.$router.currentRoute.query.yunid;
    let myYunPlayData = this.getStorage("myYunPlayData");
    let myYunFamilyData = this.getStorage("myYunFamilyData");
    if (yunid && myYunPlayData) {
      this.wLoading();
      setTimeout(() => {
        this.wLoading({
          type: "hide"
        });
      }, 500);
      this.isMain = false;
      let data = JSON.parse(myYunPlayData);
      let familyData = JSON.parse(myYunFamilyData);
      if (!data.collection) {
        data.collection = [];
      }
      let arr = [];
      arr.unshift(data);
      familyData.push(data);
      this.dataList = this.dataList.concat(arr);
      this.familyData = familyData;
      setTimeout(() => {
        $(".recent_nav")
          .children(":last-child")
          .addClass("nav_active");
      }, 100);
    } else {
      this.newMescroll();
    }
  },
  created() {
    let topid = this.$router.currentRoute.query.topid;
    this.topid2 = this.$route.params.topid;
    if (this.topid2) {
      this.topid = this.topid2;
    } else {
      this.topid = topid || 0;
    }
  }
};
</script>
<style>
</style>
