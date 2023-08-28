const delaySetter = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms)
  })

export { delaySetter }
