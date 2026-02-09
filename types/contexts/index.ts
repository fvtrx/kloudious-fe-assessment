export interface User {
  id: string;
  name: string;
  email: string;
}

export interface StoredUser extends User {
  password: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  authToken: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  isLoading: boolean;
}
