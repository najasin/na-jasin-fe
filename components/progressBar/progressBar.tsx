import classNames from 'classnames/bind'

import styles from './progressBar.module.scss'

const cx = classNames.bind(styles)

interface ProgressBarProps {
  currentSteps: string
  totalSteps: string[]
}

const ProgressBar = ({ currentSteps, totalSteps }: ProgressBarProps) => (
  <div className={cx('progressBar')}>
    {totalSteps.map((step, index) => (
      <div
        key={index}
        className={`${cx('progressStep')} ${
          step === currentSteps ? cx('fill') : ''
        }`}
      ></div>
    ))}
  </div>
)

export default ProgressBar
