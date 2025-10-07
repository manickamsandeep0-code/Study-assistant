import { doc, updateDoc, getFirestore } from 'firebase/firestore';
import type { StudyPlanResponse } from '../types';

const db = getFirestore();

export const updateStudyPlan = async (
  userId: string,
  planId: string,
  response: StudyPlanResponse
): Promise<void> => {
  try {
    const planRef = doc(db, 'users', userId, 'studyPlans', planId);
    await updateDoc(planRef, { response });
  } catch (error) {
    console.error('Error updating study plan:', error);
    throw error;
  }
};