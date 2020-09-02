import React from 'react'

import './FlipReveal.css'

export interface FlipRevealProps {
  value: string
  delimiter?: string
  delay?: number
  resetOnChange?: boolean
  className?: string
}

interface FlipRevealState {
  tokens: string[]
  revealedIndex: number
}

class FlipReveal extends React.Component<FlipRevealProps, FlipRevealState> {
  ref: React.RefObject<HTMLDivElement>
  loopHandle: any

  constructor(props: FlipRevealProps) {
    super(props)

    this.loopHandle = null
    this.ref = React.createRef()
    const tokens = this.getTokens()

    this.state = {
      tokens,
      revealedIndex: -1
    }
  }

  componentDidMount() {
    this.startReveal()
  }

  componentDidUpdate(prevProps: FlipRevealProps) {
    const { delimiter, delay, resetOnChange = true, value } = this.props
    if (
      prevProps.delimiter !== delimiter ||
      (resetOnChange && prevProps.value !== value) ||
      prevProps.delay !== delay
    ) {
      setImmediate(() => {
        this.stopReveal()
        const tokens = this.getTokens()
        this.setState({
          tokens,
          revealedIndex: -1
        })
        this.startReveal()
      })
    } else if (!resetOnChange && prevProps.value !== value) {
      setImmediate(() => {
        this.stopReveal()
        const tokens = this.getTokens()
        const index = Math.min(tokens.length - 1, this.state.revealedIndex)
        this.setState({
          tokens,
          revealedIndex: index
        })
        this.startReveal()
      })
    }
  }

  startReveal() {
    this.loopHandle = setInterval(() => {
      if (this.state.revealedIndex < this.state.tokens.length) {
        this.revealNextChar()
      } else {
        this.stopReveal()
      }
    }, this.props.delay || 500)
  }

  stopReveal() {
    if (this.loopHandle !== null) {
      clearInterval(this.loopHandle)
      this.loopHandle = null
    }
  }

  revealNextChar() {
    this.setState({
      revealedIndex: this.state.revealedIndex + 1
    })
  }

  getTokens() {
    return this.props.value
      .split(this.props.delimiter ?? '')
      .map((str) => str.replace(' ', ' '))
  }

  render() {
    const {
      ref,
      props: { delimiter, delay = 500, className = '' },
      state: { tokens, revealedIndex }
    } = this

    return (
      <div ref={ref} className={'flip-container ' + className}>
        {tokens.map((token, i) => {
          let str = token
          if (i < tokens.length - 1) str += (delimiter || '').replace(' ', ' ')
          return (
            <div
              key={`token_${i}`}
              className={
                'flip-word' +
                (i < revealedIndex
                  ? '-revealed'
                  : i === revealedIndex
                  ? ' reveal'
                  : ' hidden')
              }
              style={{
                transition:
                  revealedIndex === -1 ? '' : `transform ${delay}ms ease-in`
              }}
            >
              <span>{str}</span>
            </div>
          )
        })}
      </div>
    )
  }
}

export default FlipReveal
