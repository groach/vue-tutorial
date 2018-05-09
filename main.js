var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    description: 'a description',
    image: './assets/img.png',
    link: 'htts://google.com',
    inventory: 0,
    onSale: true,
    details: ['det1', 'det2', 'det3'],
    cart: 0,
    variants: [
      {
        vId: 3333,
        color: 'green',
        img: './assets/img.png'
      },
      {
        vId: 4444,
        color: 'red',
        img: './assets/img2.png'
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
    updateProduct: function(img){
      this.image = img
    }
  }
})
