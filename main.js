var eventBus = new Vue()

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
        <a :href="link">
          <img v-bind:src="image" alt="">
        </a>
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inventory > 10">in stock</p>
        <p v-else-if="inventory > 0 && inventory < 8">almost gone</p>
        <p v-else>out of stock</p>
        <span v-if="onSale">on sale!</span>
        <span v-if="premium">user is premium!</span>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div v-for="(variant, index) in variants"
          :key="variant.vId"
          class="color-box"
          :style="{ backgroundColor: variant.color }"
          @mouseover="updateProduct(index)">
        </div>

        <button v-on:click="addToCart" type="button" name="button">Add to cart</button>
        <button v-on:click="removeFromCart" type="button" name="button">Remove from cart</button>
      </div>
      <product-tabs :reviews="reviews"></product-tabs>

    </div>
  `,
  data() {
    return {
      product: 'Socks',
      brand: 'Brand Name',
      description: 'a description',
      selectedVariant: 0,
      link: 'htts://google.com',
      details: ['det1', 'det2', 'det3'],
      reviews: [],
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
    }
  },
  methods: {
    addToCart: function(){
      this.$emit('add-to-cart', this.variants[this.selectedVariant].vId)
    },
    removeFromCart: function(){
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].vId)
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
  },
  mounted(){
    eventBus.$on('review-submit', productReview => {
      this.reviews.push(productReview)
    })
  }
})

Vue.component('product-review', {
  template:`
    <form class="review-form" @submit.prevent="onSubmit">
      <input v-model="name">
      <input type="submit">
    </form>
  `,
  data() {
    return{
      name: null
    }
  },
  methods: {
    onSubmit: function(){
      let productReview = {
        name: this.name
      }
      eventBus.$emit('review-submit', productReview)
      this.name = null
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
      <span class="tab"
      :class="{activeTab: selectedTab === tab}"
      v-for="(tab, index) in tabs"
      :key="index"
      @click="selectedTab = tab">
      {{tab}}
      </span>
      <div v-for="review in reviews" v-show="selectedTab === 'Reviews'">
        <p>{{review.name}}</p>
      </div>
      <product-review v-show="selectedTab === 'Make a Review'"></product-review>
    </div>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review'],
      selectedTab: 'Reviews'
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  methods: {
    addToCart: function(id){
      this.cart.push(id)
    },
    removeFromCart: function(id){
      index = this.cart.indexOf(id)
      this.cart.splice(index, 1)
    }
  },
  computed: {
    qtyInCart() {
      return this.cart.length
    }
  }
})
