<template>
    <div id="JS_alert" class="w-pop text-center">
      <div class="box-bg border-bottom"> 
        <p class="margin-top-30 grays">{{title}}</p>
      </div>
      <div class="flex flex-around"> 
        <a class="btn-blue btn-mediume" style="width:100%; border-radius:0 0 8px 8px" @click.prevent="closePop">确定</a>
      </div>
    </div>
</template>

<script>
export default {
  name: "Alert",
  data() {
    return {};
  }, 
  props:["title"],
  methods: {
    
  },
  created() {

  }
};
</script> 
<style scoped>
</style>
