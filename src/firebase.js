import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

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
  addFolder: async ({ name, userId, createdAt, parentId, path }) => {
    try {
      const doc = await addDoc(collection(firestore, "folders"), {
        name,
        parentId,
        userId,
        path,
        createdAt,
      });
      console.log(`Doc Id: ${doc.id}`);
    } catch (e) {
      console.error(e);
    }
  },
  getFolder: async (folderId) => {
    const docRef = doc(firestore, "folders", folderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: folderId };
    } else {
      console.log("No such folder!");
    }
  },
  getByParentId: (parentId, userId, snapShotFunction) => {
    const q = query(
      collection(firestore, "folders"),
      where("parentId", "==", parentId),
      where("userId", "==", userId),
      orderBy("createdAt")
    );
    return onSnapshot(q, snapShotFunction);
  },
};
export const auth = getAuth(app);
export default app;
