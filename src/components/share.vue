<template>
    <div class="wachat-tips" v-if="shareShow">
        <span class="weixin-guan" @click="guan">我知道了</span>
    </div>
</template>

<style scoped lang="less">
    .wachat-tips{
        position: fixed;z-index: 999;left: 0;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,.9) url('http://static.360che.com/public/images/wechat-tips.png') no-repeat 100% 0;background-size: 100%;
        span{
            position: relative;display: block;width: 190px;height: 32px;line-height: 32px;margin: 0 auto;top: 312px;border: 1px solid #fff;color: #fff;font-size: 15px;text-align: center;
        }
    }
</style>


<script>
export default {
    props: ['shareShow'],
    data () {
        return {
        }
    },
    methods:{
      guan (){
        this.$emit('ShareView',this.shareShow);
      }
    }
}
</script>
