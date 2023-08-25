export default interface ICopyToast {
  type?: 'success' | 'error'
  title?: string
  onClose?: () => void
  subtitle?: string
}
