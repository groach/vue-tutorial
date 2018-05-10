var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    brand: 'Brand Name',
    description: 'a description',
    selectedVariant: 0,
    link: 'htts://google.com',
    details: ['det1', 'det2', 'det3'],
    cart: 0,
    variants: [
      {
        vId: 3333,
        color: 'green',
        img: './assets/img.png',
        qty: 0,
        sale: true
      },
      {
        vId: 4444,
        color: 'red',
        img: './assets/img2.png',
        qty: 30,
        sale: false
      }
    ]
  },
  methods: {
    addToCart: function(){
      this.cart += 1
    },
    removeFromCart: function(){
      if (this.cart > 0){
        this.cart -= 1
      }
    },
    updateProduct: function(index){
      this.selectedVariant = index
    }
  },
  computed: {
    title: function(){
      return this.brand + ' ' + this.product
    },
    image(){
      return this.variants[this.selectedVariant].img
    },
    inventory(){
      return this.variants[this.selectedVariant].qty
    },
    onSale(){
      return this.variants[this.selectedVariant].sale
    }
  }
})
