<template>
  <div class="delivery-info">
    <h2 class="section-title">Shipping Information</h2>

    <form @submit.prevent="submitForm" class="delivery-form">
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
        <label for="email">Email Address <span class="required">*</span></label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
        >
      </div>

      <div class="form-group">
        <label for="phone">Phone Number <span class="required">*</span></label>
        <input
          type="tel"
          id="phone"
          v-model="form.phone"
          required
        >
      </div>

      <div class="form-group">
        <label for="address">Address <span class="required">*</span></label>
        <input
          type="text"
          id="address"
          v-model="form.address"
          required
        >
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="city">City <span class="required">*</span></label>
          <input
            type="text"
            id="city"
            v-model="form.city"
            required
          >
        </div>
        <div class="form-group">
          <label for="postal">Postal Code <span class="required">*</span></label>
          <input
            type="text"
            id="postal"
            v-model="form.postal"
            required
          >
        </div>
      </div>

      <div class="form-group">
        <label>Shipping Method <span class="required">*</span></label>
        <div class="shipping-options">
          <div
            v-for="option in shippingOptions"
            :key="option.id"
            :class="['shipping-option', { 'selected': form.shippingMethod === option.id }]"
            @click="selectShipping(option.id)"
          >
            <div class="option-details">
              <div class="option-name">{{ option.name }}</div>
              <div class="option-description">{{ option.description }}</div>
            </div>
            <div class="option-price">{{ option.price > 0 ? `Rs.${option.price}` : 'Free' }}</div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="proceed-btn" :disabled="!isFormValid">
          Continue to Payment
        </button>
        <router-link to="/cart" class="back-btn">
          Return to Cart
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'DeliveryInfo',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postal: '',
        shippingMethod: 'standard'
      },
      shippingOptions: [
        {
          id: 'standard',
          name: 'Standard Shipping',
          description: 'Delivery in 3-5 business days',
          price: 0
        },
        {
          id: 'express',
          name: 'Express Shipping',
          description: 'Delivery in 1-2 business days',
          price: 300
        }
      ]
    };
  },
  computed: {
    isFormValid() {
      const { firstName, lastName, email, phone, address, city, postal, shippingMethod } = this.form;
      return firstName && lastName && email && phone && address && city && postal && shippingMethod;
    },
    selectedShippingOption() {
      return this.shippingOptions.find(option => option.id === this.form.shippingMethod);
    }
  },
  methods: {
    selectShipping(methodId) {
      this.form.shippingMethod = methodId;
    },
    submitForm() {
      if (!this.isFormValid) return;

      // Save shipping info to localStorage
      localStorage.setItem('shippingInfo', JSON.stringify(this.form));

      // Emit event to parent with shipping cost
      this.$emit('proceed', {
        shipping: this.selectedShippingOption.price
      });
    }
  },
  created() {
    // Check if we have saved shipping info
    const savedInfo = localStorage.getItem('shippingInfo');
    if (savedInfo) {
      this.form = JSON.parse(savedInfo);
    }
  }
}
</script>

<style scoped>
.delivery-info {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 22px;
  margin-bottom: 20px;
  color: #333;
}

.delivery-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
}

.required {
  color: #f44336;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  font-size: 16px;
}

input:focus {
  border-color: #666;
}

.shipping-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.shipping-option {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
}

.shipping-option.selected {
  border-color: #4CAF50;
  background-color: rgba(76, 175, 80, 0.05);
}

.option-name {
  font-weight: 600;
  margin-bottom: 5px;
}

.option-description {
  font-size: 14px;
  color: #666;
}

.option-price {
  font-weight: 600;
  align-self: center;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.proceed-btn {
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.proceed-btn:hover {
  background-color: #45a049;
}

.proceed-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.back-btn {
  text-align: center;
  text-decoration: none;
  color: #333;
  font-size: 14px;
  padding: 10px;
}

.back-btn:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
