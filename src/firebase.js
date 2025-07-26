// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// إعدادات مشروعك من Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAsPlAMOS-WYWk4-7PNa5yy973jsfon7uU",
  authDomain: "my-company-7292f.firebaseapp.com",
  projectId: "my-company-7292f",
  storageBucket: "my-company-7292f.firebasestorage.app",
  messagingSenderId: "1052488164454",
  appId: "1:1052488164454:web:af12726fc36a6cfd3bf9a7"
};

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);

// تصدير الخدمات لاستخدامها في أي ملف
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
