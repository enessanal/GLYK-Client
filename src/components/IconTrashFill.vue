<template>
    <i class="bi bi-trash-fill icon-action text-danger mx-1" @click="call(object)" :title="title"></i>
</template>

<script>
export default
{
    name: "IconTrashFill",
    methods:
    {
        call(customer) 
        {
            this.$emit('call', customer);
        },
    },
    props:
    {
        object: 
        {
            type: Object,
            required: true
        },
        title:
        {
            type: String,
            required: true
        }
    }
}
</script>




<style scoped>
.icon-action 
{
    cursor: pointer;
    transition: transform .2s;
    display: inline-block;
}

.icon-action:hover
{
    transform: scale(1.5);
}

</style>