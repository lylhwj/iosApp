<template>
  <div>
    <div>
      <BHeader title="积分兑换"></BHeader>
      <div class="flex flex-between align-center border-bottom" style="padding:0 .4rem;height: 1.066667rem;">
        <div class="flex-column flex-center">
          <div class="flex align-center">
            <span class="font-28   padding-10">您当前的积分是：{{userInfo.point}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-around bg-white" style="height: 3rem;padding:0 .213333rem;">
       <div class="flex-column flex-center" @click="select(1)">
        <div :class="['border-all',type==1?'border-space-orange':'border-bf','pos-rel','exchange-warpper']">
          <div class="text-warpper"><span :class="['font-34',type==1?'orange':'blue','text-center']">12个月</span></div>
          <div :class="['flex-column','flex-center',type==1?'bg-space-orange':'bg-blue','price-warpper']">
            <span class="text-center white font-24">VIP/年</span>
          </div>
          <img v-if="type==1" class="icon-sapce-checked" style="position: absolute;right: 0;top: 0;" src="@/assets/icon_space_checked@2x.png">
        </div>
      </div>
      <div class="flex-column flex-center" @click="select(2)">
        <div :class="['border-all',type==2?'border-space-orange':'border-bf','pos-rel','exchange-warpper']">
          <div class="text-warpper"><span :class="['font-34',type==2?'orange':'blue','text-center']">6个月</span></div>
          <div :class="['flex-column','flex-center',type==2?'bg-space-orange':'bg-blue','price-warpper']">
            <span class="text-center white font-24">VIP/半年</span>
          </div>
          <img v-if="type==2" class="icon-sapce-checked" style="position: absolute;right: 0;top: 0;" src="@/assets/icon_space_checked@2x.png">
        </div>
      </div> 
      <div class="flex-column flex-center" @click="select(3)">
        <div :class="['border-all',type==3?'border-space-orange':'border-bf','pos-rel','exchange-warpper']">
          <div class="text-warpper"><span :class="['font-34',type==3?'orange':'blue','text-center']">1个月</span></div>
          <div :class="['flex-column','flex-center',type==3?'bg-space-orange':'bg-blue','price-warpper']">
            <span class="text-center white font-24">VIP/月</span>
          </div>
          <img v-if="type==3" class="icon-sapce-checked" style="position: absolute;right: 0;top: 0;" src="@/assets/icon_space_checked@2x.png">
        </div>
      </div>
    </div>
    <div class="flex flex-around bg-white" style="padding:0 .213333rem .466667rem .213333rem;">
      <div class="flex-column flex-center" @click="select(4)">
        <div :class="['border-all',type==4?'border-space-orange':'border-bf','pos-rel','exchange-warpper']">
          <div class="text-warpper"><span :class="['font-34',type==4?'orange':'blue','text-center']">200MB</span></div>
          <div :class="['flex-column','flex-center',type==4?'bg-space-orange':'bg-blue','price-warpper']">
            <span class="text-center white font-24">云下载扩容</span>
          </div>
          <img v-if="type==4" class="icon-sapce-checked" style="position: absolute;right: 0;top: 0;" src="@/assets/icon_space_checked@2x.png">
        </div>
      </div>
      <div class="flex-column flex-center" @click="select(5)">
        <div :class="['border-all',type==5?'border-space-orange':'border-bf','pos-rel','exchange-warpper']">
          <div class="text-warpper"><span :class="['font-34',type==5?'orange':'blue','text-center']">100MB</span></div>
          <div :class="['flex-column','flex-center',type==5?'bg-space-orange':'bg-blue','price-warpper']">
            <span class="text-center white font-24">文件扩容</span>
          </div>
          <img v-if="type==5" class="icon-sapce-checked" style="position: absolute;right: 0;top: 0;" src="@/assets/icon_space_checked@2x.png">
        </div>
      </div>
      <div class="flex-column flex-center" @click="select(6)">
        <div :class="['border-all',type==6?'border-space-orange':'border-bf','pos-rel','exchange-warpper']">
          <div class="text-warpper"><span :class="['font-34',type==6?'orange':'blue','text-center']">100MB</span></div>
          <div :class="['flex-column','flex-center',type==6?'bg-space-orange':'bg-blue','price-warpper']">
            <span class="text-center white font-24">相册扩容</span>
          </div>
          <img v-if="type==6" class="icon-sapce-checked" style="position: absolute;right: 0;top: 0;" src="@/assets/icon_space_checked@2x.png">
        </div>
      </div>

    </div>

    <div class="number-warpper">
      <group>
        <x-number title="数量×" v-model="value" :min="1" :max="1" v-if="type<4"></x-number>
        <x-number title="数量×" v-model="value" :min="1" v-else :fillable="true"></x-number>
        <div class="black-4 font-34 total text-right" v-if="type==1">{{value*12}}个月</div>
        <div class="black-4 font-34 total text-right" v-if="type==2">{{value*6}}个月</div>
        <div class="black-4 font-34 total text-right" v-if="type==3">{{value*1}}个月</div>
        <div class="black-4 font-34 total text-right" v-if="type==4">{{value*200}}MB</div>
        <div class="black-4 font-34 total text-right" v-if="type==5||type==6">{{value*100}}MB</div>
      </group>

    </div>
    <div class="margin-top-20 bg-white flex flex-between padding-left-30 padding-right-30 height-122">
      <div class="flex-column flex-center">
        <span class="black-4 font-34">应抵扣积分</span>
      </div>
      <div class="flex-column flex-center margin-right-20">
        <span class="font-34 orange" v-if="type==1">-{{value*1800}}</span>
        <span class="font-34 orange" v-if="type==2">-{{value*1000}}</span>
        <span class="font-34 orange" v-if="type==3">-{{value*200}}</span>
        <span class="font-34 orange" v-if="type==4">-{{value}}</span>
        <span class="font-34 orange" v-if="type==5||type==6">-{{value*100}}</span>
      </div>
    </div>
    <PayFooter @handle="pay" text="立即兑换"></PayFooter>
  </div>
  </div>
</template>
<script>
import PayFooter from "@/components/PayFooter";
import BHeader from "@/components/BHeader";
import { Group, XNumber } from "vux";

export default {
  name: "Exchange",
  data() {
    return {
      type: 1,
      value: 1
    };
  },
  components: {
    BHeader,
    PayFooter,
    XNumber,
    Group
  },
  methods: {
    select(type) {
      this.type = type;
    },
    pay() {
      this.confirm({
        title: "是否确定兑换？",
        rightCallback: () => {
          if (parseInt(this.type) < 4) {
            let viptime = 12;
            if (this.type == 2) {
              viptime = 6;
            } else if (this.type == 3) {
              viptime = 1;
            }
            this.GET({
              api: "/user.php?op=info&action=vip",
              data: {
                viptime: viptime
              },
              success: response => {
                this.getUser({});
                this.$vux.toast.show("VIP兑换成功");
              }
            });
          } else if (this.type == 4) {
            this.GET({
              api: "/pan.php?op=other&action=kuorong",
              data: {
                num: this.value
              },
              success: response => {
                this.getUser({});
                this.$vux.toast.show("云下载扩容成功");
              }
            });
          } else if (this.type == 5) {
            this.GET({
              api: "/box.php?op=file&action=kuorong",
              data: {
                num: this.value * 100
              },
              success: response => {
                this.getUser({});
                this.$vux.toast.show("文件扩容成功");
              }
            });
          } else if (this.type == 6) {
            this.GET({
              api: "/box.php?op=photo&action=kuorong",
              data: {
                num: this.value * 100
              },
              success: response => {
                this.getUser({});
                this.$vux.toast.show("相册扩容成功");
              }
            });
          }
        }
      });
    }
  },
  mounted() {
    $(".app-warpper").height($(window).height());
    $(".vux-number-selector svg").css("fill", "#333");
    $(".number-warpper .weui-cells").css("margin-top", "0");
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
  height: 1.7333333rem;
}

.border-space-orange {
  border-color: #fe8254;
}

.bg-space-orange {
  background-color: #fe8254;
}

.exchange-warpper {
  border-radius: 4px;
  height: 2rem;
  width: 3rem;
}

.exchange-warpper .price-warpper {
  position: absolute;
  bottom: 0;
  width: 2.986667rem;
  height: 0.666667rem;
}

.number-warpper {
  background: #fff;
}

.exchange-warpper .text-warpper {
  margin-top: 0.453333rem;
  margin-bottom: 0.066667rem;
  text-align: center;
}

.number-warpper .weui-cell {
  padding: 0.266667rem 0.18rem 0.266667rem 0.4rem;
}

.number-warpper .total {
  padding: 0 0.266667rem 0.266667rem 0.266667rem;
}
</style>
