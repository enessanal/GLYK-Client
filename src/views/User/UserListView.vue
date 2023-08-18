<template>
    <div class="about text-center">
        <h1 class="mb-3">Users</h1>
        
        <div v-for="user in users" :key="user.id" class="user-list">
            <router-link :to="{name:'UserDetailsView', params:{id: user.id}}">
                <h3>{{ user.username }}</h3>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default{
    props: ['id'],
    data(){
        return{
            users:[]
        }
    },
    methods:{
        
        async fetchUsers()
        {
            const response = await axios.get("/api/users");
            return response.data;
        }
    },
    async created()
        {
            this.users= await this.fetchUsers();
        }
}
</script>
    
    
    
<style scoped>


.text-center
{
    text-align: center;
}


.user-list h3
{
    background: #f4f4f4;
    padding: 20px;
    border-radius: 10px;
    margin: 10px auto;
    max-width: 600px;
    cursor: pointer;
    color: #444;
}

.user-list h3:hover
{
    background-color: #007242af;
    color:#ffffff;
}
.user-list a
{
    text-decoration: none;
    
}


</style>