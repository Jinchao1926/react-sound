import { type FC } from 'react'

import { ExpandButtonWrapper, ExpandIcon } from './ExpandButton.styles'

interface ExpandButtonProps {
  expanded: boolean
  onClick: () => void
}

export const ExpandButton: FC<ExpandButtonProps> = ({ expanded, onClick }) => {
  return (
    <ExpandButtonWrapper onClick={onClick}>
      {expanded ? '展开' : '收起'}
      <ExpandIcon $expanded={expanded} />
    </ExpandButtonWrapper>
  )
}
