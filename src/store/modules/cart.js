import axios from "axios";
import { toast } from "vue3-toastify";

function uniqueProducts(cartItems) {
  const seenIds = new Set();
  return cartItems.filter((cartItem) => {
    if (seenIds.has(cartItem.product.id)) {
      return false;
    } else {
      seenIds.add(cartItem.product.id);
      return true;
    }
  });
}


function calculateAutoSaleTotalPrice(state)
{
  state.saleTotalPrice = state.cartItems.reduce((accumulator, cartItem) => {return accumulator + cartItem.amount*cartItem.product.ccPrice},0);
  localStorage.setItem("saleTotalPrice", JSON.stringify(state.saleTotalPrice));

  calculateSalePrices(state);
}


function calculateSalePrices(state)
{

  const totalCashPrice= state.cartItems.reduce((accumulator, cartItem) => {return accumulator + cartItem.amount*cartItem.product.cashPrice},0);

  state.cartItems.forEach((cartItem) => {

    // console.log(((cartItem.amount*cartItem.product.cashPrice)/ totalCashPrice))
    console.log((cartItem.amount*cartItem.product.cashPrice)/ totalCashPrice)
    console.log(state.saleTotalPrice);
    console.log();
    console.log("---")

    cartItem.salePrice = ( (cartItem.amount*cartItem.product.cashPrice)/ totalCashPrice) * state.saleTotalPrice;

  })



  // for(const cartItem in state.cartItems)
  // {
  //   console.log(cartItem)


  // let salePriceBeforeRound = ( (this.cart.products[product].prices.inAdvance*this.cart.products[product].amount )/totalInAdvence)*this.totalPrice;
  // let roundedPrice = this.customRound(salePriceBeforeRound);
  // reelSum +=salePriceBeforeRound;
  // roundedSum+=roundedPrice;
  // this.cart.products[product].prices.sale = roundedPrice;
  // }
  // this.difference = reelSum-roundedSum;

  localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
}








const state = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  saleTotalPrice: JSON.parse(localStorage.getItem("saleTotalPrice")) || 0,
};

const mutations = {
  addItem(state, product) {
    const itemIndex = state.cartItems.findIndex(
      (cartItem) => cartItem?.product?.id === product.id
    );

    if (itemIndex !== -1) {
      state.cartItems[itemIndex].amount++;
    } else {
      const cartItem = {};
      cartItem.product = product;
      cartItem.amount = 1;
      cartItem.deliveryDate = Date.now();
      cartItem.warehouse = "MERKEZ";
      cartItem.salePrice = product.ccPrice;

      state.cartItems.push(cartItem);
    }
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    calculateAutoSaleTotalPrice(state);
  },
  decreaseItem(state, product) {
    const itemIndex = state.cartItems.findIndex(
      (cartItem) => cartItem?.product?.id === product.id
    );

    if (itemIndex !== -1) {
      state.cartItems[itemIndex].amount--;
      if (state.cartItems[itemIndex].amount === 0)
        state.cartItems.splice(itemIndex, 1);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      calculateAutoSaleTotalPrice(state);
    }
  },
  removeItem(state, product) {
    state.cartItems = state.cartItems.filter(
      (cartItem) => cartItem?.product?.id !== product.id
    );
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    calculateAutoSaleTotalPrice(state);
  },
  emptyItems(state) {
    state.cartItems = [];
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    calculateAutoSaleTotalPrice(state);
  },

  setSaleTotalPrice(state, price)
  {
    const totalLastPrice = state.saleTotalPrice = state.cartItems.reduce((accumulator, cartItem) => {return accumulator + cartItem.amount*cartItem.product.lastPrice},0);
    if(price < 0) state.saleTotalPrice = totalLastPrice;
    else state.saleTotalPrice = price;

    localStorage.setItem("saleTotalPrice", JSON.stringify(state.saleTotalPrice));
    calculateSalePrices(state);
  },

  async checkCartFromServer(state) {
    const params = {
      ids: state.cartItems.map((cartItem) => cartItem.product.id).join(","),
    };

    axios
      .get("products/ids", { params })
      .then((response) => {
        const products = response.data;

        const itemsToRemove = [];

        state.cartItems.forEach((cartItem) => {
          const matchedProduct = products.find(
            (product) => product.id === cartItem.product.id
          );
          if (matchedProduct) {
            cartItem.product = matchedProduct;
          } else {
            itemsToRemove.push(cartItem.product.id);
          }
        });
        state.cartItems = state.cartItems.filter(
          (cartItem) => !itemsToRemove.includes(cartItem.product.id)
        );
        state.cartItems = uniqueProducts(state.cartItems);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .catch((error) => {
        if (error.response) {
          toast.warn(error.response.data, {
            autoClose: 3000,
            theme: "colored",
          });
        } else if (error.request) {
          toast.error("No response from server", {
            autoClose: 5000,
            theme: "colored",
          });
        } else {
          toast.error(error.message, { autoClose: 3000, theme: "colored" });
        }
      });
  },
};

const actions = {
  addProductToCart({ commit }, product) {
    commit("addItem", product);
  },
  decreaseProductFromCart({ commit }, product) {
    commit("decreaseItem", product);
  },
  removeProductFromCart({ commit }, product) {
    commit("removeItem", product);
  },
  checkCartFromServer({ commit }) {
    commit("checkCartFromServer");
  },
  emptyItems({ commit }) {
    commit("emptyItems");
  },
  setSaleTotalPrice({ commit }, price) {
    commit("setSaleTotalPrice", price);
  },




};

const getters = {
  cartItems: (state) => state.cartItems,
  saleTotalPrice: (state) => state.saleTotalPrice,
  cartItemCount: (state) => state.cartItems.length,
  getItemAmount: (state) => (product) => {
    const itemIndex = state.cartItems.findIndex(
      (item) => item.product.id === product.id
    );
    if (itemIndex !== -1) {
      return state.cartItems[itemIndex].amount;
    }
    return 0;
  },
  getTotals: (state) => () => {

    const total = {}

    total.amount = state.cartItems.reduce((accumulator, cartItem) => {return accumulator + cartItem.amount},0);
    total.cashPrice = state.cartItems.reduce((accumulator, cartItem) => {return accumulator + cartItem.amount*cartItem.product.cashPrice},0);
    total.ccPrice = state.cartItems.reduce((accumulator, cartItem) => {return accumulator + cartItem.amount*cartItem.product.ccPrice},0);
    total.lastPrice = state.cartItems.reduce((accumulator, cartItem) => {return accumulator + cartItem.amount*cartItem.product.lastPrice},0);
    total.limitPrice = state.cartItems.reduce((accumulator, cartItem) => {return accumulator + cartItem.amount*cartItem.product.limitPrice},0);

    return total;

  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
