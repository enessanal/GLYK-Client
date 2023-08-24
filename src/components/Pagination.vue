<template>
    <div class="d-flex justify-content-between prevent-select">
        <div class="d-inline-flex">
            <select class="form-select" v-model="page.size" @change="onChangePageSize">
                <option disabled value="">Page Size</option>
                <option v-for="size in sizes" :value="size">{{size}}</option>
            </select>
        </div>

        <div class="d-inline-flex overflow-auto">
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-end">
                    <li class="page-item" :class="{ 'disabled': page?.number === 0 }">
                        <a class="page-link" href="#" @click.prevent="onClickPageNumber(page?.number)">&laquo;</a>
                    </li>

                    <li class="page-item" :class="{ 'active': pageNumber === page?.number+1 }" v-for="pageNumber in page?.totalPages">
                        <a class='page-link' href="#" @click.prevent="onClickPageNumber(pageNumber)">{{ pageNumber }} </a>
                    </li>
                    
                    <li class="page-item" :class="{ 'disabled': page?.number === page?.totalPages-1 }">
                        <a class="page-link" href="#" @click.prevent="onClickPageNumber(page?.number+2)">&raquo;</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>


<script>
export default
{
    name: "Pagination",
    props:
    {
        page: 
        {
            type: Object,
            required: true
        },
        sizes: 
        {
            type: Array,
            required: true
        }
    },
    methods:
    {
        onChangePageSize(event) 
        {
            this.$emit('changePageSize');
        },
        onClickPageNumber(number) 
        {
            this.$emit('clickPageNumber', number);
        }
    }
}


</script>