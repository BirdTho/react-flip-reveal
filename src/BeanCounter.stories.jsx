import React from 'react'

import BeanCounter from './BeanCounter'
import RandomMgr from './stories/RandomMgr'

export default {
  title: 'BeanCounter',
  component: BeanCounter,
  argTypes: {
    value: { control: 'number' },
    precision: { control: 'number', min: 0, max: 20, step: 1 },
    range: {
      control: 'number',
      min: 0,
      step: 10,
      label: 'range for randomize button'
    }
  }
}

const Template = (args) => {
  return <RandomMgr propName='value' Element={BeanCounter} {...args} />
}

export const NoPrecision = Template.bind({})
NoPrecision.args = {
  value: 1234.56,
  precision: 0,
  range: 50
}

export const Precision2 = Template.bind({})
Precision2.args = {
  value: 1234.56,
  precision: 2,
  range: 4
}

export const Negative = Template.bind({})
Negative.args = {
  value: -1234.56,
  precision: 2,
  range: 4
}

export const Black = Template.bind({})
Black.args = {
  value: 1234.56,
  precision: 2,
  range: 50,
  className: 'bean-black'
}
