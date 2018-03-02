<template>
  <div>
    <nav-header  ></nav-header>
    <nav-bread>
      <span>商品列表</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods()" v-bind:class="{'sort-up':sortFlag}">Price <svg class="icon icon-arrow-short"><use   xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click.stop="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter"  v-bind:class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur':priceCheck=='all'}" @click="setPriceFilter('all')">All</a></dd>
              <dd v-for="(item,index) in priceFilter">
                <a href="javascript:void(0)" :class="{'cur':priceCheck==index}" @click="setPriceFilter(index)">{{item.startPrice}} - {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'./../static/'+item.productImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.productPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" style="text-align: center">
                <img src="./../../static/loading-svg/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">
        请先登录
      </p>
      <div slot="btn-group">
        <a class="btn btn--m" @click="mdShow=false">关闭</a>
      </div>
    </modal>
    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
         <span>加入购物车成功</span>
      </p>
      <div slot="btn-group">
        <a class="btn btn--m" @click="mdShowCart=false">继续购物</a>
        <router-link to="/cart" class="btn btn--m">查看购物车</router-link>
      </div>
    </modal>

    <nav-footer></nav-footer>

  </div>
</template>
<style>
  .btn:hover{
    background: #ffe5e6;
    transition:all .3s ease-out;
  }
</style>


<script>
  var socket =io.connect('http://60.205.182.245:3000');


  import '@/assets/css/base.css'
  import '@/assets/css/product.css'
  import NavHeader from '@/components/header'
  import NavFooter from '@/components/footer'
  import NavBread from '@/components/bread'
  import Modal from '@/components/Modal'
  import axios from 'axios'
  export default ({
    name:'',
    data(){
      return{


        page:1,
        pageSize:8,
        sortFlag:true,
        busy:true,
        goodList:[],
        mdShow:false,
        mdShowCart:false,
        socket_io:1,

        priceFilter:[
          {
            startPrice:'0.00',
            endPrice:'500.00'
          },
          {
            startPrice:'500.00',
            endPrice:'1000.00'
          },
          {
            startPrice:'1000.00',
            endPrice:'1500.00'
          },
          {
            startPrice:'1500.00',
            endPrice:'2000.00'
          }
        ],
        priceCheck:'all',
        overLayFlag:false,
        filterBy:false,
        loading:false,
      }
    },
    components:{
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    mounted(){

      this.getGoodLists(true)
    },
    methods:{


      getGoodLists(flag){
        this.loading=true;
        var param = {
          page:this.page,
          pageSize:this.pageSize,
          sort:this.sortFlag?1:-1,
          priceLevel:this.priceCheck
        };
        axios.get('/goods/list',{
            params:param
        }).then(res=>{
          this.loading=false;
          if(res.data.status=="0"){
            if(flag){
              this.goodList = this.goodList.concat(res.data.result.list);

              if(res.data.result.count==0){
                this.busy = true;
              }else{
                this.busy = false;
              }
            }else{
              console.log("0000")
              this.goodList = res.data.result.list;
              this.busy=false;
              console.log(this.busy)
            }
          }else{
            this.goodList = [];
          }


        })
      },
      showFilterPop(){
        this.overLayFlag=true;
        this.filterBy=true;

      },
      setPriceFilter(index){
        this.priceCheck=index;
        this.getGoodLists();
        this.closePop();
      },
      sortGoods(){
         this.sortFlag=!this.sortFlag;
         this.getGoodLists();

      },
      closePop(){
        this.overLayFlag=false;
        this.filterBy=false;
      },
      loadMore(){
        this.busy=true;
        setTimeout(()=> {
            this.page++;
            this.getGoodLists(true)
        },500)
      },
      addCart(productId){

          axios.post('/goods/addCart',{
             productId:productId
          }).then((res)=>{
              if(res.data.status!='0'){
                this.mdShow=true;

              }else {
                  this.mdShowCart=true;
                this.$store.commit("updateCartCount",1)
              }
          })
      },
      closeModal(){
        this.mdShow=false;
        this.mdShowCart=false;
      }
    }
  })

</script>
