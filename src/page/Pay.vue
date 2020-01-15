<template>
  <div id="page-pay">
    <Header title="VIP充值"></Header>
    <div v-if="vipIndex==1">
      <div class="flex white margin-bottom-40 bg_pay_year">
        <div class="flex-column flex-center">
           <p class="pprices"><span class="font-48 bold">￥180</span><span class="font-68"> / 18个月</span></p>
        </div>
        <div class="flex-column flex-center font-28 line40"><p>充一年<strong>送半年</strong><br><strong>送6TB</strong>永久云下载空间<br>开放所有特权</p></div>        
      </div>
    </div>
    <div v-if="vipIndex==2">
      <div class="flex white margin-bottom-40 bg_pay_month">
        <div class="flex-column flex-center">
           <p class="pprices"><span class="font-48 bold">￥100</span><span class="font-68"> / 9个月</span></p>
        </div>
        <div class="flex-column flex-center font-28 line40"><p>充半年<strong>送3个月</strong><br><strong>送3TB</strong>永久云下载空间</p></div>
      </div>
    </div>
    <div v-if="vipIndex==3">
      <div class="flex white bg_pay_month">
        <div class="flex-column flex-center">
           <p class="pprices"><span class="font-48 bold">￥20</span><span class="font-26"> / 1个月</span></p>
        </div>
        <div class="flex-column flex-center font-28 line40"><p>选<strong>半年或年V</strong>更实惠哦<br>仅<strong>10硬币</strong>，超大空间<br>更多下载配额及特权！</p></div>
      </div>
      <div class="flex flex-between margin-top-60 fct fd gray pay_other">
        <div @click="jump('/pay?month=1');"><p><span>年V</span></p><img src="@/assets/icon_vip_year@2x.png" alt=""><span class="font-32">￥10/月</span></div>
        <div @click="jump('/pay?month=2');"><p><span>半年V</span></p><img src="@/assets/icon_vip_month@2x.png" alt=""><span class="font-32">￥11.1/月</span></div>
        <div @click="jump('/pay?month=4');"><p><span>3个月</span></p><img src="@/assets/icon_vip_month@2x.png" alt=""><span class="font-32">￥12.5/月</span></div>
      </div>        
    </div>
    <div v-if="vipIndex==4">
      <div class="flex white margin-bottom-40 bg_pay_month">
        <div class="flex-column flex-center">
           <p class="pprices"><span class="font-48 bold">￥50</span><span class="font-26"> / 4个月</span></p>
        </div>
        <div class="flex-column flex-center font-28 line40"><p>充3个月<strong>送1个月</strong><br><strong>送1TB</strong>永久云下载空间</p></div>
      </div>
    </div>
    <div class="clear0"></div>
     <div class="margin-top-30 bg-white pay-warpper">
      <div style="height: 1.093333rem;padding-left: .4rem;">
        <span class="font-28 gray" style="line-height: 1.093333rem;">选择支付方式</span>
      </div> 
      <div v-for="(data,index) in payList" :key="index" class="flex flex-between border-top border-bf" style="padding:0 .4rem;"  @click="select(data.name)">
        <div class="flex">
          <div class="flex-column flex-center height-122">
            <img class="icon-pay-alipay" v-if="data.name=='alipay'" src="@/assets/icon_pay_alipay@2x.png">
            <img class="icon-pay-alipay" v-else src="@/assets/icon_pay_wx@2x.png">
          </div>
          <div class="flex-column flex-center  height-122" style="margin-left:.373333rem;">
            <span class="font-34 black-4" v-if="data.name=='alipay'">支付宝支付</span>
            <span class="font-34 black-4" v-else >微信支付</span> 
          </div>
        </div>
        <div class="flex-column flex-center select-warpper">
          <img v-if="payType==data.name" class="icon-pay-checked" src="@/assets/icon_pay_checked@2x.png">
          <img v-else class="icon-pay-checked" src="@/assets/icon_pay_no_checked@2x.png">
        </div>
      </div>  
      <PayFooter @handle="pay" ></PayFooter>
    </div>
  </div>
</template>

<script>
import PayFooter from "@/components/PayFooter";
import Header from "@/components/Header";
import api from "@/api/index";
export default {
  name: "Pay",
  data() {
    return {
      vipIndex: 2,
      payType: "alipay",
      payList: [{ name: "alipay", default: true }],
      token: ""
    };
  },
  components: {
    PayFooter,
    Header
  },
  methods: {
    back() {
      this.$router.back();
    },
    select(type) {
      this.token = "";
      this.payType = type;
    },
    pay() {
      let shopKey = "oneYears";
      if (this.vipIndex == 2) {
        shopKey = "sixMonths";
      } else if (this.vipIndex == 3) {
        shopKey = "oneMonths";
      } else if (this.vipIndex == 4) {
        shopKey = "threeMonths";
      }
      if (this.payType == "weixinApp") {
        let _this = this;
        _this.wLoading();
        Wechat.isInstalled(
          installed => {
            if (!installed) {
              _this.wLoading({
                type: "hide"
              });
              _this.toast("微信未安装");
            } else {
              api.wxPay({ shopKey: shopKey }).then(data => {
                let params = data.data.order;
                params.packageValue = params.package;
                Wechat.sendPaymentRequest(
                  params,
                  () => {
                    _this.getUser({});
                    this.jump(`/paySuccess`);
                  },
                  reason => {
                    _this.toast("支付失败,请重试");
                  }
                );
              });
            }
          },
          reason => {
            _this.toast("支付失败,请重试");
            _this.wLoading({
              type: "hide"
            });
          }
        );
      } else if (this.payType == "weixinWap") {
        let _this = this;
        api.wxWapPay({ shopKey: shopKey }).then(data => {
          _this.token = data.data.token;
          window.open(
            `http://yun.bianyue.cn/wxpay?url=${encodeURIComponent(
              data.data.location_url
            )}&token=${encodeURIComponent(data.data.token)}`,
            "_system"
          );
        });
      } else if (this.payType == "alipay") {
        let _this = this;
        _this.wLoading();
        api.alipay({ shopKey: shopKey }).then(data => {
          cordova.plugins.MyAlipay.coolMethod(
            data.data.orderString,
            msg => {
              if (msg.resultStatus == 9000) {
                _this.getUser({});
                this.jump(`/paySuccess`);
              } else {
                _this.toast(msg.memo);
              }
            },
            msg => {
              _this.toast("支付失败,请重试");
            }
          );
        });
      }
    }
  },
  mounted() {
    let _this = this;
    document.addEventListener(
      "resume",
      () => {
        if (_this.token) {
          api
            .wxWapPayIsSuccess(
              {
                token: _this.token
              },
              {
                alertErr: "no"
              }
            )
            .then(data => {
              _this.token = "";
              _this.getUser({});
              _this.jump(`/paySuccess`);
            });
        }
      },
      false
    );
  },
  created() {
    let payList = this.getStorage("payList");
    if (payList) {
      this.payList = JSON.parse(payList);
      if (!this.payList.alipay) {
        this.payList.forEach(el => {
          if (el.default) {
            this.payType = el.name;
          }
        });
      }
    }
    this.vipIndex = this.$router.currentRoute.query.month || 2;
    api.payList().then(data => {
      this.payList = data.data || [];
      this.payList.forEach(el => {
        if (el.default) {
          this.payType = el.name;
        }
      });
      this.setStorage("payList", JSON.stringify(this.payList));
    }); 
  }
};
</script>

<style scoped>
.bg_pay_year,
.bg_pay_month {
  margin-top: 0.28rem;
  margin-left: 0.28rem;
  margin-right: 0.28rem;
  height: 4.08rem;
  border-radius: 0.4rem;
  background: url(../assets/bg_vip_year@2x.png) no-repeat;
  background-size: cover;
  box-shadow: 0 0 6px rgba(255, 140, 100, 0.3);
}
.bg_pay_month {
  background: url(../assets/bg_vip_month@2x.png) no-repeat;
  background-size: cover;
  box-shadow: 0 0 6px rgba(158, 97, 255, 0.3);
}
.pprices {
  margin: 0 0.88rem 0 0.48rem;
}
.pay_other {
  margin: 0.7rem 0.28rem 0;
}
.pay_other > div {
  position: relative;
  width: 30%;
  padding: 0.5rem 0;
  border: 2px solid #f4f4f4;
  border-radius: 5px;
}
.pay_other > div p {
  position: absolute;
  top: -0.22rem;
  width: 100%;
}
.pay_other > div p > span {
  display: inline-block;
  padding: 0 0.2rem;
  background: #fff;
}
.pay_other > div img {
  width: 0.48rem;
  vertical-align: middle;
}
</style>