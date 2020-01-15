<template>
  <div class="bg-white">
    <Header title="注册"></Header>
    <div class="login_bar">
      <p class="fct"><img style="width:1.427rem;" src="@/assets/icon_register@2x.png" alt=""></p>
      <div class="fct line40 margin-top-40">应<span class="blue">《中华人民共和国网络安全法》</span>实名制要求及保障边乐云账号安全，请用<span class="fd">手机号注册</span></div>
      <input class="margin-top-20 inp_text" type="tel" v-model="mobile" @input="input" maxlength="11" placeholder="请输入手机号码" value=""></div>
      <div class="flex flex-center margin-top-60">
        <a :class="[isNext?'btn-blue':'btn-gray2','btn-big']" @click.prevent="next">下一步</a>
      </div>
    </div><!-- 第一步 --> 
  </div>
</template>
<script>
import Header from "@/components/Header";
import api from "@/api/index";
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
                  this.confirm({
                    title: `手机号码${this.mobile}已注册,是否通过短信登录？`,
                    rightBtnText: "短信登录",
                    rightCallback: () => {
                      this.jump(`/msgLogin2?mobile=${this.mobile}`);
                    },
                    width: "70%"
                  });
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
            this.jump(`/register2?mobile=${this.mobile}`);
          });
      }
    }
  }
};
</script>
 