<template>
  <div class="cart-page">
    <h1 class="page-title">Your Shopping Cart</h1>

    <div v-if="cart.length === 0" class="empty-cart">
      <div class="empty-cart-icon">
        <i class="fas fa-shopping-cart"></i>
      </div>
      <h2>Your cart is empty.</h2>
      <p>Before proceed to checkout you must add some products to your shopping cart.<br>
        You will find a lot of interesting products on our "Shop" page.</p>
      <router-link to="/" class="return-shop-btn">Return To Shop</router-link>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <table class="cart-table">
          <thead>
            <tr>
              <th class="product-col">Product</th>
              <th class="price-col">Price</th>
              <th class="quantity-col">Quantity</th>
              <th class="total-col">Total</th>
              <th class="remove-col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="`${item.id}-${item.size}`" class="cart-item">
              <td class="product-col">
                <div class="product-info">
                  <div class="product-image">
                    <router-link :to="`/products/${item.id}`">
                      <img :src="item.image" :alt="item.name">
                    </router-link>
                  </div>
                  <div class="product-details">
                    <router-link :to="`/products/${item.id}`" class="product-name">
                      {{ item.name }}
                    </router-link>
                    <div class="product-variant">Size: {{ item.size }}</div>
                  </div>
                </div>
              </td>
              <td class="price-col">Rs.{{ item.price }}</td>
              <td class="quantity-col">
                <div class="quantity-controls">
                  <button @click="decreaseQuantity(item)" class="quantity-btn">-</button>
                  <input
                    type="number"
                    v-model.number="item.quantity"
                    min="1"
                    @change="updateCartItem(item)"
                    class="quantity-input"
                  >
                  <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
                </div>
              </td>
              <td class="total-col">Rs.{{ item.price * item.quantity }}</td>
              <td class="remove-col">
                <button @click="removeFromCart(item)" class="remove-btn">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="cart-sidebar">
        <div class="cart-summary">
          <h3 class="summary-title">Order Summary</h3>

          <div class="coupon-section">
            <input type="text" placeholder="Coupon code" class="coupon-input">
            <button class="apply-coupon-btn">Apply</button>
          </div>

          <div class="summary-row">
            <span>Subtotal:</span>
            <span>Rs.{{ cartTotal }}</span>
          </div>

          <div class="summary-row">
            <span>Shipping:</span>
            <span>Calculated at checkout</span>
          </div>

          <div class="summary-row total-row">
            <span>Total:</span>
            <span>Rs.{{ cartTotal }}</span>
          </div>

          <div class="checkout-actions">
            <button @click="proceedToCheckout" class="checkout-btn">
              Proceed to Checkout
            </button>
            <router-link to="/" class="continue-shopping">
              Continue Shopping
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Cart',
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartTotal'])
  },
  methods: {
    ...mapActions(['updateCartItem', 'removeFromCart', 'clearCart']),

    increaseQuantity(item) {
      this.updateCartItem({
        productId: item.id,
        size: item.size,
        quantity: item.quantity + 1
      });
    },

    decreaseQuantity(item) {
      if (item.quantity > 1) {
        this.updateCartItem({
          productId: item.id,
          size: item.size,
          quantity: item.quantity - 1
        });
      }
    },

    proceedToCheckout() {
      this.$router.push('/checkout');
    }
  }
}
</script>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
}

.empty-cart {
  text-align: center;
  padding: 50px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.empty-cart-icon {
  font-size: 60px;
  color: #ccc;
  margin-bottom: 20px;
}

.empty-cart h2 {
  margin-bottom: 15px;
}

.empty-cart p {
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

.cart-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.cart-items {
  flex: 1 1 65%;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
}

.cart-table th {
  text-align: left;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  font-weight: 600;
}

.cart-table td {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.product-image {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border: 1px solid #eee;
  border-radius: 4px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-name {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
  text-decoration: none;
}

.product-variant {
  font-size: 14px;
  color: #666;
}

.quantity-controls {
  display: flex;
  width: 100px;
  height: 35px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.quantity-btn {
  width: 35px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.quantity-input {
  width: 30px;
  text-align: center;
  border: none;
  outline: none;
  font-size: 14px;
  -moz-appearance: textfield;
}

.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.remove-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s;
}

.remove-btn:hover {
  color: #f44336;
}

.cart-sidebar {
  flex: 1 1 30%;
}

.cart-summary {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.summary-title {
  margin-bottom: 20px;
  font-size: 18px;
}

.coupon-section {
  display: flex;
  margin-bottom: 20px;
}

.coupon-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.apply-coupon-btn {
  padding: 10px 15px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 16px;
}

.total-row {
  border-top: 1px solid #ddd;
  padding-top: 15px;
  font-weight: 600;
  font-size: 18px;
}

.checkout-actions {
  margin-top: 20px;
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 10px;
  transition: background-color 0.3s;
}

.checkout-btn:hover {
  background-color: #45a049;
}

.continue-shopping {
  display: block;
  text-align: center;
  text-decoration: none;
  color: #333;
  margin-top: 10px;
}

.continue-shopping:hover {
  text-decoration: underline;
}

/* Responsive styles */
@media (max-width: 768px) {
  .cart-content {
    flex-direction: column;
  }

  .cart-table {
    font-size: 14px;
  }

  .product-image {
    width: 60px;
    height: 60px;
  }

  .quantity-controls {
    width: 80px;
  }

  .price-col, .total-col {
    white-space: nowrap;
  }
}

@media (max-width: 576px) {
  .cart-table thead {
    display: none;
  }

  .cart-table tbody, .cart-table tr, .cart-table td {
    display: block;
    width: 100%;
  }

  .cart-table tr {
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }

  .cart-table td {
    position: relative;
    padding: 10px 10px 10px 35%;
    text-align: right;
    border-bottom: 1px solid #eee;
  }

  .cart-table td:before {
    content: attr(data-label);
    position: absolute;
    left: 10px;
    font-weight: 600;
  }

  .product-col {
    padding: 10px !important;
  }

  .product-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .product-image {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    margin-bottom: 10px;
  }
}
</style>
