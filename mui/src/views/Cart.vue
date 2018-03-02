<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>购物车</span>
    </nav-bread>
    <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>My Cart</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>Items</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
                <li>Edit</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="(item,index) in cartList">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascipt:;" class="checkbox-btn item-check-btn" v-bind:class="{'check':item.checked=='1'}" @click="editCart(item,'checked')">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img v-lazy="'./../static/'+item.prodcutImg">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.productName}}</div>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.productPrice}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <a class="input-sub" @click="editCart(item,'minu')">-</a>
                        <span class="select-ipt">{{item.productNum}}</span>
                        <a class="input-add" @click="editCart(item,'add')">+</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{(item.productNum*item.productPrice)|currency('$')}}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="deleteCart(item,index)">
                      <svg class="icon icon-del"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-del"><svg id="icon-del" viewBox="0 0 32 32" width="100%" height="100%"><title>delete</title> <path d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z" class="path1"></path> <path d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path2"></path> <path d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path3"></path> <path d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path4"></path></svg></use></svg>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a href="javascipt:;" @click="toggleCheckAll">
                  <span class="checkbox-btn item-check-btn" v-bind:class="{'check':checkAllFlag}">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
                  <span>Select all</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                Item total: <span class="total-price">{{totalPrice}}</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red" :class="{'btn--dis':checkCount==0}" @click="checkOut">Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<style>
  .input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }
  .item-quantity .select-self-area{
    background:none;
    border: 1px solid #f0f0f0;
  }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
</style>
<script>
  import '@/assets/css/checkout.css'
  import NavHeader from '@/components/header'
  import NavFooter from '@/components/footer'
  import NavBread from '@/components/bread'
  import Modal from '@/components/Modal'
  import axios from 'axios'
  export default({
    data(){
        return{
            cartList:[],
          checkAllFlag:false

        }
    },
    components:{
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    mounted(){
        this.getCart()
    },
    computed:{
      totalPrice(){
        var money = 0;
        this.cartList.forEach((item)=>{
          if(item.checked=='1'){
            money += parseFloat(item.productPrice)*parseInt(item.productNum);
          }
        })
        return money;
      },
      checkCount(){
        var num=0;
        this.cartList.forEach((item)=>{
          if(item.checked=='1'){
             num++
          }
        })

        return num
      }
    },
    methods:{
        getCart(){
          this.$http.get('users/cartList').then((response)=>{
                var res=response.data;
                if(res.status=='0'){
                    this.cartList=res.result
                }
            })
        },
        editCart(item,flag){
            if(flag=="add"){
                item.productNum++;
              this.$store.commit("updateCartCount",1)
            }else if(flag=='checked'){
                item.checked=item.checked==1?0:1
            }else {
                if(item.productNum==0) return;
                 item.productNum--;
                this.$store.commit("updateCartCount",-1)
            }
          this.$http.post('users/cartEdit',{
               productId:item.productId,
               productNum:item.productNum
             }).then((res)=>{

             })
        },
        deleteCart(item,index){
            this.cartList.splice(index,1);
          this.$http.post('users/cartDel',{
              productId:item.productId,
            }).then((res)=>{

            })
        },
        toggleCheckAll(){
            this.checkAllFlag=!this.checkAllFlag;
            this.cartList.forEach( (item)=> {
              item.checked=this.checkAllFlag?1:0
            })
        },
       checkOut(){
            if(this.checkCount>0){
                this.$router.push({name:'Address',params:{addressId:123}})
            }
       }
    }
  })
</script>
