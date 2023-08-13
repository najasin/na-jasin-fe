'use client'

import React from 'react'

import { RecoilRoot } from 'recoil'

interface RecoilRootWrapperProps {
  children: React.ReactNode
}

export default function RecoilRootWrapper({
  children,
}: RecoilRootWrapperProps) {
  return <RecoilRoot>{children}</RecoilRoot>
}
