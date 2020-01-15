<template>
  <div class="bg-white">
    <remote-script src="https://ssl.captcha.qq.com/TCaptcha.js" @load="load"></remote-script> 
    <Header title="短信登录"></Header>
    <div class="login_bar mobile-warpper">
      <p class="fd font-36">验证手机</p>
      <p class="margin-top-10">请验证手机以确认是你本人操作 <span>{{form.mobile}}</span></p>
      <div class="flex flex-between margin-top-40">
        <input class="inp_text flex-number1" type="tel" v-model="form.code" maxlength="6" placeholder="输入动态密码" value="">
        <a href="javascript:;" class="margin-left-15" :class="['btn-blue',isGetCode?'':'btn_gray2','btn_yzm']" @click="getCode">{{msg}}</a>
      </div>
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
      msg: "获取动态密码",
      isGetCode: true,
      form: {
        mobile: "",
        code: ""
      },
      captcha: null
    };
  },
  components: {
    Header
  },
  methods: {
    // 获取动态密码
    getCode() {
      if (!this.form.mobile) {
        this.toast("请输入手机号~");
      } else if (!/^1[0-9]{10}$/.test(this.form.mobile)) {
        this.toast("请输入正确格式的手机~");
      } else if (this.msg !== "获取动态密码") {
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
              this.getPhoneCode({});
            }
          })
          .catch(() => {
            this.captcha.show();
          });
      }
    },
    // 获取验证码
    getPhoneCode(res) {
      api
        .phoneGetCode({
          tencent_captcha_ticket: res.ticket,
          tencent_captcha_randstr: res.randstr,
          mobile: this.form.mobile 
        })
        .then(response => {
          this.$vux.toast.show("动态密码发送成功");
          this.timeDownReady();
          this.timeDown(
            () => {
              this.msg = "获取动态密码";
              this.isGetCode = true;
            },
            time => {
              this.msg = time + "秒重新获取";
              this.isGetCode = false;
            }
          );
        });
    },
    //登录
    submit() {
      if (!this.form.code) {
        this.toast("请输入动态密码~");
      } else {
        api
          .phoneLogin({
            mobile: this.form.mobile,
            mobile_code: this.form.code 
          })
          .then(response => {
            this.$vux.toast.show("登录成功");
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
          //手机快捷登录
          this.getPhoneCode(res);
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
