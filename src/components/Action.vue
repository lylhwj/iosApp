<template>
  <div v-if="type=='file'||type=='batchFile'" class="box_modify" style="background:none; position:relative">
    <ul class="flex flex-around fct font-28 list_operate">
      <li :class="{'touch_hover':true,'action_filter':type=='batchFile'}"  @click="clickMenu(3)"><img class="w75" src="@/assets/new/icon_btm_edit_rename@.png" alt="">重命名</li>
      <li :class="{'touch_hover':true,'action_filter':type=='batchFaFile'}" @click="clickMenu(1)"><img class="w75" src="@/assets/new/icon_btm_edit_remove@.png" alt="">移动</li>
      <li class="touch_hover" @click="clickMenu(5)"><img class="w75" src="@/assets/new/icon_btm_edit_del@.png" alt="">删除</li>
      <li :class="{'touch_hover':true,'action_filter':type=='batchFile'}" @click.prevent.stop="showActionMore"><img class="w75" src="@/assets/new/icon_top_more@.png" alt="">更多</li>
    </ul><!-- action_filter 加上降低透明度，表示功能不可用 -->
    <div id="JS_action_more" class="action_more">
      <p :class="{'flex':true, 'align-center':true,'action_filter':true}" v-if="isPass=='no'" @click="clickMenu(4)"><img src="@/assets/new/icon_btm_edit_jiami@.png" alt=""><span>加密</span></p>
      <p :class="{'flex':true, 'align-center':true}" v-else-if="!isPass" @click="clickMenu(4)"><img src="@/assets/new/icon_btm_edit_jiami@.png" alt=""><span>加密</span></p>
      <p class="flex align-center" v-else @click="clickMenu(4)"><img src="@/assets/new/icon_btm_edit_jiami@.png" alt=""><span>解密</span></p>
      <p class="flex align-center" v-if="!isSc" @click="clickMenu(2)"><img src="@/assets/new/icon_btm_edit_biaoji@.png" alt=""><span>星标</span></p>
      <p class="flex align-center" v-else @click="clickMenu(6)"><img src="@/assets/new/icon_btm_edit_nobiaoji@.png" alt=""><span>取消星标</span></p>
    </div>
  </div> 
  <div v-else-if="type=='search'" class="box_modify" style="background:none; position:relative">
    <ul class="flex flex-around fct font-28 list_operate">
      <li :class="{'touch_hover':true}" style=""><img class="w75" src="@/assets/new/icon_btm_edit_rename@.png" alt="">重命名</li>
      <li class="touch_hover" @click="clickMenu(1)"><img class="w75" src="@/assets/new/icon_btm_edit_remove@.png" alt="">移动</li>
      <li class="touch_hover" @click="clickMenu(5)"><img class="w75" src="@/assets/new/icon_btm_edit_del@.png" alt="">删除</li>
      <li :class="{'touch_hover':true}" @click.prevent.stop="showActionMore"><img class="w75" src="@/assets/new/icon_top_more@.png" alt="">更多</li>
    </ul>
  </div> 
  <div v-else-if="type=='favorites'||type=='batchFavorites'" class="box_modify" style="background:none; position:relative">
    <ul class="flex flex-around fct font-28 list_operate">
      <li :class="{'touch_hover':true,'action_filter':type=='batchFavorites'}" style="" @click="clickMenu(3)"><img class="w75" src="@/assets/new/icon_btm_edit_rename@.png" alt="">重命名</li>
      <li :class="{'touch_hover':true,'action_filter':type=='batchFavorites'}" @click="clickMenu(1)"><img class="w75" src="@/assets/new/icon_btm_edit_remove@.png" alt="">移动</li>
      <li :class="{'touch_hover':true}" @click="clickMenu(5)"><img class="w75" src="@/assets/new/icon_btm_edit_del@.png" alt="">删除</li>
      <li :class="{'touch_hover':true,'action_filter':type=='batchFavorites'}" @click.prevent.stop="showActionMore"><img class="w75" src="@/assets/new/icon_top_more@.png" alt="">更多</li>
    </ul>
    <div id="JS_action_more" class="action_more">
      <p :class="{'flex':true, 'align-center':true,'action_filter':true}" v-if="isPass=='no'" @click="clickMenu(4)"><img src="@/assets/new/icon_btm_edit_jiami@.png" alt=""><span>加密</span></p>
      <p :class="{'flex':true, 'align-center':true}" v-else-if="!isPass" @click="clickMenu(4)"><img src="@/assets/new/icon_btm_edit_jiami@.png" alt=""><span>加密</span></p>
      <p class="flex align-center" v-else @click="clickMenu(4)"><img src="@/assets/new/icon_btm_edit_jiami@.png" alt=""><span>解密</span></p>
      <p class="flex align-center" v-if="!isSc" @click="clickMenu(2)"><img src="@/assets/new/icon_btm_edit_biaoji@.png" alt=""><span>星标</span></p>
      <p class="flex align-center" v-else @click="clickMenu(6)"><img src="@/assets/new/icon_btm_edit_nobiaoji@.png" alt=""><span>取消星标</span></p>
    </div>
  </div> 
  <div v-else-if="type=='transfer'" class="box_modify" style="background:none; position:relative">
    <ul class="flex flex-around fct font-28 list_operate">  
      <li :class="{'touch_hover':true}"  style="visibility: hidden;"><img class="w75" src="@/assets/new/icon_btm_edit_remove@.png" alt="">移动</li>
      <li :class="{'touch_hover':true}" @click="clickMenu(3)"><img class="w75" src="@/assets/new/icon_btm_edit_rename@.png" alt="">重命名</li>
      <li :class="{'touch_hover':true}" @click="clickMenu(5)"><img class="w75" src="@/assets/new/icon_btm_edit_del@.png" alt="">删除</li>
      <li :class="{'touch_hover':true}"  style="visibility: hidden;"><img class="w75" src="@/assets/new/icon_top_more@.png" alt="">更多</li>
    </ul> 
  </div> 
  <div v-else-if="type=='transferClear'" class="box_modify" style="background:none; position:relative">
    <ul class="flex flex-around fct font-28 list_operate">  
      <li :class="{'touch_hover':true}" @click="clickMenu(1)"><img class="w75" src="@/assets/new/icon_btm_edit_del@.png" alt="">清空失败</li>
      <li :class="{'touch_hover':true}" @click="clickMenu(2)"><img class="w75" src="@/assets/new/icon_btm_edit_del@.png" alt="">清空转码中</li>
      <li :class="{'touch_hover':true}" @click="clickMenu(3)"><img class="w75" src="@/assets/new/icon_btm_edit_del@.png" alt="">清空已完成</li> 
    </ul> 
  </div> 
    <div v-else-if="type=='recycle'" class="box_modify">
    <ul class="flex flex-around fct font-24 padding-top-30 list_operate">
      <li class="touch_hover" @click="clickMenu(1)"><img class="w75" src="@/assets/new/icon_btm_edit_recover@.png" alt="">恢复</li> 
      <li class="touch_hover" @click="clickMenu(2)"><img class="w75" src="@/assets/new/icon_btm_edit_del@.png" alt="">删除</li>
    </ul> 
  </div>
</template>
<script>
export default {
  name: "action",
  data() {
    return {};
  },
  props: ["type", "isPass","isSc"],
  components: {},
  methods: { 
    clickMenu(num) {
      if(this.type=='batchFile'&&num==3){
        return false;
      }
      if((this.type=='batchFavorites'&&num==3)||(this.type=='batchFavorites'&&num==1)){
        return false;
      }
      this.$emit("clickMenu", num);
    },
    showActionMore() { 
      if(this.type=='batchFile'){
        return false;
      }
      if(this.type=='batchFavorites'){
        return false;
      }
      let $fun = $("#JS_action_more");
      $fun.fadeToggle();
    }
  },
  mounted() {
    document.addEventListener(
      "click",
      () => {
        let $fun = $("#JS_action_more");
        $fun.fadeOut();
      },
      false
    );
  }
};
</script>
<style>
.action_filter {
  filter: alpha(opacity=40);
  -moz-opacity: 0.4;
  -khtml-opacity: 0.4;
  opacity: 0.4;
} 
.action_more {
  position: fixed;
  display: none;
  bottom: 2.22rem;
  right: 0.05rem;
  z-index: 99;
  border-radius: 0.15rem;
  background: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}
.action_more p {
  padding: 0 0.2rem;
}
.action_more p img {
  display: block;
  width: 0.8rem;
  margin-right: 0.15rem;
}
.action_more p span {
  display: inline-block;
  width: 2rem;
  height: 1.44rem;
  text-align: left;
  line-height: 1.44rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  color: #000;
  font-size: 0.4rem;
}
.action_more p:last-child span {
  border: 0;
}
</style>
