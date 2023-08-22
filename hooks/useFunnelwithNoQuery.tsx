import {
  Children,
  ReactNode,
  isValidElement,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useSearchParams } from 'next/navigation'

export interface IFunnelProps<T extends readonly string[]> {
  step: T[number]
  children: ReactNode
}

export interface IStepProps<T extends readonly string[]> {
  name: T[number]
  children?: ReactNode
}

// 단계별로 컴포넌트를 렌더링해주는 Funnel 컴포넌트
function Funnel<T extends readonly string[]>({
  step,
  children,
}: IFunnelProps<T>) {
  // 유효한 자식 요소 필터링
  const validElement = Children.toArray(children).filter(isValidElement)
  // 현재 단계와 일치하는 Step 컴포넌트를 찾음
  const targetElement = validElement.find(
    (child) => (child.props as IStepProps<T>)?.name === step,
  )

  // 일치하는 Step 컴포넌트가 없으면 null 반환
  if (!targetElement) {
    return null
  }

  return <>{targetElement}</>
}

// 단순히 자식 요소들을 렌더링해주는 Step 컴포넌트
function Step<T extends readonly string[]>({ children }: IStepProps<T>) {
  return <>{children}</>
}

/**
 * Funnel 컴포넌트와 현재 단계를 설정할 수 있는 setter를 포함하는 튜플을 반환하는 훅
 * @param {T} steps - Funnel의 사용 가능한 단계 배열
 * @param {T[number]} defaultStep - 시작 기본 단계
 * @returns {[typeof Funnel, React.Dispatch<React.SetStateAction<T[number]>>]}
 * Funnel 요소와 현재 단계를 설정할 수 있는 setter를 포함하는 튜플을 반환한다.
 * @example
 * const steps = ['Step1', 'Step2', 'Step3'] as const;
 * const defaultStep = 'Step1';
 * const [FunnelElement, setStep] = useFunnel(steps, defaultStep);
 * // FunnelElement를 JSX로 렌더링하고, setStep을 사용하여 현재 단계를 변경할 수 있다.
 */

export const useFunnelwithNoQuery = <T extends readonly string[]>(
  steps: T,
  defaultStep: T[number],
) => {
  const [step, setStep] = useState(defaultStep)

  // Funnel 컴포넌트와 함께 Step 컴포넌트를 반환하는 객체를 생성
  const FunnelElement = useMemo(
    () =>
      Object.assign(
        (props: Omit<IFunnelProps<T>, 'step'>) => (
          <Funnel step={step} {...props} />
        ),
        { Step: (props: IStepProps<T>) => <Step<T> {...props} /> },
      ),
    [step],
  )

  const searchParams = useSearchParams().get('step')

  useEffect(() => {
    if (step === defaultStep) {
      return
    }
    if (searchParams) setStep(searchParams)
  }, [defaultStep, searchParams])

  useEffect(
    () => () => {
      setStep(defaultStep)
      console.log('cleanup')
    },
    [defaultStep],
  )

  const goNext = () => {
    const idx = steps.indexOf(step)
    if (idx === steps.length - 1) return
    setStep(steps[idx + 1])
  }

  const goPrev = () => {
    const idx = steps.indexOf(step)
    if (idx === 0) return
    setStep(steps[idx - 1])
  }
  // FunnelElement와 현재 단계를 설정할 수 있는 setter를 튜플로 반환
  return { Funnel: FunnelElement, step, setStep, goNext, goPrev } as const
}
