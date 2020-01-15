 <template>
    <div class="head_gray">
        <i class="fl head_back" v-if="!close" @click.prevent="back" title="返回"></i>
        <div class="head_title">{{title}}</div>
        <a v-if="type==1" @click.prevent="handle" class="fr head_del" title="清空"></a>
        <a v-if="type==2" @click.prevent="handle" class="fr head_add" title="新建"></a>        
        <a v-if="type==3" @click.prevent="handle" class="fr head_del3" title="清空"></a>        
    </div>
</template>

<script>
export default {
  name: "BHeader",
  data() {
    return {};
  },
  props: ["title", "type", "text","backType","close"],
  methods: {
    back() { 
      if(this.backType==1){
        this.jump('/lixian');
        return false;
      } 
      this.$router.back();
    },
    handle() {
      this.$emit("handle", true);
    }
  },
  mounted() {
   
  },
  created() {}
};
</script> 
<style scoped>
</style>
