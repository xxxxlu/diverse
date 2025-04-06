<template>
  <div class="success-page">
    <div class="success-icon">
      <i class="fas fa-check-circle"></i>
    </div>

    <h2 class="success-title">Your order has been placed!</h2>

    <div class="order-number">
      <span>Order Number:</span>
      <strong>{{ orderNumber }}</strong>
    </div>

    <p class="success-message">
      Thank you for your purchase. We have received your order and will process it shortly.
      You will receive a confirmation email with your order details.
    </p>

    <div class="order-summary">
      <h3 class="summary-title">Order Summary</h3>

      <div class="summary-section">
        <h4 class="section-title">Items</h4>
        <div class="order-items">
          <div v-for="item in cart" :key="`${item.id}-${item.size}`" class="order-item">
            <div class="item-image">
              <img :src="item.image" :alt="item.name">
            </div>
            <div class="item-details">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-variant">Size: {{ item.size }}</div>
              <div class="item-quantity">Qty: {{ item.quantity }}</div>
            </div>
            <div class="item-price">Rs.{{ item.price * item.quantity }}</div>
          </div>
        </div>
      </div>

      <div class="summary-section">
        <h4 class="section-title">Shipping Information</h4>
        <div v-if="shippingInfo" class="shipping-details">
          <p>{{ shippingInfo.firstName }} {{ shippingInfo.lastName }}</p>
          <p>{{ shippingInfo.address }}</p>
          <p>{{ shippingInfo.city }}, {{ shippingInfo.postal }}</p>
          <p>{{ shippingInfo.phone }}</p>
          <p>{{ shippingInfo.email }}</p>
        </div>
      </div>

      <div class="summary-section">
        <h4 class="section-title">Payment Information</h4>
        <div v-if="paymentInfo" class="payment-details">
          <p>
            <strong>Payment Method:</strong>
            {{ paymentInfo.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card' }}
          </p>
          <p>
            <strong>Billing Address:</strong>
            {{ paymentInfo.billingAddress === 'Same as shipping' ? 'Same as shipping address' :
            `${paymentInfo.billingAddress.firstName} ${paymentInfo.billingAddress.lastName},
            ${paymentInfo.billingAddress.address}, ${paymentInfo.billingAddress.city}` }}
          </p>
        </div>
      </div>

      <div class="summary-section">
        <h4 class="section-title">Order Total</h4>
        <div class="order-totals">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>Rs.{{ cartTotal }}</span>
          </div>
          <div class="total-row">
            <span>Shipping:</span>
            <span>{{ shipping > 0 ? `Rs.${shipping}` : 'Free' }}</span>
          </div>
          <div class="total-row">
            <span>Total:</span>
            <span class="order-total">Rs.{{ orderTotal }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="action-buttons">
      <router-link to="/" class="continue-shopping-btn">
        Continue Shopping
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Success',
  data() {
    return {
      orderNumber: '',
      shippingInfo: null,
      paymentInfo: null,
      shipping: 0
    };
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartTotal']),
    orderTotal() {
      return this.cartTotal + this.shipping;
    }
  },
  methods: {
    ...mapActions(['clearCart'])
  },
  created() {
    // Get order number
    const orderNum = localStorage.getItem('orderNumber');
    this.orderNumber = orderNum || 'ORD-' + Date.now().toString().substring(5);

    // Get shipping info
    const shippingData = localStorage.getItem('shippingInfo');
    if (shippingData) {
      this.shippingInfo = JSON.parse(shippingData);

      // Get shipping cost based on shipping method
      if (this.shippingInfo.shippingMethod === 'express') {
        this.shipping = 300;
      }
    }

    // Get payment info
    const paymentData = localStorage.getItem('paymentInfo');
    if (paymentData) {
      this.paymentInfo = JSON.parse(paymentData);
    }

    // In a real application, we would send the order to a backend system here
    // For now, we'll just simulate a successful order by clearing the cart
    setTimeout(() => {
      // Clear the cart after 2 seconds to allow the user to see the order summary
      this.clearCart();
    }, 4000);
  }
}
</script>

<style scoped>
.success-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.success-icon {
  font-size: 80px;
  color: #4CAF50;
  margin-bottom: 20px;
}

.success-title {
  font-size: 28px;
  margin-bottom: 15px;
  color: #333;
}

.order-number {
  margin-bottom: 20px;
  font-size: 18px;
}

.order-number strong {
  margin-left: 10px;
  color: #333;
}

.success-message {
  margin-bottom: 30px;
  color: #666;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.order-summary {
  text-align: left;
  margin-bottom: 30px;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.summary-title {
  background-color: #f9f9f9;
  padding: 15px;
  margin: 0;
  border-bottom: 1px solid #eee;
  font-size: 20px;
}

.summary-section {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.summary-section:last-child {
  border-bottom: none;
}

.section-title {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
  color: #333;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.order-item {
  display: flex;
  align-items: center;
}

.item-image {
  width: 60px;
  height: 60px;
  overflow: hidden;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-right: 15px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-weight: 600;
  margin-bottom: 5px;
}

.item-variant, .item-quantity {
  font-size: 14px;
  color: #666;
}

.item-price {
  font-weight: 600;
}

.shipping-details p, .payment-details p {
  margin: 5px 0;
  color: #666;
}

.order-totals {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.total-row {
  display: flex;
  justify-content: space-between;
}

.order-total {
  font-weight: 600;
  font-size: 18px;
  color: #333;
}

.action-buttons {
  margin-top: 20px;
}

.continue-shopping-btn {
  display: inline-block;
  padding: 12px 25px;
  background-color: #333;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.continue-shopping-btn:hover {
  background-color: #222;
}

@media (max-width: 576px) {
  .success-page {
    padding: 20px;
  }

  .success-icon {
    font-size: 60px;
  }

  .success-title {
    font-size: 24px;
  }

  .order-item {
    flex-wrap: wrap;
  }

  .item-price {
    width: 100%;
    text-align: right;
    margin-top: 10px;
  }
}
</style>
