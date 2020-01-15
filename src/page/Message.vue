<template>
  <div>
    <Header id="JS_msg_header" title="消息通知" type="2" text="清空" @handle="handle"></Header>
    <div id="JS_msg" style="transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1); transition-duration: 0ms; transform: translate(0px, 0px) scale(1) translateZ(0px);" :class="{'mescroll':true,'page-msg':true,'bg-grayc':dataList.length>0,'bg-white':dataList.length==0}"
      ref="mescroll">
      <div>
        <div class="gray padding-top-88" v-if="dataList.length==0&&!loading">
          <p class="margin-top-20 margin-bottom-20 text-center"><img width="50%" src="@/assets/bg_empty_msg@2x.png" alt=""></p>
          <p class="text-center">消息空空如也…</p>
        </div>  
        <div v-for="(data,index) in dataList" :key="index">
          <div class="flex flex-center">
            <div class="flex-coulum flex-center height-58" style="line-height: .773333rem;"><span class="grayc font-28">{{data.time*1000,3|timeStamp}}</span></div>
          </div>
          <div class="bg-white flex padding-30 margin-left-10 message-warpper border-box box-shadow" style="position:relative;">
            <a class="close" @click.prevent="handleDel(data.id)"></a>
            <div class="flex-column flex-center">
              <img v-if="data.dxtype=='0'" class="icon-message" src="@/assets/icon_message@2x.png">
              <img v-else class="icon-message" src="@/assets/icon_message2@2x.png">
            </div>
            <div class="margin-left-25 margin-top-25">
              <div v-if="data.dxtype=='0'"><span class="font-32">系统通知</span></div>
              <div v-else><span class="font-32">VIP服务通知</span></div>
              <div @click="handleRead(data.id)" class="info"><span class="font-28 gray"><span :class="{'red':data.dxstatus==0}">[{{data.dxstatus=='0'?'未读':'已读'}}]</span>{{data.title|remove}}</span></div>
              <div  class="border-top flex flex-end margin-top-20 padding-top-20 border-bf" style="width: 7.466667rem;"
                v-if="data.title.indexOf('【去赠送】')!==-1">
                <div class="flex-coulum flex-center" style="height: .8rem;line-height: .8rem;"><span class="blue font-28"
                    @click="jump('/present')">去赠送</span></div>
              </div>
              <div class="border-top flex flex-end margin-top-20 padding-top-20 border-bf" style="width: 7.466667rem;"
                v-if="data.title.indexOf('【去兑换】')!==-1">
                <div class="flex-coulum flex-center" style="height: .8rem;line-height: .8rem;"><span class="blue font-28"
                    @click="jump('/coupon')">去兑换</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
export default {
  name: "Message",
  data() {
    return {
      mescroll: null, //mescroll实例对象
      dataList: [], //列表数据,
      loading: true
    };
  },
  components: {
    Header,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  filters: {
    remove(title) {
      if (title.indexOf("【去赠送】") !== -1) {
        return title.replace(/【去赠送】/, "");
      }
      if (title.indexOf("【去兑换】") !== -1) {
        return title.replace(/【去兑换】/, "");
      }
      return title.replace(/【去绑定】/, "");
    }
  },
  methods: {
    onBtnClick(btn, index) {
      if (btn.action === "delete") {
        this.handleDel(this.dataList[index].id);
      } else if (btn.action === "read") {
        this.handleRead(this.dataList[index].id);
      }
      this.$refs.swipeItem[index].shrink();
    },
    upCallback(page) {
      this.loading = true;
      this.GET({
        api: "/user.php?op=info",
        data: {
          action: "duanxin",
          page: page.num
        },
        success: data => {
          //请求的列表数据
          let arr = data.data;
          if (page.num == 1) {
            this.dataList = [];
          }
          //把请求到的数据添加到列表
          this.dataList = this.dataList.concat(arr);
          this.dataList.forEach(el => {
            el.btns = [
              {
                action: "read",
                text: "标为已读",
                color: "#c8c7cd"
              },
              {
                action: "delete",
                text: "删除",
                color: "#ff3a32"
              }
            ];
          });

          this.loading = false;
          this.$nextTick(() => {
            this.mescroll.endSuccess(arr.length);
          });
        },
        erros: data => {
          this.mescroll.endErr();
          this.loading = false;
        }
      });
    },
    // 标为已读
    handleRead(id) {
      this.GET({
        api: `/user.php?op=info&action=read_info&id=${id}`,
        success: data => {
          this.dataList.forEach((element, index) => {
            if (id == element.id) {
              element.dxstatus = "1";
            }
          });
        }
      });
    },
    // 删除信息
    handleDel(id) {
      let _this = this;
      this.confirm({
        title: "确认删除？",
        rightBtnText: "删除",
        delete: true,
        rightCallback: () => {
          _this.GET({
            api: `/user.php?op=info&action=read_duanxin&id=${id}`,
            success: data => {
              _this.$vux.toast.show("删除成功");
              _this.dataList.forEach((element, index) => {
                if (id == element.id) {
                  _this.dataList.splice(index, 1);
                }
              });
            }
          });
        }
      });
    },
    // 删除所有
    handle() {
      let _this = this;
      this.confirm({
        title: "确认清空？",
        rightCallback: () => {
          _this.GET({
            api: `/user.php?op=info&action=delAll_duanxin`,
            success: data => {
              _this.$vux.toast.show("清空成功");
              _this.dataList = [];
            }
          });
        }
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
    this.hideToTop();
    $("#JS_msg").height($(window).height() - $("#JS_msg_header").height() - 5);
    let _this = this;
    this.mescroll = new MeScroll(this.$refs.mescroll, {
      up: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 5
        },
        toTop: {
          //回到顶部按钮
          src: "http://cdnres.bianyue.cn/lyl/img/btn_file_function_top@2x.png", //图片路径,默认null,支持网络图
          offset: 1000
        }
      }
    });
  },
  created() {
     
  }
};
</script>
<style>
.page-msg .close {
  display: inline-block;
  position: absolute;
  top: 0.24rem;
  right: 0.27rem;
  width: 0.8rem;
  height: 0.8rem;
  background:url(../assets/btm_close@2x.png) no-repeat center;
  background-size: 35%;
}

.height-58 {
  height: 0.773333rem;
}

.message-warpper {
  width: 96%;
  border-radius: 8px;
  margin: 0 auto;
}

.info {
  width: 7.466667rem;
  margin-top: 0.1rem; 
  line-height:0.56rem; 
}
</style>
