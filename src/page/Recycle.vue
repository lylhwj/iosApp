<template>
  <div>
    <div id="JS_recycle_header">
      <div class="head_gray">
        <i class="fl head_back" @click.prevent="jump('/user')" title="返回"></i>
        <div class="head_title">回收站</div>
        <a href="javascript:;" @click="delFile" class="fr head_del2" title="删除"></a>
      </div>
      <div class="bg-yellow padding-20 font-24">文件在删除前会显示到期时间，到期回收站将自动永久删除文件。</div>
    </div> 
    <!-- 选择后弹出框 -->
    <div class="JS_recycle_list" style="position:relative;">
      <div class="file-list mescroll bg-white" ref="mescroll">
        <div style="position:absoulte;top:0;">
          <div class="gray padding-top-88" v-if="dataList.length==0&&!loading">
            <p class="margin-top-20 margin-bottom-20 text-center"><img width="50%" src="@/assets/bg_empty_file@2x.png"
                alt=""></p>
            <p class="text-center">空空如也…</p>
          </div>
          <div v-for="data in dataList" :key="data.id">
            <div class="flex flex-between align-center list_file">
              <div v-if="data.type=='dir'||data.type=='1'">
                <img class="icon-90" v-if="!data.pass" src="@/assets/type/icon_files39@2x.png" />
                <img class="icon-90" v-else src="@/assets/type/icon_files40@2x.png" />
              </div>
              <div v-else>
                <img class="icon-90" v-if="data.pass" src="@/assets/type/icon_files16@2x.png" />
                <img class="icon-90" v-else :src="'http://cdnres.bianyue.cn/lyl/img/type/icon_'+data.type+'@2x.png'"
                  onerror="this.src='http://cdnres.bianyue.cn/lyl/img/type/icon_files11@2x.png'" />
              </div>
              <div class="w500">
                <div class="flex">
                  <span class="font-31 black-4 w-title" style="width: 5.6rem">{{data.title}}</span>
                </div>
                <p class="margin-top-10 font-26 gray"><span>到期：</span>{{data.delete_at|rtime}}</p>
              </div>
              <div @click="openHandle(data)" class="ico_handle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Popup v-model="showHandle" :hide-on-blur="true" style="overflow: hidden;">
      <Action @close="showHandle=false" type="recycle" @clickMenu="clickMenu"></Action>
    </Popup>
  </div>
</template>
<script>
  import MeScroll from "mescroll.js";
  import "mescroll.js/mescroll.min.css";
  import api from "@/api/index";
  import Action from "@/components/Action";
  import {
    Popup
  } from "vux";
  export default {
    data() {
      return {
        mescroll: null, //mescroll实例对象
        dataList: [], //列表数据,
        loading: true,
        showHandle: false,
        handleData: {

        }
      };
    },
    components: {
      Popup,
      Action
    },
    filters:{
      rtime(string){
        return string.substring(0,10);
      }
    },
    methods: {
      upCallback(page) {
        this.loading = true;
        api
          .getRecover({
            page: page.num,
            per_page: 15
          })
          .then(data => {
            //请求的列表数据
            let arr = data.data.data;
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
      delFile() {
        let _this = this;
        this.confirm({
          title: `确认清空回收站？`,
          rightBtnText: "清空",
          delete: true,
          rightCallback: () => { 
            api
              .clearRecover2({})
              .then(response => {
                _this.closePop();
                _this.$vux.toast.show("清空成功");
                _this.dataList=[];
              });
          }
        });
      },
      // 打开操作栏
      openHandle(data) {
        this.showHandle = true;
        this.handleData = data;
      },
      // 点击
      clickMenu(index) {
        this.showHandle = false;
        if (index == 1) {
          this.returnFile(this.handleData);
        } else if (index == 2) {
          this.handleDel();
        }
      },
      // 删除
      handleDel() {
        let title =
          this.handleData.title.length > 6 ?
          this.handleData.title.substring(0, 4) + "..." :
          this.handleData.title;
        let _this = this;
        this.confirm({
          title: `确认删除${title}？`,
          rightBtnText: "删除",
          delete: true,
          rightCallback: () => {
            if (this.handleData.r_type == "pan") {
              api
                .clearRecover({
                  "panIds[0]": _this.handleData.id
                })
                .then(response => {
                  _this.closePop();
                  _this.$vux.toast.show("删除成功");
                  _this.dataList.forEach((element, index) => {
                    if (element.id == _this.handleData.id) {
                      _this.dataList.splice(index, 1);
                    }
                  });
                });
            } else if (this.handleData.r_type == "file") {
              api
                .clearRecover({
                  "fileIds[0]": _this.handleData.id
                })
                .then(response => {
                  _this.closePop();
                  _this.$vux.toast.show("删除成功");
                  _this.dataList.forEach((element, index) => {
                    if (element.id == _this.handleData.id) {
                      _this.dataList.splice(index, 1);
                    }
                  });
                });
            }
          }
        });
      },
      // 还原
      returnFile(data) {
        if (data.r_type == "file" && data.alum == 1) { //相册还原
          this.jump(`/recover/${this.handleData.id}?type=3`);
        } else if (data.r_type == "file" && data.alum !== 1) { //文件还原
          this.jump(`/recover/${this.handleData.id}?type=2`);
        } else if (data.r_type == "pan") { //云下载还原
          this.jump(`/recover/${this.handleData.id}`);
        }
      },
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
      $(".JS_recycle_list").height(
        $(window).height() - $("#JS_recycle_header").height() - 5
      );
      this.newMescroll();
    },
    created() {}
  };

</script>
<style>
</style>
