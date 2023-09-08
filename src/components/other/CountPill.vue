<template>
    <div class="d-flex bd-highlight" :class="divFlex">
       <li class="list-group-item d-flex justify-content-between align-items-center" :class="'list-group-item-'+liColor">
           <span class="me-3">{{ $t(titleKey) }}</span><span class="badge rounded-pill" :class="'bg-'+spanColor">{{ count }}</span>
       </li>
    </div>
</template>

<script>
export default
{
    props: 
    {
        titleKey: 
        {
            type: String,
            required: true,
        },
        count:
        {
            type: Number,
            default:-1
        },
        divFlex:
        {
            type: String,
            default: "flex-row-reverse"
        },
        liColor:
        {
            type: String,
            default: "primary"
        },
        spanColor:
        {
            type: String,
            default: "primary"
        },
    }
}
</script>
