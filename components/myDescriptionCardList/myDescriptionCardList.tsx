import classNames from 'classnames/bind'

import MyDescriptionCard2 from '@/components/descriptionCard/myDescriptionCard2'
import { IQuestions } from '@/components/makeMyManual/makeMyManual.types'

import styles from './myDescriptionCardList.module.scss'

const cx = classNames.bind(styles)
export default function MyDescriptionCardList({
  questions,
}: {
  questions: IQuestions[]
}) {
  return (
    <>
      {questions?.map(
        (question: IQuestions) =>
          question && (
            <div key={question.id} className={cx('manualItem')}>
              <MyDescriptionCard2
                question={{
                  id: question.id,
                  question: question.question,
                }}
              />
            </div>
          ),
      )}
    </>
  )
}
