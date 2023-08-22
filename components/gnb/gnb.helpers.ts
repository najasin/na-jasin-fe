const btnTextHelpers = (path: string) => {
  if (path === '/') {
    return '로그인'
  }
  if (path === '/jff/others-manual' || path === '/df/others-manual') {
    return '로그인'
  }

  return '로그아웃'
}

export { btnTextHelpers }
