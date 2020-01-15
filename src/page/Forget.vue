<template>
  <div class="bg-white">
    <Header title="忘记密码"></Header>
    <div class="login_bar">
      <p class="fd font-36">确认账号</p>
      <p class="margin-top-10">请输入账号绑定的手机号码</p>
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
                  this.jump(`/forget2?mobile=${this.mobile}`);
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
            this.$vux.toast.show({
              text: "账号不存在或未绑定手机号",
              type: "cancel"
            });
          });
      }
    }
  }
};
</script>
 