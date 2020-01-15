<template>
  <div>
    <Header id="JS_coupon_header" title="我的卡券包" type="2" text="购买" @handle="jump('/paySpace')"></Header>
    <div id="JS_coupon" :class="{'mescroll':true,'bg-gray':dataList.length>0,'bg-white':dataList.length==0}" ref="mescroll">
      <div>
        <div class="coupon-header border-box"></div>
        <div class="gray padding-top-88" v-if="dataList.length==0&&!loading">
          <p class="margin-top-20 margin-bottom-20 text-center"><img width="50%" src="@/assets/bg_empty_coupon@2x.png" alt=""></p>
          <p class="text-center">卡券包空空如也…</p>
        </div>
        <div v-for="data in dataList" :class="{'coupon-warpper':true,'bg-white':true,'border-box':true,
            'flex':true,'one':data.spaceCard_type=='1TB','two':data.spaceCard_type=='2TB','three':data.spaceCard_type=='3TB','four':data.type=='1'}"
          style="padding-left: .933333rem;" :key="data.card_id">
          <div v-if="data.spaceCard_type=='1TB'" class="coupon-center  flex-column flex-center">
            <span style="color:#61ce75;font-size: .8rem;">1TB</span>
            <div class="flex flex-center" style="width: 1.466667rem;">
              <div class="flex-column flex-center" style="border-radius:10px;background-color:#61ce75;"><span class="font-28 white text-center"
                  style="line-height: .493333rem;">&nbsp;未使用&nbsp;</span></div>
            </div>
          </div>
          <div v-else-if="data.spaceCard_type=='2TB'" class="coupon-center  flex-column flex-center">
            <span style="color:#ff8660;font-size: .8rem;">2TB</span>
            <div class="flex flex-center" style="width: 1.466667rem;">
              <div class="flex-column flex-center" style="border-radius:10px;background-color:#ff8660;"><span class="font-28 white text-center"
                  style="line-height: .493333rem;">&nbsp;未使用&nbsp;</span></div>
            </div>
          </div>
          <div v-else-if="data.spaceCard_type=='3TB'" class="coupon-center flex-column flex-center">
            <span style="color:#04c0c3;font-size: .8rem;">3TB</span>
            <div class="flex flex-center" style="width: 1.466667rem;">
              <div class="flex-column flex-center" style="border-radius:10px;background-color:#04c0c3;"><span class="font-28 white text-center"
                  style="line-height: .493333rem;">&nbsp;未使用&nbsp;</span></div>
            </div>
          </div>
          <div v-else class="coupon-center flex-column flex-center">
            <div class="flex flex-center" style="width: 1.466667rem;"><span style="font-size: .8rem;color: #fda11c;">VIP</span></div>
            <div class="flex flex-center" style="width: 1.466667rem;">
              <div class="flex-column flex-center" style="border-radius:10px;background: linear-gradient(#fb7d31,#ffd200);"><span
                  class="font-28 white text-center" style="line-height: .493333rem;">&nbsp;未使用&nbsp;</span></div>
            </div>
          </div>
          <div v-if="data.spaceCard_type=='1TB'" class="coupon-center flex-column flex-center" style="margin-left: .373333rem;">
            <p style="color:#595959;font-size: .32rem;width: 4.266667rem;" class="text-over">卡号:{{data.card_id}}</p>
            <div class="margin-top-10"><span style="color:#61ce75;font-size: .32rem;">快速扩容1TB永久空间</span></div>
            <div class="flex margin-top-10" style="margin-left: 2.6rem;">
              <div class="flex-column flex-center" style="height: .346667rem;margin-right: .106667rem;">
                <img class="icon-coupon-lixian" src="@/assets/icon_coupon_lixian@2x.png">
              </div>
              <div class="flex-column flex-center" style="height: .346667rem;"> <span class="gray font-20">云下载空间</span>
              </div>
            </div>
          </div>
          <div v-else-if="data.spaceCard_type=='2TB'" class="coupon-center flex-column flex-center" style="margin-left: .373333rem;">
            <span style="color:#595959;font-size: .32rem;width: 4.266667rem;" class="text-over">卡号:{{data.card_id}}</span>
            <div class="margin-top-10"><span style="color:#ff8660;font-size: .32rem;">快速扩容1TB永久空间</span></div>
            <div class="flex margin-top-10" style="margin-left: 2.6rem;">
              <div class="flex-column flex-center" style="height: .346667rem;margin-right: .106667rem;">
                <img class="icon-coupon-lixian" src="@/assets/icon_coupon_lixian@2x.png">
              </div>
              <div class="flex-column flex-center" style="height: .346667rem;"> <span class="gray font-20">云下载空间</span>
              </div>
            </div>
          </div>
          <div v-else-if="data.spaceCard_type=='3TB'" class="coupon-center flex-column flex-center" style="margin-left: .373333rem;">
            <span style="color:#595959;font-size: .32rem;width: 4.266667rem;" class="text-over">卡号:{{data.card_id}}</span>
            <div class="margin-top-10"><span style="color:#04c0c3;font-size: .32rem;">快速扩容1TB永久空间</span></div>
            <div class="flex margin-top-10" style="margin-left: 2.6rem;">
              <div class="flex-column flex-center" style="height: .346667rem;margin-right: .106667rem;">
                <img class="icon-coupon-lixian" src="@/assets/icon_coupon_lixian@2x.png">
              </div>
              <div class="flex-column flex-center" style="height: .346667rem;"> <span class="gray font-20">云下载空间</span>
              </div>
            </div>
          </div>
          <div v-else class="coupon-center flex-column flex-center" style="margin-left: .373333rem">
            <p style="color:#595959;font-size: .32rem;width: 4.266667rem;" class="text-over">卡号:{{data.card_id}}</p>
            <div class="margin-top-10"><span style="color:#fda11c;font-size: .32rem;">一年VIP会员特权服务</span></div>
            <div class="flex">
              <div class="flex margin-top-10">
                <div class="flex-column flex-center" style="height: .346667rem;margin-right: .106667rem;">
                  <img class="icon-coupon-lixian" src="@/assets/icon_coupon_lixian@2x.png">
                </div>
                <div class="flex-column flex-center" style="height: .346667rem;"> <span class="gray font-20">可兑换</span>
                </div>
              </div>
              <div class="flex margin-top-10">
                <div class="flex-column flex-center" style="height: .346667rem;margin-right: .106667rem;">
                  <img class="icon-coupon-lixian" src="@/assets/icon_coupon_lixian@2x.png">
                </div>
                <div class="flex-column flex-center" style="height: .346667rem;"> <span class="gray font-20">可赠送</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="data.type!=='1'" class="coupon-center flex-column flex-center" style="margin-left: .846667rem;"
            @click="dhKq(data.card_id,data.spaceCard_type)">
            <span class="font-32 white">立即</span>
            <span class="font-32 white">兑换</span>
          </div>
          <div v-else class="coupon-center flex-column flex-center" style="margin-left: .846667rem;" @click="syYear(data.card_id)">
            <span class="font-32 white">立即</span>
            <span class="font-32 white">使用</span>
          </div>
        </div>
      </div>
    </div>
    <Popup v-model="showSy" :hide-on-blur="true">
      <div id="JS_pop_year" class="list_vip" style="padding-bottom: .533333rem;">
        <a href="javascript:;" class="close JS_year_close" @click="showSy=false;"></a>
        <div class="bar">
          <span class="f16">VIP卡券兑换</span>
          <router-link to="privileges" class="fr blue">查看VIP特权</router-link>
        </div>
        <dl @click="hoverIndex=0" :class="{hover:hoverIndex==0}"><span class="ico_gift"></span>
          <dt>
            <div class="fl f16">12个月<img class="mt4" height="20" src="http://api.bianyue.cn/iphone/css/h5/VIP_year@2.png"
                alt=""></div>
            <div class="fr fct margin-right-20 margin-top-5">
              <p class="blue fd font-40">￥180</p>
              <p class="mline gray mt4">￥240</p>
            </div>
          </dt>
          <dd class="dd2 f16 fd">立即兑换</dd>
        </dl>
        <dl @click="hoverIndex=1" :class="{hover:hoverIndex==1}"><span class="ico_exchange"></span>
          <dt>
            <div class="fl f16">12个月<img class="mt4" height="20" src="http://api.bianyue.cn/iphone/css/h5/VIP_year@2.png"
                alt=""></div>
            <div class="fr fct margin-right-20 margin-top-5">
              <p class="blue fd font-40">￥180</p>
              <p class="mline gray mt4">￥240</p>
            </div>
          </dt>
          <dd class="dd2 f16 fd">赠送ID用户></dd>
        </dl>
        <div class="flex flex-center margin-top-20  margin-bottom-20">
          <a class="btn-blue btn-big" @click.prevent="submit">确定</a>
        </div>
      </div>
    </Popup>
    <div id="JS_coupon_popup" class="flex flex-center w-pop" >
      <div class="width-590">
        <div>
          <div class="flex flex-center padding-top-60">
            <img class="bg-coupon-confirm" style="width: 4.806667rem;height: 1.506667rem;" src="@/assets/bg_coupon_confirm@2x.png">
          </div>
          <div class="flex flex-center">
            <span class="margin-top-30 black-4 font-30">确认将{{spaceCard_type}}空间扩容至云下载空间？</span>
          </div>
          <div class="flex flex-row-around margin-top-30 border-top">
            <span class="btn-white btn-mediume btn-cancel" @click="closePop">取消</span>
            <span class="btn-blue btn-mediume btn-confirm" @click="confirmDh">确认</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Header from "@/components/Header";
import { Popup } from "vux";
import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";
export default {
  name: "Coupon",
  data() {
    return {
      mescroll: null, //mescroll实例对象
      dataList: [], //列表数据
      showSy: false,
      hoverIndex: 0,
      cardId: "",
      spaceCard_type: "1TB",
      loading: true
    };
  },
  components: {
    Header,
    Popup
  },
  methods: {
    upCallback(page) {
      this.loading = true;
      this.GET({
        api: "/user.php?op=info",
        data: {
          action: "spaceCard_lists",
          page: page.num
        },
        success: data => {
          if (data.status == "card none") {
            data.data = [];
          }
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
    },
    //使用年卡
    syYear(cardId) {
      this.cardId = cardId;
      this.showSy = true;
    },
    // 兑换卡券
    dhKq(cardId, spaceCard_type) {
      this.cardId = cardId;
      this.spaceCard_type = spaceCard_type;
      this.openPop({
        dom: $("#JS_coupon_popup")
      });
    },
    // 确定兑换
    confirmDh() {
      this.GET({
        api: "/user.php?op=info",
        data: {
          action: "use_spaceCard",
          cid: this.cardId
        },
        success: data => {
          this.$vux.toast.show("兑换成功");
          this.showSy = false;
          this.closePop();
          this.dataList.forEach((element, index) => {
            if (element.card_id == this.cardId) {
              this.dataList.splice(index, 1);
            }
          });
        }
      });
    },
    submit() {
      if (this.hoverIndex == 0) {
        this.confirm({
          title: "确认兑换？",
          rightCallback: () => {
            this.confirmDh();
          }
        });
      } else {
        this.jump(`/present?cardId=${this.cardId}`);
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
    $("#JS_coupon").height(
      $(window).height() - $("#JS_coupon_header").height() - 5
    );
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
          offset: 500
        }
      }
    });
  },
  created() {}
};
</script>
<style scoped>
.coupon-header {
  width: 100%;
  height: 4.213333rem;
  background: url(../assets/bg_coupon@2x.png);
  background-size: 100% 100%;
  margin-bottom: 0.4rem;
}

.coupon-warpper {
  width: 95%;
  height: 2.666667rem;
  margin: 0.2rem auto;
}

.coupon-center {
  height: 2.48rem;
}

.coupon-warpper.one {
  background: url(../assets/bg_coupon1@2x.png);
  background-size: 100% 100%;
}

.coupon-warpper.two {
  background: url(../assets/bg_coupon2@2x.png);
  background-size: 100% 100%;
}

.coupon-warpper.three {
  background: url(../assets/bg_coupon3@2x.png);
  background-size: 100% 100%;
}

.coupon-warpper.four {
  background: url(../assets/bg_coupon4@2x.png);
  background-size: 100% 100%;
}

.list_vip .bar {
  padding-top: 1rem;
}

.list_vip .close {
  width: 0.4rem;
  height: 0.4rem;
}

.list_vip .mline {
  text-decoration: line-through;
}

.btn-mediume {
  width: 50%;
  border-radius: 0;
  height: 0.98rem;
  line-height: 0.98rem;
}
</style>
