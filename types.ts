export interface StudyDay {
  day: number;
  topic: string;
  duration: string;
  isBreak: boolean;
  details: string;
  completed?: boolean;
}

export interface Resource {
  title: string;
  type: 'Video' | 'Article' | 'Interactive Tutorial' | 'Documentation' | 'Book';
  url: string;
  description: string;
}

export interface Source {
  title: string;
  uri: string;
}

export interface StudyPlanResponse {
  studyPlan: StudyDay[];
  resources: Resource[];
  wellnessTips: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  picture?: string; // Optional, for backward compatibility
}

export interface FirestoreTimestamp {
  toMillis(): number;
}

export interface StudyPlanDocument {
  id: string;
  userId: string;
  goal: string;
  response: StudyPlanResponse;
  createdAt: FirestoreTimestamp;
}

export interface HistoryItem {
  id: string;
  userId: string;
  goal: string;
  response: StudyPlanResponse;
  timestamp: number;
}

export interface FirestoreTimestamp {
  toMillis(): number;
}

export interface StudyPlanDocument {
  id: string;
  userId: string;
  goal: string;
  response: StudyPlanResponse;
  createdAt: FirestoreTimestamp;
}

export interface StudyPlanResponse {
  studyPlan: StudyDay[];
  resources: Resource[];
  wellnessTips: string[];
  sources?: Source[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture?: string;
}
