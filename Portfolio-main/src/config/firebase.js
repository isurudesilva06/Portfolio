import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzjE-B5qQAjAHB58SWAy9ihSuUVhu6zWQ",
    authDomain: "portfolio-3427f.firebaseapp.com",
    projectId: "portfolio-3427f",
    storageBucket: "portfolio-3427f.firebasestorage.app",
    messagingSenderId: "984001964574",
    appId: "1:984001964574:web:4679026bc9405b80021c0f",
    measurementId: "G-RL8WB17SCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

// Function to save contact form submissions
export const saveContactSubmission = async (formData) => {
    try {
        const docRef = await addDoc(collection(db, "contact_submissions"), {
            ...formData,
            timestamp: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error;
    }
};

export { app, db, analytics };