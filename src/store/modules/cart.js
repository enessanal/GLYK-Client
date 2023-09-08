function convertToCartItem(item)
{
    const { id } = item
    const cartItem = { id };
    cartItem.amount=1;
    cartItem.salePrice=item.ccPrice;
    cartItem.deliveryDate = new Date();
    
    return cartItem; 
};

const state = 
{
    items: JSON.parse(localStorage.getItem('cartItems')) || []
};


const mutations = 
{
    addItem(state, item) 
    {
       const cartItem = convertToCartItem(item);
        
        const itemIndex = state.items.findIndex(existingItem => existingItem.id === item.id);
        if (itemIndex !== -1)
        {            
            state.items[itemIndex].amount++;
        } 
        else
        {
          state.items.push(cartItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    decreaseItem(state, item)
    {
        const cartItem = convertToCartItem(item);   
        const itemIndex = state.items.findIndex(existingItem => existingItem.id === item.id);
        
        if (itemIndex !== -1)
        {            
            state.items[itemIndex].amount--;
            if(state.items[itemIndex].amount===0) state.items.splice(itemIndex, 1);


            localStorage.setItem('cartItems', JSON.stringify(state.items));
        }

    },
    removeItem(state, item)
    {
        const itemId = item.id;
        state.items = state.items.filter(item => item.id !== itemId);
        localStorage.setItem('cartItems', JSON.stringify(state.items));
    }
};

const actions = 
{
    addItem({commit}, item)
    {
        commit('addItem', item);
    },
    decreaseItem({commit}, item)
    {
        commit('decreaseItem', item);
    },
    removeItem({commit}, item)
    {
        commit('removeItem', item);
    }
};

const getters = 
{
    cartItems: state => state.items,
    cartItemCount: state => state.items.length,
    getItemAmount: (state) => (item) => 
    {
        const itemIndex = state.items.findIndex(existingItem => existingItem.id === item.id);
        if (itemIndex !== -1) 
        {
          return state.items[itemIndex].amount;
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