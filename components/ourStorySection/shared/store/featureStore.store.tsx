import { atom } from 'recoil'

const featureIdAtom = atom({
  key: 'featureId',
  default: '',
})

const featureScreenAtom = atom({
  key: 'featureScreen',
  default: '',
})

export { featureIdAtom, featureScreenAtom }
