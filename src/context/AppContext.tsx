import { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  refreshAlumnosKey: number;
  triggerRefreshAlumnos: () => void;
  refreshMateriasKey: number;
  triggerRefreshMaterias: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [refreshAlumnosKey, setRefreshAlumnosKey] = useState(0);
  const [refreshMateriasKey, setRefreshMateriasKey] = useState(0);

  const triggerRefreshAlumnos = () => setRefreshAlumnosKey((prev) => prev + 1);
  const triggerRefreshMaterias = () => setRefreshMateriasKey((prev) => prev + 1);

  return (
    <AppContext.Provider
      value={{
        refreshAlumnosKey,
        triggerRefreshAlumnos,
        refreshMateriasKey,
        triggerRefreshMaterias,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
