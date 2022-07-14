<script setup>
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { FlagIcon } from '@heroicons/vue/outline';
import { ref, watchEffect } from "vue";
import dayjs from "dayjs";
import Note from "../assets/Note.svg";
import Loader from "./Loader.vue";
import { blogUrl } from "../utils/baseUrl";
const authStore = useAuthStore();
const token = ref("");
const blogs = ref([])
const loading = ref(false);
const formateDate = (dateValue) => {
    const date = dayjs(dateValue);
    return date.format('dddd MMMM D, YYYY');
};
watchEffect(() => {
    token.value = authStore.user?.data?.token;
});
const config = {
    headers: {
        Authorization: `Bearer ${token.value}`
    }
};
watchEffect( async () => {
    loading.value = true;
    const response = await axios.get(`${blogUrl}`, config);
    loading.value = false;
    blogs.value = response.data;
});

function truncate(value,n) {
        return value?.length > n ? value.substr(0,n-1) + "....": value;
};

</script>
<template>
<main class="pt-14">
    <div v-if="loading" class="mt-48">
    <Loader/>
    </div>
    <div v-else>
        <div v-if="blogs.length === 0">
        <div class="grid-center">
             <img :src="Note" alt="Note" class="w-96 h-96">
                <button class="py-2 px-6 border border-purple-500 rounded-md text-white hover:text-bold hover:bg-purple-600 transition duration-200 ease-in md:px-10"><router-link to="/create">Create Blog</router-link></button>
        </div>
        </div>
        <div class="flex justify-center items-center flex-wrap">
            <div v-for="blog in blogs" :key="blog._id" class="flex items-center py-2 rounded-md border border-gray-900 my-2 md:space-x-2 md:mx-4 ">
            <div class="grid-center w-52 h-52">
                 <router-link :to="{name:'blog', params:{id: blog._id}}">
                <img :src="blog.image" alt="image" class="w-32 h-24 md:w-48 md:h-48">
                </router-link>
            </div>
            <div class="px-2 space-y-1 md:space-y-2 md:px-4">
                  
                <div>
                    <h3 class="text-gray-400">By: {{blog.username}}</h3>
                </div>
                <div>
                    <router-link :to="{name:'blog', params:{id: blog._id}}">
                    <h2 class="text-white text-base xl:text-2xl">{{truncate(blog.title, 40)}}</h2>
                    </router-link>
                </div>

                <div>
                    <router-link :to="{name:'blog', params:{id: blog._id}}">
                    <p class="text-gray-400 text-sm md:text-base">{{ truncate(blog.description, 130)}}</p>
                    <p class="text-purple-500 py-2 cursor-pointer">Read More..</p>
                    </router-link>
                </div>

                <div class="flex-between">
                <div class='flex items-center space-x-3'>
                      <p><FlagIcon class="w-5 h-5 text-gray-400"/></p>
                      <p class='text-gray-400 text-sm xl:text-lg'>{{ formateDate(blog.createdAt)}}</p>
                </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</main>
</template>