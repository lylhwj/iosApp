<template>
  <div class="bg-grayc">
    <Header title="设置安全码"></Header>
    <div class="clear"></div> 
    <div  class="bg-white w-form">
      <div class="border-bottom flex-coulum flex-center border-bf bg-white input-warrper" >
        <input type="password" v-model="form.old_pwd" class="font-36" placeholder="请输入原安全码">
      </div>
      <div class="border-bottom flex-coulum flex-center border-bf bg-white input-warrper" >
        <input type="password" v-model="form.new_pwd"  class="font-36" placeholder="请输入新安全码">
      </div> 
    </div>
    <div class=" padding-24 gray">提示：设置安全码可用于密码找回(首次设置旧安全码留空)</div>
    <div class="flex flex-center margin-top-20">
      <a class="btn-blue btn-big" @click="submit">设置</a>
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
        action: "updateanquanma",
        old_pwd: "",
        new_pwd: ""
      }
    };
  },
  components: {
    Header
  },
  methods: {
    submit() {
      if (!this.form.new_pwd) {
        this.toast("请输入新安全码~");
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
