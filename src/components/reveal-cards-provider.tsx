import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type RevealCardsProviderProps = {
  children: ReactNode;
};

type RevealModeController = {
  revealCards: boolean;
  setRevealCards: Dispatch<SetStateAction<boolean>>;
};

export const RevealCardsContext = createContext<
  RevealModeController | undefined
>(undefined);

export function RevealCardsProvider({ children }: RevealCardsProviderProps) {
  const [revealCards, setRevealCards] = useState<boolean>(false);
  return (
    <RevealCardsContext.Provider value={{ revealCards, setRevealCards }}>
      {children}
    </RevealCardsContext.Provider>
  );
}
