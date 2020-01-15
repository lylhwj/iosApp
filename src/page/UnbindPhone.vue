<template>
  <div class="bg-grayc">
    <Header id="JS_unbind_phone_header" title="手机号解绑"></Header>
    <ViewBox id="JS_unbind_phone">
      <img style="width:100%;" src="@/assets/bg_safe_mob@2x.png" alt="">
      <div class="clear"></div>
      <div class="bg-white">
        <div class="border-bottom padding-text-input"><input class="text-input" type="tel" placeholder="请输入手机号"
            readonly v-model="form.mobile_yc"></div>
        <div v-if="!unbindForm.show" class="border-bottom padding-text-input pos-rel"> <input v-model="form.code" class="text-input"
            type="tel" placeholder="图片验证码"><img @click="changeImg" class="yzm_img margin-right-20" height="30" :src="codeImg"
            alt=""></div>
        <div v-else class="border-bottom padding-text-input"><input class="text-input" type="tel" placeholder="请输入短信验证码"
            v-model="unbindForm.code"></div>
      </div>
      <div class=" padding-24 gray">应《中华人民共和国网络安全法》要求，使用互联网服务需进行账号实名，为保障边乐云账号的正常使用，请绑定手机。</div>
      <div v-if="!unbindForm.show" class="flex flex-center">
        <a class="btn-blue btn-big" @click.prevent="next">下一步</a>
      </div>
      <div v-else class="flex flex-center">
        <a class="btn-blue btn-big" @click.prevent="submit">解绑</a>
      </div>
    </ViewBox>

  </div>
</template>
<script>
import Header from "@/components/Header"; 
import { ViewBox } from "vux";
import api from "@/api/index";
export default {
  name: "UnbindPhone",
  data() {
    return {
      form: {
        action: "unbindphone",
        code: "",
        mobile: "",
        mobile_yc: ""
      },
      unbindForm: {
        show: false,
        action: "phone_unbind",
        code: "",
        mobile: ""
      },
      codeImg:
        "http://api.bianyue.cn/api.php?op=checkcode&code_len=4&font_size=13&width=80&height=26&" +
        Math.random()
    };
  },
  components: {
    Header,
    ViewBox
  },
  methods: {
    changeImg() {
      this.codeImg =
        "http://api.bianyue.cn/api.php?op=checkcode&code_len=4&font_size=13&width=80&height=26&" +
        Math.random();
    },
    // 下一步
    next() {
      if (!this.form.code) {
        this.toast("请输入图形验证码~");
      } else {
        this.GET({
          api: "/user.php?op=sms",
          jsonp:true,
          data: this.form,
          success: data => {
            this.$vux.toast.show("验证码发送成功");
            this.unbindForm.show = true;
          }
        });
      }
    },
    // 解绑
    submit() {
      if (!this.unbindForm.code) {
        this.toast("请输入短信验证码~");
      } else {
        this.GET({
          api: "/user.php?op=info",
          jsonp:true,
          data: this.unbindForm,
          success: data => {
            this.$vux.toast.show("解绑成功");
            api.logout().then(response => {
              setTimeout(() => { 
                this.jump("/login");
              }, 1500);
            });
          }
        });
      }
    }
  },
  mounted() {
    $("#JS_unbind_phone").height(
      $(window).height() - $("#JS_unbind_phone_header").height() - 5
    );
  },
  created() {
    this.form.mobile = this.$router.currentRoute.query.mobile;
    this.unbindForm.mobile = this.form.mobile;
    this.form.mobile_yc = "*******" + this.form.mobile.substring(7, 11);
  }
};
</script>
<style scoped>
</style>
