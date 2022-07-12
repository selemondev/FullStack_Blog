<script setup>
import { computed, ref , reactive, watchEffect} from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
const authStore = useAuthStore();
const authUrl = "http://localhost:5000/api/auth";
const token = ref("");
const blogData = ref([]);
const blogForm = reactive({
    title: "",
    username: "",
    description: "",
    routeId: ""
})
watchEffect(() => {
    token.value = authStore.user?.data?.token;
});

const config = {
    headers: {
        Authorization: `Bearer ${token.value}`
    }
};

const rules = computed(() => {
    return {
    username: { required: helpers.withMessage("Username is required", required) },
    email: { required: helpers.withMessage("Email is required", required), email },
    }
});

const v$ = useVuelidate(rules, blogForm);
watchEffect( async () => {
    const response = await axios.get(`${authUrl}/credentials`, config);
    console.log(response.data)
    blogData.value = response.data;
    blogForm.username = blogData.value.username;
    blogForm.email = blogData.value.email;
});
</script>
<template>
<main class="grid-center pt-14">
          <div class="max-w-sm w-72 mt-4 mb-4 md:w-96 md:mt-6 md:mb-6">
        <form class="w-full px-6 py-4 bg-black border border-gray-800 rounded-sm shadow-sm" @submit.prevent="handleSubmit()">
            <div class="grid-center pb-4">
                <h3 class="font-bold text-white text-xl md:text-2xl">Profile</h3>
            </div>

            <div class="pb-4">
                <label for="username" class="label">Username</label>
                <input type="text" placeholder="Username" class="input-style border-none focus:ring-1 focus:ring-green-700" v-model="blogForm.username">
                <p class="error" v-if="v$.username.$error">{{ v$.username.$errors[0].$message}}</p>
            </div>

             <div class="pb-4">
                <label for="email" class="label">Email</label>
                   <input type="email" placeholder="email" class="input-style border-none focus:ring-1 focus:ring-green-700" v-model="blogForm.email">
                <p class="error py-1" v-if="v$.email.$error">{{ v$.email.$errors[0].$message}}</p>
            </div>

            <div>
                 <button type="submit" class="w-full py-2.5 bg-green-800 hover:bg-green-900 text-white rounded-md"><router-link :to="{ name: 'user', params:{id: authStore.user.data._id}}">Update Profile</router-link></button>
            </div>

        </form>
    </div>
</main>
</template>