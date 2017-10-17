<template>
    <div class="cartview">
        <transition name="slide">
            <div class="cartbody" >
                <div class="cartview-cartheader">
                    <div class="cartview-headerText">
                        <span class="cartview-title">已选商品</span> <!----> <!---->
                        <a href="javascript:" class="cartview-cartheaderRemove" @click="clearCart">
                            <span>清空</span>
                        </a>
                    </div> 
                </div>
                <ul class="entityList">
                    <li v-for="item in cart" class="entityRow">
                        <span class="entityList-entityName"><em class="entityName">{{item.name}}</em></span>
                        <span class="entityList-entityQty"></span>
                    </li>
                </ul>
            </div>
        </transition>
        <div class="cartfooter"  @click="toggleCartList">
            <span class="carticon" :attr-quantity="cartSum">
            </span>
            <div class="cartinfo">
                <p class="cartinfo-total">
                    <span>¥{{cartPrice}}</span>
                </p> 
                <p class="cartdelivery">配送费¥6</p>
            </div>
            <a href="javascript:;" class="submit-btn" @click="toPay" :disabled="iscartOpen?false:true"><span>去结算</span></a>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                iscartOpen: false
            }
        },
        computed:{
            cart(){
                return this.$store.getters.getCart;
            },
            cartPrice(){
                var cartList = this.$store.getters.getCart;  
                var sum = 0;
                for(var i = 0; i <cartList.length ; i++){
                    sum += parseInt(cartList[i].price * cartList[i].qty );
                }
                return sum;
            },
            cartSum(){
                var cartList = this.$store.getters.getCart; 
                var sum =0;
                for(var i = 0; i <cartList.length ; i++){
                    sum += parseInt(cartList[i].qty );
                }
                return sum;
            },
            goodsNum(){
                  var cartList = this.$store.getters.getCart; 
                  return cartList.length;  
            }
        },
        methods:{
            clearCart(ev){
                ev.preventDefault();
                this.$store.dispatch("letClearCart");
            },
            toggleCartList(ev){
                console.log(6666)
                if (!this.iscartOpen) {
                    var $el = $('.cartbody');
                    var barHeight = $('.cartview')[0].offsetHeight;
                    var selfHeight = $el[0].offsetHeight;
                    var transTop = window.innerHeight - selfHeight - barHeight;
                    $('.cartbody').animate({top: transTop});
                }else{
                    $('.cartbody').animate({top: window.innerHeight});
                }
                this.iscartOpen = !this.iscartOpen;
            },
            toPay(ev){
                ev.stopPropagation();
                var userid = this.getCookie("user");
                var shop = this.$store.getters.getShop;
                console.log(shop)
                     
                var shopid = shop.id;
                var shopname = shop.name;
                var shopimg = 'https://fuss10.elemecdn.com/' + shop.image_path.slice(0,1) + '\/' + shop.image_path.slice(1,3) + '\/' + shop.image_path.slice(3)+ '.png?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/';
                var sum = this.cartPrice;
                var time = new Date();
                var timeExp = time.setMinutes(time.getMinutes()+30);
                var foodlist = "";
                for(let i = 0;i<this.goodsNum.length;i++){
                    foodList += (this.$store.getters.cart[i].name+'x'+this.$store.getters.cart[i].qty + ' ');
                }
                var sendObj = {
                    sellerid:shopid,
                    sellerimg:shopimg,
                    seller: shopname,
                    userid:userid,
                    txt: foodList,
                    ads: this.$store.getters.getPosition,
                    time:time,
                    timeExp:timeExp,
                    pay:sum
                }
                console.log(sendObj)
                     
                $.ajax({
                    url: 'http://localhost:10086/saveOrder',
                    type: 'POST',
                    data: {obj: sendObj},
                })
                .done(function(data) {
                    console.log(data);
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
                
            },
            getCookie(name){
                var c = document.cookie;
                if(c.length === 0) //没有cookie
                    return 0;
                var c_arr = c.split('; ');
                for(var i=0;i<c_arr.length;i++){
                    var arr = c_arr[i].split('=');
                    if(arr[0] === name)
                        return arr[1];
                }
                return 0;
            }
        },
        mounted(){
            $('.cartbody').css('top', window.innerHeight)
            this.iscartOpen = false;
        }
    }
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
        width: 100%;
        position: fixed;
        /*bottom: 0;*/
        z-index: 10;
        background-color: #fff;
    }
    
    .cartview-cartheader{
        display: flex;
        padding: 0 .333333rem;
        border-bottom: 1px solid #ddd;
        background-color: #eceff1;
        color: #666;
        height: 1.066667rem;
        font-size: .426667rem;
    }
    .cartview-headerText{
        flex: 1;
        align-items: center;
        display: flex;
        justify-content: space-between;
    }
    .cartview-title{
        padding-left: .133333rem;
        color: #666;
        border-left: .093333rem solid #2395ff;
        -webkit-box-flex: 0;
        -webkit-flex: none;
        -ms-flex: none;
        flex: none;
    }
    .cartview-cartheaderRemove{
        align-items: center;
        padding-left: .4rem;
        color: #666;
        text-decoration: none;
        font-size: .346667rem;
        float: right;
    }
    .entityList{
        font-size: .433334rem;
        flex: 5.5;
        line-height: normal;
    }
    .entityRow{
        display: flex;
        align-items: center;
        padding: .2rem .333333rem .2rem 0;
        min-height: 1.466667rem;
        margin-left: .333333rem;
        border-bottom: 1px solid #eee;
    }
    .entityList-entityName{
        
    }
    .entityName{
        display: inline-block;
        font-style: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        max-width: 4.666667rem;
    }


/*--------------    foods-cell style   ------------------*/
    .cartfooter{
            position: fixed;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            align-items: center;
            padding-left: 2.106667rem;
            background-color: rgba(61,61,63,.9);
            height: 1.28rem;
            z-index: 11;
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
    .carticon::after{
        content: attr(attr-quantity);
        position: absolute;
        right: -.12rem;
        top: -.133333rem;
        line-height: 1;
        background-image: -webkit-gradient(linear,right top,left top,from(#ff7416),color-stop(98%,#ff3c15));
        background-image: -webkit-linear-gradient(right,#ff7416,#ff3c15 98%);
        background-image: linear-gradient(-90deg,#ff7416,#ff3c15 98%);
        color: #fff;
        border-radius: .32rem;
        padding: .053333rem .133333rem;
        content: attr(attr-quantity);
        font-size: .266667rem;
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