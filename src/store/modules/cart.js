const state = 
{
    items: JSON.parse(localStorage.getItem('cartItems')) || []
};

const mutations = 
{
    addItem(state, item) 
    {
        const { id } = item
        const cartItem = { id };
        cartItem.amount=1;
        cartItem.salePrice=0;
        
        const itemIndex = state.items.findIndex(existingItem => existingItem.id === item.id);
        if (itemIndex !== -1)
        {
            // if item exists
            
            state.items[itemIndex].amount++;

            // state.items.splice(itemIndex, 1);
        } 
        else
        {
          // Ürün yoksa, listeye ekle
          state.items.push(cartItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(state.items));
      },
    removeItem(state, itemId)
    {
        state.items = state.items.filter(item => item.id !== itemId);
    }
};

const actions = 
{
    addItem({commit}, item)
    {
        commit('addItem', item);
    }
};

const getters = 
{
    cartItems: state => state.items,
    cartItemCount: state => state.items.length
}

export default 
{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};