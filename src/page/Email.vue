<template>
  <div class="bg-grayc">
    <Header :title="msg"></Header>
    <div class="clear"></div>
    <div v-if="!unbindForm.email">
      <div class="bg-white w-form">
        <div class="border-bottom flex-coulum flex-center border-bf bg-white input-warrper">
          <input type="text" v-model="form.email" placeholder="请输入邮箱">
        </div>
      </div>
      <div class="flex flex-center margin-top-40">
        <a class="btn-blue btn-big" @click="submit">绑定</a>
      </div>
    </div>
    <div v-else>
      <div class="bg-white w-form">
        <div class="border-bottom flex-coulum flex-center border-bf bg-white input-warrper">
          <input type="text" v-model="unbindForm.email" readonly placeholder="请输入邮箱">
        </div>
      </div>
      <div class="flex flex-center margin-top-40">
        <a class="btn-blue btn-big" @click="unbindSubmit">解绑</a>
      </div>
    </div>
    <Toast v-model="showBind"  width="13em" text="验证邮件已发送，请到邮箱查看。（如果收件箱没有，请查看垃圾箱）"></Toast>
    <Toast v-model="showUnbind" width="13em" text="解绑邮件已发送，请到邮箱进行查看。（如果收件箱没有，请查看垃圾箱）"></Toast>
  </div>
</template>
<script>
  import { Toast } from 'vux'
  import Header from "@/components/Header";
  export default {
    name: "Email",
    data() {
      return {
        form: {
          action: "sendemailcheck",
          email: ""
        },
        unbindForm: {
          action: "sendemailunbind",
          email: ""
        },
        msg:"邮箱绑定",
        showBind:false,
        showUnbind:false
      };
    },
    components: {
      Header,
      Toast
    },
    methods: {
      submit() {
        if (!this.form.email) {
          this.toast("请输入邮箱~");
        }else if(this.form.email.length < 4 || !/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(this.form.email)){
          this.toast("邮箱格式错误~");
        } else {
          this.wLoading();
          this.GET({
            api: "/user.php?op=info",
            data: this.form,
            success: data => {
              this.showBind=true;
            }
          });
        }
      },
      unbindSubmit() {
        this.wLoading();
        this.GET({
          api: "/user.php?op=info",
          data: this.unbindForm,
          success: data => {
            this.showUnbind=true;
          }
        });
      }
    }, 
    created() {
      if (this.$router.currentRoute.query.email) {
        this.unbindForm.email = this.$router.currentRoute.query.email;
        this.msg='解绑邮箱';
      }
    }
  };

</script>
<style scoped>
</style>
