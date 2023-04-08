import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_USER_APY_KEY,
  authDomain: process.env.NEXT_PUBLIC_USER_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_USER_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_USER_STORE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_USER_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_USER_APP_ID,
};

const app = initializeApp(firebaseConfig);