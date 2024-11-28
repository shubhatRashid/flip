import React, { createContext, useContext, useState, ReactNode, Dispatch } from 'react';
import data, { NoteCategory } from '../data';

// Define the shape of the context state
interface AppContextType {
  notes: NoteCategory[]; // No need to allow null if it's always an array (even empty)
  setNotes: Dispatch<React.SetStateAction<NoteCategory[]>>; // Adjusted to match `notes` type
}

// Create the context with default values
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<NoteCategory[]>(data);

  return (
    <AppContext.Provider value={{ notes, setNotes }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context in other components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
