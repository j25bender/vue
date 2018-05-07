//new Vue - Vue Instance - the root of a vue application. A heart that powers everything. Takes an options object, which store data and perform actions

//Vue is reactive

const app = new Vue({ 
  el: '#app',
  data: {
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
    cart: 0
  },
  methods: {
    addToCart() { this.cart += 1 },
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
    }
  }
})