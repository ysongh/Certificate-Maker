import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react'

function Spinner({text}) {
  return (
    <Dimmer active inverted>
      <Loader inverted content={text} />
    </Dimmer>
  )
}

export default Spinner;