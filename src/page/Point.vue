<template>
  <div>
    <Header id="JS_point_header" title="我的积分" type="2" ></Header>
    <div id="JS_point" :class="{'mescroll':true,'bg-white':dataList.length>0,'bg-white':dataList.length==0}" ref="mescroll" style="position: relative;">
      <div>
        <div class="point-warpper">
          <div class="flex flex-center padding-top-60">
            <img class="icon-point" src="@/assets/icon_point@2x.png">
          </div>
          <div class="flex flex-center margin-top-10">
            <span class="font-24 white">目前共有</span>
          </div>
          <div class="flex flex-center margin-top-5" >
            <span class="font-34 white">{{userInfo.point}}积分</span>
          </div>
        </div>
        <div class="operate-warpper flex">
           <div class="flex-number1 border-right" @click="jump('/payPoint')">充值</div>
           <div class="flex-number1" @click="jump(`/exchange`)">兑换</div>
        </div>
        <div class="gray padding-top-88" v-if="dataList.length==0&&!loading">
          <p class="margin-top-20 margin-bottom-20 text-center"><img width="50%" src="@/assets/bg_empty_point@2x.png" alt=""></p>
          <p class="text-center">积分记录空空如也…</p>
        </div>
        <div v-for="data in dataList" class="point-record bg-white border-top border-bf flex flex-between" :key="data.id">
          <div class="flex-column flex-center">
            <div>
              <span v-if="data.point<0" class="font-24 gray">[使用记录]</span>
              <span v-else class="font-24 gray">[充值记录]</span>
            </div>
            <div class="margin-top-5">
              <span class="blue font-30">{{typeName[parseInt(data.type)-1]}}</span>
            </div>
            <div class="margin-top-5"><span class="font-24 gray">{{data.time}}</span></div>
          </div>
          <div class="flex-column flex-center" style="height: 2.066667rem;">
            <span v-if="data.point<0" class="green font-48">{{data.point}}</span>
            <span v-else class="orange font-48">+{{data.point}}</span>
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
export default {
  name: "Point",
  data() {
    return {
      mescroll: null, //mescroll实例对象
      dataList: [], //列表数据
      typeName: [
        "积分充值",
        "积分兑换vip",
        "盘扩容",
        "文件扩容",
        "相册扩容",
        "每日登陆",
        "首次充值",
        "首次绑定邮箱",
        "首次上次头像",
        "首次开通VIP",
        "首次绑定手机",
        "设置安全码",
        "分享链接，获得积分",
        "半年V赠送1000积分",
        "年V赠送1800积分"
      ],
      loading: true
    };
  },
  components: {
    Header
  },
  methods: {
    upCallback(page) {
      this.loading = true;
      this.GET({
        api: "/user.php?op=info",
        data: {
          action: "point_log",
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
    $("#JS_point").height(
      $(window).height() - $("#JS_point_header").height() - 5
    );
    let _this = this;
    this.mescroll = new MeScroll(this.$refs.mescroll, {
      up: {
        callback: this.upCallback,
        toTop: {
          //回到顶部按钮
          src: "http://cdnres.bianyue.cn/lyl/img/btn_file_function_top@2x.png", //图片路径,默认null,支持网络图
          offset: 500
        }
      }
    });
  },
  created() {}
};
</script>
<style scoped>
.point-record {
  padding: 0 0.8rem;
}

.point-warpper {
  width: 100%;
  height: 4.213333rem;
  background: url(../assets/bg_point@2x.png) no-repeat;
  background-size: 100% 100%;
}

.padding-top-140 {
  padding-top: 1.866667rem;
}

.operate-warpper {
  background: #1d98ff;
  color: #fff;
  height: 0.853333rem;
  padding: 0.213333rem 0;
  line-height: 0.853333rem;
  text-align: center;
}
</style>
