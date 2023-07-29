import { createContext } from 'react';

const defaultUser = {
  id: process.env.USER_ID,
};

export const UserContext = createContext(defaultUser);
