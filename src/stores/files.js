// store/files.js
import { defineStore } from "pinia";
import { db, storage } from "../boot/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";

export const useFileStore = defineStore({
  id: "file",
  state: () => ({
    files: [],
    loading: false,
    error: null,
  }),
  actions: {
    async sendFile(fileData, pathFile, isNewFile, fileId) {
      this.loading = true;
      this.error = null;
      try {
        const uid = localStorage.getItem("uid");
        let typeFile = "";
        if (pathFile && pathFile.type.startsWith("image/")) {
          typeFile = "image";
        } else {
          typeFile = "file";
        }

        const storageReference = storageRef(
          storage,
          `images/${uid}/${pathFile.name}`
        );
        const uploadTask = uploadBytesResumable(storageReference, pathFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progreso de la subida
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            // Manejo de errores
            console.error("Error al subir la imagen:", error);
            uploading.value = false;
          },
          () => {
            // Completado
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              if (isNewFile) {
                this.addFile(fileData, url, typeFile);
              } else {
                this.updateFile(fileData, url, typeFile, fileId);
              }

              console.log("Imagen subida y disponible en:", url);
            });
          }
        );
      } catch (error) {
        console.error("Error añadiendo documento:", error);
        this.error = "Error añadiendo documento";
      } finally {
        this.loading = false;
      }
    },

    async addFile(fileData, url, typeFile) {
      try {
        const uid = localStorage.getItem("uid");
        const docRef = await addDoc(collection(db, `users/${uid}/files`), {
          urlFile: url,
          typeFile: typeFile,
          ...fileData,
        });
        console.log("Documento agregado con ID:", docRef.id);
        this.files.push({
          id: docRef.id,
          urlFile: url,
          typeFile: typeFile,
          ...fileData,
        });
      } catch (error) {
        console.error("Error añadiendo documento:", error);
        this.error = "Error añadiendo documento";
      } finally {
        this.loading = false;
      }
    },

    async updateFile(updatedData, url, typeFile, fileId) {
      this.loading = true;
      this.error = null;
      try {
        const uid = localStorage.getItem("uid");
        const fileRef = doc(db, `users/${uid}/files`, fileId);
        const updateFileData = {
          urlFile: url,
          typeFile: typeFile,
          ...updatedData,
        };
        await updateDoc(fileRef, updateFileData);
        console.log("Documento actualizado con ID:", fileId);
        /*  this.files = this.files.map((file) =>
          file.id === fileId ? { ...file, ...updatedData } : file
        ); */
        const fileindex = this.files.findIndex((file) => file.id === fileId);
        if (fileindex !== -1) {
          this.files[fileindex] = updateFileData;
        }
      } catch (error) {
        console.error("Error actualizando documento:", error);
        this.error = "Error actualizando documento";
      } finally {
        this.loading = false;
      }
    },

    async fetchFiles() {
      this.loading = true;
      this.error = null;
      try {
        const uid = localStorage.getItem("uid");
        const filesCollection = collection(db, `users/${uid}/files`);
        const querySnapshot = await getDocs(filesCollection);
        this.files = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Documentos obtenidos:", this.files);
      } catch (error) {
        console.error("Error obteniendo documentos:", error);
        this.error = "Error obteniendo documentos";
      } finally {
        this.loading = false;
      }
    },

    async deleteFile(fileId) {
      this.loading = true;
      this.error = null;
      try {
        const uid = localStorage.getItem("uid");
        await deleteDoc(doc(db, `users/${uid}/files`, fileId));
        console.log("Documento eliminado con ID:", fileId);
        this.files = this.files.filter((file) => file.id !== fileId);
      } catch (error) {
        console.error("Error eliminando documento:", error);
        this.error = "Error eliminando documento";
      } finally {
        this.loading = false;
      }
    },

    async toggleFixed(fileId, currentFixedState) {
      this.loading = true;
      this.error = null;
      try {
        const uid = localStorage.getItem("uid");
        const fileRef = doc(db, `users/${uid}/files`, fileId);
        const updatedFixedState = !currentFixedState;
        await updateDoc(fileRef, { fixed: updatedFixedState });
        console.log("Estado de fijación actualizado con ID:", fileId);
        this.files = this.files.map((file) =>
          file.id === fileId ? { ...file, fixed: updatedFixedState } : file
        );
      } catch (error) {
        console.error("Error actualizando estado de fijación:", error);
        this.error = "Error actualizando estado de fijación";
      } finally {
        this.loading = false;
      }
    },

    async getFileById(fileId) {
      try {
        const uid = localStorage.getItem("uid");
        const file = this.files.find((file) => file.id === fileId);
        if (file) {
          return file;
        } else {
          const fileDoc = await getDoc(doc(db, `users/${uid}/files`, fileId));
          if (fileDoc.exists()) {
            return { id: fileDoc.id, ...fileDoc.data() };
          } else {
            throw new Error("No se encontró el archivo");
          }
        }
      } catch (error) {
        console.error("Error obteniendo archivo por ID:", error);
        this.error = "Error obteniendo archivo";
        return null;
      }
    },
  },
});
