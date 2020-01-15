<template>
    <div class="newyear_box">  
      <a class="pay" @click.prevent="pay"></a>
      <p class="check fct gray">
        <img class="icon-pay-checked vmid" v-if="!checked" @click.prevent="check" src="@/assets/icon_pay_no_checked@2x.png">
        <img class="icon-pay-checked vmid" v-else @click.prevent="check" src="@/assets/icon_pay_checked@2x.png">
        <span @click.prevent="check">不再显示</span>
      </p>
    </div>
</template>
<script>
export default {
  name: "activity",
  data() {
    return {
      checked:false
    };
  },
  components: {},
  methods: {
    pay() {
      this.$emit("handle", true);
    },
    check(){
       this.checked=!this.checked;  
       
    }
  }
};
</script>
<style>
.newyear_box {
  display: none;
  position: absolute;
  top: 0;
  width: 100%;
  height: 11.4rem;
  background: transparent url(../assets/ad@2x.png);
  background-size: 100% 100%;
} 
.newyear_box a.pay {
  display: block;
  width: 4.267rem;
  height: 1rem;
  margin: 9.6rem auto 0;
  cursor: pointer;
}
.newyear_box p.check {
  margin: 0.9rem 0 0;
  color: #fff;
}
.activity-layer{background-color: transparent !important;box-shadow: none !important;}
.activity-layer .layui-layer-setwin .layui-layer-close2{right: -20px;top: -30px;}
</style>