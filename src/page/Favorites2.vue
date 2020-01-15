<template>
  <div>
    <FooterNav id="JS_fa_footer2"  @homeAdd="homeAdd" page="favorites"></FooterNav>
    <div class="head_gray" id="JS_fa_header2">
        <i class="fl head_back" @click.prevent="back" title="返回"></i>
        <div class="head_title">管理收藏夹</div>
        <a href="javascript:;" @click.prevent.stop="newFile" class="fr head_add" title="新建"></a>
    </div> 
    <div class="JS_favorites_list2" style="position:relative;">
      <div class="mescroll bg-white  edit-swiperout" ref="mescroll" style="position:relative;">
        <div style="position:absoulte;top:0;">
          <div v-if="dataList.length==0&&!loading" class="gray padding-top-88">
            <div class="margin-top-20 margin-bottom-20 text-center"><img width="50%"
                src="@/assets/bg_empty_collection@2x.png" alt=""></div>
            <div class="text-center">空空如也…</div>
          </div>
          <swipeout>
            <swipeout-item v-for="(data,index) in dataList" :key="index">
              <div slot="right-menu">
                <swipeout-button type="primary" @click.native="rightMenuClick(data)"><span class="s_rename">重命名</span>
                </swipeout-button>
                <swipeout-button type="warn" @click.native="rightMenuClick2(data)"><span class="s_del">删除</span>
                </swipeout-button>
              </div>
              <div slot="content" class="flex flex-between align-center list_file">
                <div>
                  <img class="icon-90" src="@/assets/type/icon_fav@2x.png" />
                </div>
                <div class="w500" @click="goDetail(data)">
                  <div class="flex">
                    <span class="font-30 black-4 w-title"
                      style="width: 5.6rem">{{data.title}}（{{data.collection_count}}）</span>
                  </div>
                  <p class="margin-top-10 font-26 gray"> </p>
                </div>
              </div>
            </swipeout-item>
          </swipeout>
        </div>
      </div>
    </div>
    <div id="JS_fa_popup" class="w-pop">
      <div class="box-bg border-bottom">
        <div class="flex flex-center"><img class="icon-90" src="@/assets/type/icon_files39@2x.png" /></div>
        <input class="border-all box-input margin-top-30" type="text" placeholder="请输入新建收藏夹名" v-model="newName">
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.stop="newSubmit">确认</a>
      </div>
    </div>
    <div id="JS_fa_popup2" class="w-pop">
      <div class="box-bg border-bottom">
        <div class="flex flex-center"><img class="icon-90" src="@/assets/type/icon_files39@2x.png" /></div>
        <input class="border-all box-input margin-top-30" type="text" placeholder="请输入新的收藏夹名" v-model="editName">
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click.stop="closePop">取消</a>
        <a class="btn-blue btn-mediume" @click.stop="editSubmit">确认</a>
      </div>
    </div>
    <HomeAdd ref="homeAdd"></HomeAdd> 
  </div>
</template>
<script>
import FooterNav from "@/components/FooterNav";
import HomeAdd from "@/components/HomeAdd";
import MeScroll from "mescroll.js";
import api from "@/api/index.js";
import "mescroll.js/mescroll.min.css";
import { Swipeout, SwipeoutItem, SwipeoutButton } from "vux";
export default {
  name: "Favorites",
  components: {
    FooterNav,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    HomeAdd
  },
  data() {
    return {
      mescroll: null, //mescroll实例对象
      dataList: [], //列表数据
      loading: true,
      newName: "",
      handleData: {},
      editName: ""
    };
  },
  methods: {
    back(){
      this.$router.back();
    },
    homeAdd() {
      this.$refs.homeAdd.goShowFun();
    }, 
    goDetail(data) {
      this.setStorage("favoritesTitlte", data.title);
      this.jump(`/favorites?favoritesId=${data.id}`);
    },
    upCallback(page) {
      this.loading = true;
      api
        .getMask({
          page: page.num
        })
        .then(data => {
          //请求的列表数据
          let arr = data.data;
          if (page.num == 1) {
            this.dataList = [];
          }
          //把请求到的数据添加到列表
          this.dataList = arr;
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
          callback: this.upCallback
        }
      });
    },
    // 左滑重命名
    rightMenuClick(data) {
      this.handleData = data;
      this.handleEdit();
    },
    handleEdit() {
      this.editName = "";
      this.openPop({
        dom: $("#JS_fa_popup2")
      });
    },
    editSubmit() {
      if (!this.editName) {
        this.toast("请输入新文件名");
        return false;
      }
      api
        .editMask({
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
    // 左滑删除
    rightMenuClick2(data) {
      this.handleData = data;
      this.handleDel();
    },
    handleDel() {
      let title =
        this.handleData.title.length > 6
          ? this.handleData.title.substring(0, 4) + "..."
          : this.handleData.title;
      let _this = this;
      this.confirm({
        title: `确认删除${title}？`,
        rightBtnText: "删除",
        delete: true,
        rightCallback: () => {
          api
            .delMask({
              id: _this.handleData.id
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
      });
    },
    // 打开新建文件夹
    newFile() {
      this.newName = "";
      this.openPop({
        dom: $("#JS_fa_popup")
      });
    },
    // 新建文件名
    newSubmit() {
      if (!this.newName) {
        this.toast("请输入新建文件名");
        return false;
      }
      api
        .addMask({
          title: this.newName
        })
        .then(response => {
          this.newMescroll(1);
          this.$vux.toast.show("创建成功");
          this.closePop();
        });
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
    document.addEventListener(
      "click",
      () => {
        let $fun = $("#JS_fa_header_fun2");
        $fun.fadeOut();
      },
      false
    );
    $(".JS_favorites_list2").height(
      $(window).height() -
        $("#JS_fa_header2").height() -
        $("#JS_fa_footer2").height() -
        5
    );
    this.newMescroll();
  }
};
</script>
<style>
</style>
