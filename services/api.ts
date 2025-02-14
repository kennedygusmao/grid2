// services/api.ts
export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
  }
  
  const API_URL = 'http://localhost:3001';
  
  export const getPosts = async (): Promise<Post[]> => {
    const response = await fetch(`${API_URL}/posts`);
    return response.json();
  };
  
  export const createPost = async (post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...post, createdAt: new Date().toISOString() }),
    });
    return response.json();
  };