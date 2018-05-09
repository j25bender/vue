//new Vue - Vue Instance - the root of a vue application. A heart that powers everything. Takes an options object, which store data and perform actions

//Vue is reactive

const eventBus = new Vue()

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    } 
  },
  template: `
    <div class="product">

      <div class="product-image">
        <!-- v-bind dynamically binds an attribute(src) to an expression{{ image }} -->
        <!-- Shorthand :src="image" :alt="description" :href="url" :title="tooltip" :class="isActive" :style="isStyled" :disabled="isDisabled" -->
          <img v-bind:src="image" >            
      </div>        
      
      <div class="product-info">
          <h1>{{ title }}</h1>
          <!-- using v-show is more performant than v-if. Adds attribute of display: none; as opposed to adding or removing elements from the DOM -->
          <p v-if="inStock">In Stock</p>
          <p v-else :class="{ outOfStock: !inStock }">Out Of Stock</p>
          <p>Shipping: {{ shipping }}</p>
          <h3>{{ sale }}</h3>

          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>

          <div v-for="(variant, index) in variants"
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
          </div>

          <!-- Vue event listener -->
          <!-- Shorthand for v-on is @ Example @click or @mouseover -->
          <button v-on:click="addToCart"
                  :disabled="!inStock"
                  :class="{ disabledButton: !inStock }">Add To Cart</button>

      </div>

      <product-tabs :reviews="reviews"></product-tabs>

    </div>
  `,
  data() {
    return {
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        inventory: 0,
        details: ['80% Cotton', '20% Polyester', 'Gender Neutral'],
        variants: [
          {
            variantColor: 'blue',
            variantId: 1,
            variantImage: 'assets/blue-socks.jpeg',
            variantQuantity: 0
          },
          {
            variantColor: 'green',
            variantId: 2,
            variantImage: 'assets/green-socks.jpeg',
            variantQuantity: 10
          }
        ],
        onSale: true,
        reviews: []
      }
    },
    methods: {
      addToCart() { this.$emit('add-to-cart', this.variants[ this.selectedVariant ].variantId) },
      updateProduct(index) { this.selectedVariant = index }
    },
    // Computed properties only run when dependencies change / update
    // Values are cached / saved until updated
    // brand and product are dependencies of title
  computed: {
    title() { 
      return this.brand + ' ' + this.product
    },
    image() { 
      return this.variants[ this.selectedVariant ].variantImage
    },
    inStock() { 
      return this.variants[ this.selectedVariant ].variantQuantity
    },
    sale() {
      if(this.onSale) {
        return this.brand + ' ' + this.product + ' are on sale!'
      }
      return this.brand + ' ' + this.product + ' are not on sale!'
    },
    shipping() {
      return this.premium ? 'FREE' : '$2.99'
    }
  },
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
  }
})

Vue.component('product-review', {
  template: `
    <form class='review-form' @submit.prevent='onSubmit'>

    <p v-show='errors.length'>
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for='error in errors'>{{ error }}</li>
      </ul>
    </p>

      <p>
        <label for='name'>Name:</label>
        <input id='name' v-model='name' placeholder='Name'></input>
      </p>

      <p>
        <label for='review'>Review:</label>
        <textarea id='review' v-model='review'></textarea>
      </p>

      <p>
        <label for='rating'>Rating:</label>
        <select id='rating' v-model.number='rating'>
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <input type='submit' value='Submit'>
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if(this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        }
        eventBus.$emit('review-submitted', productReview)
        this.name = null,
        this.review = null,
        this.rating = null
      } 
      else {
        if(!this.name) { this.errors.push('Name Required!') }
        if(!this.review) { this.errors.push('Review Required!') }
        if(!this.rating) { this.errors.push('Rating Required!') }
      } 
    }
  }
})

Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>
      <span class='tab'
            :class='{ activeTab: selectedTab === tab }'
            v-for='(tab, index) in tabs'
            :key='index'
            @click='selectedTab = tab'>
            {{ tab }}</span>

      <div v-show="selectedTab === 'Reviews'">
      <h2>Reviews</h2>
      <p v-show='!reviews.length'>There are no reviews yet.</p>
      <ul>
        <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>{{ review.review }}</p>
          <p>{{ review.rating }}</p>
        </li>
      </ul>
    </div>
    
    <product-review v-show="selectedTab === 'Make A Review'"></product-review>

    </div>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Make A Review'],
      selectedTab: 'Reviews'
    }
  }
})

const app = new Vue({ 
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    }
  }
})