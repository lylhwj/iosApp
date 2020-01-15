<template>
  <div>
    <div id="JS_log_header">
      <Header title="最近登录记录"></Header>
      <div class="clear"></div>
    </div>
    <ViewBox id="JS_list">
      <div v-for="data in dataList" :key="data._id" class="flex flex-between align-center bg-white padding-32 border-bottom ">
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
    </ViewBox>
  </div>
</template>
<script>
import Header from "@/components/Header";
import { ViewBox } from "vux";
export default {
  name: "LoginLog",
  data() {
    return {
      dataList: []
    };
  },
  components: {
    Header,
    ViewBox
  },
  methods: {},
  mounted() {
    $("#JS_list").height($(window).height() - $("#JS_log_header").height() - 5);
  },
  created() {
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
<style scoped>
</style>
