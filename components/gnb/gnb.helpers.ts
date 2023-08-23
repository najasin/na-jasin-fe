const isLogin = (isLog: boolean) => {
  if (isLog) {
    return true
  }
  return false
}

const btnTextHelpers = (path: string, isLog: boolean) => {
  if (path === '/') {
    return '' // 홈페이지에서 로그인 텍스트 제거
  }

  if (isLogin(isLog)) {
    return '로그아웃'
  }
  return '로그인'
}

const userTypeHelpers = (path: string) => {
  if (path.includes('jff')) {
    return 'forFun'
  }

  if (path.includes('df')) {
    return 'forDev'
  }
  return ''
}

export { btnTextHelpers, userTypeHelpers }
