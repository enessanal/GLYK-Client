import axios from "axios";
import {toast} from "vue3-toastify";

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

const state = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
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

      state.cartItems.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
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
    }
  },
  removeItem(state, product) {
    state.cartItems = state.cartItems.filter(
      (cartItem) => cartItem?.product?.id !== product.id
    );
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
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
          toast.warn(error.response.data, {autoClose: 3000, theme: "colored",});
        } else if (error.request) {
          toast.error("No response from server",{autoClose: 5000  , theme: "colored",});
        } else {
          toast.error(error.message, {autoClose: 3000, theme: "colored",});
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
};

const getters = {
  cartItems: (state) => state.cartItems,
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
