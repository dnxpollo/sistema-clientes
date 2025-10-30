import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { NFe } from '../types/NFe';

interface NFeContextType {
  nfes: NFe[];
  adicionarNFe: (nfe: NFe) => void;
}

export const NFeContext = createContext<NFeContextType | undefined>(undefined);

interface NFeProviderProps {
  children: ReactNode;
}

export function NFeProvider({ children }: NFeProviderProps) {
  const [nfes, setNfes] = useState<NFe[]>([]);

  const adicionarNFe = (nfe: NFe) => {
    setNfes((prev) => [...prev, nfe]);
  };

  return (
    <NFeContext.Provider value={{ nfes, adicionarNFe }}>
      {children}
    </NFeContext.Provider>
  );
}
