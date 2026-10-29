/**
 * Sync re-entry guard for async submit handlers.
 * RTK isLoading flips only after the mutation starts — too late to block
 * double-clicks that race through await validate().
 */
export function createSubmitLock() {
  let locked = false;

  return {
    tryAcquire() {
      if (locked) return false;
      locked = true;
      return true;
    },
    release() {
      locked = false;
    },
    isLocked() {
      return locked;
    },
  };
}
