import classNames from 'classnames/bind'

import styles from './progressBar.module.scss'

const cx = classNames.bind(styles)

interface ProgressBarProps {
  currentStep: string
  totalSteps: string[]
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  if (!totalSteps.includes(currentStep)) {
    throw new Error(`currentStep '${currentStep}' is not a valid step.`)
  }

  return (
    <div className={cx('progressBar')}>
      {totalSteps.map((step, index) => (
        <div
          key={index}
          className={`${cx('progressStep')} ${
            totalSteps.indexOf(step) <= totalSteps.indexOf(currentStep)
              ? cx('fill')
              : ''
          }`}
        ></div>
      ))}
    </div>
  )
}
