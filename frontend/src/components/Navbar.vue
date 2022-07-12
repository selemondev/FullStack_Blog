<script>
export default {
    name: "Navbar",
    data() {
        return {
            mobile: false,
            mobileNav: null,
            windowWidth: null,
        }
    },
    created() {
        window.addEventListener("resize",this.checkScreenSize);
        return this.checkScreenSize();
    },
    methods: {
        rotate() {
            this.mobileNav = !this.mobileNav;
        },
        checkScreenSize() {
            this.windowWidth = window.innerWidth;
            if(this.windowWidth <= 768) {
                return this.mobile = true;
            } else {
                this.mobile = false;
                this.mobileNav = false;
            }
        }
    }
}
</script>
<script setup>
import { CheckCircleIcon, LightningBoltIcon, UserIcon, HomeIcon } from "@heroicons/vue/outline";
import Medium from "../assets/medium.png"
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { ref, watchEffect } from "vue";
const authStore = useAuthStore();
const token = ref("");
const loading = ref(false);
const router = useRouter();
watchEffect(() => {
    token.value = authStore.user?.data?.token;
    loading.value = authStore.loading
});
const sidebarMenu = [
    {
        label: "Home",
        Icon: HomeIcon,
        path: "/home"
    },
    {
        label : "My Blogs",
        Icon : CheckCircleIcon,
        path: "/blogs"
    },
    {
        label: "Create",
        Icon: LightningBoltIcon,
        path: "/create"
    },
    {
        label: "Profile",
        Icon: UserIcon,
        path: "/profile"
    }
];

const handleLogOut = async () => {
    authStore.logOut();
    router.push("/")
}
</script>
<template>
<header>
    <nav class="flex-between px-3 w-full bg-black fixed top-0 h-14 border-b border-gray-800 md:px-4">
        <div class="flex-between space-x-2">
            <img :src="Medium" alt="medium" class="w-10 h-10 bg-white rounded-full border border-black md:h-12 md:w-12">
            <h1 class="font-bold text-white text-xl md:text-2xl">Medium</h1>
        </div>
        <div v-show="!mobile">
         <button class="w-24 py-1 btn md:py-1.5" v-if="!token"><router-link to="/">Sign In</router-link></button>
              <button @click="handleLogOut()" class="w-24 py-1 btn md:py-1.5" v-else>Log Out</button>
        </div>
          <div class="flex justify-center items-center space-x-2" v-show="mobile" >     
        <div :class="{'rotate' : mobileNav}" @click="rotate">
                <div class="box1"></div>
                <div class="box2"></div>
                <div class="box3"></div>
         </div>
         </div>
        <transition name="mobileNav" class="animation">
                <ul v-show="mobileNav" class="sidebar space-y-6 px-4 py-2">
                <div class="flex items-center space-x-2 border-b border-gray-700 py-2">
                    <img :src="Medium" alt="medium" class="w-10 h-10 bg-white rounded-full border border-black md:h-12 md:w-12">
                    <h1 class="font-bold text-white text-xl md:text-2xl">Medium</h1>
                </div>
                <div v-for="menu in sidebarMenu" :key="menu.label" class="flex items-center space-x-2" v-if="token">
                <component :is="menu.Icon" class="w-7 h-7 text-gray-400 group-hover:text-white"/>
                 <li class="mobileNav-tags"><router-link :to="menu.path">{{menu.label}}</router-link></li>
                 </div>
               <div>
                 <button class="w-24 py-1 btn md:py-1.5" v-if="!token"><router-link to="/">Sign In</router-link></button>
                 <button @click="handleLogOut()" class="w-24 py-1 btn md:py-1.5" v-else>{{ loading ? "Logging Out..." : "Log Out"}}</button>
               </div>
            </ul>
        </transition>
    </nav>
</header>
</template>
<style scoped>
.mobileNav-enter-active,
.mobileNav-leave-active {
      transition: 1s ease all;
}
.mobileNav-enter-from,
.mobileNav-leave-to {
      transform: translateX(-250px);
    }
.mobileNav-enter-to {
      transform: translateX(0)
}
</style>