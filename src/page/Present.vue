<template>
  <div class="bg-grayc">
    <BHeader title="赠送"></BHeader>
    <div  class="w-form">
      <div class="padding-left-40 flex-coulum flex-center" style="height: 1.04rem;line-height: 1.04rem">
        <span class="font-28">卡号 : {{card_id}}</span>
      </div>
      <div class="border-bottom flex-coulum flex-center border-bf bg-white input-warrper" >
        <input type="tel" maxlength="11" v-model="other_id"  placeholder="请输入赠送用户ID或手机号">
      </div>
      <div class="border-bottom flex-coulum flex-center border-bf bg-white " >
        <input type="tel" maxlength="11" v-model="confirm_id"  placeholder="请再次输入赠送用户ID或手机号">
      </div>
      <div class="flex flex-center margin-top-60">
        <div class="btn-blue btn-big" @click="submit">确定赠送</div>
      </div>
    </div>
  </div>

</template>
<script>
  import BHeader from "@/components/BHeader";
  export default {
    name: "Present",
    data() {
      return {
        card_id: '',
        other_id: '',
        confirm_id: ''
      };
    },
    components: {
      BHeader
    },
    methods: {
      submit() {
        if (!this.other_id) {
          this.toast("请输入赠送用户ID或手机号~"); 
        } else if (!this.confirm_id) {
          this.toast("请再次输入赠送用户ID或手机号~"); 
        } else if (!this.other_id == this.confirm_id) {
          this.toast("请输入赠送用户ID或手机号~"); 
        } else {
          this.GET({
            api: '/user.php?op=info',
            data: {
              'action': 'give_other',
              'other_id': this.other_id,
              'cid': this.card_id,
            }, 
            success: (data) => {
              this.$vux.toast.show("赠送成功");
              setTimeout(() => { 
                this.jump('/coupon');
              }, 2000);
            }
          })
        }
      }
    },
    created() {
      this.card_id = this.$router.currentRoute.query.cardId;
    }
  };

</script>
<style scoped> 

</style>
