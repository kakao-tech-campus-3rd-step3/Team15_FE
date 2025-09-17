export function useToggleLike() {
  let pending = false;
  const toggle = async () => {
    pending = true;
    await new Promise((r) => setTimeout(r, 300));
    pending = false;
  };
  return { toggle, isPending: pending } as const;
}
