export interface CircleButtonProps {
  id?: string
  name: string
  size: 'sm' | 'md' | 'lg'
  shareUrl?: string
  image?: string
  text?: string
  action?: boolean
  transparent?: boolean
  onClick?: () => void
}
