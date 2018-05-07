//new Vue - Vue Instance - the root of a vue application. A heart that powers everything. Takes an options object, which store data and perform actions

//Vue is reactive

const app = new Vue({ 
  el: '#app',
  data: {
    product: 'Socks',
    image: 'assets/green-socks.jpeg',
    inventory: 0,
    details: ['80% Cotton', '20% Polyester', 'Gender Neutral'],
    variants: [
      {
        variantColor: 'blue',
        variantId: 1
      },
      {
        variantColor: 'green',
        variantId: 2
      }
    ]
  }
})