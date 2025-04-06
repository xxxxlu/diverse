<template>
  <div class="payment-info">
    <h2 class="section-title">Payment Method</h2>

    <form @submit.prevent="submitForm" class="payment-form">
      <div class="payment-options">
        <div
          v-for="option in paymentOptions"
          :key="option.id"
          :class="['payment-option', { 'selected': form.paymentMethod === option.id }]"
          @click="selectPayment(option.id)"
        >
          <div class="option-icon">
            <img :src="option.image" :alt="option.name" style="width: 100px;height: 70px;">
          </div>
          <div class="option-details">
            <div class="option-name">{{ option.name }}</div>
            <div class="option-description">{{ option.description }}</div>
          </div>
        </div>
      </div>

      <div class="billing-address">
        <h3 class="subsection-title">Billing Address</h3>

        <div class="address-options">
          <label class="checkbox-container">
            <input
              type="checkbox"
              v-model="form.sameAsShipping"
              @change="updateBillingAddress"
            >
            <span class="checkmark"></span>
            Same as shipping address
          </label>
        </div>

        <div v-if="!form.sameAsShipping" class="billing-form">
          <div class="form-row">
            <div class="form-group">
              <label for="billingFirstName">First Name <span class="required">*</span></label>
              <input
                type="text"
                id="billingFirstName"
                v-model="form.billingFirstName"
                required
              >
            </div>
            <div class="form-group">
              <label for="billingLastName">Last Name <span class="required">*</span></label>
              <input
                type="text"
                id="billingLastName"
                v-model="form.billingLastName"
                required
              >
            </div>
          </div>

          <div class="form-group">
            <label for="billingAddress">Address <span class="required">*</span></label>
            <input
              type="text"
              id="billingAddress"
              v-model="form.billingAddress"
              required
            >
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="billingCity">City <span class="required">*</span></label>
              <input
                type="text"
                id="billingCity"
                v-model="form.billingCity"
                required
              >
            </div>
            <div class="form-group">
              <label for="billingPostal">Postal Code <span class="required">*</span></label>
              <input
                type="text"
                id="billingPostal"
                v-model="form.billingPostal"
                required
              >
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="proceed-btn" :disabled="!isFormValid">
          Place Order
        </button>
        <button type="button" class="back-btn" @click="goBack">
          Return to Shipping
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import FramePng from '../../assets/Frame.png'
import easypaisaPng from '../../assets/easypaisa.png'
export default {
  name: 'Payment',
  data() {
    return {
      form: {
        paymentMethod: 'cod',
        cardHolder: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        sameAsShipping: true,
        billingFirstName: '',
        billingLastName: '',
        billingAddress: '',
        billingCity: '',
        billingPostal: ''
      },
      paymentOptions: [
        {
          id: 'cod',
          name: 'frame',
          description: 'Pay when you receive your order',
          icon: 'fas fa-money-bill-wave',
          image: FramePng
        },
        {
          id: 'card',
          name: 'easypaisa',
          description: 'Pay with your card',
          icon: 'fas fa-credit-card',
          image: easypaisaPng
        }
      ],
      shippingInfo: null
    };
  },
  computed: {
    isFormValid() {
      const { paymentMethod, sameAsShipping } = this.form;

      if (paymentMethod === 'card') {
        const { cardHolder, cardNumber, expiryDate, cvv } = this.form;
        if (!cardHolder || !cardNumber || !expiryDate || !cvv) {
          return false;
        }
      }

      if (!sameAsShipping) {
        const {
          billingFirstName, billingLastName, billingAddress,
          billingCity, billingPostal
        } = this.form;

        if (!billingFirstName || !billingLastName || !billingAddress ||
            !billingCity || !billingPostal) {
          return false;
        }
      }

      return true;
    }
  },
  methods: {
    selectPayment(methodId) {
      this.form.paymentMethod = methodId;
    },

    updateBillingAddress() {
      if (this.form.sameAsShipping && this.shippingInfo) {
        this.form.billingFirstName = this.shippingInfo.firstName;
        this.form.billingLastName = this.shippingInfo.lastName;
        this.form.billingAddress = this.shippingInfo.address;
        this.form.billingCity = this.shippingInfo.city;
        this.form.billingPostal = this.shippingInfo.postal;
      }
    },

    goBack() {
      this.$router.push('/checkout');
    },

    submitForm() {
      if (!this.isFormValid) return;

      // Save payment info
      localStorage.setItem('paymentInfo', JSON.stringify({
        paymentMethod: this.form.paymentMethod,
        billingAddress: this.form.sameAsShipping ? 'Same as shipping' : {
          firstName: this.form.billingFirstName,
          lastName: this.form.billingLastName,
          address: this.form.billingAddress,
          city: this.form.billingCity,
          postal: this.form.billingPostal
        }
      }));

      // Generate order number
      const orderNumber = 'ORD-' + Date.now().toString().substring(5);
      localStorage.setItem('orderNumber', orderNumber);

      // Emit proceed event to parent
      this.$emit('proceed');
    }
  },
  created() {
    // Get shipping info
    const savedShippingInfo = localStorage.getItem('shippingInfo');
    if (savedShippingInfo) {
      this.shippingInfo = JSON.parse(savedShippingInfo);

      // If same as shipping is checked, fill in billing address
      if (this.form.sameAsShipping) {
        this.updateBillingAddress();
      }
    }

    // Check if we have saved payment info
    const savedPaymentInfo = localStorage.getItem('paymentInfo');
    if (savedPaymentInfo) {
      const paymentInfo = JSON.parse(savedPaymentInfo);
      this.form.paymentMethod = paymentInfo.paymentMethod;

      if (paymentInfo.billingAddress !== 'Same as shipping') {
        this.form.sameAsShipping = false;
        this.form.billingFirstName = paymentInfo.billingAddress.firstName;
        this.form.billingLastName = paymentInfo.billingAddress.lastName;
        this.form.billingAddress = paymentInfo.billingAddress.address;
        this.form.billingCity = paymentInfo.billingAddress.city;
        this.form.billingPostal = paymentInfo.billingAddress.postal;
      }
    }
  }
}
</script>

<style scoped>
.payment-info {
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

.subsection-title {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.payment-option {
  display: flex;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
}

.payment-option.selected {
  border-color: #4CAF50;
  background-color: rgba(76, 175, 80, 0.05);
}

.option-icon {
  font-size: 24px;
  margin-right: 15px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-name {
  font-weight: 600;
  margin-bottom: 5px;
}

.option-description {
  font-size: 14px;
  color: #666;
}

.card-details {
  margin-top: 10px;
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
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
}

.required {
  color: #f44336;
}

input[type="text"],
input[type="email"],
input[type="tel"] {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  font-size: 16px;
}

input:focus {
  border-color: #666;
}

.address-options {
  margin-bottom: 20px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  border-radius: 4px;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: #ccc;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #4CAF50;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.billing-form {
  margin-top: 15px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
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
  padding: 12px;
  background: none;
  border: none;
  color: #333;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
}

.back-btn:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 15px;
  }

  .option-icon {
    font-size: 20px;
    margin-right: 10px;
  }
}
</style>
