<template>
  <div class="bg-grayc">
    <Header title="设置密码"></Header>
    <div class="clear"></div>
    <div class="bg-white w-form"> 
      <div class="border-bottom flex-coulum flex-center border-bf bg-white input-warpper input-warrper" >
        <input type="password" v-model="form.newPassword"  class="font-36" placeholder="请输入新密码">
      </div>
      <div class="border-bottom flex-coulum flex-center border-bf bg-white input-warpper input-warrper" >
        <input type="password" v-model="form.confirmPwd" class="font-36" placeholder="请输入确认密码">
      </div> 
    </div>
    <div class=" padding-24 gray">提示：请设置8位以上数字及字母组合的密码。</div>
    <div class="flex flex-center margin-top-20">
      <a class="btn-blue btn-big" @click="submit">确认修改</a>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import api from "@/api/index";
export default {
  name: "SettingPassword",
  data() {
    return {
      form: { 
        oldPassword:"123",
        newPassword: "",
        confirmPwd: ""
      }
    };
  },
  components: {
    Header
  },
  methods: {
    submit() {
      if (!this.form.newPassword) {
        this.toast("请输入新密码~");
      } else if (!this.form.confirmPwd) {
        this.toast("请输入确认密码~");
      } else if (this.form.newPassword !== this.form.confirmPwd) {
        this.toast("两次密码不一致~");
      } else {
        api.settingPass(this.form).then((response)=>{
          this.$vux.toast.show("设置成功"); 
          setTimeout(() => {
            this.$router.back();
          }, 1000);
        }) 
      }
    }
  }
};
</script>
<style scoped> 
</style>
