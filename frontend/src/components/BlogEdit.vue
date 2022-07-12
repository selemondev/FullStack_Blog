<script setup>
import { computed, ref , reactive, watchEffect} from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute();
const authStore = useAuthStore();
const blogUrl = "http://localhost:5000/api/blog";
const token = ref("");
const blogData = ref([]);
const blogForm = reactive({
    title: "",
    username: "",
    description: "",
})
const loading = ref(false);
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
        username: { required: helpers.withMessage(" Username is required", required)},
        title: { required: helpers.withMessage(" Title is required", required)},
        description: { required: helpers.withMessage("Description is required", required), minLength: minLength(400) },
    }
});

const v$ = useVuelidate(rules, blogForm);
const handleSubmit = async () => {
    const result = await v$.value.$validate();
    if( result ) {
        loading.value = true;
        await axios.put(`${blogUrl}/update/${route.params.id}`, {
            title: blogForm.title,
            description: blogForm.description,
            username: blogForm.username,
        }, config);
        loading.value = false;
        router.push("/home")
    }
};
watchEffect( async () => {
    const response = await axios.get(`${blogUrl}/blog/${route?.params?.id}`, config);
    blogData.value = response.data;
    blogForm.username = blogData.value.username;
    blogForm.description = blogData.value.description;
    blogForm.title = blogData.value.title;
});

</script>
<template>
<main class="grid-center pt-14">
          <div class="max-w-sm w-72 mt-4 mb-4 md:w-96 md:mt-6 md:mb-6">
        <form class="w-full px-6 py-4 bg-black border border-gray-800 rounded-sm shadow-sm" @submit.prevent="handleSubmit">
            <div class="grid-center pb-4">
                <h3 class="font-bold text-white text-xl md:text-2xl">Update Blog</h3>
            </div>

            <div class="grid-center">
               <div>
                <img :src="blogData.image" alt="blob" class="w-48 h-48 rounded-sm">
               </div>
            </div>

            <div class="pb-4">
                <label for="title" class="label">Title</label>
                <input type="text" placeholder="Title" class="input-style border-none focus:ring-1 focus:ring-green-700" v-model="blogForm.title">
                <p class="error" v-if="v$.title.$error">{{ v$.title.$errors[0].$message}}</p>
            </div>

             <div class="pb-4">
                <label for="description" class="label">Description</label>
                <textarea placeholder="Make it interesting" class="w-full min-h-[52px] focus:outline-none mt-2 border-none rounded-md px-2 py-2 text-lg tracking-wide bg-white outline-none" v-model="blogForm.description"/>
                <p class="error py-1" v-if="v$.description.$error">{{ v$.description.$errors[0].$message}}</p>
            </div>

             <div class="pb-6">
                <label for="username" class="label">Username</label>
                <input type="text" placeholder="Username" class="input-style border-none focus:ring-1 focus:ring-green-700" v-model="blogForm.username">
                <p class="error" v-if="v$.username.$error">{{ v$.username.$errors[0].$message}}</p>
            </div>

            <div>
                 <button type="submit" class="w-full py-2.5 bg-green-800 hover:bg-green-900 text-white rounded-md">{{ loading ? "Updating Blog ...." : "Update Blog"}}</button>
            </div>

        </form>
    </div>
</main>
</template>