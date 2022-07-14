<script setup>
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { FlagIcon, TrashIcon, PencilIcon } from '@heroicons/vue/outline';
import { ref, watchEffect } from "vue";
import dayjs from "dayjs";
import Note from "../assets/Note.svg";
import Loader from "./Loader.vue";
import { blogUrl } from "../utils/baseUrl";
const authStore = useAuthStore();
const token = ref("");
const myBlogsData = ref([])
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
    const response = await axios.get(`${blogUrl}/myBlogs`, config);
    loading.value = false;
    myBlogsData.value = response.data;
});

function truncate(value,n) {
        return value?.length > n ? value.substr(0,n-1) + "....": value;
};

const handleDeleteBlog = async (id) => {
    const index = myBlogsData.value.findIndex((item) => item._id === id);
    await axios.delete(`${blogUrl}/delete/${id}`, config);
    myBlogsData.value.splice(index,1)
};


</script>
<template>
<main class="pt-14">
    <div v-if="loading" class="mt-48">
    <Loader/>
    </div>
    <div v-else>
        <div v-if="myBlogsData.length === 0">
        <div class="grid-center">
             <img :src="Note" alt="Note" class="w-96 h-96">
                     <button class="py-2 px-6 border border-purple-500 rounded-md text-white hover:text-bold hover:bg-purple-600 transition duration-200 ease-in md:px-10"><router-link to="/create">Create Blog</router-link></button>
        </div>
        </div>
        <div class="flex justify-center items-center flex-wrap xl:justify-start ">
            <div v-for="blog in myBlogsData" :key="blog._id" class="w-72 h-[555px] rounded-md border border-gray-800 my-2 md:mx-4 xl:mx-10 xl:w-96 xl:h-[500px]">
            <div class="grid-center">
                 <router-link :to="{name:'blog', params:{id: blog._id}}">
                <img :src="blog.image" alt="image" class="w-48 h-48">
                </router-link>
            </div>
            <div class="px-2 space-y-2 md:px-4">
                  
                <div>
                    <h3 class="text-gray-400">By: {{blog.username}}</h3>
                </div>
                <div>
                    <router-link :to="{name:'blog', params:{id: blog._id}}">
                    <h2 class="text-white text-lg xl:text-2xl">{{truncate(blog.title, 40)}}</h2>
                    </router-link>
                </div>

                <div>
                    <router-link :to="{name:'blog', params:{id: blog._id}}">
                    <p class="text-gray-400">{{ truncate(blog.description, 250)}}</p>
                    <p class="text-purple-500 py-2 cursor-pointer">Read More..</p>
                    </router-link>
                </div>

                <div class="flex-between">
                <div class='flex items-center space-x-1 xl:space-x-3'>
                      <p><FlagIcon class="w-5 h-5 text-gray-400"/></p>
                      <p class='text-gray-400 text-sm xl:text-lg'>{{ formateDate(blog.createdAt)}}</p>
                </div>
                <div class="flex items-center space-x-2 xl:space-x-4">
                    <router-link :to="{name:'blogEdit', params:{id: blog._id}}">
                    <PencilIcon class="w-6 h-6 text-green-500 text-sm"/>
                    </router-link>
                    <TrashIcon class="w-6 h-6 text-red-500 hover:text-red-700 text-sm" @click="handleDeleteBlog(blog._id)"/>
                </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</main>
</template>