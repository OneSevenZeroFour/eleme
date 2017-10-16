<template>
    <div class="cartview">
        <div class="cartbody">
            <span class="carticon">
            </span>
            <div class="cartinfo">
                <p class="cartinfo-total">
                    <span>¥17</span>
                    <del class="cartinfo-totalorigin">¥22</del>
                </p> 
                <p class="cartdelivery">配送费¥6</p>
            </div>
            <a href="javascript:;" class="submit-btn"><span>去结算</span></a>
        </div>
    </div>
</template>

<script>
    
</script>

<style scoped>
    .cartview{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #fff;
        height: 1.28rem;
    }
    .cartbody{
            position: fixed;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            align-items: center;
            padding-left: 2.106667rem;
            background-color: rgba(61,61,63,.9);
            height: 1.28rem;
    }
    .carticon{
    position: absolute;
    left: .32rem;
    bottom: .2rem;
    width: 1.333333rem;
    height: 1.333333rem;
    box-sizing: border-box;
    border-radius: 100%;
    background-color: #3190e8;
    border: .133333rem solid #444;
    box-shadow: 0 -0.08rem 0.053333rem 0 rgba(0,0,0,.1);
    background-size: contain;
    }
    .carticon::before{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: url('../../imgs/no-food.png') 50% no-repeat;
        background-size: cover;
        content: "";
    }
    .cartinfo{
        flex: 1;
        box-sizing: inherit;
    }
    .cartinfo-total{
        font-size: .48rem;
        line-height: normal;
        color: #fff;
    }
    .cartinfo-totalorigin{
            font-size: .8em;
            opacity: .8;
    }
    .cartdelivery{
        color: #999;
        font-size: .266667rem;
    }
    .submit-btn{
        height: 100%;
        width: 2.8rem;
        background-color: #4cd964;
        color: #fff;
        text-align: center;
        text-decoration: none;
        font-size: .4rem;
        font-weight: 700;
        line-height: 1.28rem;
    }
    .submit-btn span{
        color: #fff;
        text-align: center;
        font-size: .4rem;
        font-weight: 700;
        line-height: 1.28rem;
    }
</style>