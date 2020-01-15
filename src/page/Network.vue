<template>
  <div>
    <div class="head_gray">
        <div class="head_title">无网络</div>
    </div>
     <div class="flex flex-center"> 
        <img class="net-work-img" src="@/assets/network@2x.png" alt=""> 
     </div>
     <p class="gray text-center margin-top-40">OPPS！网络已断开~</p>
     <div class="flex flex-center">
         <a class="btn-white net-work-btn" @click.prevent="submit">重试一下</a>
     </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  name: "Network",
  data() {
    return {};
  },
  components: {
    Header
  },
  methods: {
    submit() {
      this.wLoading();
      setTimeout(() => {
        this.wLoading({
          type: "hide"
        });
        if (this.isOnline()) {
          this.$router.back();
        } else {
          this.toast("请打开网络~");
        }
      }, 500);
    }
  },
  mounted() {
    let _this=this;
    document.addEventListener(
      "resume",
      () => {
        if (_this.isOnline()) {
          _this.$router.back();
        } else {
          _this.toast("请打开网络~");
        }
      },
      false
    );
  },
  created() {}
};
</script>
<style scoped>
.net-work-img {
  width: 7.186667rem;
  height: 5.386667rem;
  margin-top: 1.333333rem;
}
.net-work-btn {
  width: 3.2rem;
  color: #999;
  text-align: center;
  margin-top: 0.533333rem;
  border-radius: 5px;
}
</style>
