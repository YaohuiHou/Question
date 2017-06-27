<template>
    <div class="submit_model" v-show="toastView">
        <div class="submit">
            <div class="submit_top">{{ toastText }}</div>
            <div class="submit_bottom" @click="remove">确定</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['toastView','toastText',"toastBack"],
    data () {
        return {
        }
    },
    methods:{
      remove (){
        if(this.toastBack == 1){
            this.$router.push('/zone');
            return;
        }
        this.$emit('toastbox',this.toastView);
      }
    }
}
</script>

<style scoped lang="less">
.submit_model{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background: rgba(0,0,0,0.8);
    z-index: 1000;
    .submit{
        position:absolute;
        top:50%;
        left:50%;
        width:270px;
        height:100px;
        margin:-50px 0 0 -135px;
        .submit_top{
            height:60px;
            line-height: 60px;
            text-align: center;
            background: #fff;
            font-size: 16px;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
        }
        .submit_bottom{
            height:40px;
            line-height: 40px;
            text-align: center;
            background: #2373e0;
            color:#fff;
            font-size: 16px;
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;

        }
    }
}
</style>
