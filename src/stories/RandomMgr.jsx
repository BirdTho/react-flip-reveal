import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'

export default class RandomMgr extends React.Component {
  constructor(props) {
    super(props)

    const { propName, range } = props

    this.state = {
      propName,
      range,
      value: props[propName],
      origValue: props[propName]
    }
  }

  componentDidUpdate() {
    const { propName } = this.props
    const value = this.props[propName]

    if (value !== this.state.origValue) {
      setImmediate(() =>
        this.setState({
          value,
          origValue: value
        })
      )
    }
  }

  doUpdate = () => {
    const value =
      this.state.value + (Math.random() - 0.5) * 2 * this.state.range
    this.setState({ value })
  }

  render() {
    const {
      props: { propName, range, Element, ...rest },
      state: { value }
    } = this

    const args = { ...rest, [propName]: value }
    return (
      <>
        <Button
          primary
          onClick={this.doUpdate}
          label='Randomize'
          size='small'
          style={{ marginRight: '20px', marginBottom: '20px' }}
        />
        <Element {...args} />
      </>
    )
  }
}

RandomMgr.propTypes = {
  propName: PropTypes.string.isRequired,
  range: PropTypes.number.isRequired,
  Element: PropTypes.any.isRequired
}
