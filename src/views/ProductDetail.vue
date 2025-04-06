<template>
  <div class="product-detail">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading product details...</p>
    </div>

    <div v-else-if="product" class="product-content">
      <div class="product-breadcrumb">
        <router-link to="/">Home</router-link> /
        <router-link :to="`/collections/${product.category.toLowerCase().replace(' ', '-')}`">
          {{ product.category }}
        </router-link> /
        <span>{{ product.name }}</span>
      </div>

      <div class="product-container">
        <div class="product-gallery">
          <div class="main-image">
            <img :src="product.image" :alt="product.name">
          </div>
          <!-- Thumbnails would go here in a real implementation -->
        </div>

        <div class="product-info">
          <h1 class="product-name">{{ product.name }}</h1>

          <div class="product-price">
            <span class="current-price">Rs.{{ product.price }}</span>
            <span class="original-price" v-if="product.originalPrice > product.price">
              Rs.{{ product.originalPrice }}
            </span>
            <span class="discount-badge" v-if="product.originalPrice > product.price">
              {{ Math.round((1 - product.price / product.originalPrice) * 100) }}% OFF
            </span>
          </div>

          <div class="product-rating">
            <div class="stars">
              <i v-for="n in 5" :key="n"
                :class="['fas fa-star', { 'filled': n <= Math.floor(product.rating), 'half-filled': n === Math.ceil(product.rating) && product.rating % 1 !== 0 }]">
              </i>
            </div>
            <span class="rating-value">{{ product.rating.toFixed(1) }}</span>
          </div>

          <div class="tax-info">Tax included.</div>

          <div class="size-selection">
            <h3>Size: {{ selectedSize || 'Select a size' }}</h3>
            <div class="size-options">
              <button
                v-for="size in product.sizes"
                :key="size"
                :class="['size-btn', { 'selected': selectedSize === size }]"
                @click="selectSize(size)"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <div class="color-selection" v-if="product.colors && product.colors.length">
            <h3>Color: {{ selectedColor || 'Select a color' }}</h3>
            <div class="color-options">
              <button
                v-for="color in product.colors"
                :key="color"
                :class="['color-btn', { 'selected': selectedColor === color }]"
                @click="selectColor(color)"
              >
                {{ color }}
              </button>
            </div>
          </div>

          <div class="quantity-selection">
            <h3>Quantity</h3>
            <div class="quantity-controls">
              <button @click="decreaseQuantity" class="quantity-btn">-</button>
              <input type="number" v-model.number="quantity" min="1" class="quantity-input">
              <button @click="increaseQuantity" class="quantity-btn">+</button>
            </div>
          </div>

          <div class="action-buttons">
            <button class="add-to-cart-btn" @click="addToCart" :disabled="!canAddToCart">
              {{ addToCartText }}
            </button>
            <button class="buy-now-btn" @click="buyNow" :disabled="!canAddToCart">
              BUY IT NOW
            </button>
            <button class="wishlist-btn">
              <i class="far fa-heart"></i> Add to Wishlist
            </button>
          </div>

          <div class="product-description">
            <h3>Description</h3>
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>

      <div class="product-tabs">
        <div class="tab-headers">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['tab-btn', { 'active': activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>

        <div class="tab-content">
          <div v-show="activeTab === 'description'" class="tab-pane">
            <p>{{ product.description }}</p>
          </div>

          <div v-show="activeTab === 'additional'" class="tab-pane">
            <table class="product-attributes">
              <tr>
                <th>Size</th>
                <td>{{ product.sizes.join(', ') }}</td>
              </tr>
              <tr v-if="product.colors && product.colors.length">
                <th>Color</th>
                <td>{{ product.colors.join(', ') }}</td>
              </tr>
            </table>
          </div>

          <div v-show="activeTab === 'returns'" class="tab-pane">
            <h3>Return & Exchange</h3>
            <p>At Diverse Active Wear, we strive to provide exceptional service to our customers. Please review our refund and exchange policy below:</p>
            <ul>
              <li>Refund requests will only be entertained within 7 days after receiving the order.</li>
              <li>Refunds will be issued in the form of vouchers, redeemable on future purchases.</li>
              <li>No cash returns will be provided.</li>
              <li>Exchange requests will only be entertained within 7 days after receiving the order.</li>
              <li>Exchange for Karachi orders will incur a fee of 250 RS.</li>
            </ul>
          </div>

          <div v-show="activeTab === 'reviews'" class="tab-pane">
            <h3>Customer Reviews</h3>
            <div class="review-summary">
              <div class="average-rating">
                <div class="rating-stars">
                  <i v-for="n in 5" :key="n"
                    :class="['fas fa-star', { 'filled': n <= Math.floor(product.rating), 'half-filled': n === Math.ceil(product.rating) && product.rating % 1 !== 0 }]">
                  </i>
                </div>
                <span class="rating-value">{{ product.rating.toFixed(1) }}</span>
              </div>
              <p>Be the first to write a review</p>
              <button class="write-review-btn">Write a review</button>
            </div>
          </div>
        </div>
      </div>

      <div class="related-products">
        <h2>You may also like</h2>
        <!-- Related products would go here -->
      </div>
    </div>

    <div v-else class="error-message">
      <p>Product not found. Please check the URL and try again.</p>
      <router-link to="/" class="return-home">Return to Home</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProductDetail',
  data() {
    return {
      selectedSize: null,
      selectedColor: null,
      quantity: 1,
      activeTab: 'description',
      tabs: [
        { id: 'description', name: 'Description' },
        { id: 'additional', name: 'Additional Information' },
        { id: 'returns', name: 'Return & Exchange' },
        { id: 'reviews', name: 'Reviews' }
      ]
    };
  },
  computed: {
    ...mapState({
      product: state => state.currentProduct,
      loading: state => state.loading
    }),
    canAddToCart() {
      return this.selectedSize !== null;
    },
    addToCartText() {
      return this.canAddToCart ? 'ADD TO CART' : 'SELECT SIZE';
    }
  },
  methods: {
    ...mapActions(['getProduct', 'addToCart']),

    selectSize(size) {
      this.selectedSize = size;
    },

    selectColor(color) {
      this.selectedColor = color;
    },

    increaseQuantity() {
      this.quantity++;
    },

    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    addToCart() {
      if (!this.canAddToCart) return;

      this.$store.dispatch('addToCart', {
        product: this.product,
        quantity: this.quantity,
        size: this.selectedSize
      });

      // Show success message
      alert(`${this.quantity} x ${this.product.name} (${this.selectedSize}) added to cart!`);
    },

    buyNow() {
      if (!this.canAddToCart) return;

      this.addToCart();
      this.$router.push('/cart');
    }
  },
  created() {
    const productId = this.$route.params.id;
    this.getProduct(productId);
  }
}
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.product-breadcrumb {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
}

.product-breadcrumb a {
  color: #333;
  text-decoration: none;
}

.product-breadcrumb a:hover {
  text-decoration: underline;
}

.product-container {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
}

.product-gallery {
  flex: 1;
}

.main-image {
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
  border: 1px solid #eee;
  border-radius: 8px;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.current-price {
  font-size: 22px;
  font-weight: 600;
}

.original-price {
  font-size: 18px;
  text-decoration: line-through;
  color: #999;
}

.discount-badge {
  background-color: #f44336;
  color: white;
  padding: 3px 8px;
  font-size: 12px;
  border-radius: 4px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.stars {
  display: flex;
}

.stars i {
  color: #ddd;
  margin-right: 3px;
}

.stars i.filled {
  color: #ffc107;
}

.stars i.half-filled {
  position: relative;
}

.stars i.half-filled:before {
  content: "\f005";
  color: #ffc107;
  position: absolute;
  width: 50%;
  overflow: hidden;
}

.tax-info {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.size-selection, .color-selection, .quantity-selection {
  margin-bottom: 20px;
}

.size-selection h3, .color-selection h3, .quantity-selection h3 {
  font-size: 16px;
  margin-bottom: 10px;
}

.size-options, .color-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.size-btn, .color-btn {
  padding: 8px 15px;
  background: none;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: all 0.3s;
}

.size-btn.selected, .color-btn.selected {
  background-color: #333;
  color: white;
  border-color: #333;
}

.quantity-controls {
  display: flex;
  width: 120px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.quantity-btn {
  width: 40px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.quantity-input {
  width: 40px;
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

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.add-to-cart-btn, .buy-now-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-btn {
  background-color: #333;
  color: white;
}

.buy-now-btn {
  background-color: #4CAF50;
  color: white;
}

.add-to-cart-btn:disabled, .buy-now-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.wishlist-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  background: none;
  border: 1px solid #ddd;
  cursor: pointer;
}

.product-description {
  margin-top: 30px;
  line-height: 1.6;
}

.product-description h3 {
  margin-bottom: 15px;
}

.product-tabs {
  margin-bottom: 40px;
}

.tab-headers {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.tab-btn {
  padding: 10px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: #666;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
}

.tab-btn.active {
  color: #333;
  border-bottom-color: #333;
}

.tab-pane {
  line-height: 1.6;
}

.product-attributes {
  width: 100%;
  border-collapse: collapse;
}

.product-attributes th, .product-attributes td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.product-attributes th {
  width: 150px;
  color: #333;
}

.review-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.average-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.write-review-btn {
  margin-top: 15px;
  padding: 8px 15px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.related-products h2 {
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
}

.error-message {
  text-align: center;
  padding: 50px;
}

.return-home {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .product-container {
    flex-direction: column;
  }

  .tab-headers {
    flex-wrap: wrap;
  }

  .tab-btn {
    padding: 10px 15px;
    font-size: 14px;
  }
}
</style>
