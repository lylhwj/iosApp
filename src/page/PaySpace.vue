<template>
  <div>
    <div class="bg-gray">
      <BHeader title="加购空间卡"></BHeader>
      <div class="flex flex-around bg-white" style="height: 3.333333rem;padding:0 .213333rem;">
        <div class="flex-column flex-center" @click="selectSpace(50)">
          <div :class="['border-all',price==50?'border-space-orange':'border-bf','pos-rel','space-warpper']">
            <div class="text-warpper"><span :class="['font-34',price==50?'orange':'blue','text-center']">1TB空间卡</span></div>
            <div :class="['flex-column','flex-center',price==50?'bg-space-orange':'bg-blue','price-warpper']">
              <span class="text-center white font-24">50元</span>
            </div>
            <img v-if="price==50" class="icon-sapce-checked" style="position: absolute;right: 0;top: 0;" src="@/assets/icon_space_checked@2x.png">
          </div>
        </div>
        <div class="flex-column flex-center" @click="selectSpace(80)">
          <div :class="['border-all',price==80?'border-space-orange':'border-bf','pos-rel','space-warpper']">
            <div class="text-warpper"><span :class="['font-34',price==80?'orange':'blue','text-center']">2TB空间卡</span></div>
            <div :class="['flex-column','flex-center',price==80?'bg-space-orange':'bg-blue','price-warpper']">
              <span class="text-center white font-24">80元</span>
            </div>
            <img v-if="price==80" class="icon-sapce-checked" style="position: absolute;right: 0;top: 0;" src="@/assets/icon_space_checked@2x.png">
          </div>
        </div>
        <div class="flex-column flex-center" @click="selectSpace(100)">
          <div :class="['border-all',price==100?'border-space-orange':'border-bf','pos-rel','space-warpper']">
            <div class="text-warpper"><span :class="['font-34',price==100?'orange':'blue','text-center']">3TB空间卡</span></div>
            <div :class="['flex-column','flex-center',price==100?'bg-space-orange':'bg-blue','price-warpper']">
              <span class="text-center white font-24">100元</span>
            </div>
            <img v-if="price==100" class="icon-sapce-checked" style="position: absolute;right: 0;top: 0;" src="@/assets/icon_space_checked@2x.png">
          </div>
        </div>
      </div>
      <div class="margin-top-10 bg-white flex flex-between padding-left-30 padding-right-30 height-122">
        <div class="flex-column flex-center">
          <span class="black-4 font-34">应付金额</span>
        </div>
        <div class="flex-column flex-center margin-right-20">
          <span class="font-34 orange">￥{{price}}</span>
        </div>
      </div>
      <div class="margin-top-10 bg-white pay-warpper">
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
  </div>
</template>
<script>
import PayFooter from "@/components/PayFooter";
import BHeader from "@/components/BHeader";
export default {
  name: "payCoupon",
  data() {
    return {
      payType: "alipay",
      price: 80
    };
  },
  components: {
    BHeader,
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
          pid: 9,
          price: this.price,
          success: () => {
            this.jump(`/paySpaceSuccess?point=${this.price}`);
          }
        });
      } else if (this.payType == "alipay") {
        this.alipay({
          pid: 8,
          price: this.price,
          success: () => {
            this.jump(`/paySpaceSuccess?price=${this.price}`);
          }
        });
      }
    }
  },
  mounted() {
    $(".app-warpper").height($(window).height());
  },
  created() {}
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

.space-warpper {
  border-radius: 4px;
  height: 2rem;
  width: 3rem;
}

.space-warpper .price-warpper {
  position: absolute;
  bottom: 0;
  width: 2.986667rem;
  height: 0.533333rem;
}

.space-warpper .text-warpper {
  margin-top: 0.453333rem;
  margin-bottom: 0.066667rem;
  text-align: center;
}
</style>
