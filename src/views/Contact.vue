<template>
  <div class="contact-page">
    <h1 class="page-title">Contact Us</h1>

    <div class="contact-content">
      <div class="contact-info">
        <h2 class="section-title">Get in Touch</h2>

        <p class="contact-description">
          Have questions about our products or services? Need help with an order?
          We're here to help. Reach out to us using the form or contact information below.
        </p>

        <div class="contact-methods">
          <div class="contact-method">
            <div class="method-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="method-details">
              <h3>Address</h3>
              <p>Plot No D1/3 Sector 21 K.I.A Karachi, Pakistan</p>
            </div>
          </div>

          <div class="contact-method">
            <div class="method-icon">
              <i class="fas fa-phone-alt"></i>
            </div>
            <div class="method-details">
              <h3>Phone</h3>
              <p><a href="tel:+923090554482">+92 309 055 4482</a></p>
            </div>
          </div>

          <div class="contact-method">
            <div class="method-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <div class="method-details">
              <h3>Email</h3>
              <p><a href="mailto:hr.diversestore@gmail.com">hr.diversestore@gmail.com</a></p>
            </div>
          </div>

          <div class="contact-method">
            <div class="method-icon">
              <i class="fas fa-clock"></i>
            </div>
            <div class="method-details">
              <h3>Business Hours</h3>
              <p>Monday - Saturday: 9am - 6pm<br>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div class="social-links">
          <h3>Follow Us</h3>
          <div class="social-icons">
            <a href="https://www.facebook.com/diverseactivewear" target="_blank" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/diverseactivewear/" target="_blank" class="social-icon">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@diverseactive" target="_blank" class="social-icon">
              <i class="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="contact-form-container">
        <h2 class="section-title">Send a Message</h2>

        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name <span class="required">*</span></label>
              <input
                type="text"
                id="firstName"
                v-model="form.firstName"
                required
              >
            </div>
            <div class="form-group">
              <label for="lastName">Last Name <span class="required">*</span></label>
              <input
                type="text"
                id="lastName"
                v-model="form.lastName"
                required
              >
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email <span class="required">*</span></label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              required
            >
          </div>

          <div class="form-group">
            <label for="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              v-model="form.phone"
            >
          </div>

          <div class="form-group">
            <label for="subject">Subject <span class="required">*</span></label>
            <input
              type="text"
              id="subject"
              v-model="form.subject"
              required
            >
          </div>

          <div class="form-group">
            <label for="message">Message <span class="required">*</span></label>
            <textarea
              id="message"
              v-model="form.message"
              rows="5"
              required
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-btn" :disabled="submitting">
              {{ submitting ? 'Sending...' : 'Send Message' }}
            </button>
          </div>

          <div v-if="formSubmitted" class="form-success">
            <i class="fas fa-check-circle"></i>
            Thank you for your message. We'll get back to you as soon as possible.
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      },
      submitting: false,
      formSubmitted: false
    };
  },
  methods: {
    submitForm() {
      this.submitting = true;

      // Simulate form submission with a timeout
      setTimeout(() => {
        this.submitting = false;
        this.formSubmitted = true;

        // Reset form after 5 seconds
        setTimeout(() => {
          this.formSubmitted = false;
          this.form = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          };
        }, 5000);
      }, 1500);
    }
  }
}
</script>

<style scoped>
.contact-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
}

.contact-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 40px;
}

.contact-info {
  flex: 1;
  min-width: 300px;
}

.contact-form-container {
  flex: 1;
  min-width: 300px;
}

.section-title {
  font-size: 22px;
  margin-bottom: 20px;
  color: #333;
}

.contact-description {
  margin-bottom: 30px;
  color: #666;
  line-height: 1.6;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.contact-method {
  display: flex;
  align-items: flex-start;
}

.method-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #333;
  margin-right: 15px;
}

.method-details h3 {
  margin: 0 0 5px;
  font-size: 16px;
}

.method-details p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.method-details a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
}

.method-details a:hover {
  color: #333;
}

.social-links h3 {
  margin-bottom: 15px;
  font-size: 16px;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #333;
  transition: background-color 0.3s, color 0.3s;
}

.social-icon:hover {
  background-color: #333;
  color: white;
}

.contact-form {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-group {
  flex: 1;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
}

.required {
  color: #f44336;
}

input, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  font-size: 16px;
}

textarea {
  resize: vertical;
}

input:focus, textarea:focus {
  border-color: #666;
}

.form-actions {
  margin-top: 10px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #222;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.form-success {
  margin-top: 20px;
  padding: 15px;
  background-color: #e8f5e9;
  border-radius: 4px;
  color: #2e7d32;
  display: flex;
  align-items: center;
  font-weight: 600;
}

.form-success i {
  font-size: 20px;
  margin-right: 10px;
}

.map-container {
  margin-bottom: 40px;
}

.map {
  height: 400px;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .contact-content {
    flex-direction: column;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
