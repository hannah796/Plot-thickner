export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  script?: File;
  extractedElements?: ExtractedElements;
  trainingOptions?: TrainingConfig;
  results?: TrainingResult[];
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: string;
}

export interface ExtractedElements {
  characters: Character[];
  locations: Location[];
  style: StyleElement[];
}

export interface Character {
  id: string;
  name: string;
  description: string;
  selected: boolean;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  selected: boolean;
}

export interface StyleElement {
  id: string;
  name: string;
  description: string;
  selected: boolean;
}

export interface TrainingConfig {
  model: 'nano-banana' | 'custom';
  customImages?: File[];
  parameters: {
    epochs: number;
    learningRate: number;
    batchSize: number;
  };
}

export interface TrainingResult {
  id: string;
  type: 'character' | 'location' | 'style';
  name: string;
  image: string;
  approved: boolean;
  confidence: number;
}

export interface AppState {
  currentStep: number;
  project: Project | null;
  user: UserProfile;
  recentProjects: Project[];
}

export interface TrainingProgress {
  isTraining: boolean;
  progress: number;
  currentTask: string;
  estimatedTime: number;
  queue: string[];
}
