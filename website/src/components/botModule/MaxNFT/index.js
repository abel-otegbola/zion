import { Box, Grid, TextField, Typography, Button, Chip } from '@mui/material'

import { Input } from 'antd'

import React from 'react'
import { uniqueNamesGenerator, names } from 'unique-names-generator'
import BACK from '../../../utils/images/icons/close.png'
import Caution from '../../../utils/images/caution.png'
import CAUTIONSVG from '../../../utils/images/icons/caution.svg'
import Context from '../Context'
import styles from '../Styles'
import Deactivate from "./Deactivate"
const config = {
  dictionaries: [names]
}

const Name = () => {
  const { BotState, handleNext, setBotState, handlePrevious } =
    React.useContext(Context)
  const handleChange = (e) => {
    setBotState((prev) => ({ ...prev, maxNFT: e.target.value }))
    // call api to update name
  }

  return<Deactivate />
}

export default Name
