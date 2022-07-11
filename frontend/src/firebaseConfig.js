import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB8y1IbRbN0rbUgbGTN_fEsaPINySAcGQc",
  authDomain: "fullstack-79b78.firebaseapp.com",
  projectId: "fullstack-79b78",
  storageBucket: "fullstack-79b78.appspot.com",
  messagingSenderId: "278909496149",
  appId: "1:278909496149:web:ce9e03ff64b10266975ddc"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {
    storage
}