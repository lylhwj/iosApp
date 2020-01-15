<template>
  <div>
    <div class="JS_link_header">
      <div class="head_gray text-center">
        <!-- <i class="fl head_back" @click.prevent="back" title="返回"></i> -->
        <a href="javascript:;" class="head_all" title="全选"></a>
        链接任务
      </div>
      <div class="bg-yellow padding-20 font-24">
        请遵循<span class="blue">服务协议</span>！严禁存储、处理、传输、发布任何涉密、色情、暴力、侵权等违法违规信息！
      </div>
    </div>
    <div class="JS_link_list" style="position:relative;">
      <div class=" mescroll bg-white" ref="mescroll">
        <div style="position:absoulte;top:0;">

          <div class="gray padding-top-88" v-if="dataList.length==0&&!loading">
            <p class="margin-top-20 margin-bottom-20 text-center"><img width="50%" src="@/assets/bg_empty_popup@2x.png"
                alt=""></p>
            <p class="text-center">空空如也…</p>
          </div>
          <div class="w-column bg-gray padding-20 gray flex flex-between border-bottom">
            <span @click="slideToggle($event)">下载完成（1）<i class="margin-left-15  task_down task_up"></i></span>
            <span class="grayc font-20">删除</span>
          </div>
          <div>
            <div class="flex flex-between align-center list_file list_file_task">
              <div class="ico_handle ico_handle_kong"></div>
              <div>
                <img class="icon-90" src="@/assets/type/icon_files57@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_success@.png" alt="">
                  <span class="green margin-left-10">下载完成</span>
                  <span class="gray margin-left-15">1.3G</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
          </div>
          <div class="w-column bg-gray padding-20 gray flex flex-between border-bottom">
            <span @click="slideToggle($event)">下载中（2）<i class="margin-left-15 task_down task_up"></i></span>
            <span class="grayc font-20">删除</span>
          </div>
          <div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files55@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_ing.png" alt="">
                  <span class="blue margin-left-10">85%</span>
                  <span class="gray margin-left-15">1.3G</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files55@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_ing.png" alt="">
                  <span class="blue margin-left-10">85%</span>
                  <span class="gray margin-left-15">1.3G</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files55@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_ing.png" alt="">
                  <span class="blue margin-left-10">85%</span>
                  <span class="gray margin-left-15">1.3G</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files55@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_ing.png" alt="">
                  <span class="blue margin-left-10">85%</span>
                  <span class="gray margin-left-15">1.3G</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files55@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_ing.png" alt="">
                  <span class="blue margin-left-10">85%</span>
                  <span class="gray margin-left-15">1.3G</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files55@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_ing.png" alt="">
                  <span class="blue margin-left-10">85%</span>
                  <span class="gray margin-left-15">1.3G</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files55@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_ing.png" alt="">
                  <span class="blue margin-left-10">85%</span>
                  <span class="gray margin-left-15">1.3G</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files55@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_ing.png" alt="">
                  <span class="blue margin-left-10">85%</span>
                  <span class="gray margin-left-15">1.3G</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files55@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_ing.png" alt="">
                  <span class="blue margin-left-10">85%</span>
                  <span class="gray margin-left-15">1.3G</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files55@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_ing.png" alt="">
                  <span class="blue margin-left-10">85%</span>
                  <span class="gray margin-left-15">1.3G</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files55@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_ing.png" alt="">
                  <span class="blue margin-left-10">85%</span>
                  <span class="gray margin-left-15">1.3G</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files55@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_ing.png" alt="">
                  <span class="blue margin-left-10">85%</span>
                  <span class="gray margin-left-15">1.3G</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files55@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_ing.png" alt="">
                  <span class="blue margin-left-10">85%</span>
                  <span class="gray margin-left-15">1.3G</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files55@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_ing.png" alt="">
                  <span class="blue margin-left-10">85%</span>
                  <span class="gray margin-left-15">1.3G</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files55@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_ing.png" alt="">
                  <span class="blue margin-left-10">正在分配服务器</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
          </div>
          <div class="w-column bg-gray padding-20 gray flex flex-between">
            <span @click="slideToggle($event)">下载失败（1）<i class="margin-left-15  task_down task_up"></i></span>
            <span class="grayc font-20">删除</span>
          </div>
          <div>
            <div class="flex flex-between align-center list_file">
              <div>
                <img class="icon-90" src="@/assets/type/icon_files58@2x.png" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title">捉妖记 [2015][BD高清完整版].WMV</span>
                </div>
                <div class="margin-top-10 font-26">
                  <img class="vmid icon-h30" src="@/assets/new/icon_popup_wrong@.png" alt="">
                  <span class="red margin-left-10">下载失败</span>
                </div>
              </div>
              <div class="ico_handle ico_handle_link"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <HomeAdd ref="homeAdd"></HomeAdd>
    <FooterNav id="JS_link_footer" @homeAdd="homeAdd" page="transfer"></FooterNav>
  </div>
</template>
<script>
  import FooterNav from "@/components/FooterNav";
  import HomeAdd from "@/components/HomeAdd";
  import MeScroll from "mescroll.js";
  import "mescroll.js/mescroll.min.css";
  import api from "@/api/index";
  export default {
    name: "tests",
    data() {
      return {
        mescroll: null, //mescroll实例对象
        dataList: [], //列表数据
        total: 0,
        loading: true,
        cDataList:[],
        wDataList:[],
        fDataList:[]
      }
    },
    components: {
      FooterNav,
      HomeAdd
    },
    methods: {
      homeAdd() {
        this.$refs.homeAdd.goShowFun();
      },
      slideToggle(event) {
        $(event.target).parents(".w-column").next().slideToggle();
        $(event.target).parents(".w-column").find('i').toggleClass('task_down');
      }, // Mescroll
      newMescroll(type) {
        if (type == 1) {
          this.mescroll.destroy();
        }
        this.mescroll = new MeScroll(this.$refs.mescroll, {
          up: {
            callback: this.upCallback,
            page: {
              num: 0
            },  
          }
        });
      },
      upCallback(){
        api
        .lixianDown({
          page: page.num,
          f: 'completed',
          per_page: 5
        }).then((data)=>{
          let arr = data.data.list.data;
        })
        api
        .lixianDown({
          page: page.num,
          f: 'working',
          per_page: 5
        }).then((data)=>{
          console.log(data)
        })
        api
        .lixianDown({
          page: page.num,
          f: 'failed',
          per_page: 5
        }).then((data)=>{
          console.log(data)
        })
      }
    }, // // 进入路由时,恢复列表状态
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
    mounted() {
      $(window).unbind("resize");
      $(".JS_link_list").height(
        $(window).height() -
        $("#JS_link_header").height() -
        $("#JS_link_footer").height() -
        5
      );
      this.newMescroll();
    },
  };

</script>
<style>
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

</style>
