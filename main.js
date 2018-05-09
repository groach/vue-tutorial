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
    variants: [
      {
        vId: 3333,
        color: 'green'
      },
      {
        vId: 4444,
        color: 'red'
      }
    ]
  }
})
