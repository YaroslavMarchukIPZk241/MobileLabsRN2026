import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeMode } from '../theme/theme';

type GameStats = {
  score: number;
  taps: number;
  doubleTaps: number;
  longPresses: number;
  drags: number;
  swipeRight: number;
  swipeLeft: number;
  pinches: number;
  themeChanges: number;
};

type GameContextValue = {
  stats: GameStats;
  themeMode: ThemeMode;
  addTap: () => void;
  addDoubleTap: () => void;
  addLongPress: () => void;
  addDrag: () => void;
  addSwipeRight: () => void;
  addSwipeLeft: () => void;
  addPinch: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  resetGame: () => void;
};

const initialStats: GameStats = {
  score: 0,
  taps: 0,
  doubleTaps: 0,
  longPresses: 0,
  drags: 0,
  swipeRight: 0,
  swipeLeft: 0,
  pinches: 0,
  themeChanges: 0
};

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<GameStats>(initialStats);
  const [themeModeState, setThemeModeState] = useState<ThemeMode>('light');

  const addScore = (amount: number, patch: Partial<GameStats>) => {
    setStats((current) => ({
      ...current,
      ...patch,
      score: current.score + amount
    }));
  };

  const value = useMemo<GameContextValue>(() => ({
    stats,
    themeMode: themeModeState,
    addTap: () => addScore(1, { taps: stats.taps + 1 }),
    addDoubleTap: () => addScore(2, { doubleTaps: stats.doubleTaps + 1 }),
    addLongPress: () => addScore(5, { longPresses: stats.longPresses + 1 }),
    addDrag: () => addScore(3, { drags: stats.drags + 1 }),
    addSwipeRight: () => addScore(Math.floor(Math.random() * 10) + 1, { swipeRight: stats.swipeRight + 1 }),
    addSwipeLeft: () => addScore(Math.floor(Math.random() * 10) + 1, { swipeLeft: stats.swipeLeft + 1 }),
    addPinch: () => addScore(7, { pinches: stats.pinches + 1 }),
    setThemeMode: (mode: ThemeMode) => {
      setThemeModeState(mode);
      setStats((current) => ({ ...current, themeChanges: current.themeChanges + 1 }));
    },
    resetGame: () => setStats(initialStats)
  }), [stats, themeModeState]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used inside GameProvider');
  }
  return context;
}
