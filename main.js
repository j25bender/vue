//new Vue - Vue Instance - the root of a vue application. A heart that powers everything. Takes an options object, which store data and perform actions

//Vue is reactive

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
        onSale: true
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