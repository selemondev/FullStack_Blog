<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/vue/outline";
import { useAuthStore } from "../stores/authStore";
import { ref, watchEffect } from "vue";
const blogUrl = 'http://localhost:5000/api/blog'
const authStore = useAuthStore();
const route = useRoute();
const token = ref("");
const blog= ref([])
watchEffect(() => {
    token.value = authStore.user?.data?.token;
});
const config = {
    headers: {
        Authorization: `Bearer ${token.value}`
    }
};
watchEffect( async () => {
    const response = await axios.get(`${blogUrl}/blog/${route?.params?.id}`, config);
    blog.value = response.data;
})
</script>
<template>
    <div class="left-margin pt-14">
        <div class="flex items-center space-x-2 my-4" >
            <router-link to="/home"> <ArrowLeftIcon class="w-6 h-6 text-white hover:text-purple-600 transition duration-200 ease-in"/></router-link>
        </div>
        <div class="flex justify-center items-center flex-wrap xl:justify-start ">
            <div class=" max-h-sm w-72 rounded-md border border-gray-800 md:w-full">
            <div class="grid-center">
                <img :src="blog.image" alt="image" class="w-48 h-48">
            </div>
            <div class="px-4 space-y-2 py-4">
                <div>
                    <h3 class="text-gray-400">By: {{blog.username}}</h3>
                </div>
                <div>
                    <h2 class="text-white text-lg xl:text-2xl">{{blog.title}}</h2>
                </div>

                <div>
                    <p class="text-gray-400">{{blog.description}}</p>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>