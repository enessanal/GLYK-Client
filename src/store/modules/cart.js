const state = 
{
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
};


const mutations = 
{
    addItem(state, product) 
    {        
        const itemIndex = state.cartItems.findIndex(cartItem => cartItem?.product?.id === product.id);

        if (itemIndex !== -1)
        {            
            state.cartItems[itemIndex].amount++;
        } 
        else
        {

            const cartItem = {};
            cartItem.product = product;
            cartItem.amount = 1;
            cartItem.deliveryDate= Date.now();


            state.cartItems.push(cartItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    decreaseItem(state, product)
    {   
        const itemIndex = state.cartItems.findIndex(cartItem => cartItem?.product?.id === product.id);
        
        if (itemIndex !== -1)
        {            
            state.cartItems[itemIndex].amount--;
            if(state.cartItems[itemIndex].amount===0) state.cartItems.splice(itemIndex, 1);

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        }

    },
    removeItem(state, product)
    {
        state.cartItems = state.cartItems.filter(cartItem => cartItem?.product?.id !== product.id);
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    checkCartFromServer()
    {

    }
};

const actions = 
{
    addProductToCart({commit}, product)
    {
        commit('addItem', product);
    },
    decreaseProductFromCart({commit}, product)
    {
        commit('decreaseItem', product);
    },
    removeProductFromCart({commit}, product)
    {
        commit('removeItem', product);
    }
};

const getters = 
{
    cartItems: state => state.cartItems,
    cartItemCount: state => state.cartItems.length,
    getItemAmount: (state) => (product) => 
    {
        const itemIndex = state.cartItems.findIndex(item => item.product.id === product.id);
        if (itemIndex !== -1) 
        {
          return state.cartItems[itemIndex].amount;
        }
        return 0;
      }
}

export default 
{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};