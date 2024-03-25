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
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

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
  addFile: async ({ url, fname, createdAt, folderId, userId }) => {
    console.log(createdAt);
    const doc = await addDoc(collection(firestore, "files"), {
      url,
      name: fname,
      createdAt,
      folderId,
      userId,
    });
    console.log(doc);
  },
  getFilesByParentId: (folderId, userId, snapShotFunction) => {
    const q = query(
      collection(firestore, "files"),
      where("folderId", "==", folderId),
      where("userId", "==", userId),
      orderBy("createdAt")
    );
    return onSnapshot(q, snapShotFunction);
  },
};

export const storage = getStorage(app);

export const fileStorage = {
  addFile: (filePath, file, currentUser, currentFolder) => {
    const fileRef = ref(storage, `/files/${currentUser.uid}/${filePath}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    // Handling state changes and completion of the upload task
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        // Upload completed successfully
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          database.addFile({
            url,
            fname: file.name,
            createdAt: new Date(),
            folderId: currentFolder.id,
            userId: currentUser.uid,
          });
        });
      }
    );
  },
};

export const auth = getAuth(app);
export default app;
