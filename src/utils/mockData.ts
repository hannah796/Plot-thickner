import { Project, ExtractedElements, TrainingResult, UserProfile } from '../types';

export const mockUser: UserProfile = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
};

export const mockRecentProjects: Project[] = [
  {
    id: '1',
    title: 'Cyberpunk Dreams',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop'
  },
  {
    id: '2',
    title: 'Neon Samurai',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop'
  },
  {
    id: '3',
    title: 'Space Opera',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-12'),
    thumbnail: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=200&fit=crop'
  },
  {
    id: '4',
    title: 'Fantasy Quest',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-08'),
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop'
  }
];

export const mockExtractedElements: ExtractedElements = {
  characters: [
    {
      id: 'char-1',
      name: 'Kira',
      description: 'A young hacker with purple hair and cybernetic implants',
      selected: true
    },
    {
      id: 'char-2',
      name: 'Marcus',
      description: 'A veteran detective with a mysterious past',
      selected: true
    },
    {
      id: 'char-3',
      name: 'Luna',
      description: 'An AI consciousness with human-like emotions',
      selected: false
    }
  ],
  locations: [
    {
      id: 'loc-1',
      name: 'Neon District',
      description: 'A bustling cyberpunk cityscape with holographic advertisements',
      selected: true
    },
    {
      id: 'loc-2',
      name: 'Underground Lab',
      description: 'A secret research facility with glowing equipment',
      selected: true
    },
    {
      id: 'loc-3',
      name: 'Virtual Space',
      description: 'A digital realm where reality bends',
      selected: false
    }
  ],
  style: [
    {
      id: 'style-1',
      name: 'Cyberpunk Aesthetic',
      description: 'Neon colors, dark backgrounds, futuristic elements',
      selected: true
    },
    {
      id: 'style-2',
      name: 'Anime Style',
      description: 'Clean lines, vibrant colors, expressive characters',
      selected: true
    }
  ]
};

export const mockTrainingResults: TrainingResult[] = [
  {
    id: 'result-1',
    type: 'character',
    name: 'Kira',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    approved: false,
    confidence: 0.92
  },
  {
    id: 'result-2',
    type: 'character',
    name: 'Marcus',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    approved: false,
    confidence: 0.88
  },
  {
    id: 'result-3',
    type: 'location',
    name: 'Neon District',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop',
    approved: false,
    confidence: 0.95
  },
  {
    id: 'result-4',
    type: 'location',
    name: 'Underground Lab',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop',
    approved: false,
    confidence: 0.87
  },
  {
    id: 'result-5',
    type: 'style',
    name: 'Cyberpunk Aesthetic',
    image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=200&h=200&fit=crop',
    approved: false,
    confidence: 0.91
  },
  {
    id: 'result-6',
    type: 'style',
    name: 'Anime Style',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop',
    approved: false,
    confidence: 0.89
  },
  {
    id: 'result-7',
    type: 'character',
    name: 'Luna',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    approved: false,
    confidence: 0.85
  },
  {
    id: 'result-8',
    type: 'location',
    name: 'Virtual Space',
    image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=200&h=200&fit=crop',
    approved: false,
    confidence: 0.83
  },
  {
    id: 'result-9',
    type: 'style',
    name: 'Mixed Style',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop',
    approved: false,
    confidence: 0.78
  }
];
