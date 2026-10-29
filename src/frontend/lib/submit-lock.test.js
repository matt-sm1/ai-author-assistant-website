import { describe, expect, it } from "vitest";

import { createSubmitLock } from "./submit-lock.js";

describe("createSubmitLock", () => {
  it("blocks overlapping acquires until release", () => {
    const lock = createSubmitLock();

    expect(lock.tryAcquire()).toBe(true);
    expect(lock.tryAcquire()).toBe(false);
    expect(lock.isLocked()).toBe(true);

    lock.release();

    expect(lock.isLocked()).toBe(false);
    expect(lock.tryAcquire()).toBe(true);
  });

  it("prevents double submit across an async gap", async () => {
    const lock = createSubmitLock();
    let runs = 0;

    async function submit() {
      if (!lock.tryAcquire()) return;
      try {
        await Promise.resolve();
        runs += 1;
      } finally {
        lock.release();
      }
    }

    await Promise.all([submit(), submit(), submit()]);
    expect(runs).toBe(1);
  });
});
