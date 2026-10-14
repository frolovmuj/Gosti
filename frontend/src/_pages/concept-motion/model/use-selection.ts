'use client';

import { useSyncExternalStore } from 'react';

import { MOCK_DISHES } from '@entities/dish';

import { changeSelection, parseSelection, type Selection } from './selection';

const STORAGE_KEY = 'gosti-concept-motion-selection-v1';
const dishIds = MOCK_DISHES.map((dish) => dish.id);
const serverSnapshot = { quantities: {} as Selection, persisted: true };
let snapshot = serverSnapshot;
let initialized = false;
const listeners = new Set<() => void>();

function getSnapshot() {
  if (!initialized) {
    initialized = true;
    try {
      snapshot = {
        quantities: parseSelection(localStorage.getItem(STORAGE_KEY), dishIds),
        persisted: true,
      };
    } catch {
      snapshot = { quantities: {}, persisted: false };
    }
  }
  return snapshot;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const sync = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    snapshot = {
      quantities: parseSelection(event.newValue, dishIds),
      persisted: true,
    };
    listeners.forEach((notify) => notify());
  };
  window.addEventListener('storage', sync);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', sync);
  };
}

function save(quantities: Selection) {
  let persisted = true;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
  } catch {
    persisted = false;
  }
  snapshot = { quantities, persisted };
  listeners.forEach((notify) => notify());
}

export function changeQuantity(id: string, delta: number) {
  if (dishIds.includes(id))
    save(changeSelection(getSnapshot().quantities, id, delta));
}

export function clearSelection() {
  save({});
}

// A stable server snapshot prevents hydration differences when a saved choice exists.
// https://react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering
export function useSelection() {
  const state = useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
  const count = Object.values(state.quantities).reduce(
    (sum, value) => sum + value,
    0,
  );
  const total = MOCK_DISHES.reduce(
    (sum, dish) => sum + dish.price * (state.quantities[dish.id] || 0),
    0,
  );
  return { ...state, count, total };
}
