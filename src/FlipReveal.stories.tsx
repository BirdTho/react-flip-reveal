import React from 'react'

import FlipReveal from './FlipReveal'

export default {
  title: 'FlipReveal',
  component: FlipReveal,
  argTypes: {
    value: { control: 'text' },
    delimiter: { control: 'text' },
    delay: { control: 'number', step: 100, min: 100 },
    resetOnChange: { control: 'boolean' }
  }
}

const Template = (args: any) => <FlipReveal {...args} />

export const ByCharacter = Template.bind({})
ByCharacter.args = {
  value: 'the birds are the words',
  delimiter: '',
  delay: 100,
  resetOnChange: false
}

export const ByWord = Template.bind({})
ByWord.args = {
  value: 'the birds are the words',
  delimiter: ' ',
  delay: 500,
  resetOnChange: true
}
