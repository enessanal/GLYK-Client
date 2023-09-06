<template>
    <CountPill
    :titleKey="titleKey"
    :count="count"
    :divFlex="'flex-row-reverse'"
    :liColor="'primary'"
    :spanColor="'primary'"
    />
</template>

<script>
import axios from "axios"
import CountPill from "@/components/CountPill.vue";


export default
{
    components:
    {
        CountPill
    },
    data()
    {
        return {

            count:0,
            titleKey:"customers.total"
        }
    },
    methods:
    {
        async countAll()
        {
            axios.get(`customers/count`)
            .then(response => 
            {
                this.count = response.data;
            })
            .catch(axiosError => 
            {
                this.count = -1;
            })
        },
    },
    async created()
    {
        this.countAll();
    }
}
</script>
