import { IKeywordWithId } from '../makeMyManual/makeMyManual.types'

export interface IKeywordBtnListProps {
  selectedKeywords: IKeywordWithId[]
  setSelectedKeywords: React.Dispatch<React.SetStateAction<IKeywordWithId[]>>
}
