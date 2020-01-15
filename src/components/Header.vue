<template>
    <div class="head_gray">
        <i class="fl head_back" @click.prevent="back" title="返回"></i>
        <div class="head_title">{{title}}</div>
        <div v-if="type==2" class="fr font-32 head_handle" @click="handle">{{text}}</div> 
    </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  props: ["title", "type", "text"],
  methods: {
    back() {
      this.$router.back();
    },
    handle() {
      this.$emit("handle", true);
    }
  },
  mounted() {  
   
  }
};
</script> 
<style>
</style>
