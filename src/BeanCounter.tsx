import React from 'react'

import BeanDigit from './BeanDigit'

import './BeanCounter.css'

const numMap = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9
}

export interface BeanCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  precision: number
  value: number
}

export interface BeanCounterState {
  first: boolean
}

class BeanCounter extends React.Component<BeanCounterProps, BeanCounterState> {
  ref: React.RefObject<HTMLDivElement>
  measuringEl: React.ReactElement
  id: string
  baseKey: string

  constructor(props: BeanCounterProps) {
    super(props)

    this.id = 'BeanCounter' + ((Math.random() * 1000000) >> 0)
    this.baseKey = this.id + '-bean'

    this.ref = React.createRef()
    this.measuringEl = (
      <div
        ref={this.ref}
        className={`measuring-rod bean-counter ${props.className || ''}`}
      >
        <span>0</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
      </div>
    )

    this.state = {
      first: true
    }
  }

  getWidth = (digit: number) => {
    return this.ref.current?.children[digit].getBoundingClientRect().width || 0
  }

  getHeight = (digit: number) => {
    return this.ref.current?.children[digit].getBoundingClientRect().height || 0
  }

  componentDidMount() {
    const getWidth = this.getWidth
    const iv = setInterval(() => {
      if (getWidth(0) > 0) {
        clearInterval(iv)
        this.setState({ first: false })
      }
    }, 5)
  }

  render() {
    const { precision, value, className, ...rest } = this.props
    const { getWidth, getHeight, measuringEl } = this

    const digits = Array.from(value.toFixed(precision >> 0))
    const digitsLength = digits.length

    const baseKey = this.id + '-bean'

    const thisClass = ['bean-counter', className || ''].join(' ')

    if (this.state.first) {
      return (
        <div {...rest} className={thisClass}>
          {measuringEl}
        </div>
      )
    } else {
      return (
        <div {...rest} className={thisClass}>
          {digits.map((val: string, i) => {
            const key = baseKey + (digitsLength - 1 - i - (precision || -1))
            switch (val) {
              case '-':
              case '.':
                return (
                  <span
                    key={key}
                    id={key}
                    style={{
                      width: `${getWidth(0)}px`
                    }}
                  >
                    {val}
                  </span>
                )
              default:
                return (
                  <BeanDigit
                    key={key}
                    thisId={key}
                    value={numMap[val]}
                    getWidth={getWidth}
                    getHeight={getHeight}
                  />
                )
            }
          })}
          {measuringEl}
        </div>
      )
    }
  }
}

export default BeanCounter
