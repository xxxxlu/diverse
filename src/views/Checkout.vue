<template>
  <div class="checkout-page">
    <h1 class="page-title">Checkout</h1>

    <div v-if="cart.length === 0" class="empty-checkout">
      <div class="empty-checkout-icon">
        <i class="fas fa-shopping-bag"></i>
      </div>
      <h2>Your cart is empty.</h2>
      <p>Please add some products to your cart before proceeding to checkout.</p>
      <router-link to="/" class="return-shop-btn">Return To Shop</router-link>
    </div>

    <div v-else class="checkout-content">
      <div class="checkout-steps">
        <div class="step" :class="{ 'active': currentStep === 1, 'completed': currentStep > 1 }">
          <div class="step-number">1</div>
          <div class="step-label">Shipping</div>
        </div>
        <div class="step-connector"></div>
        <div class="step" :class="{ 'active': currentStep === 2, 'completed': currentStep > 2 }">
          <div class="step-number">2</div>
          <div class="step-label">Payment</div>
        </div>
        <div class="step-connector"></div>
        <div class="step" :class="{ 'active': currentStep === 3, 'completed': currentStep > 3 }">
          <div class="step-number">3</div>
          <div class="step-label">Confirmation</div>
        </div>
      </div>

      <div class="checkout-main">
        <router-view @proceed="nextStep"></router-view>
      </div>

      <div class="checkout-sidebar">
        <div class="order-summary">
          <h3 class="summary-title">Order Summary</h3>

          <div class="items-container">
            <div v-for="item in cart" :key="`${item.id}-${item.size}`" class="summary-item">
              <div class="item-image">
                <img :src="item.image" :alt="item.name">
              </div>
              <div class="item-details">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-variant">Size: {{ item.size }}</div>
                <div class="item-price">Rs.{{ item.price }} × {{ item.quantity }}</div>
              </div>
              <div class="item-total">Rs.{{ item.price * item.quantity }}</div>
            </div>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-row">
            <span>Subtotal:</span>
            <span>Rs.{{ cartTotal }}</span>
          </div>

          <div class="summary-row">
            <span>Shipping:</span>
            <span>{{ shipping > 0 ? `Rs.${shipping}` : 'Free' }}</span>
          </div>

          <div class="summary-row total-row">
            <span>Total:</span>
            <span>Rs.{{ orderTotal }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Checkout',
  data() {
    return {
      currentStep: 1,
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
    nextStep(data) {
      if (data && data.shipping !== undefined) {
        this.shipping = data.shipping;
      }
      this.currentStep++;

      if (this.currentStep === 2) {
        this.$router.push('/checkout/payment');
      } else if (this.currentStep === 3) {
        this.$router.push('/checkout/success');
      }
    }
  },
  created() {
    // Redirect to delivery page initially
    const path = this.$route.path;

    if (path === '/checkout') {
      this.currentStep = 1;
      this.$router.replace('/checkout');
    } else if (path === '/checkout/payment') {
      this.currentStep = 2;
    } else if (path === '/checkout/success') {
      this.currentStep = 3;
    }
  }
}
</script>

<style scoped>
.checkout-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
}

.empty-checkout {
  text-align: center;
  padding: 50px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.empty-checkout-icon {
  font-size: 60px;
  color: #ccc;
  margin-bottom: 20px;
}

.empty-checkout h2 {
  margin-bottom: 15px;
}

.empty-checkout p {
  margin-bottom: 20px;
  color: #666;
}

.return-shop-btn {
  display: inline-block;
  padding: 12px 25px;
  background-color: #333;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.return-shop-btn:hover {
  background-color: #222;
}

.checkout-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.checkout-steps {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #eee;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 8px;
}

.step.active .step-number {
  background-color: #4CAF50;
  color: white;
}

.step.completed .step-number {
  background-color: #333;
  color: white;
}

.step-label {
  font-size: 14px;
  color: #666;
}

.step.active .step-label {
  color: #333;
  font-weight: 600;
}

.step-connector {
  width: 60px;
  height: 2px;
  background-color: #eee;
  margin: 0 10px;
}

.checkout-main {
  flex: 1 1 60%;
}

.checkout-sidebar {
  flex: 1 1 30%;
}

.order-summary {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.summary-title {
  margin-bottom: 20px;
  font-size: 18px;
}

.items-container {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
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

.item-variant {
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
}

.item-price {
  font-size: 14px;
}

.item-total {
  font-weight: 600;
  align-self: center;
}

.summary-divider {
  height: 1px;
  background-color: #ddd;
  margin: 15px 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 16px;
}

.total-row {
  font-weight: 600;
  font-size: 18px;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .checkout-content {
    flex-direction: column;
  }

  .step-connector {
    width: 30px;
  }
}
</style>
