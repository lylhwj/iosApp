<template>
  <div class="bg-white">
    <Header title="短信登录"></Header>
    <div class="login_bar">
      <p class="fd font-36">输入手机号</p>
      <p class="margin-top-10">安全免密快捷登录</p>
      <input class="margin-top-40 inp_text" type="tel" v-model="mobile" @input="input" maxlength="11" placeholder="请输入手机号码" value="">
      <div class="flex flex-center margin-top-60">
        <a :class="[isNext?'btn-blue':'btn-gray2','btn-big']" @click.prevent="next">下一步</a>
      </div>
    </div><!-- 第一步 -->
  </div>
</template>
<script>
import api from "@/api/index";
import Header from "@/components/Header";
export default {
  name: "Register",
  data() {
    return {
      mobile: "",
      isNext: false
    };
  },
  components: {
    Header
  },
  methods: {
    input() {
      if (!this.mobile) {
        this.isNext = false;
      } else if (!/^1[0-9]{10}$/.test(this.mobile)) {
        this.isNext = false;
      } else {
        this.isNext = true;
      }
    },
    next() {
      if (!this.mobile) {
        this.toast("请输入手机号~");
      } else if (!/^1[0-9]{10}$/.test(this.mobile)) {
        this.toast("手机格式错误~");
      } else {
        api
          .isRegister2(
            { mobile: this.mobile },
            {
              alertErr: "no",
              failureCallback: response => {
                if (response.msg == "该手机号已注册") {
                  this.jump(`/msgLogin2?mobile=${this.mobile}`);
                } else {
                  this.$vux.toast.show({
                    text: response.msg,
                    type: "cancel"
                  });
                }
              }
            }
          )
          .then(response => {
            this.confirm({
              title: `手机号码${
                this.mobile
              }未注册,点击"继续"我们将为您注册为新账号`,
              leftBtnText: "账号登录",
              leftCallback: () => {
                this.jump("/login");
              },
              rightBtnText: "继续",
              rightCallback: () => {
                this.jump(`/register2?mobile=${this.mobile}`);
              },
              width: "80%"
            });
          });
      }
    }
  }
};
</script>
 