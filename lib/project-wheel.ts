export function createProjectWheelGesture() {
  let lastEventAt: number | null = null
  let lockedUntil = 0
  let amount = 0
  let triggered = false

  return (delta: number, now: number): -1 | 0 | 1 => {
    if (!Number.isFinite(delta) || !Number.isFinite(now) || delta === 0)
      return 0
    if (
      lastEventAt === null ||
      (now - lastEventAt >= 300 && now >= lockedUntil)
    ) {
      amount = 0
      triggered = false
    }
    lastEventAt = now
    if (triggered) return 0
    if (Math.sign(delta) !== Math.sign(amount)) amount = 0
    amount += delta
    if (Math.abs(amount) < 90) return 0
    triggered = true
    lockedUntil = now + 700
    return amount > 0 ? 1 : -1
  }
}
