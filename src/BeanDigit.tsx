import React from 'react'

import './BeanDigit.css'

export interface DigitProps {
  value: number
}

function Digit(props: DigitProps) {
  return <span>{props.value}</span>
}

export interface BeanDigitProps {
  value: number
  thisId: string
  getWidth: (digit: number) => number
  getHeight: (digit: number) => number
}

export interface BeanDigitState {
  digits: JSX.Element[]
  value: number
}

class BeanDigit extends React.Component<BeanDigitProps, BeanDigitState> {
  handle2: number | null
  ref: React.RefObject<HTMLDivElement>
  state: BeanDigitState
  props: BeanDigitProps

  constructor(props: BeanDigitProps) {
    super(props)

    this.ref = React.createRef<HTMLDivElement>()

    const digits = [
      <Digit key='digit0' value={0} />,
      <Digit key='digit1' value={1} />,
      <Digit key='digit2' value={2} />,
      <Digit key='digit3' value={3} />,
      <Digit key='digit4' value={4} />,
      <Digit key='digit5' value={5} />,
      <Digit key='digit6' value={6} />,
      <Digit key='digit7' value={7} />,
      <Digit key='digit8' value={8} />,
      <Digit key='digit9' value={9} />
    ]

    this.handle2 = null

    this.state = {
      digits,
      value: props.value
    }
  }

  getCarousel() {
    const {
      state: { digits, value: currentVal }
    } = this
    const start = (currentVal + 6) % 10
    const list = []

    let i = 0
    while (i < 10) {
      list.push(digits[(i + start) % 10])
      ++i
    }

    return list
  }

  componentDidUpdate(prevProps: BeanDigitProps) {
    if (prevProps.value !== this.props.value || this.handle2 !== null) {
      if (this.handle2) clearTimeout(this.handle2)

      const { value, getWidth, getHeight } = this.props
      const h = getHeight(value)
      const current = this.ref?.current

      const newOff = h * -((10 + value - (this.state.value - 4)) % 10)
      this.handle2 = (setTimeout(() => {
        this.handle2 = null

        if (current) current.classList.remove('bean-digit-roller-anim')

        this.setState({
          value
        })
      }, 300) as unknown) as number

      if (current) {
        current.classList.add('bean-digit-roller-anim')
        current.style.transform = `translateY(${newOff}px)`
        current.style.width = `${getWidth(value)}px)`
      }
    }
  }

  render() {
    const {
      props: { value, getWidth, getHeight, ...rest },
      state: { value: currentVal, digits }
    } = this

    const h = getHeight(value)

    if (currentVal !== null && value !== currentVal) {
      const w = getWidth(currentVal)

      return (
        <div
          className='bean-digit-container'
          {...rest}
          style={{ height: `${h}px` }}
        >
          <div
            className='bean-digit-roller'
            style={{ width: `${w}px`, transform: `translateY(${h * -4}px)` }}
            ref={this.ref}
          >
            {this.getCarousel()}
          </div>
        </div>
      )
    } else {
      return (
        <div
          className='bean-digit-container'
          {...rest}
          style={{ height: `${h}px` }}
        >
          <div
            className='bean-digit-roller'
            style={{ width: `${getWidth(value)}px` }}
          >
            {digits[value]}
          </div>
        </div>
      )
    }
  }
}

export default BeanDigit
