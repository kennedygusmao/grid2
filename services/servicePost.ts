// services/api.ts
const API_URL = 'http://localhost:3001';

export type Post = {
  id: number;
  title: string;
  content: string;
};

export const postService = {
  getAll: async (): Promise<Post[]> => {
    const response = await fetch(`${API_URL}/posts`);
    return response.json();
  },

  create: async (post: Omit<Post, 'id'>): Promise<Post> => {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    return response.json();
  },

  update: async (id: number, post: Partial<Post>): Promise<Post> => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
    });
  },
};