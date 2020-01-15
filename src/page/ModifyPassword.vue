<template>
  <div>
    <Header title="修改登录密码"></Header>
    <div class="clear"></div>
    <div class="bg-white w-form">
      <div class="border-bottom flex-coulum flex-center border-bf bg-white input-warpper input-warrper" >
        <input type="password" v-model="form.old_pwd" class="font-36" placeholder="请输入旧密码">
      </div>
      <div class="border-bottom flex-coulum flex-center border-bf bg-white input-warpper input-warrper" >
        <input type="password" v-model="form.new_pwd"  class="font-36" placeholder="请输入新密码">
      </div>
      <div class="border-bottom flex-coulum flex-center border-bf bg-white input-warpper input-warrper" >
        <input type="password" v-model="form.confirm_pwd" class="font-36" placeholder="请输入确认密码">
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
export default {
  name: "ModifyPassword",
  data() {
    return {
      form: {
        action: "editpass",
        old_pwd: "",
        new_pwd: "",
        confirm_pwd: ""
      }
    };
  },
  components: {
    Header
  },
  methods: {
    submit() {
      if (!this.form.old_pwd) {
        this.toast("请输入旧密码~");
      } else if (!this.form.new_pwd) {
        this.toast("请输入新密码~");
      } else if (!this.form.confirm_pwd) {
        this.toast("请输入确认密码~");
      } else if (this.form.new_pwd !== this.form.confirm_pwd) {
        this.toast("两次密码不一致~");
      } else {
        this.GET({
          api: "/user.php?op=info",
          data: this.form,
          success: data => {
            this.$vux.toast.show("修改成功");
            setTimeout(() => {
              this.jump('/security');
            }, 2000);
          }
        });
      }
    }
  }
};
</script>
<style scoped> 
</style>
