<template>
  <div class="bg-white">
    <remote-script src="https://ssl.captcha.qq.com/TCaptcha.js" @load="load"></remote-script>
    <Header title="注册"></Header>
    <div class="login_bar mobile-warpper">
      <p class="fd font-36">验证手机</p>
      <p class="margin-top-10">请验证手机以确认是你本人操作 <span>{{form.mobile}}</span></p>
      <div class="flex flex-between margin-top-20">
        <input class="inp_text flex-number1" type="tel" v-model="form.code" maxlength="6" placeholder="输入验证码" value="">
        <a href="javascript:;" class="margin-left-15" :class="['btn-blue',isGetCode?'':'btn_gray2','btn_yzm']"
          @click="getCode">{{msg}}</a>
      </div>
      <input class="inp_text margin-top-10" v-model="form.password" type="password" maxlength="40"
        placeholder="请输入密码（8位以上数字+字母）">
      <input class="inp_text margin-top-10" v-model="form.comfirm_password" type="password" maxlength="40"
        placeholder="请确认密码">
      <div class="flex flex-center margin-top-60">
        <a class="btn-blue btn-big" @click.prevent="submit">确定</a>
      </div>
    </div><!-- 第二步 -->
  </div>
</template>
<script>
  import api from "@/api/index";
  import Header from "@/components/Header";
  export default {
    name: "Register2",
    data() {
      return {
        msg: "获取",
        isGetCode: true,
        form: {
          mobile: "",
          code: "",
          password: "",
          comfirm_password: ""
        },
        captcha: null
      };
    },
    components: {
      Header
    },
    methods: {
      // 获取验证
      getCode() {
        if (this.msg !== "获取") {
          this.$vux.toast.show({
            text: "请稍等之后发送",
            type: "cancel"
          });
        } else {
          api
            .isCaptcha({
              mobile: this.form.mobile
            })
            .then(response => {
              if (response.data.result) {
                this.captcha.show();
              } else {
                this.getRegCode({});
              }
            });
        }
      },
      getRegCode(res) {
        api
          .regGetCode({
            tencent_captcha_ticket: res.ticket,
            tencent_captcha_randstr: res.randstr,
            mobile: this.form.mobile
          })
          .then(response => {
            this.$vux.toast.show("验证码已发送");
            this.timeDownReady();
            this.timeDown(
              () => {
                this.msg = "获取";
                this.isGetCode = true;
              },
              time => {
                this.msg = time + "秒重新获取";
                this.isGetCode = false;
              }
            );
          });
      },
      //注册
      submit() {
        if (!this.form.code) {
          this.toast("请输入验证码");
        } else if (!this.form.password) {
          this.toast("请输入密码");
        } else if (!this.form.comfirm_password) {
          this.toast("请输入确认密码");
        } else if (this.form.password !== this.form.comfirm_password) {
          this.toast("两次密码不一致");
        } else {
          api
            .register({
              mobile: this.form.mobile,
              mobile_code: this.form.code,
              password: this.form.password,
              password_confirmation: this.form.comfirm_password,
              app:true,
            })
            .then(response => {
              this.$vux.toast.show("注册成功");
              this.setStorage("access_token", response.data.access_token);
              api.yunLogin().then(response => {
                this.getUser({
                  callback: () => {
                    this.getOtherData();
                    setTimeout(() => { 
                      this.jump("/home");
                    }, 1500);
                  }
                });
              });
            });
        }
      },
      load() {
        this.captcha = new TencentCaptcha("2093771550", res => {
          if (res.ret == 0) {
            //手机注册
            this.getRegCode(res);
          }
        });
      }
    },
    created() {
      this.form.mobile = this.$router.currentRoute.query.mobile;
    }
  };

</script>
<style scoped>
</style>
