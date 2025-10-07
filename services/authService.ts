import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export const signInWithGoogle = async (): Promise<UserData> => {
  try {
    // Configure Google provider with specific parameters
    googleProvider.setCustomParameters({
      prompt: 'select_account',
      nonce: Math.random().toString(36).substring(2, 15),
      auth_type: 'reauthenticate'
    });
    
    // Sign in with redirect instead of popup
    const result = await signInWithPopup(auth, googleProvider.setCustomParameters({
      prompt: "select_account"
    }));
    const user = result.user;
    
    // Store user data in Firestore
    if (user) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: new Date()
      }, { merge: true });

      return {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || ''
      };
    }
    throw new Error('No user data returned from Google authentication');
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

export const saveStudyPlan = async (userId: string, plan: any) => {
  try {
    const planRef = doc(collection(db, 'users', userId, 'studyPlans'));
    await setDoc(planRef, {
      ...plan,
      createdAt: new Date(),
      userId
    });
    return planRef.id;
  } catch (error) {
    console.error('Error saving study plan:', error);
    throw error;
  }
};

export const getUserStudyPlans = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const plansRef = collection(db, 'users', userId, 'studyPlans');
    const q = query(plansRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: userId,
        goal: data.goal || '',
        response: data.response || { studyPlan: [], resources: [], wellnessTips: [] },
        createdAt: data.createdAt || new Date()
      };
    });
  } catch (error) {
    console.error('Error getting user study plans:', error);
    throw error;
  }
};