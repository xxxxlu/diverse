import Vue from 'vue'
import Vuex from 'vuex'
// 移除未使用的导入
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    categories: [
      'Tops', 'Bottoms', 'Sports Bra', 'Yoga Pants', 'T-Shirts', 'Hoodies'
    ],
    currentProduct: null,
    loading: false
  },
  getters: {
    cartTotal: (state: any) => {
      return state.cart.reduce((total: number, item: any) => {
        return total + (item.price * item.quantity)
      }, 0)
    },
    cartItemCount: (state: any) => {
      return state.cart.reduce((count: number, item: any) => count + item.quantity, 0)
    }
  },
  mutations: {
    SET_PRODUCTS(state: any, products: any) {
      state.products = products
    },
    SET_CURRENT_PRODUCT(state: any, product: any) {
      state.currentProduct = product
    },
    ADD_TO_CART(state: any, { product, quantity, size }: { product: any, quantity: number, size: string }) {
      const productInCart = state.cart.find((item: any) =>
        item.id === product.id && item.size === size
      )

      if (productInCart) {
        productInCart.quantity += quantity
      } else {
        state.cart.push({
          ...product,
          quantity,
          size
        })
      }
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    UPDATE_CART_ITEM(state: any, { productId, size, quantity }: { productId: number, size: string, quantity: number }) {
      const item = state.cart.find((item: any) => item.id === productId && item.size === size)
      if (item) {
        item.quantity = quantity
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    REMOVE_FROM_CART(state: any, { productId, size }: { productId: number, size: string }) {
      state.cart = state.cart.filter((item: any) => !(item.id === productId && item.size === size))
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    CLEAR_CART(state: any) {
      state.cart = []
      localStorage.removeItem('cart')
    },
    LOAD_CART(state: any) {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        state.cart = JSON.parse(savedCart)
      }
    },
    SET_LOADING(state: any, isLoading: boolean) {
      state.loading = isLoading
    }
  },
  actions: {
    loadProducts({ commit }: { commit: any }) {
      commit('SET_LOADING', true)
      // In a real app, we would fetch from an API
      // For now, let's simulate with the demo data
      setTimeout(() => {
        const products = generateProductsData()
        commit('SET_PRODUCTS', products)
        commit('SET_LOADING', false)
      }, 500)
    },
    getProduct({ commit, state }: { commit: any, state: any }, productId: string | number) {
      commit('SET_LOADING', true)
      
      // 确保productId是数字类型进行比较
      const numericProductId = typeof productId === 'string' ? parseInt(productId) : productId

      // First check if we already have the products loaded
      if (state.products.length > 0) {
        const product = state.products.find((p: any) => p.id === numericProductId)
        if (product) {
          commit('SET_CURRENT_PRODUCT', product)
          commit('SET_LOADING', false)
          return
        }
      }

      // Otherwise, get the specific product
      setTimeout(() => {
        const products = generateProductsData()
        const product = products.find(p => p.id === numericProductId)
        commit('SET_CURRENT_PRODUCT', product)
        commit('SET_LOADING', false)
      }, 500)
    },
    addToCart({ commit }: { commit: any }, payload: any) {
      commit('ADD_TO_CART', payload)
    },
    updateCartItem({ commit }: { commit: any }, payload: any) {
      commit('UPDATE_CART_ITEM', payload)
    },
    removeFromCart({ commit }: { commit: any }, payload: any) {
      commit('REMOVE_FROM_CART', payload)
    },
    clearCart({ commit }: { commit: any }) {
      commit('CLEAR_CART')
    },
    loadCart({ commit }: { commit: any }) {
      commit('LOAD_CART')
    }
  }
})

// Helper function to generate product data
function generateProductsData() {
  return [
    {
      id: 1,
      name: "Basic Boxy Tee",
      price: 1600,
      originalPrice: 1600,
      description: "A premium everyday essential crafted from soft, breathable cotton with a perfect relaxed fit. The Legacy Tee isn't just a wardrobe staple—it's a statement. Part of our give-back initiative, it represents style with purpose.",
      category: "T-Shirts",
      image: "https://ext.same-assets.com/3031168544/34876368.jpeg",
      rating: 5.0,
      stock: 10,
      sizes: ["XS", "S", "M", "L", "XL", "2XL"],
      colors: ["Grey"]
    },
    {
      id: 2,
      name: "Hecate Black Interlacing Sports Bra",
      price: 2975,
      originalPrice: 3500,
      description: "Whether it's fierce gym sessions or calming yoga sessions, this sports bra will support you through it all. Designed with an elasticated under bust that provides ventilation, diverse logo in reflective print and meticulously engineered material to provide comfortable fit.",
      category: "Sports Bras",
      image: "https://ext.same-assets.com/1691771529/2194157850.jpeg",
      rating: 5.0,
      stock: 0,
      sizes: ["XS", "S", "M", "L", "XL", "2XL"],
      colors: ["Black"]
    },
    {
      id: 3,
      name: "Asthete 2in1 Shorts",
      price: 1750,
      originalPrice: 1800,
      description: "Don't let anything hold you back. Whether you are going for a jog or just going hard on leg day, the asthete shorts will help you push yourself to the limit. Features side cargo pockets, reflective diverse logo, and four-way stretch fabric.",
      category: "Shorts",
      image: "https://ext.same-assets.com/1430442224/3621151193.jpeg",
      rating: 5.0,
      stock: 0,
      sizes: ["S", "M", "XL"],
      colors: ["White"]
    },
    {
      id: 4,
      name: "Diverse High-Waist Yoga Pants",
      price: 3600,
      originalPrice: 3600,
      description: "Elevate your workout with our high-waist yoga pants designed for maximum comfort and flexibility. Features a supportive waistband that stays in place during movements and moisture-wicking fabric to keep you dry.",
      category: "Yoga Pants",
      image: "https://ext.same-assets.com/3263170416/1175093855.jpeg",
      rating: 4.7,
      stock: 15,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black", "Maroon", "Navy", "Olive"]
    },
    {
      id: 5,
      name: "Baby Blue High Waist Legging",
      price: 2950,
      originalPrice: 3400,
      description: "Our High Waist Legging in baby blue offers a flawless, body-hugging fit with a high-depth waistband for comfort and support. Made from soft, shape-adaptive fabric, these yoga pants move with you through every pose.",
      category: "Leggings",
      image: "https://ext.same-assets.com/1240735428/980854102.jpeg",
      rating: 4.8,
      stock: 8,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Baby Blue"]
    },
    {
      id: 6,
      name: "Compression Shorts Navy",
      price: 2500,
      originalPrice: 3000,
      description: "Engineered with performance in mind, these compression shorts provide muscle support and improved blood circulation. The four-way stretch fabric allows for maximum mobility during intense workouts.",
      category: "Shorts",
      image: "https://ext.same-assets.com/1430442224/2301615481.jpeg",
      rating: 4.9,
      stock: 12,
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["Navy"]
    },
    {
      id: 7,
      name: "Women's Boxy Crop Top",
      price: 1500,
      originalPrice: 1500,
      description: "This stylish crop top combines comfort with fashion, perfect for workouts or casual wear. Made from soft, breathable fabric with a relaxed fit that flatters any body type.",
      category: "Crop Tops",
      image: "https://thediversestore.com/cdn/shop/files/SUFFERING-1-scaled_1512x.jpg?v=1739864751",
      rating: 4.7,
      stock: 20,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["White", "Black", "Grey"]
    },
    {
      id: 8,
      name: "Beige Ribbed Tank Top",
      price: 2000,
      originalPrice: 2500,
      description: "Enhance your wardrobe with our Beige Rib Tank Top. This beige tank top is the perfect blend of comfort and style, making it a staple for any occasion. Features a ribbed texture for added visual interest.",
      category: "Tank Tops",
      image: "https://thediversestore.com/cdn/shop/files/pm_1720069413445_cmp_540x.jpg?v=1720116828",
      rating: 4.6,
      stock: 14,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Beige"]
    },
    {
      id: 9,
      name: "Black Contour Jacket",
      price: 3400,
      originalPrice: 3400,
      description: "A sleek, contoured jacket that provides warmth without bulk. Perfect for morning runs or as a layering piece for cooler weather. Features reflective details for visibility in low light.",
      category: "Jackets",
      image: "	https://thediversestore.com/cdn/shop/files/Re-Edited-9771_540x.jpg?v=1730103132",
      rating: 4.8,
      stock: 7,
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["Black", "Navy", "Maroon", "Dark Brown"]
    },
    {
      id: 10,
      name: "Hecate Lt. Grey Interlacing Sports Bra",
      price: 2650,
      originalPrice: 3200,
      description: "Support and style come together in this light grey sports bra. The interlacing design adds a unique aesthetic to the back while providing the support you need for high-impact activities.",
      category: "Sports Bras",
      image: "https://thediversestore.com/cdn/shop/products/032A9217_540x.jpg?v=1677763865",
      rating: 5.0,
      stock: 9,
      sizes: ["XS", "S", "M", "L", "XL", "2XL"],
      colors: ["Lt. Grey"]
    },
    {
      id: 11,
      name: "Oversized Graphic T-Shirt",
      price: 2200,
      originalPrice: 2500,
      description: "Make a statement with this oversized graphic tee featuring bold designs. The relaxed fit and premium cotton blend make it perfect for both workouts and casual wear.",
      category: "T-Shirts",
      image: "https://thediversestore.com/cdn/shop/files/pm_1720069295313_cmp_193be929-70ff-450b-9f35-a413f520f231_540x.jpg?v=1720078074",
      rating: 4.7,
      stock: 15,
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["Black", "White", "Grey"]
    },
    {
      id: 12,
      name: "Mens Enigma Cargo Trouser",
      price: 1800,
      originalPrice: 4000,
      description: "These versatile cargo trousers combine functionality with style. Multiple pockets provide ample storage while the comfortable fit allows for easy movement throughout your day.",
      category: "Joggers",
      image: "	https://thediversestore.com/cdn/shop/files/pm_1720069337794_cmp_540x.jpg?v=1720114657",
      rating: 4.8,
      stock: 6,
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["Black", "Olive", "Beige"]
    },
    {
      id: 13,
      name: "Women Black Reverie Sweats",
      price: 2950,
      originalPrice: 3500,
      description: "Lounge in luxury with these black reverie sweatpants. Soft, cozy fabric paired with a flattering fit makes these perfect for both workouts and relaxation.",
      category: "Sweatpants",
      image: "https://thediversestore.com/cdn/shop/products/41_540x.jpg?v=1647867321",
      rating: 4.9,
      stock: 12,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black"]
    },
    {
      id: 14,
      name: "Diverse 999 Vintage Tank Top",
      price: 1500,
      originalPrice: 2500,
      description: "This vintage-inspired tank top combines retro aesthetics with modern performance. The breathable fabric wicks away moisture, keeping you cool during intense workouts.",
      category: "Tank Tops",
      image: "https://thediversestore.com/cdn/shop/files/IMG_9565-min_540x.jpg?v=1734300861",
      rating: 4.6,
      stock: 0,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["White", "Black", "Grey"]
    },
    {
      id: 15,
      name: "Seraphic Classic Flare Leg Trousers",
      price: 3500,
      originalPrice: 4000,
      description: "These yoga pants feature a classic flare leg design that elongates your silhouette. The high waist provides support and coverage, while the stretchy fabric moves with you through every pose.",
      category: "Yoga Pants",
      image: "	https://thediversestore.com/cdn/shop/products/032A8641_540x.jpg?v=1677751077",
      rating: 4.7,
      stock: 10,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black", "Navy", "Grey"]
    },
    {
      id: 16,
      name: "White Crew Socks",
      price: 1400,
      originalPrice: 1400,
      description: "Complete your athletic look with these comfortable crew socks. Cushioned soles provide impact absorption while mesh panels enhance breathability during workouts.",
      category: "Accessories",
      image: "https://thediversestore.com/cdn/shop/files/Newshortcut.lnk-min_540x.jpg?v=1734305646",
      rating: 4.5,
      stock: 25,
      sizes: ["Custom"],
      colors: ["White"]
    },
    {
      id: 17,
      name: "White Commute Coverup",
      price: 2500,
      originalPrice: 3000,
      description: "This versatile coverup is perfect for layering over your workout gear. Lightweight fabric makes it ideal for year-round use, while the minimalist design pairs with anything in your wardrobe.",
      category: "Coverups",
      image: "	https://thediversestore.com/cdn/shop/files/MUZ01573-min_540x.jpg?v=1689074619",
      rating: 4.6,
      stock: 8,
      sizes: ["S", "M", "L", "XL"],
      colors: ["White"]
    },
    {
      id: 18,
      name: "Diverse Woven Pants",
      price: 3500,
      originalPrice: 3500,
      description: "These woven pants combine style and functionality with their relaxed fit and durable construction. Perfect for casual wear or light workouts, they feature practical pockets and an adjustable waistband.",
      category: "Pants",
      image: "https://thediversestore.com/cdn/shop/files/pm_1742798143015_cmp_540x.jpg?v=1742810783",
      rating: 4.7,
      stock: 14,
      sizes: ["XS", "S", "M", "L", "XL", "2XL"],
      colors: ["Black", "Navy", "Beige"]
    },
    {
      id: 19,
      name: "Women Diverse Training Club Tee",
      price: 2500,
      originalPrice: 2500,
      description: "Join the club with this training tee designed for performance and style. Moisture-wicking fabric keeps you dry during workouts while the Club logo showcases your athletic spirit.",
      category: "T-Shirts",
      image: "	https://thediversestore.com/cdn/shop/files/pm_1742798129007_cmp_540x.jpg?v=1742814632",
      rating: 4.8,
      stock: 20,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black", "White", "Grey", "Pink"]
    },
    {
      id: 20,
      name: "Black 2in1 Trouser",
      price: 2500,
      originalPrice: 3100,
      description: "These versatile 2-in-1 trousers feature a detachable design, allowing you to transition from full-length pants to shorts instantly. Perfect for changing weather conditions or different workout intensities.",
      category: "Trousers",
      image: "https://thediversestore.com/cdn/shop/files/pm_1720069354812_cmp_540x.jpg?v=1720114657",
      rating: 4.9,
      stock: 10,
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["Black"]
    },
    {
      id: 21,
      name: "WOMEN DIVERSE COVER UP",
      price: 2800,
      originalPrice: 2800,
      description: "This lightweight cover-up is the perfect addition to your activewear collection. Designed to provide modest coverage before and after workouts, it features a relaxed fit and breathable fabric.",
      category: "Coverups",
      image: "https://thediversestore.com/cdn/shop/files/pm_1742798135970_cmp_540x.jpg?v=1742812111",
      rating: 4.7,
      stock: 15,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black", "Grey", "White"]
    },
    {
      id: 22,
      name: "Black Baseball Cap",
      price: 2200,
      originalPrice: 2200,
      description: "Add the finishing touch to your athletic look with this classic baseball cap. Featuring an adjustable back strap for the perfect fit and breathable fabric to keep you cool.",
      category: "Accessories",
      image: "https://thediversestore.com/cdn/shop/files/IMG_9574_540x.jpg?v=1734303707",
      rating: 4.6,
      stock: 20,
      sizes: ["Custom"],
      colors: ["Black"]
    },
    {
      id: 23,
      name: "Beige Varsity Cap",
      price: 2200,
      originalPrice: 2200,
      description: "This Unisex beige varsity cap features bold \"DV\" chenille lettering for a standout, retro-inspired look. With its curved brim and durable fabric, it delivers a perfect blend of vintage style and modern comfort.",
      category: "Accessories",
      image: "https://thediversestore.com/cdn/shop/files/IMG_9579_540x.jpg?v=1734303706",
      rating: 4.5,
      stock: 18,
      sizes: ["Custom"],
      colors: ["Beige"]
    },
    {
      id: 24,
      name: "Black High Waist Legging",
      price: 3300,
      originalPrice: 3300,
      description: "Our Black High Waist Legging offers the perfect combination of support and style. The high waistband stays in place during even the most intense workouts, while the stretchy fabric provides unrestricted movement.",
      category: "Leggings",
      image: "https://thediversestore.com/cdn/shop/files/Re-Edited-9804_540x.jpg?v=1730102436",
      rating: 4.9,
      stock: 12,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black"]
    },
    {
      id: 25,
      name: "Black Men Hoodie",
      price: 3500,
      originalPrice: 3500,
      description: "Stay warm in style with this premium black hoodie. The soft, cozy interior and durable exterior make it perfect for cool weather workouts or casual wear. Features a kangaroo pocket and adjustable hood.",
      category: "Hoodies",
      image: "https://thediversestore.com/cdn/shop/files/pm_1707824644491_cmp_192bf510-7660-46cc-9a4d-486cef46ed90_540x.jpg?v=1708076471",
      rating: 4.7,
      stock: 10,
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["Black"]
    },
    {
      id: 26,
      name: "Black Ribbed Tank Top",
      price: 2500,
      originalPrice: 2500,
      description: "This ribbed tank top provides a sleek, body-hugging fit that flatters your physique. The ribbed texture adds visual interest while the stretchable fabric ensures comfort during any activity.",
      category: "Tank Tops",
      image: "https://thediversestore.com/cdn/shop/files/pm_1720069431296_cmp_540x.jpg?v=1720116834",
      rating: 4.6,
      stock: 15,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black"]
    },
    {
      id: 27,
      name: "Black Statement Trousers",
      price: 3200,
      originalPrice: 3200,
      description: "Make a statement with these sleek black trousers. Designed with a contemporary silhouette and premium fabric, they transition effortlessly from workout to casual wear.",
      category: "Trousers",
      image: "https://thediversestore.com/cdn/shop/files/pm_1720069390777_cmp_540x.jpg?v=1720116830",
      rating: 4.8,
      stock: 10,
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["Black"]
    },
    {
      id: 28,
      name: "Black Wide Leg Trouser",
      price: 3300,
      originalPrice: 3300,
      description: "These wide-leg trousers offer a modern, relaxed silhouette with maximum comfort. The flowing design provides elegance while the stretchy waistband ensures a perfect fit through all activities.",
      category: "Trousers",
      image: "https://thediversestore.com/cdn/shop/files/MUZ01597-min_540x.jpg?v=1689071468",
      rating: 4.7,
      stock: 8,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black"]
    },
    {
      id: 29,
      name: "Blue Sports Bra",
      price: 2950,
      originalPrice: 2950,
      description: "Bring a pop of color to your workout wardrobe with this vibrant blue sports bra. Designed for medium impact activities, it provides adequate support while the moisture-wicking fabric keeps you dry.",
      category: "Sports Bras",
      image: "https://thediversestore.com/cdn/shop/files/blue_03_540x.jpg?v=1730717548",
      rating: 4.8,
      stock: 12,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Blue"]
    },
    {
      id: 30,
      name: "Orphic Yoga Pant Black",
      price: 3300,
      originalPrice: 3700,
      description: "Experience ultimate comfort with our Orphic Yoga Pants in classic black. The four-way stretch fabric moves with your body while the high waistband provides support and coverage for all yoga positions.",
      category: "Yoga Pants",
      image: "https://thediversestore.com/cdn/shop/products/032A9531_b212e64d-161e-4f45-90c1-8c06cb808ca8_540x.jpg?v=1677924668",
      rating: 4.9,
      stock: 14,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black"]
    }
  ]
}
