<script setup>
import { CameraIcon } from '@heroicons/vue/outline';
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
const blogUrl = "http://localhost:5000/api/blog";
const blogData = reactive({
    title: "",
    username: "",
    selectedImage: "",
    description: "",
    blob: ""
});

const fileUpload = () => {
    const target = event.target;
    const file = target.files[0];
    blogData.selectedImage = file;
    blogData.blob = URL.createObjectURL(file);
}

const rules = computed(() => {
    return {
        username: { required: helpers.withMessage(" Username is required", required)},
        title: { required: helpers.withMessage(" Title is required", required)},
        description: { required: helpers.withMessage("Description is required", required), minLength: minLength(400) },
        selectedImage: { required: helpers.withMessage("Blog Image is required", required)}
    }
});

const v$ = useVuelidate(rules, blogData);
const handleSubmit = async () => {
    const result = await v$.value.$validate();
    if(result) {
        alert("Success")
    }
};

const removeSelectedImage = () => {
    return blogData.blob = "";
}
</script>
<template>
<main class="grid-center">
          <div class="max-w-sm w-72 mt-4 mb-4 md:w-96 md:mt-6 md:mb-6">
        <form class="w-full px-6 py-4 bg-black border border-gray-800 rounded-sm shadow-sm" @submit.prevent="handleSubmit">
            <div class="grid-center pb-4">
                <h3 class="font-bold text-white text-xl md:text-2xl">Create Blog</h3>
            </div>

            <div class="grid-center">
               <div v-if="!blogData.blob">
                 <label for="fileUpload" class="grid-center">
                 <CameraIcon class="w-10 h-10 text-white cursor-pointer"/>
               </label>
               <input type="file" hidden name="fileUpload" id="fileUpload" @change="fileUpload">
                 <p class="error" v-if="v$.selectedImage.$error">{{ v$.selectedImage.$errors[0].$message}}</p>
               </div>

               <div v-else>
                <img :src="blogData.blob" alt="blob" class="w-48 h-48 rounded-sm">
                <div class="grid-center" @click="removeSelectedImage()">
                    <p class="text-red-500 hover:text-red-600 cursor-pointer py-2">Remove selected image</p>
                </div>
               </div>
            </div>

            <div class="pb-4">
                <label for="username" class="label">Title</label>
                <input type="text" placeholder="Title" class="input-style border-none focus:ring-1 focus:ring-green-700" v-model="blogData.title">
                <p class="error" v-if="v$.title.$error">{{ v$.title.$errors[0].$message}}</p>
            </div>

             <div class="pb-4">
                <label for="description" class="label">Description</label>
                 <input type="text" placeholder="Description" class="input-style border-none focus:ring-1 focus:ring-green-700" v-model="blogData.description">
                <p class="error py-1" v-if="v$.description.$error">{{ v$.description.$errors[0].$message}}</p>
            </div>

             <div class="pb-6">
                <label for="username" class="label">Username</label>
                <input type="text" placeholder="Username" class="input-style border-none focus:ring-1 focus:ring-green-700" v-model="blogData.username">
                <p class="error" v-if="v$.username.$error">{{ v$.username.$errors[0].$message}}</p>
            </div>

            <div>
                 <button type="submit" class="w-full py-2.5 bg-green-800 hover:bg-green-900 text-white rounded-md">Publish Blog</button>
            </div>

        </form>
    </div>
</main>
</template>