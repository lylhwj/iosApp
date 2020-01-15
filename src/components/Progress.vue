<template>
  <div class="w_process_bar">
    <div class="process">
      <p class="ts-5" :style="{width:width+'%'}"></p>
    </div>
  </div>
</template>
<script>
  export default {
    name: "process",
    data() {
      return {
         
      };
    },
    props:["width"],
    components: {},
    methods: {
     
    }
  };

</script>
<style>
  .w_process_bar {
    margin-left: 0.2rem;
    width: 3rem;
    position: absolute;
    right: 0;
    top: 0;
    border-bottom: 1px solid #f7f7f7;
  }

  .w_process_bar .process {
    margin: 0.18rem 0 0.24rem;
    height: 0.16rem;
    border-radius: 0.16rem;
    background: #f4f4f4;
  }

  .w_process_bar .process_text {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    top: 0;
    right: 0;
    color: #444;
  }

  .w_process_bar .process p {
    height: 0.16rem;
    border-radius: 0.16rem;
    background: #0688ff;
  }

</style>
