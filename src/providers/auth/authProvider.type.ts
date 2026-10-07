import {User} from '../../models/User.model.ts';
import {ReactNode} from 'react';

export type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
}


export type AuthProviderProps = {
  children: ReactNode;
}