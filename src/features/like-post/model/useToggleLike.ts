export function useToggleLike() {
  let pending = false;
  const toggle = async (postId: number) => {
    pending = true;
    postId;
    await new Promise((r) => setTimeout(r, 300));
    pending = false;
  };
  return { toggle, isPending: pending } as const;
}
