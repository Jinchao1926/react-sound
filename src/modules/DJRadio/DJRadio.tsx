import { type FC } from 'react'

import { OutletLayout } from '@/components/OutletLayout'

import { DJRadioWrapper } from './DJRadio.styles'

export const DJRadio: FC = () => {
  return <OutletLayout showMenu={false} wrapper={DJRadioWrapper} />
}
