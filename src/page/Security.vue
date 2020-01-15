<template>
  <div class="bg-grayc">
    <Header id="JS_security_header" title="账户安全"></Header>
    <ViewBox id="JS_security">
      <p class="f13 padding-15 gray bg-gray">安全设置</p>
      <div class="list-bar" style="height:1rem;">
        <span>登录密码</span>
        <span class="gray" @click="jump('/mPwd')">修改</span>
      </div>
      <div class="list-bar" style="height:1rem;">
        <span>安全码</span>
        <span class="gray" @click="jump('/securityCode')">设置</span>
      </div>
      <p class="f13 padding-15 gray bg-gray">账号绑定（便于账号登录、重置密码、安全验证）</p>
      <div class="list-bar align-center">
        <p v-if="userInfo.mobile">手机绑定<span class="disb grayc f12">已绑定{{userInfo.mobile}}</span></p>
        <p v-else>手机绑定<span class="disb grayc f12">未绑定</span></p>
        <span v-if="userInfo.mobile" class="open_yes" @click="unbindPhone"></span>
        <span v-else class="open_no" @click="bindPhone"></span>
      </div>
      <div class="list-bar align-center">
        <p v-if="userInfo.email">邮箱绑定<span class="disb grayc f12">已绑定{{userInfo.email}}</span></p>
        <p v-else>邮箱绑定<span class="disb grayc f12">未绑定</span></p>
        <span v-if="userInfo.email" class="open_yes" @click="unbindEmail"></span>
        <span v-else class="open_no" @click="bindEmail"></span>
      </div>
      <div class="list-bar align-center">
        <p v-if="userInfo.qqbind">QQ<span class="disb grayc f12">已绑定</span></p>
        <p v-else>QQ<span class="disb grayc f12">未绑定</span></p>
        <span v-if="userInfo.qqbind" class="open_yes"></span>
        <span v-else class="open_no"></span>
      </div>
      <div class="list-bar align-center">
        <p v-if="userInfo.wxbind">微信<span class="disb grayc f12">已绑定</span></p>
        <p v-else>微信<span class="disb grayc f12">未绑定</span></p>
        <span v-if="userInfo.wxbind" class="open_yes"></span>
        <span v-else class="open_no"></span>
      </div>
      <p class="f13 padding-15 gray bg-gray">当前登录</p>
      <div v-for="(data,index)  in dataList" :key="data._id" v-if="index<3" class="flex flex-between align-center bg-white padding-32 border-bottom">
        <div class="flex">
          <div class="flex-column flex-center">
            <img v-if="data.agent=='Android'" class="icon-h75" src="@/assets/icon_safe_android@2x.png" />
            <img v-if="data.agent=='Windows'" class="icon-h75" src="@/assets/icon_safe_pc@2x.png" />
            <img v-if="data.agent=='iPhone'" class="icon-h75" src="@/assets/icon_safe_apple@2x.png" />
          </div>
          <div class="margin-left-20 flex-column flex-center">
            <p class="f16">边乐云{{data.agent}}</p>
            <p class="gray margin-top-10">{{data.login_ip}}</p>
            <p class="gray margin-top-10" v-html="data.adress"></p>
          </div>
        </div>
        <a class="gray text-center">
          {{data.login_time}}
        </a>
      </div>
      <div v-if="dataList.length==0" class="flex flex-between align-center bg-white padding-32 border-bottom">
        暂无登录记录
      </div>
      <div v-if="dataList.length!==0" class="bg-white padding-32 fcr">
        <router-link to="loginLog" class="blue">最近登录记录〉</router-link>
      </div>
    </ViewBox>
  </div>
</template>
<script>
  import Header from "@/components/Header";
  import {
    ViewBox
  } from "vux";
  export default {
    name: "Security",
    data() {
      return {
        dataList: []
      };
    },
    components: {
      Header,
      ViewBox
    },
    methods: {
      // 绑定手机
      bindPhone() {
        this.jump(`/bindPhone`);
      },
      // 解绑手机
      unbindPhone() {
        this.jump(`/unbindPhone?mobile=${this.userInfo.mobile_all}`);
      },
      // 绑定邮箱
      bindEmail() {
        this.jump(`/email`);
      },
      // 绑定邮箱
      unbindEmail() {
        this.jump(`/email?email=${this.userInfo.email}`);
      }
    },
    mounted() { 
      $("#JS_security").height(
        $(window).height() - $("#JS_security_header").height() - 5
      );
    },
    created() {
      this.getUser({});
      this.GET({
        api: "/user.php?op=info",
        data: {
          action: "login_log",
          page: 1
        },
        success: data => {
          this.dataList = data.data;
        }
      });
    }
  };

</script>
