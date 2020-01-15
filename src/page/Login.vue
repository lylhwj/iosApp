<template>
  <div class="bg-white"> 
    <div id="JS_content" class="disn">
      <p class="fct"><img class="w750" src="@/assets/icon_login_top@2x.png" alt=""></p>
      <div class="login_bar">
      <div class="bg-white" >
        <div class="pos-rel">
          <span class="i_user"></span>
          <input class="inp_text inp_text_40" type="text" v-model="formData.login" maxlength="40" placeholder="手机号/边乐云账号" value="">
        </div>
        <div class="pos-rel">
          <span class="i_pass"></span>
          <div @click="eye" class="flex-column flex-center eye-warpper"><span :class="[this.passwordType=='password'?'eye_close':'eye_open']"></span></div>
          <input class="inp_text inp_text_40" :type="passwordType" v-model="formData.password" maxlength="20" placeholder="密码" value="">
        </div> 
        <div class="flex flex-center margin-top-60">
          <a class="btn-blue btn-big" href="javascript:;" @click.prevent="submit">立即登录</a>
        </div>
        <div class="clear2 margin-top-30"></div>
        <div class="flex flex-between align-center font-30">
          <router-link to="register" class="blue">新用户注册</router-link>
          <router-link to="forget" class="gray">无法登录？</router-link>
        </div>
      </div>
       <div class="login_other">
          <ul class="flex flex-around fct">
          <li><a @click.prevent="wxLogin" class="gray"><img src="@/assets/icon_weixin@2x.png" alt="">微信登录</a></li>
          <li><a @click.prevent="qqLogin" class="gray"><img src="@/assets/icon_QQ@2x.png" alt="">QQ登录</a></li>
          <li><router-link to="msgLogin" class="gray"><img src="@/assets/icon_SMS@2x.png" alt="">短信登录</router-link></li>
        </ul>
        <div class="margin-top-20">
        <p class="grayc font-24 fct">————登录即代表你已阅读并同意————</p>
        <p class="font-24 fct margin-top-5"><a class="blue" href="javascript:;" @click="open(1)">《服务协议》</a>和<a class="blue" href="javascript:;"  @click="open(2)">《隐私政策》</a></p>
        </div>
       </div>
      </div>
    </div>  
    <div id="JS_xieyi_popup" class="w-pop">
      <div class="box-bg border-bottom"> 
        <h4 class="font-36 fct">温馨提示</h4>
        <p class="font-32 margin-top-30 grays">欢迎使用边乐云!边乐云非常重视您的个人隐私保护，在您使用边乐云产品和服务前，请认真阅读<a class="blue" href="javascript:;" @click="open(1)">《服务协议》</a>和<a class="blue" href="javascript:;"  @click="open(2)">《隐私政策》</a>全部条款，您需要同意并接受全部条款后才可开始使用我们的产品和服务。</p>
      </div>
      <div class="flex flex-around">
        <a class="btn-white btn-mediume" @click="noUser">暂不使用</a>
        <a class="btn-blue btn-mediume" @click.prevent="agree">同意</a>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/index";

export default {
  name: "Login",
  data() {
    return {
      formData: {
        login: "",
        password: ""
      },
      isClick: true,
      passwordType: "password"
    };
  },
  components: {},
  methods: {
    eye() {
      this.passwordType = this.passwordType == "password" ? "text" : "password";
    },
    noUser() {
      this.toast("需同意才能使用！");
    },
    agree() {
      this.setStorage("xyShow", true);
      this.closePop();
    },
    open(type) {
      if (type == 1) {
        cordova.InAppBrowser.open(
          "http://vip.bianyue.cn/Agreementuser",
          "_blank",
          "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
        );
      } else {
        cordova.InAppBrowser.open(
          "http://yun.bianyue.cn/privacy.html",
          "_blank",
          "toolbarcolor=#ffffff,toolbarposition=top,closebuttoncaption=关闭,location=no"
        );
      }
    },
    // 登录
    submit() {
      if (!this.isClick) {
        return false;
      } else if (!this.formData.login) {
        this.toast("请输入账号~");
        return false;
      } else if (!this.formData.password) {
        this.toast("请输入密码~");
        return false;
      } else {
        this.wLoading();
        api.login(this.formData).then(response => {
          this.setStorage("access_token", response.data.access_token);
          this.getUser({
            callback: () => {
              if (!this.userInfo.mobile) {
                this.setStorage("yun_login", this.formData.login);
                this.setStorage("yun_password", this.formData.password);
                this.jump("/bindPhone");
              } else {
                this.$vux.toast.show("登录成功");
                this.getOtherData();
                this.isClick = false;
                setTimeout(() => {
                  this.jump("/home");
                }, 1000);
              }
            }
          });
        });
      }
    },
    // 微信登录
    wxLogin() {
      let _this = this;
      _this.wLoading();
      setTimeout(() => {
        _this.wLoading({
          type: "hide"
        });
      }, 500);
      Wechat.isInstalled(
        function(installed) {
          if (installed) {
            let scope = "snsapi_userinfo",
              state = "_" + +new Date();
            Wechat.auth(
              scope,
              state,
              function(response) {
                api
                  .wxLogin({
                    code: response.code,
                    oauth_v2: 1
                  })
                  .then(response => {
                    api.wxLoginIsSuccess().then(response => {
                      if (response.oauth_status == "GrantedAndLogged") {
                        _this.setStorage(
                          "access_token",
                          response.data.access_token
                        );
                        _this.getUser({
                          callback: () => {
                            if (!_this.userInfo.mobile) {
                              _this.jump("/bindPhone");
                            } else {
                              _this.$vux.toast.show("登录成功");
                              setTimeout(() => {
                                _this.jump("/home");
                              }, 1500);
                            }
                          }
                        });
                      } else if (response.oauth_status == "UnBindMobile") {
                        _this.jump("/bindPhone");
                      } else if (response.oauth_status == "Unauthorized") {
                        _this.toast("未授权");
                      }
                    });
                  });
              },
              function(reason) {
                _this.toast("登录失败");
              }
            );
          } else {
            _this.toast("登录失败");
          }
        },
        function(reason) {
          _this.toast("微信未安装");
        }
      );
    },
    // qq登录
    qqLogin() {
      let _this = this;
      _this.wLoading();
      setTimeout(() => {
        _this.wLoading({
          type: "hide"
        });
      }, 500);
      let args = {};
      args.client = QQSDK.ClientType.QQ; //QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
      QQSDK.checkClientInstalled(
        function() {
          QQSDK.ssoLogin(
            function(result) {
              api
                .qqLogin({
                  access_token: result.access_token,
                  unionid: 1
                })
                .then(response => {
                  api.qqLoginIsSuccess().then(response => {
                    if (response.oauth_status == "GrantedAndLogged") {
                      _this.setStorage(
                        "access_token",
                        response.data.access_token
                      );
                      _this.getUser({
                        callback: () => {
                          if (!_this.userInfo.mobile) {
                            _this.jump("/bindPhone");
                          } else {
                            _this.$vux.toast.show("登录成功");
                            setTimeout(() => {
                              _this.jump("/home");
                            }, 1500);
                          }
                        }
                      });
                    } else if (response.oauth_status == "UnBindMobile") {
                      _this.jump("/bindPhone");
                    } else if (response.oauth_status == "Unauthorized") {
                      _this.toast("未授权");
                    }
                  });
                });
            },
            function(failReason) {
              _this.toast("登录失败");
            },
            args
          );
        },
        function() {
          _this.toast("QQ未安装");
        },
        args
      );
    }
  },
  mounted() {
    setTimeout(() => {
      $("#JS_content").show();
    }, 3000);
  },
  created() {
    this.getUser({
      alertErr: "no_all",
      callback: data => {
        if (data.status == "请先登录" || data.code == 401) {
          var xieyiShow = this.getStorage("xyShow");
          $("#JS_content").fadeIn();
          if (!xieyiShow) {
            layer.open({
              type: 1,
              title: false,
              closeBtn: false,
              shadeClose: false,
              content: $("#JS_xieyi_popup"),
              area: ["90%"]
            });
          } else {
            this.setStorage("xyShow", true);
          }
        } else if (data.status == 200) {
          this.setStorage("xyShow", true);
          if (!data.data.mobile) {
            $("#JS_content").fadeIn();
            return false;
          } else {
            this.getOtherData();
            this.jump(`/home?slip=no`);
          }
        }
      }
    });
  }
};
</script>
<style >
</style>


