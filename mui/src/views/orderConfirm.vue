<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>订单确认</span>
    </nav-bread>
    <!-- process step -->
    <div class="check-step">
      <ul>
        <li class="cur"><span>Confirm</span> address</li>
        <li class="cur"><span>View your</span> order</li>
        <li><span>Make</span> payment</li>
        <li><span>Order</span> confirmation</li>
      </ul>
    </div>
    <!-- order list -->
    <div class="page-title-normal checkout-title">
      <h2><span>Order content</span></h2>
    </div>
    <div class="item-list-wrap confirm-item-list-wrap">
      <div class="cart-item order-item">
        <div class="cart-item-head">
          <ul>
            <li>Order contents</li>
            <li>Price</li>
            <li>Quantity</li>
            <li>Subtotal</li>
          </ul>
        </div>
        <ul class="cart-item-list">
          <li>
            <div class="cart-tab-1">
              <div class="cart-item-pic">

              </div>
              <div class="cart-item-title">
                <div class="item-name">小米6</div>

              </div>
            </div>
            <div class="cart-tab-2">
              <div class="item-price">2499</div>
            </div>
            <div class="cart-tab-3">
              <div class="item-quantity">
                <div class="select-self">
                  <div class="select-self-area">
                    <span class="select-ipt">×1</span>
                  </div>
                </div>
                <div class="item-stock item-stock-no">In Stock</div>
              </div>
            </div>
            <div class="cart-tab-4">
              <div class="item-price-total">$2499</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Price count -->
    <div class="price-count-wrap">
      <div class="price-count">
        <ul>
          <li>
            <span>Item subtotal:</span>
            <span>$2499</span>
          </li>
          <li>
            <span>Shipping:</span>
            <span>$100</span>
          </li>
          <li>
            <span>Discount:</span>
            <span>$0</span>
          </li>
          <li>
            <span>Tax:</span>
            <span>$400</span>
          </li>
          <li class="order-total-price">
            <span>Order total:</span>
            <span>$1999</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="order-foot-wrap">
      <div class="prev-btn-wrap">
        <button class="btn btn--m">Previous</button>
      </div>
      <div class="next-btn-wrap">
        <button class="btn btn--m btn--red">Proceed to payment</button>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
L<script>
  import NavHeader from '@/components/header'
  import NavFooter from '@/components/footer'
  import NavBread from '@/components/bread'
  export default({
    data(){
        return{
        }
    },
    components:{
      NavHeader,
      NavFooter,
      NavBread,
    },
  })
</script>
