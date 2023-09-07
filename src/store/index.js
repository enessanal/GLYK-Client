import { createStore } from "vuex";

const store = createStore(
{
    state ()
    {
        return {
            testCount: Number(localStorage.getItem('count')) || 0
        }
    },
    getters:
    {
        messageForTest(state)
        {
            return `Test Count: ${state.testCount}`;
        }
    },
    mutations: 
    {
        increment(state) 
        {
            state.count++;
            localStorage.setItem('count', state.count);
        },
        decrement(state) 
        {
            state.count--;
            localStorage.setItem('count', state.count);
        },
        reset(state) 
        {
            state.count=0;
            localStorage.setItem('count', state.count);
        },
        set(state, value)
        {
            state.count = value;
        }
    },
    actions:
    {
        setCounter({commit}, value)
        {
            commit('increment', value);
        }
    }
})

export default store;