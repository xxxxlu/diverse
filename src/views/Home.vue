<template>
  <div class="home">
    <section class="hero">
      <h1>Welcome To Our Women's Activewear Collection!</h1>
      <p>
        Explore the best gym wear for women, designed for both style and performance.
        Whether you're hitting the gym, going for a run, or practicing yoga, our collection
        offers a variety of gym clothes for women to keep you comfortable and motivated.
        Shop women's gym clothes online and discover gym wear that matches your style and fitness goals.
      </p>
    </section>

    <section class="product-grid">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading products...</p>
      </div>
      <div v-else class="products">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="product-image">
            <router-link :to="`/products/${product.id}`">
              <img :src="product.image" :alt="product.name">
            </router-link>
            <button class="wishlist-btn" @click="addToWishlist(product)">
              <i class="far fa-heart"></i>
            </button>
            <div class="quick-view" @click="showQuickView(product)">
              <span>Quick View</span>
            </div>
          </div>
          <div class="product-info">
            <router-link :to="`/products/${product.id}`" class="product-name">
              {{ product.name }}
            </router-link>
            <div class="product-price">
              <span class="current-price">Rs.{{ product.price }}</span>
              <span class="original-price" v-if="product.originalPrice > product.price">
                Rs.{{ product.originalPrice }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="why-choose-us">
      <h2>Why Choose Our Women's Activewear?</h2>
      <p>
        At Diverse, we understand that the right gym wear can enhance your workout experience. Our women's gym clothes are made with high-quality fabrics that provide both comfort and functionality, making your fitness journey a stylish affair.
      </p>

      <h2>Our Top Picks for Gym Clothes for Women</h2>

      <h3>Sports Bra For Women:</h3>
      <p>
        Our sports bra line features a variety of styles, including high-impact sports bras for medium-to-high impact, and low-impact fashion bras to cater to different workout needs. Each sports bra is designed to keep you cool and dry during your exercise routine.
      </p>

      <h3>Yoga Pants:</h3>
      <p>
        Our yoga pants are perfect for every workout session. Made with stretchy and moisture-wicking fabric, they provide excellent support and comfort. Whether you practice yoga, pilates, or hit the gym, these will keep you looking stylish.
      </p>

      <h3>Gym Tops and Crop Tops:</h3>
      <p>
        Our women's tops and crop tops are designed to keep you comfortable during your workouts. Made from premium fabrics that dry quickly and allow your skin to breathe.
      </p>

      <h3>Gym Tights:</h3>
      <p>
        We offer a range of gym tights and yoga pants designed to keep you comfortable and stylish during your workouts. Our collection is perfect for women who want to combine functionality with fashion.
      </p>

      <h3>Gym Jackets and Hoodies:</h3>
      <p>
        Complete your workout look with our gym jackets and hoodies. These pieces are perfect for layering and are made with breathable, lightweight materials ideal for pre and post-workout warmth.
      </p>

      <h2>Shop Women's Gym Clothes Online in Pakistan</h2>
      <p>
        Our online activewear store offers a seamless shopping experience for ladies' gym wear in Pakistan. You can easily browse through our collection and find the ideal gear for women that suits your needs. We're just a click away from you!
      </p>

      <h2>Diverse Offer Wide Range of Options</h2>
      <p>
        We understand that ladies' gym wear is in high demand, so we have something for every fitness enthusiast. Our collection is designed to cater to different tastes and workout needs. We continuously update our collection to bring you the latest trends.
      </p>

      <h2>We Provide High-Quality Materials</h2>
      <p>
        Quality is paramount to our women's gym clothes, ensuring they are durable and long-lasting. Our fabrics are chosen for their breathability and moisture-wicking properties, keeping you comfortable throughout your workout.
      </p>

      <h2>Our Prices Are Affordable</h2>
      <p>
        Looking for ladies' gym wear in Pakistan at affordable prices? Our collection offers great value without compromising on quality. You can find stylish and functional gym wear that fits your budget.
      </p>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState(['products', 'loading'])
  },
  methods: {
    ...mapActions(['loadProducts']),

    addToWishlist(product) {
      // Functionality to be implemented
      console.log('Added to wishlist:', product.name);
    },

    showQuickView(product) {
      // Functionality to be implemented
      console.log('Quick view:', product.name);
    }
  },
  created() {
    this.loadProducts();
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.hero h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
}

.hero p {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  color: #666;
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

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.wishlist-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
}

.product-card:hover .wishlist-btn {
  opacity: 1;
}

.quick-view {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  padding: 8px;
  transform: translateY(100%);
  transition: transform 0.3s;
  cursor: pointer;
}

.product-card:hover .quick-view {
  transform: translateY(0);
}

.product-info {
  padding: 15px;
}

.product-name {
  font-weight: 600;
  display: block;
  margin-bottom: 10px;
  color: #333;
  text-decoration: none;
}

.product-price {
  display: flex;
  gap: 10px;
  align-items: center;
}

.current-price {
  font-weight: 600;
  color: #333;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.9em;
}

.why-choose-us {
  margin-top: 50px;
  line-height: 1.6;
}

.why-choose-us h2 {
  margin: 30px 0 15px;
  color: #333;
}

.why-choose-us h3 {
  margin: 20px 0 10px;
  color: #444;
}

.why-choose-us p {
  margin-bottom: 15px;
  color: #666;
}

@media (max-width: 768px) {
  .products {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px;
  }

  .hero h1 {
    font-size: 24px;
  }

  .why-choose-us h2 {
    font-size: 20px;
  }

  .why-choose-us h3 {
    font-size: 18px;
  }
}
</style>
