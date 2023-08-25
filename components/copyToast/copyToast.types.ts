export default interface ICopyToast {
  type?: 'success' | 'error'
  onClose?: () => void
  title?: string
  subtitle?: string
}
