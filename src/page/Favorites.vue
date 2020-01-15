<template>
  <div class="bg-white">
    <FooterNav id="JS_fa_footer" @homeAdd="homeAdd" page="favorites" v-show="!manageStatus"></FooterNav>
    <div id="JS_fa_header" class="tab_fav">
      <div class="head_gray">
         <!-- <i class="fl head_back" @click.prevent="back" title="返回"></i> -->
        <div class="text-center fd font-32">{{'星标'}}</div>
        <!-- <a href="javascript:;" @click.prevent.stop="showFun" class="fr head_more" title="更多"></a> -->
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
    <div id="JS_fa_header_fun" class="fct head_more_box disn">
      <p class="flex align-center" @click="jump('/favorites2?slip=no')"><img
          src="@/assets/icon_top_collection_create@2x.png" alt=""><span>管理收藏夹</span></p>
      <!-- <div class="max_height">
        <p class="flex align-center"><img src="@/assets/icon_top_collection_select@2x.png" alt=""><span
            class="fd">默认收藏</span></p>
        <p class="flex align-center"><img src="@/assets/icon_top_collection_select_no@2x.png" alt=""><span>收藏夹1</span>
        </p>
        <p class="flex align-center"><img src="@/assets/icon_top_collection_select_no@2x.png" alt=""><span>收藏夹2</span>
        </p>
        <p class="flex align-center"><img src="@/assets/icon_top_collection_select_no@2x.png" alt=""><span>收藏夹3</span>
        </p>
        <p class="flex align-center"><img src="@/assets/icon_top_collection_select_no@2x.png" alt=""><span>收藏夹4</span>
        </p>
        <p class="flex align-center"><img src="@/assets/icon_top_collection_select_no@2x.png" alt=""><span>收藏夹5</span>
        </p>
        <p class="flex align-center"><img src="@/assets/icon_top_collection_select_no@2x.png" alt=""><span>收藏夹6</span>
        </p>
        <p class="flex align-center"><img src="@/assets/icon_top_collection_select_no@2x.png" alt=""><span>收藏夹7</span>
        </p>
      </div> -->
    </div>
    <div id="JS_fa_header_fun" class="fct head_more_box disn">
      <p class="flex align-center" @click="jump('/favorites2')"><img src="@/assets/icon_top_collection_create@2x.png"
          alt=""><span>管理收藏</span></p>
    </div>
    <div class="JS_favorites_list" style="position:relative;">
      <div class="mescroll bg-white edit-swiperout" ref="mescroll" style="position:relative;">
        <div style="position:absoulte;top:0;">
          <div v-if="dataList.length==0&&!loading" class="gray padding-top-88">
            <div class="margin-top-20 margin-bottom-20 text-center"><img width="50%"
                src="@/assets/bg_empty_collection@2x.png" alt=""></div>
            <div class="text-center">空空如也…</div>
          </div>
          <swipeout>
            <swipeout-item v-for="(data,index) in dataList" :key="index">
              <div slot="right-menu">
                <swipeout-button type="primary" @click.native="rightMenuClick(data)"><span class="s_remove">取消星标</span>
                </swipeout-button>
                <swipeout-button type="warn" @click.native="rightMenuClick2(data)"><span class="s_del">删除</span>
                </swipeout-button>
              </div>
              <div slot="content" class="flex flex-between align-center list_file" v-if="data.source==1"> 
                <div v-if="data.type==1" @click="goLixianDetail(data)">
                  <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files39@2x.png" />
                  <img class="icon-90" v-else src="@/assets/type/icon_files39@2x.png" />
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
                    <span class="font-31 black-4 w-title">{{data.title}}</span>
                  </div>
                  <div class="flex">
                    <img class="icon-h39" src="@/assets/new/icon_fav@2x.png" alt="" style="position: relative;top:.05rem;" >
                    <p class="margin-top-10 font-26 gray">{{data.time*1000,3|timeStamp}}&emsp;</p>
                    <p class="margin-top-10 font-26 gray">{{data.size?data.size.size:''}}</p>
                  </div>
                </div>
                <div v-if="manageStatus" @click="checkOne(data)">
                  <div v-if="data.checked" class="ico_handle ico_handle_yes"></div>
                  <div v-else class="ico_handle ico_handle_kong"></div>
                </div>
                <div v-else @click="openHandle(data)" class="ico_handle"></div>
              </div>

              <div slot="content" class="flex flex-between align-center list_file" v-if="data.source==2">
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
                    <span class="font-31 black-4 w-title" style="width: 5.6rem">{{data.title}}</span>
                  </div>
                  <div class="flex">
                      <img class="icon-h39" src="@/assets/new/icon_fav@2x.png" alt="" style="position: relative;top:.05rem;"> 
                    <p class="margin-top-10 font-26 gray">{{data.time*1000,3|timeStamp}}&emsp;</p>
                    <p class="margin-top-10 font-26 gray">{{data.size|formatBytes}}</p>
                  </div>
                </div>
                <div v-if="manageStatus" @click="checkOne(data)">
                  <div v-if="data.checked" class="ico_handle ico_handle_yes"></div>
                  <div v-else class="ico_handle ico_handle_kong"></div>
                </div>
                <div v-else @click="openHandle(data)" class="ico_handle"></div>
              </div>
              <div slot="content" class="flex flex-between align-center list_file" v-if="data.source==3">
                <div v-if="data.type=='dir'" @click="goPhotoDetail(data)">
                  <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files39@2x.png" />
                  <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
                </div>
                <div v-else @click="goPhotoDetail(data)"> 
                  <img class="icon-90" :src="'http://cdnres.bianyue.cn/lyl/img/type/icon_'+data.type+'@2x.png'"
                    onerror="this.src='http://cdnres.bianyue.cn/lyl/img/type/icon_files11@2x.png'" />
                </div>
                <!-- <div v-else @click="goPhotoDetail(data)">
                  <div class="icon-90 flex-column flex-center"
                    style="display:flex;background:#f7f7f7;border-radius:5px;">
                    <img style="max-width:100%;max-height:100%;" :src="data.streamUrl"
                      onerror="this.src='http://cdnres.bianyue.cn/lyl/img/type/icon_files11@2x.png'" /></div>
                </div> -->
                <div class="w500" @click="goPhotoDetail(data)">
                  <div class="flex">
                    <span class="font-31 black-4 w-title" style="width: 5.6rem">{{data.title}}</span>
                  </div>
                  <div class="flex">
                      <img class="icon-h39" src="@/assets/new/icon_fav@2x.png" alt="" style="position: relative;top:.05rem;">
                    <p class="margin-top-10 font-26 gray">{{data.time*1000,3|timeStamp}}&emsp;</p>
                    <p class="margin-top-10 font-26 gray">{{data.size|formatBytes}}</p>
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
      </div>
    </div>
    <div id="JS_fa_tip"  v-if="manageStatus"  class="tip_more tip_fa_more"> 
      <Action :type="ActionType" :isPass="'no'" :isSc="true" @clickMenu="clickMenu"></Action>
    </div><!-- 更多 --> 
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
          <a class="btn-blue btn-big experience" style="width:50%; border-radius:0 0 0 8px; border:0"
            @click.stop="experience">免费体验</a>
          <a class="btn-orange btn-big experience" style="width:50%; border-radius:0 0 8px 0; border:0"
            @click.stop="closePop();showVip=true">升级VIP</a>
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
    <HomeAdd ref="homeAdd"></HomeAdd>
    <Popup v-model="showVip" :hide-on-blur="true">
      <DredgeVip @closeVip="showVip=false"></DredgeVip>
    </Popup>
   
  </div>
</template>

<script>
import FooterNav from "@/components/FooterNav";
import HomeAdd from "@/components/HomeAdd";
import DredgeVip from "@/components/DredgeVip";
import Action from "@/components/Action";
import { Swipeout, SwipeoutItem, SwipeoutButton, Popup } from "vux";
import MeScroll from "mescroll.js";
import api from "@/api/index.js";
import "mescroll.js/mescroll.min.css";
export default {
  name: "Favorites",
  data() {
    return {
      mescroll: null, //mescroll实例对象
      loading: true,
      dataList: [],
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
      favoritesTitle: "",
      // 管理
      manageStatus: false,
      checkList: [],
      checkAll: false,
      ActionType: "favorites"
    };
  },
  components: {
    HomeAdd,
    FooterNav,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Popup,
    DredgeVip,
    Action
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
    homeAdd() {
      this.$refs.homeAdd.goShowFun();
    },
    showFun() {
      let $fun = $("#JS_fa_header_fun");
      $fun.fadeToggle();
    },
    upCallback(page) {
      let favoritesId = this.$router.currentRoute.query.favoritesId || "";
      let params = {};
      if (favoritesId) {
        params.catalog_id = favoritesId;
      }
      this.loading = true;
      api
        .getDetailMask(params)
        .then(data => {
          this.favoritesTitle = data.catalog_info.title;
          this.loading = false;
          this.dataList = [];
          let panList = data.data.pan || [];
          let fileList = data.data.file || [];
          let photoList = data.data.alum || [];
          let panArr = [];
          let fileArr = [];
          let photoArr = [];
          panList.forEach(el => {
            el.resource.source = 1;
            el.resource.creatSort = new Date(
              el.created_at.replace(/-/g, "/")
            ).getTime();
            el.resource.cid = el.resource_id;
            el.resource.rid = el.id;
            panArr.push(el.resource);
          });
          fileList.forEach(el => {
            el.resource.source = 2;
            el.resource.creatSort = new Date(
              el.created_at.replace(/-/g, "/")
            ).getTime();
            el.resource.cid = el.resource_id;
            el.resource.rid = el.id;
            fileArr.push(el.resource);
          });
          photoList.forEach(el => {
            el.resource.source = 3;
            el.resource.creatSort = new Date(
              el.created_at.replace(/-/g, "/")
            ).getTime();
            el.resource.cid = el.resource_id;
            el.resource.rid = el.id;
            photoArr.push(el.resource);
          });

          this.dataList = this.dataList.concat(panArr);
          this.dataList = this.dataList.concat(fileArr);
          this.dataList = this.dataList.concat(photoArr);
          function sortBy(field) {
            return function(a, b) {
              return b[field] - a[field];
            };
          }
          this.$nextTick(() => {
            this.dataList = this.dataList.sort(sortBy("creatSort"));
            this.mescroll.endSuccess(this.dataList.length);
          });
        })
        .catch(data => {
          this.mescroll.endErr();
          this.loading = false;
          if (
            String(data).indexOf("timeout") !== -1 &&
            this.$router.currentRoute.name == "Favorites"
          ) {
            this.$vux.toast.show({
              text: "请求超时，请刷新重试！",
              type: "cancel"
            });
          }
        });
    },
    newMescroll(type) {
      if (type == 1) {
        this.mescroll.destroy();
      }
      this.mescroll = new MeScroll(this.$refs.mescroll, {
        up: {
          callback: this.upCallback,
          page: {
            num: 0,
            size: "100"
          }
        }
      });
    }, // 打开操作栏
    openHandle(data) {
      this.manage();
      this.checkOne(data);
    },
    // 点击
    clickMenu(index) {
      if (index == 1) {
        this.handleYD();
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
        api
          .removeMask({
            id: this.handleData.rid
          })
          .then(response => {
            this.$vux.toast.show("取消星标成功");
            this.manageStatus = false;
            this.dataList.forEach((element, index) => {
              if (element.id == this.handleData.id) {
                this.dataList.splice(index, 1);
              }
            });
          });
      }
    },
    // 左滑取消收藏
    rightMenuClick(data) {
      this.handleData = data;
      this.clickMenu(6);
    },
    // 左滑删除
    rightMenuClick2(data) {
      this.handleData = data;
      this.handleDel();
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
        api.removeMask({
          id: el.rid
        });
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
        this.newMescroll(1);
        this.manageClose();
      }, 1000);
    },
    // 删除
    handleDel() {
      api
        .removeMask({
          id: this.handleData.rid
        })
        .then(response => {});
      if (this.handleData.source == 1) {
        api
          .delLoad({
            "id[0]": this.handleData.id
          })
          .then(response => {
            this.closePop();
            this.$vux.toast.show("删除成功");
            this.manageStatus = false;
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
            this.manageStatus = false;
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
            this.manageStatus = false;
            this.dataList.forEach((element, index) => {
              if (element.id == this.handleData.id) {
                this.dataList.splice(index, 1);
              }
            });
          });
      }
    },
    handleYD() {
      this.manageStatus = false;
      if (this.handleData.source == 1) {
        this.jump(`/move?id=${this.handleData.id}`);
      } else if (this.handleData.source == 2) {
        this.jump(`/move?id=${this.handleData.id}&type=2`);
      } else if (this.handleData.source == 3) {
        this.jump(`/move?id=${this.handleData.id}&type=3`);
      }
    },
    //重命名
    editSubmit() {
      if (!this.editName) {
        this.toast("请输入新文件名");
        return false;
      }
      this.manageStatus = false;
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
    // 云下载
    goLixianDetail(data) {
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
          dom: $("#JS_search_popup1"),
          width: "70%"
        });
        this.handleData = data;
      } else if (data.jindu ? data.jindu.status == -2 : false) {
        this.playErr = "该链接任务无视频文件";
        this.closePop();
        this.openPop({
          dom: $("#JS_search_popup1"),
          width: "70%"
        });
        this.handleData = data;
      } else if (data.jindu ? data.jindu.status == -4 : false) {
        this.playErr = "该链接任务被多次举报，已被系统屏蔽";
        this.closePop();
        this.openPop({
          dom: $("#JS_search_popup1"),
          width: "70%"
        });
        this.handleData = data;
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
        // if (data.pass) {
        //   this.openPass = "";
        //   this.openPop({
        //     dom: $("#JS_search_popup2")
        //   });
        //   this.openPassFileData = data;
        // } else {
        //   if (data.type == 1) {
        //     this.jump(`/lixian?topid=${data.id}`);
        //   } else {
        //     this.openPlay(data);
        //   }
        // }
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
    }, //  文件
    goFileDetail(data) {
      if (this.manageStatus) {
        this.checkOne(data);
        return false;
      }
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
      if (this.manageStatus) {
        this.checkOne(data);
        return false;
      }
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
    }
  },
  mounted() {
    document.addEventListener(
      "click",
      () => {
        let $fun = $("#JS_fa_header_fun");
        $fun.fadeOut();
      },
      false
    );
    $(".JS_favorites_list").height(
      $(window).height() -
        $("#JS_fa_header").height() -
        $("#JS_fa_footer").height() -
        5
    );
    this.newMescroll();
  }
};
</script>
<style>
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
