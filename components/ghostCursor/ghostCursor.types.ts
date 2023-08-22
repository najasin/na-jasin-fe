import { Dispatch, SetStateAction } from 'react'

interface IMouse {
  x: number
  y: number
  dir: string
}

interface IPosition {
  x: number
  y: number
}

interface IGhostCursorProps {
  mouse: IMouse
  setMouse: Dispatch<SetStateAction<IMouse>>
  position: IPosition
  setPosition: Dispatch<SetStateAction<IPosition>>
}

export type { IMouse, IPosition, IGhostCursorProps }
