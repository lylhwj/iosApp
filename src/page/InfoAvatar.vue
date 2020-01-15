<template>
  <div>
    <Header id="JS_avatar_header" title="边乐云头像"></Header>
    <ViewBox id="JS_avatar">
      <div class="bg_avatar">
        <img :src="userImg" style="border-width:1px;" onerror="this.src='https://api.bianyue.cn/nophoto.gif'" />
      </div>
      <div class="bg-white padding-top-30 flex flex-around">
        <a @click.prevent="cancel">取消</a>
        <a>选择头像</a>
        <a @click.prevent="submit" class="blue">确认</a>
      </div>
      <div class="bg-white user_list">
        <ul id="JS_list" class="flex">
          <li>
            <div><img src="@/assets/avatar/avatar_01.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_02.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_03.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_04.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_05.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_06.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_07.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_08.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_09.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_10.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_11.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_12.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_13.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_14.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_15.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_16.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_17.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_18.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_19.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_20.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_21.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_22.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_23.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_24.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_25.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_26.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_27.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_28.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_29.png" alt=""></div>
          </li>
          <li>
            <div><img src="@/assets/avatar/avatar_30.png" alt=""></div>
          </li>
        </ul>
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
    name: "avatar",
    data() {
      return {
        index: ''
      }
    },
    components: {
      Header,
      ViewBox
    },
    methods: {
      cancel() {
        $("#JS_list li").removeClass('hover');
        this.index = '';
      },
      submit() {
        if (!this.index) {
          this.toast('请选择头像~')
        } else {
          this.GET({
            api: `/api.php?op=upavatar_self&avatar_num=avatar_${this.index}`,
            success: (res) => { 
              this.$vux.toast.show('上传成功');
              this.$store.commit("changeUserInfo", {
                userAvatar:"https:"+res.data
              });
            }
          })
        }
      }
    },
    mounted() {
      $("#JS_avatar").height($(window).height() - $("#JS_avatar_header").height()-5);
      let _this = this;
      $("#JS_list li").click(function () {
        _this.index = $(this).index() + 1;
        $(this).addClass('hover').siblings().removeClass('hover');
      })
    },
  };

</script>
