<template>
  <div>
    <remote-script src="https://ssl.captcha.qq.com/TCaptcha.js" @load="load"></remote-script> 
    <Header id="JS_bind_phone_header" title="手机号绑定"></Header>
    <ViewBox class="JS_bind_phone flex-column flex-center">
      <div class="flex flex-center">
        <div style="width: 100%;">
          <div class="need-warpper"> </div>
          <div class="flex flex-center">
            <a class="btn-blue btn-big margin-top-40" style="width:60%;" @click.prevent="goBind">立即绑定</a>
          </div>
        </div>
      </div>
    </ViewBox>
    <ViewBox class="JS_bind_phone disn">
      <img style="width:100%;" src="@/assets/bg_safe_mob@2x.png" alt="">
      <div class="clear"></div>
      <div class="bg-white mobile-warpper">
        <div class="border-bottom padding-text-input"><input class="text-input" type="tel" maxlength="11" placeholder="请输入手机号"
            @blur="checkMobile" v-model="form.mobile"></div>
        <div class="border-bottom padding-text-input w-row"><input class="text-input" type="tel" placeholder="请输入短信验证码"
            v-model="form.code"><a :class="['btn-blue',isGetCode?'':'btn_gray2','btn-yzm','w-code']" @click.prevent="getCode">{{msg}}</a></div>
      </div>
      <div class=" padding-24 gray">应《中华人民共和国网络安全法》要求，使用互联网服务需进行账号实名，为保障边乐云账号的正常使用，请绑定手机。</div>
      <div class="flex flex-center padding-bottom-20">
        <a class="btn-blue btn-big" @click.prevent="submit">绑定</a>
      </div>
    </ViewBox>
  </div>
</template>
<script>
import Header from "@/components/Header";
import api from "@/api/index";
import { ViewBox } from "vux";
export default {
  name: "BindPhone",
  data() {
    return {
      isGetCode: true,
      msg: "获取",
      form: {
        code: "",
        mobile: ""
      },
      captcha: null,
      checkMsg: ""
    };
  },
  components: {
    Header,
    ViewBox
  },
  methods: {
    goBind() {
      let step = $(".JS_bind_phone").eq(0);
      let step1 = $(".JS_bind_phone").eq(1);
      step.fadeOut();
      step1.fadeIn();
    },
    // 获取验证码
    getCode() {
      if (!this.form.mobile) {
        this.toast("请输入手机号~");
      } else if (!/^1[0-9]{10}$/.test(this.form.mobile)) {
        this.toast("请输入正确格式的手机~");
      } else if (this.msg !== "获取") {
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
    //验证手机号
    checkMobile() {
      if (!this.form.mobile) {
        this.toast("请输入手机号~");
      } else if (!/^1[0-9]{10}$/.test(this.form.mobile)) {
        this.toast("手机格式错误~");
      }
    },
    // 绑定
    submit() {
      let login = this.getStorage("yun_login");
      let password = this.getStorage("yun_password");
      if (!this.form.mobile) {
        this.toast("请输入手机号~");
      } else if (!/^1[0-9]{10}$/.test(this.form.mobile)) {
        this.toast("手机格式错误~");
      } else if (!this.form.code) {
        this.toast("请输入短信验证码~");
      } else if (login && password) {
        api
          .bindphone2({
            login: login,
            password: password,
            mobile: this.form.mobile,
            mobile_code: this.form.code
          })
          .then(response => {
            this.$vux.toast.show("绑定成功");
            this.removeStorage("yun_login");
            this.removeStorage("yun_password");
            this.getUser({
              callback: () => {
                this.getOtherData();
                setTimeout(() => {
                  this.jump("/home");
                }, 1000);
              }
            });
          });
      } else {
        api
          .bindphone({
            mobile: this.form.mobile,
            mobile_code: this.form.code
          })
          .then(response => {
            this.$vux.toast.show("绑定成功");
            this.removeStorage("yun_login");
            this.removeStorage("yun_password");
            this.getUser({
              callback: () => {
                this.getOtherData();
                setTimeout(() => {
                  this.jump("/home");
                }, 1000);
              }
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
  mounted() {
    $(".JS_bind_phone").height(
      $(window).height() - $("#JS_bind_phone_header").height() - 5
    );
  },
  created() {}
};
</script>
<style scoped>
.need-warpper {
  width: 98%;
  height: 9.026667rem;
  margin-top: 1.333333rem;
  background: url(../assets/bg_mob@2x.png);
  background-size: 100% 100%;
}

.w-code {
  width: 2.453333rem;
  margin-right: 0.2333rem;
}
</style>
