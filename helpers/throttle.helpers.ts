// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ThrottleFn = (...args: any[]) => void

export function throttleHelper(delay: number, fn: ThrottleFn): ThrottleFn {
  // const [lastExecTime, setLastExecTime] = useState(0)

  let lastExecTime = 0
  const throttledHelper: ThrottleFn = (...args) => {
    const now = Date.now()
    if (now - lastExecTime >= delay) {
      fn(...args)
      // setLastExecTime(now)
      lastExecTime = now
    }
  }

  return throttledHelper
}
