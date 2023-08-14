'use client'

import { motion } from 'framer-motion'

export default function ButtonHoverTapAnimation({
  children,
  hoverScale,
  tapScale,
}: {
  children: React.ReactNode
  hoverScale: number
  tapScale: number
}) {
  return (
    <motion.div
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
    >
      {children}
    </motion.div>
  )
}
