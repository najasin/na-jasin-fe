/**
 *
 * @param handler state로 ui 변경할 경우 handler를 넘겨주면 됩니다.
 * @example hanlder를 넘겨줄 수 있으므로 () => handleClickCopyClipboard 로 사용해야 합니다.
 */
const handleClickCopyClipboard = async (handler?: () => void) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(window.location.href)
  }

  if (handler) {
    handler()
    setTimeout(() => {
      handler()
    }, 500)
  }
}

export default handleClickCopyClipboard
