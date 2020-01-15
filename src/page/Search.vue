<template>
  <div class="bg-white">
    <div id="JS_search_header" class="tab_search">
      <div class="head_gray" style="border:0;padding-top: .266667rem;">
        <i class="fl head_back" @click.prevent="back" title="返回"></i>
        <form class="head_search_box"><input type="search" @keypress="keypress($event)" autocomplete="off"
            class="ipt_sear" placeholder="搜索文件" v-model="value"><span @click="value=''" v-if="value"
            class="ipt_del"></span></form>
        <a href="javascript:;" @click="submit" class="fr head_search"></a>
      </div>
      <tab :line-width=2 active-color='#409eff' v-model="index">
        <tab-item class="vux-center" :selected="demo === item" v-for="(item, index) in list" @on-item-click="selectTab"
          :key="index">{{item}}</tab-item>
      </tab>
    </div>
    <div v-if="manageStatus" class="w750 pos-fixed" style="top:0;background:#fff;">
      <div class="head_gray" style="border:0; padding:0.08rem 0.45rem;background:#fff;">
        <a class="fl blue" @click.prevent="manageClose" title="取消">取消</a>
        <div class="head_title">已选中{{checkList.length}}个</div>
        <span class="fr blue" v-if="!checkAll" @click="manageAll">全选</span>
        <span class="fr blue" v-else @click="manageAll">不全选</span>
      </div>
    </div>
    <ViewBox id="JS_search_list">
      <div style="height:100%;">
        <div class="padding-top-60" v-if="dataList.length==0&&empty">
          <p class="margin-top-20 margin-bottom-20 text-center"><img width="50%" src="@/assets/bg_empty_search@2x.png"
              alt=""></p>
          <p class="text-center">没有找到"{{value}}"的相关结果</p>
        </div>
        <swipeout v-if="submitStatus">
          <swipeout-item v-for="(data,index) in dataList" :key="index">
            <div slot="right-menu">
              <swipeout-button type="warn" @click.native="rightMenuClick(data)"><span class="s_del">删除</span>
              </swipeout-button>
            </div>
            <div slot="content" class="flex flex-between align-center list_file" v-if="data.source==1">
              <div v-if="data.type==1" @click="goLixianDetail(data)">
                <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files39@2x.png" />
                <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
              </div>
              <div v-else @click="goLixianDetail(data)">
                <div
                  v-if="data.jindu?data.jindu.status==5:false||data.jindu?data.jindu.status==2:false||data.jindu?data.jindu.jindu==-1:false">
                  <img class="icon-90" src="@/assets/type/icon_files58@2x.png" />
                </div>
                <div v-else-if="data.jindu?data.jindu.status==-3:false||data.jindu?data.jindu.status==-4:false">
                  <img class="icon-90" src="@/assets/type/icon_files58@2x.png" />
                </div>
                <div v-else-if="data.jindu?data.jindu.jindu=='100':false">
                  <!-- <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files57@2x.png" />
                  <img class="icon-90" v-else src="@/assets/type/icon_files16@2x.png" /> -->
                  <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files39@2x.png" />
                  <img class="icon-90" v-else src="@/assets/type/icon_files39@2x.png" />
                </div>
                <div v-else>
                  <img class="icon-90" src="@/assets/type/icon_files54@2x.png" />
                </div>
              </div>
              <div class="w500" @click="goLixianDetail(data)">
                <div class="flex">
                  <div class="flex-column flex-center" v-if="data.experience">
                    <img style="width: .6rem;height: .333333rem;" src="http://img.bianyue.cn/new/pan/icon_free.gif"
                      alt="">
                  </div>
                  <span class="font-31 black-4 w-title JS_title">{{data.title}}</span>
                </div>
                <div class="flex">
                   <p class="flex align-center margin-top-10 font-26 gray"><img v-if="data.collection.length>0" class="icon-h39" src="@/assets/new/icon_fav@2x.png" alt=""><span class="diin w230">{{data.time*1000,3|timeStamp}}</span><span v-if="data.size">{{data.size?data.size.size:''}}</span></p>
                </div>
              </div>
              <div v-if="manageStatus" @click="checkOne(data)">
                  <div v-if="data.checked" class="ico_handle ico_handle_yes"></div>
                  <div v-else class="ico_handle ico_handle_kong"></div>
              </div>
              <div v-else @click="openHandle(data)" class="ico_handle"></div>
            </div>

            <div slot="content" class="flex flex-between align-center list_file" v-else-if="data.source==2">
              <div v-if="data.type=='dir'" @click="goFileDetail(data)">
                <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files39@2x.png" />
                <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
              </div>
              <div v-else @click="goFileDetail(data)">
                <img class="icon-90" v-if="data.pass" src="@/assets/type/icon_files16@2x.png" />
                <img class="icon-90" v-else :src="'http://cdnres.bianyue.cn/lyl/img/type/icon_'+data.type+'@2x.png'"
                  onerror="this.src='http://cdnres.bianyue.cn/lyl/img/type/icon_files11@2x.png'" />
              </div>
              <div class="w500" @click="goFileDetail(data)">
                <div class="flex">
                  <span class="font-31 black-4 w-title JS_title" style="width: 5.6rem">{{data.title}}</span>
                </div>
                <div class="flex">
                  <p class="flex align-center margin-top-10 font-26 gray"><img v-if="data.collection.length>0" class="icon-h39" src="@/assets/new/icon_fav@2x.png" alt=""><span class="diin w230">{{data.time*1000,3|timeStamp}}</span><span v-if="data.size">{{data.size|formatBytes}}</span></p>
                </div>
              </div>
               <div v-if="manageStatus" @click="checkOne(data)">
                  <div v-if="data.checked" class="ico_handle ico_handle_yes"></div>
                  <div v-else class="ico_handle ico_handle_kong"></div>
              </div>
              <div v-else @click="openHandle(data)" class="ico_handle"></div>
            </div>
            <div slot="content" class="flex flex-between align-center list_file" v-else-if="data.source==3">
              <div v-if="data.type=='dir'" @click="goPhotoDetail(data)">
                <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files39@2x.png" />
                <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
              </div>
              <div v-else @click="goPhotoDetail(data)">
                <div class="icon-90 flex-column flex-center" style="display:flex;background:#f7f7f7;border-radius:5px;">
                  <img style="max-width:100%;max-height:100%;" :src="data.streamUrl"
                    onerror="this.src='http://cdnres.bianyue.cn/lyl/img/type/icon_files11@2x.png'" /></div>
              </div>
              <div class="w500" @click="goPhotoDetail(data)">
                <div class="flex">
                  <span class="font-31 black-4 w-title JS_title" style="width: 5.6rem">{{data.title}}</span>
                </div>
                <div class="flex">
                  <p class="flex align-center margin-top-10 font-26 gray"><img v-if="data.collection.length>0" class="icon-h39" src="@/assets/new/icon_fav@2x.png" alt=""><span class="diin w230">{{data.time*1000,3|timeStamp}}</span><span v-if="data.size">{{data.size|formatBytes}}</span></p>
                </div>
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
    </ViewBox>
    <div id="JS_fa_tip2"  v-if="manageStatus"  class="tip_more tip_fa_more"> 
      <Action :type="ActionType" :isPass="'no'" :isSc="handleData.collection.length>0" @clickMenu="clickMenu"></Action>
    </div>
    <div id="JS_search_popup1" class="w-pop">
      <div class="box-bg border-bottom fct">
        <img class="icon-h39 vmid" src="@/assets/icon_warning.png" />
        {{playErr}}
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click="handleDel(1)">删除</a>
      </div>
    </div>
    <div id="JS_search_popup2" class="w-pop">
      <div class="box-bg border-bottom border-box">
        <div class="flex flex-center">
          <div v-if="openPassFileData.type==1">
            <img class="icon-90" v-if="!openPassFileData.pass" src="@/assets/type/icon_files39@2x.png" />
            <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
          </div>
          <div v-else>
            <div v-if="openPassFileData.jindu?openPassFileData.jindu.jindu=='100':false">
              <img class="icon-90" v-if="!openPassFileData.pass" src="@/assets/type/icon_files57@2x.png" />
              <img class="icon-90" v-else src="@/assets/type/icon_files16@2x.png" />
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
    <div id="JS_search_popup3" class="w-pop">
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
              <img class="icon-90" src="@/assets/type/icon_files11@2x.png" />
            </div>
          </div>
        </div>
        <p class="text-over text-center" style="width: 80%;margin: 0 auto;">{{handleData.title}}</p>
        <input class="border-all box-input margin-top-30" type="text" placeholder="请输入新的文件名" v-model="editName">
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.stop="editSubmit()">确认</a>
      </div>
    </div>
    <div id="JS_search_popup4" class="w-pop">
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
    <div id="JS_search_popup5" class="w-pop">
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
    <div id="JS_search_popup6" class="w-pop">
      <div class="padding-24">
        <div class="flex flex-center"><img style="width:3rem; height:4rem;" src="@/assets/bg_point_experience@2x.png"
            alt="" /></div>
        <div class="flex flex-between">
          <div style="width:45%; height:2.9rem;"><a class="font-24">普通用户随机赠送1次在线预览特权，该链接任务系统已释放为免费资源</a></div>
          <div class="border-right" style="width:2px; height:2rem;"></div>
          <div style="width:45%; height:2.9rem;"><a class="font-24">没有平衡的盈利和支出就没有长久的服务 升级VIP才可享有在线预览特权</a></div>
        </div>
        <div class="flex flex-between" style="position:absolute; bottom:0; left:0;width: 100%;">
          <a class="btn-blue btn-big experience" style="width:50%; border-radius:0 0 0 8px; border:0" @click.stop="experience">免费体验</a>
          <a class="btn-orange btn-big experience" style="width:50%; border-radius:0 0 8px 0; border:0" @click.stop="closePop();showVip=true">升级VIP</a>
        </div>
      </div>
    </div>
    <div id="JS_search_popup7" class="w-pop">
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
    <div id="JS_search_popup8" class="w-pop">
      <div class="flex flex-center"><img style="width: 6rem; height: 3.2rem;margin-top: .3rem;"
          src="@/assets/bg_cardbag_vip_home_point@2x.png"></img></div>
      <div class="box-bg fct" style="padding-top:0.3rem;">
        <p class="font-28">VIP过期时间：{{userInfo.overduedate*1000,1|timeStamp}}</p>
        <div class="flex flex-center">
          <a class="btn-orange btn-big w460 margin-top-30" @click.stop="closePop();showVip=true;">续费VIP</a>
        </div>
      </div>
    </div>
    <div id="JS_search_popup9" class="w-pop">
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
    <div id="JS_search_popup10" class="w-pop">
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
    <div id="JS_search_popup11" class="w-pop">
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
    <div id="JS_search_popup12" class="w-pop">
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
 <div id="JS_search_popup13" class="w-pop">
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
    <Popup v-model="showVip" :hide-on-blur="true">
      <DredgeVip @closeVip="showVip=false"></DredgeVip>
    </Popup>
    <Popup v-model="showHandle" :hide-on-blur="true" :is-transparent="true" style="overflow: hidden;background: rgba(255, 255, 255, 0.93); ">
      <Action @close="showHandle=false" type="file" :isPass="'no'" :isSc="handleData.collection.length>0" @clickMenu="clickMenu"></Action>
    </Popup>
  </div>
</template>

<script>
import {
  Tab,
  TabItem,
  Swiper,
  SwiperItem,
  ViewBox,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  Popup
} from "vux";
import DredgeVip from "@/components/DredgeVip";
import Action from "@/components/Action";
import api from "@/api/index";
export default {
  name: "Search",
  data() {
    return {
      value: "",
      list: ["所有", "云下载", "文件", "相册"],
      demo: "所有",
      index: 0,
      dataList: [],
      allList: [],
      panList: [],
      fileList: [],
      photoList: [],
      empty: false,
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
          label: "删除",
          index: 2
        }
      ],
      handleData: {
        collection: []
      },
      playErr: "",
      showVip: false,
      openPass: "",
      openPassFileData: {},
      editName: "",
      oldPass: "",
      newPass: "",
      // 播放
      playData: {},
      playId: "",
      showVip: false,
      experienceId: "",
      checkCode: "",
      codeImg: "",
      // 管理
      manageStatus: false,
      checkList: [],
      checkAll: false,
      ActionType: "favorites",

      submitStatus:true
    };
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    ViewBox,
    Action,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    DredgeVip,
    Popup
  },
  methods: {
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
      this.ActionType = "favorites";
      if (this.checkList.length == 0) {
        this.ActionType = "favorites";
      } else if (this.checkList.length == 1) {
        this.handleData = this.checkList[0];
      } else {
        this.ActionType = "batchFavorites";
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
      this.ActionType = "favorites";
      if (this.checkList.length == 0) {
        this.manageStatus = false;
      } else if (this.checkList.length == 1) {
        this.handleData = this.checkList[0];
      } else {
        this.ActionType = "batchFavorites";
      }
      this.checkAll = this.checkList.length == this.dataList.length;
    },
    back() {
      this.$router.back();
    },
    // 云下载
    goLixianDetail(data) {
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
          dom: $("#JS_search_popup1"),
          width: "70%"
        });
        this.handleData = data;
      } else if (data.jindu ? data.jindu.jindu == -2 : false) {
        this.playErr = "该链接任务无视频文件";
        this.closePop();
        this.openPop({
          dom: $("#JS_search_popup1"),
          width: "70%"
        });
        this.handleData = data;
      } else if (data.jindu ? data.jindu.jindu == -4 : false) {
        this.playErr = "该链接任务被多次举报，已被系统屏蔽";
        this.closePop();
        this.openPop({
          dom: $("#JS_search_popup1"),
          width: "70%"
        });
        this.handleData = data;
      } else if (data.jindu ? data.jindu.jindu == "100" : false) {
        if (data.pass) {
          this.openPass = "";
          this.openPop({
            dom: $("#JS_search_popup2")
          });
          this.openPassFileData = data;
        } else {
          if (data.type == 1) {
            this.jump(`/lixian?topid=${data.id}`);
          } else {
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
            // this.openPlay(data);
          }
        }
      } else {
        this.openPop({
          dom: $("#JS_search_popup13")
        });
      }
    },
    //打开播放
    openPlay(data) {
      this.closePop();
      this.playData = data;
      this.openPop({
        dom: $("#JS_search_popup5"),
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
              dom: $("#JS_search_popup6")
            });
          } else if (
            response.try == "try_forbid_exists" ||
            response.try == "try_end" ||
            response.try == "try_forbid_unsupported"
          ) {
            if (parseInt(this.userInfo.overduedate) > 0) {
              this.openPop({
                dom: $("#JS_search_popup8")
              });
            } else {
              this.openPop({
                dom: $("#JS_search_popup7")
              });
            }
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
            let $dom = $("#JS_search_popup9");
            this.openPop({
              dom: $dom
            });
            this.changeImg();
          } else if (response.status == "验证码错误！") {
            let $dom = $("#JS_search_popup9");
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
    //  文件
    goFileDetail(data) {
      if (data.pass) {
        this.openPass = "";
        this.openPop({
          dom: $("#JS_search_popup10")
        });
        this.openPassFileData = data;
      } else {
        if (data.type == "dir") {
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
    // 相册
    goPhotoDetail(data) {
      if (data.pass) {
        this.openPass = "";
        this.openPop({
          dom: $("#JS_search_popup12")
        });
        this.openPassFileData = data;
      } else {
        if (data.type == "dir") {
          this.jump(`/photo?topid=${data.id}`);
        } else {
          this.preview(data);
        }
      }
    },
    // 预览
    preview2(data) {
      let imgs = [];
      let index = 0;
      this.dataList.forEach(el => {
        if (el.streamUrl) {
          imgs.push(el.streamUrl);
        }
        if (el.id == data.id) {
          index = imgs.length - 1;
        }
      });
      this.$createImagePreview({
        imgs: imgs,
        initialIndex: index,
        loop: true,
        speed: 500,
        onChange: i => {},
        onHide: () => {}
      }).show();
    },
    // 点击
    clickMenu(index) {
      this.showHandle = false;
      if (index == 1) {
        this.handleYD();
      } else if (index == 2) {
        this.handleSC();
      } else if (index == 3) {
        this.editName = "";
        this.openPop({
          dom: $("#JS_search_popup3")
        });
      } else if (index == 5) {
        if (this.checkList.length > 1) {
          this.batchHandle(2);
          return false;
        }
        this.handleDel();
      } else if (index == 6) {
        // this.handleYC();
        api
          .removeMask({
            id: this.handleData.collection[0].id
          })
          .then(response => {
            this.$vux.toast.show("取消星标成功");
            this.manageStatus = false;
            this.dataList.forEach((element, index) => {
              if (element.id == this.handleData.id) {
                this.dataList[index].collection.shift();
              }
            });
          });
      }
    },
    // 左滑删除
    rightMenuClick(data) {
      this.handleData = data;
      this.handleDel();
    },
    // 打开操作栏
    openHandle(data) {
      // this.showHandle = true;
      // this.handleData = data;
      this.manage();
      this.checkOne(data);
    },
    handleYD() {
      if (this.handleData.source == 1) {
        this.jump(`/move?id=${this.handleData.id}`);
      } else if (this.handleData.source == 2) {
        this.jump(`/move?id=${this.handleData.id}&type=2`);
      } else if (this.handleData.source == 3) {
        this.jump(`/move?id=${this.handleData.id}&type=3`);
      }
    },
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
            this.manageStatus = false;
            this.dataList.forEach((element, index) => {
              if (element.id == this.handleData.id) {
                this.dataList[index].collection.shift();
              }
            });
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
                _this.manageStatus = false;
                _this.dataList.forEach((element, index) => {
                  if (element.id == _this.handleData.id) {
                    _this.dataList[index].collection.unshift(1);
                  }
                });
              });
          }
        });
      }
    },
    handleSC() {
      if (this.handleData.source == 1) {
        api
          .addToMask({
            resource_type: "pan",
            resource_id: this.handleData.id
          })
          .then(data => {
            this.$vux.toast.show("星标成功");
            this.manageStatus = false;
            this.dataList.forEach((element, index) => {
              if (element.id == this.handleData.id) {
                this.dataList[index].collection.push({
                  catalog_id: this.userInfo.default_collection_id
                });
              }
            });
            this.manageClose();
          });
      } else if (this.handleData.source == 2) {
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
      } else {
        api
          .addToMask({
            resource_type: "alum",
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
      }
    },
    batchHandle() {
      var fileArr = [];
      var photoArr = [];
      var loadArr = [];
      this.checkList.forEach((el, index) => {
        if (el.source == 1) {
          loadArr.push(el);
        } else if (el.source == 2) {
          fileArr.push(el);
        } else {
          photoArr.push(el);
        }
      });
      if (fileArr.length > 0) {
        let idParams = {};
        fileArr.forEach((el, index) => {
          idParams["id[" + index + "]"] = el.id;
        });
        api.delFile(idParams).then(response => {});
      }
      if (loadArr.length > 0) {
        let idParams = {};
        loadArr.forEach((el, index) => {
          idParams["id[" + index + "]"] = el.id;
        });
        api.delLoad(idParams).then(response => {});
      }
      if (photoArr.length > 0) {
        let idParams = {};
        photoArr.forEach((el, index) => {
          idParams["id[" + index + "]"] = el.id;
        });
        api.delPhoto(idParams).then(response => {});
      }
      setTimeout(() => {
        this.$vux.toast.show("删除成功");
        this.checkList.forEach((element, index) => {
          this.dataList.forEach((el, ind) => {
            if (element.id == el.id) {
              this.dataList.splice(ind, 1);
            }
          });
        });
        this.manageClose();
      }, 1000);
    },
    // 删除
    handleDel() {
      if (this.handleData.source == 1) {
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
              }
            });
          });
      } else if (this.handleData.source == 2) {
        api
          .delFile({
            "id[0]": this.handleData.id
          })
          .then(response => {
            this.closePop();
            this.$vux.toast.show("删除成功");
            this.dataList.forEach((element, index) => {
              if (element.id == this.handleData.id) {
                this.dataList.splice(index, 1);
              }
            });
          });
      } else {
        api
          .delPhoto({
            "id[0]": this.handleData.id
          })
          .then(response => {
            this.closePop();
            this.$vux.toast.show("删除成功");
            this.dataList.forEach((element, index) => {
              if (element.id == this.handleData.id) {
                this.dataList.splice(index, 1);
              }
            });
          });
      }
    },
    //重命名
    editSubmit() {
      if (!this.editName) {
        this.toast("请输入新文件名");
        return false;
      }
      this.manageClose();
      if (this.handleData.source == 1) {
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
      } else if (this.handleData.source == 2) {
        api
          .editFile({
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
      } else {
        api
          .editPhoto({
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
      }
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
      if (this.handleData.source == 1) {
        api
          .editLoad({
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
          });
      } else if (this.handleData.source == 2) {
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
          });
      } else if (this.handleData.source == 3) {
        api
          .editPhoto({
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
          });
      }
    },
    selectTab() {
      if (this.index == 0) {
        this.dataList = this.allList;
      } else if (this.index == 1) {
        this.dataList = this.panList;
      } else if (this.index == 2) {
        this.dataList = this.fileList;
      } else if (this.index == 3) {
        this.dataList = this.photoList;
      }  
      // setTimeout(() => {
      //   var _this = this;
      //   $(".JS_title").each(() => {
      //    $(this).html(function(index, el) {
      //       return el.replace(
      //         _this.value,
      //         "<span class='red'>" + _this.value + "</span>"
      //       );
      //     });
      //   });
      // }, 100);
    },
    keypress(e) {
      let keycode = e.keyCode;
      if (keycode == "13") {
        e.preventDefault();
        this.submit();
      }
    },
    submit() { 
      if (!this.value && this.value !== "0") {
        this.toast("搜索不能为空~");
        return false;
      }
      this.empty = false;
      this.wLoading();
      this.panList=[];
      this.fileList=[];
      this.photoList=[];
      api
        .search({
          key: this.value
        })
        .then(res => {
          this.dataList = [];
          res.data.pan.forEach(el => {
            el.source = 1;
            if (!el.collection) {
              el.collection = [];
            }
            this.panList.push(el);
          });
          res.data.file.forEach(el => {
            el.source = 2;
            if (!el.collection) {
              el.collection = [];
            }
            this.fileList.push(el);
          });
          res.data.alum.forEach(el => {
            el.source = 3;
            if (!el.collection) {
              el.collection = [];
            }
            this.photoList.push(el);
          });
          if (this.panList.length > 0) {
            this.dataList = this.dataList.concat(this.panList);
          }
          if (this.fileList.length > 0) {
            this.dataList = this.dataList.concat(this.fileList);
          }
          if (this.photoList.length > 0) {
            this.dataList = this.dataList.concat(this.photoList);
          }
          this.$nextTick(() => {
            this.allList = this.dataList;
            this.empty = true;
            this.selectTab();
          });
        });
    }
  },
  mounted() {
    $("#JS_search_list").height(
      $(window).height() - $("#JS_search_header").height() - 5
    );
  },
  created() {}
};
</script>
<style>
.tab_search .vux-tab {
  background-color: #f9f9f9;
}

.tab_search .vux-tab .vux-tab-item {
  color: #7a7a7a;
  font-size: 0.4rem;
  background: none;
}

.vux-swiper {
  width: 100%;
  height: 100% !important;
}
.tip_fa_more {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 1.4rem;
  background: rgba(255, 255, 255, 0.8);
  z-index: 100;
}
.tip_fa_more .blue_ico {
  position: absolute;
  bottom: 0.28rem;
  right: 50%;
  margin-right: -0.62rem;
}
</style>
