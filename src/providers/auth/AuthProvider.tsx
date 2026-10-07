import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { AuthProviderProps } from './authProvider.type.ts';
import { User } from '../../models/User.model.ts';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
