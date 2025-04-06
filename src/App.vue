<template>
  <div id="app">
    <div class="announcement-bar">
      <span>Unlock Free Shipping for Orders Above 3K</span>
    </div>
    <header>
      <div class="header-container">
        <div class="logo">
          <router-link to="/">
            <img src="./assets/pakdrop.png" alt="pakdrop" />
          </router-link>
        </div>
        <nav class="main-nav">
          <ul>
            <li>
              <router-link to="/">ALL</router-link>
            </li>
          </ul>
        </nav>
        <div class="header-actions">
          <div class="user-actions">
            <router-link to="/cart" class="action-link">
              <i class="fas fa-shopping-cart"></i>
              <span class="badge">{{ cartItemCount }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-column">
            <h3>Get in touch</h3>
            <div class="footer-logo">
              <img src="./assets/pakdrop.png" alt="pakdrop" width="150" />
            </div>
            <p>Plot No D1/3 Sector 21 K.I.A Karachi</p>
            <a href="#">pakdrop@zontec.club</a>
          </div>

          <div class="footer-column">
            <h3>Categories</h3>
            <ul>
              <li><router-link to="/">ALL</router-link></li>
            </ul>
          </div>

          <div class="footer-column">
            <h3>Newsletter Signup</h3>
            <p>Subscribe to our newsletter and get the latest updates</p>
            <div class="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>Copyright © 2025 | Powered by Data Network Solutions.</p>
          <div class="payment-methods">
            <img src="./assets/easypaisa.png" alt="easypaisa" />
            <img src="./assets/Frame.png" alt="Frame" />
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['cartItemCount'])
  },
  methods: {
    ...mapActions(['loadCart', 'loadProducts'])
  },
  created() {
    this.loadCart();
    this.loadProducts();
  }
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

.announcement-bar {
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 8px 0;
  font-size: 14px;
}

header {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.logo img {
  height: 40px;
}

.main-nav ul {
  display: flex;
  gap: 25px;
}

.main-nav a {
  font-weight: 600;
  font-size: 14px;
  transition: color 0.3s;
}

.main-nav a:hover {
  color: #666;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-bar {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.search-bar input {
  padding: 8px 12px;
  border: none;
  outline: none;
  min-width: 200px;
}

.search-bar button {
  background: none;
  border: none;
  padding: 0 10px;
  cursor: pointer;
}

.user-actions {
  display: flex;
  gap: 15px;
}

.action-link {
  position: relative;
  font-size: 18px;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #000;
  color: #fff;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 50%;
}

main {
  min-height: 70vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

footer {
  background-color: #242c33;
  color: #fff;
  padding: 40px 20px 20px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 30px;
}

.footer-column {
  flex: 1;
  min-width: 200px;
}

.footer-column h3 {
  margin-bottom: 20px;
  font-size: 16px;
}

.footer-column ul li {
  margin-bottom: 10px;
  font-size: 14px;
}

.footer-column a:hover {
  text-decoration: underline;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 15px;
}

.social-links a {
  color: #fff;
  font-size: 18px;
}

.newsletter-form {
  display: flex;
  margin-top: 15px;
}

.newsletter-form input {
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
}

.newsletter-form button {
  background-color: #666;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.newsletter-form button:hover {
  background-color: #555;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #3a3a3a;
  font-size: 14px;
}

.payment-methods {
  display: flex;
  gap: 10px;
}

.payment-methods img {
  height: 24px;
}

.whatsapp-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
}

.whatsapp-icon img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

/* Responsive styles */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 15px;
  }

  .main-nav ul {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .footer-content {
    flex-direction: column;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
</style>
