export type Selection = Record<string, number>;

export const MAX_PORTIONS = 20;

/** Only known dishes with integer quantities can be restored from browser storage. */
export function parseSelection(raw: string | null, dishIds: string[]): Selection {
  try {
    const parsed: unknown = JSON.parse(raw || '{}');
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed)
        .filter(
          ([id, value]) =>
            dishIds.includes(id) &&
            typeof value === 'number' &&
            Number.isInteger(value) &&
            value > 0,
        )
        .map(([id, value]) => [id, Math.min(MAX_PORTIONS, value as number)]),
    );
  } catch {
    return {};
  }
}

export function changeSelection(
  current: Selection,
  id: string,
  delta: number,
): Selection {
  const next = { ...current };
  const quantity = Math.max(0, Math.min(MAX_PORTIONS, (next[id] || 0) + delta));
  if (quantity === 0) delete next[id];
  else next[id] = quantity;
  return next;
}
