<template>
  <div class="bg-gray">
    <div class="w-pay-header bg-fa flex pay-header-blue border-box">
      <div class="flex-column flex-center pay-point-back" @click="back">
        <img class="icon-header-left" src="@/assets/btm_center_backhome2@2x.png">
      </div>
      <div class="flex header-title">
        <div class="flex-column flex-center"><span class="font-32 black white">我的积分：</span></div>
        <div class="flex-column flex-center"><span class="font-32 black white">{{userInfo.point}}</span></div>
        <div class="flex-column flex-center"><span class="font-32 black white">积分</span></div>
      </div>
    </div>
    <div class="bg-white pay-num-warpper"><span class="black-4 font-28">充值个数：</span></div>
    <div class="flex flex-around bg-white" style="height: 2.133333rem;padding:0 .213333rem;">
      <div class="flex-column flex-center" @click="selectSpace(180)">
        <div :class="['border-all','border-point',price==180?'border-space-orange':'border-bf','pos-rel','point-warpper']">
          <div style="height: .92rem;" :class="[price==180?'bg-sapce-orange2':'','flex-column','flex-center']"><span
              :class="['font-32',price==180?'orange':'blue','text-center']">1800积分</span></div>
          <div :class="['flex-column','flex-center',price==180?'bg-space-orange':'bg-blue','price-warpper']">
            <span class="text-center white font-24">180元</span>
          </div>
          <img v-if="price==180" class="icon-sapce-checked" style="position: absolute;right: 0;top: 0;" src="@/assets/icon_space_checked@2x.png">
        </div>
      </div>
      <div class="flex-column flex-center" @click="selectSpace(100)">
        <div :class="['border-all','border-point',price==100?'border-space-orange':'border-bf','pos-rel','point-warpper']">
          <div style="height:.92rem;" :class="[price==100?'bg-sapce-orange2':'','flex-column','flex-center']"><span
              :class="['font-32',price==100?'orange':'blue','text-center']">1000积分</span></div>
          <div :class="['flex-column','flex-center',price==100?'bg-space-orange':'bg-blue','price-warpper']">
            <span class="text-center white font-24">100元</span>
          </div>
          <img v-if="price==100" class="icon-sapce-checked" style="position: absolute;right: 0;top: 0;" src="@/assets/icon_space_checked@2x.png">
        </div>
      </div>
      <div class="flex-column flex-center" @click="selectSpace(20)">
        <div :class="['border-all','border-point',price==20?'border-space-orange':'border-bf','pos-rel','point-warpper']">
          <div style="height:.92rem;" :class="[price==20?'bg-sapce-orange2':'','flex-column','flex-center']"><span
              :class="['font-32',price==20?'orange':'blue','text-center']">200积分</span></div>
          <div :class="['flex-column','flex-center',price==20?'bg-space-orange':'bg-blue','price-warpper']">
            <span class="text-center white font-24">20元</span>
          </div>
          <img v-if="price==20" class="icon-sapce-checked" style="position: absolute;right: 0;top: 0;" src="@/assets/icon_space_checked@2x.png">
        </div>
      </div>
    </div>
    <div class="margin-top-20 bg-white flex flex-between padding-left-30 padding-right-30 height-122">
      <div class="flex-column flex-center">
        <span class="black-4 font-34">应付金额</span>
      </div>
      <div class="flex-column flex-center margin-right-20">
        <span class="font-34 orange">￥{{price}}</span>
      </div>
    </div>
    <div class="margin-top-20 bg-white pay-warpper">
      <div style="height: 1.093333rem;padding-left: .4rem;">
        <span class="font-28 gray" style="line-height: 1.093333rem;">选择支付方式</span>
      </div> 
      <div class="flex flex-between border-top border-bf" style="padding: 0 .4rem;"  @click="select('alipay')">
        <div class="flex">
          <div class="flex-column flex-center height-122">
            <img class="icon-pay-alipay" src="@/assets/icon_pay_alipay@2x.png">
          </div>
          <div class="flex-column flex-center height-122" style="margin-left: .373333rem;">
            <span class="font-34 black-4">支付宝支付</span>
          </div>
        </div>
        <div class="flex-column flex-center select-warpper">
          <img v-if="payType=='alipay'" class="icon-pay-checked" src="@/assets/icon_pay_checked@2x.png">
          <img v-else class="icon-pay-checked" src="@/assets/icon_pay_no_checked@2x.png">
        </div>
      </div>
       <div class="flex flex-between border-top border-bf" style="padding: 0 .4rem;"  @click="select('wx')">
        <div class="flex">
          <div class="flex-column flex-center height-122">
            <img class="icon-pay-wx" src="@/assets/icon_pay_wx@2x.png">
          </div>
          <div class="flex-column flex-center height-122" style="margin-left: .373333rem;">
            <span class="font-34 black-4">微信支付</span>
          </div>
        </div>
        <div class="flex-column flex-center select-warpper">
          <img v-if="payType=='wx'" class="icon-pay-checked" src="@/assets/icon_pay_checked@2x.png">
          <img v-else class="icon-pay-checked" src="@/assets/icon_pay_no_checked@2x.png">
        </div>
      </div>
    </div>
    <PayFooter @handle="pay"></PayFooter>
  </div>
</template>
<script>
  import PayFooter from "@/components/PayFooter";
  export default {
    name: "payPoint",
    data() {
      return {
        payType: "alipay",
        price: 100
      };
    },
    components: {
      PayFooter
    },
    methods: {
      back() {
        this.$router.back();
      },
      select(type) {
        this.payType = type;
      },
      selectSpace(price) {
        this.price = price;
      },
      pay() {
        if (this.payType == "wx") {
          this.wxPay({
            pid: 5,
            price: this.price,
            success: () => {
              this.jump(`/payPointSuccess?point=${this.price}`);
            }
          });
        } else if (this.payType == "alipay") {
          this.alipay({
            pid: 4,
            price: this.price,
            success: () => {
              this.jump(`/payPointSuccess?price=${this.price}`);
            }
          });
        }
      }
    },
    mounted() { 
      $(".app-warpper").height($(window).height());
    },
    created() {
      
    }
  };

</script>
<style scoped>
  .w-pay-header {
    padding-left: 0.213333rem;
  }

  .pay-header-blue {
    background-color: #0688ff;
    width: 100%;
    height: 1.733333rem;
  }

  .border-space-orange {
    border-color: #fe8254;
  }

  .bg-space-orange {
    background-color: #fe8254;
  }

  .bg-sapce-orange2 {
    background-color: #fff5e7;
  }

  .border-point {
    border-width: 0.026667rem;
  }

  .pay-num-warpper {
    margin-top: 0.133333rem;
    padding-left: 0.4rem;
    padding-top: 0.266667rem;
  }

  .point-warpper {
    width: 2.586667rem;
    height: 1.573333rem;
    border-radius: 4px;
  }

  .point-warpper .price-warpper {
    position: absolute;
    bottom: 0;
    width: 2.586667rem;
    height: 0.64rem;
  }

  .pos-rel {
    position: relative;
  }

  .height-122 {
    height: 1.626667rem;
  }

  .pay-point-back {
    padding: 0 0.266667rem;
    margin-left: -0.266667rem;
  }

</style>
