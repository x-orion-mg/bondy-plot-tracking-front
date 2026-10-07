import { createContext } from 'react';
import { AuthContextType } from './authProvider.type.ts';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
