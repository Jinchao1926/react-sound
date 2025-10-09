import { ComponentProps } from 'react'

import styled from 'styled-components'

import { Box, Styles } from '../Layout/Box'

// Image 组件的属性 - 结合 img 元素的属性和 Box 的样式能力
interface ImageProps
  extends Styles,
    Omit<ComponentProps<'img'>, keyof Styles> {}

// Image 组件 - 基于 Box，但默认为 img 元素
export const Image = styled(Box).attrs({ as: 'img' })<ImageProps>``
