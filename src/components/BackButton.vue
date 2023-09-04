<template>
    <div class="d-block">
        <div class="d-flex flex-column flex-sm-row justify-content-evenly mb-2">
        <button class="btn btn-secondary" @click="back">&lt; {{ $t('others.backButton') }}</button>
        </div>
    </div>
</template>

<script>
    export default{
        name: "BackButton",
        props: {
        },
        methods:{
            back()
            {
                this.$router.go(-1);
            }
        }
    }

</script>

<style scoped>

    button
    {
        border: none;
        border-radius: 4px;
        padding:10px;
        font-weight: bold;
    }

    button:hover
    {
        background-color: #c20606 ;
        color:azure;
    }

</style>