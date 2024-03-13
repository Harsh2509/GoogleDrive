import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const app = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
});

const firestore = getFirestore(app);
export const database = {
  addFolder: async ({ name, userId, createdAt }) => {
    try {
      const doc = await addDoc(collection(firestore, "folders"), {
        name,
        userId,
        createdAt,
      });
      console.log(`Doc Id: ${doc.id}`);
    } catch (e) {
      console.error(e);
    }
  },
};
export const auth = getAuth(app);
export default app;
