import { type CSSProperties, type HTMLAttributes } from 'react'

import styled from 'styled-components'

/**
 * Box component using attrs() method with inline styles instead of generating CSS classes.
 * This approach prevents styled-components from creating excessive CSS classes when many
 * dynamic style combinations are used, which can cause performance issues and trigger
 * "Over 200 classes were generated" warnings. Using attrs() to apply dynamic styles as
 * inline styles keeps the component class count constant while maintaining all functionality.
 */

// List of all style props that should not be forwarded to DOM
const styleProps = new Set([
  'display',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'zIndex',
  'width',
  'height',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'border',
  'borderWidth',
  'borderStyle',
  'borderColor',
  'borderRadius',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'background',
  'backgroundColor',
  'backgroundImage',
  'backgroundSize',
  'backgroundPosition',
  'backgroundRepeat',
  'color',
  'fontSize',
  'fontWeight',
  'fontFamily',
  'lineHeight',
  'textAlign',
  'textDecoration',
  'whiteSpace',
  'textOverflow',
  'overflow',
  'overflowX',
  'overflowY',
  'nowrap',
  'flex',
  'flexDirection',
  'flexWrap',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'justifyContent',
  'alignItems',
  'alignSelf',
  'alignContent',
  'gap',
  'gridColumn',
  'gridRow',
  'gridArea',
  'gridTemplateColumns',
  'gridTemplateRows',
  'opacity',
  'visibility',
  'cursor',
  'transform',
  'transition',
  'boxShadow',
])

export interface Styles extends HTMLAttributes<HTMLDivElement> {
  // Layout
  display?: CSSProperties['display']
  position?: CSSProperties['position']
  top?: CSSProperties['top'] | number
  right?: CSSProperties['right'] | number
  bottom?: CSSProperties['bottom'] | number
  left?: CSSProperties['left'] | number
  zIndex?: CSSProperties['zIndex'] | number

  // Size
  width?: CSSProperties['width'] | number
  height?: CSSProperties['height'] | number
  minWidth?: CSSProperties['minWidth'] | number
  minHeight?: CSSProperties['minHeight'] | number
  maxWidth?: CSSProperties['maxWidth'] | number
  maxHeight?: CSSProperties['maxHeight'] | number

  // Margin
  margin?: CSSProperties['margin'] | number
  marginTop?: CSSProperties['marginTop'] | number
  marginRight?: CSSProperties['marginRight'] | number
  marginBottom?: CSSProperties['marginBottom'] | number
  marginLeft?: CSSProperties['marginLeft'] | number
  m?: CSSProperties['margin'] | number
  mt?: CSSProperties['marginTop'] | number
  mr?: CSSProperties['marginRight'] | number
  mb?: CSSProperties['marginBottom'] | number
  ml?: CSSProperties['marginLeft'] | number
  mx?: CSSProperties['marginLeft'] | number
  my?: CSSProperties['marginTop'] | number

  // Padding
  padding?: CSSProperties['padding'] | number
  paddingTop?: CSSProperties['paddingTop'] | number
  paddingRight?: CSSProperties['paddingRight'] | number
  paddingBottom?: CSSProperties['paddingBottom'] | number
  paddingLeft?: CSSProperties['paddingLeft'] | number
  p?: CSSProperties['padding'] | number
  pt?: CSSProperties['paddingTop'] | number
  pr?: CSSProperties['paddingRight'] | number
  pb?: CSSProperties['paddingBottom'] | number
  pl?: CSSProperties['paddingLeft'] | number
  px?: CSSProperties['paddingLeft'] | number
  py?: CSSProperties['paddingTop'] | number

  // Border
  border?: CSSProperties['border']
  borderWidth?: CSSProperties['borderWidth'] | number
  borderStyle?: CSSProperties['borderStyle']
  borderColor?: CSSProperties['borderColor']
  borderRadius?: CSSProperties['borderRadius'] | number
  borderTop?: CSSProperties['borderTop']
  borderRight?: CSSProperties['borderRight']
  borderBottom?: CSSProperties['borderBottom']
  borderLeft?: CSSProperties['borderLeft']

  // Background
  background?: CSSProperties['background']
  backgroundColor?: CSSProperties['backgroundColor']
  backgroundImage?: CSSProperties['backgroundImage']
  backgroundSize?: CSSProperties['backgroundSize']
  backgroundPosition?: CSSProperties['backgroundPosition']
  backgroundRepeat?: CSSProperties['backgroundRepeat']

  // Font
  color?: CSSProperties['color']
  fontSize?: CSSProperties['fontSize'] | number
  fontWeight?: CSSProperties['fontWeight']
  fontFamily?: CSSProperties['fontFamily']
  lineHeight?: CSSProperties['lineHeight'] | number
  textAlign?: CSSProperties['textAlign']
  textDecoration?: CSSProperties['textDecoration']
  textIndent?: CSSProperties['textIndent'] | number
  whiteSpace?: CSSProperties['whiteSpace']
  textOverflow?: CSSProperties['textOverflow']
  overflow?: CSSProperties['overflow']
  overflowX?: CSSProperties['overflowX']
  overflowY?: CSSProperties['overflowY']

  // Text utilities
  nowrap?: boolean // 便捷属性：不换行 + 省略号

  // Flex
  flex?: CSSProperties['flex']
  flexDirection?: CSSProperties['flexDirection']
  flexWrap?: CSSProperties['flexWrap']
  flexGrow?: CSSProperties['flexGrow'] | number
  flexShrink?: CSSProperties['flexShrink'] | number
  flexBasis?: CSSProperties['flexBasis']
  justifyContent?: CSSProperties['justifyContent']
  alignItems?: CSSProperties['alignItems']
  alignSelf?: CSSProperties['alignSelf']
  alignContent?: CSSProperties['alignContent']
  gap?: CSSProperties['gap'] | number

  // Grid
  gridColumn?: CSSProperties['gridColumn']
  gridRow?: CSSProperties['gridRow']
  gridArea?: CSSProperties['gridArea']
  gridTemplateColumns?: CSSProperties['gridTemplateColumns']
  gridTemplateRows?: CSSProperties['gridTemplateRows']

  // Other
  opacity?: CSSProperties['opacity'] | number
  visibility?: CSSProperties['visibility']
  cursor?: CSSProperties['cursor']
  transform?: CSSProperties['transform']
  transition?: CSSProperties['transition']
  boxShadow?: CSSProperties['boxShadow']

  // Style
  style?: CSSProperties
}

// Helper function: convert number to pixel value
const toPx = (value: string | number | undefined): string | undefined => {
  if (typeof value === 'number') {
    return `${value}px`
  }
  return value
}

export const Box = styled.div
  .withConfig({
    shouldForwardProp: (prop) => !styleProps.has(prop),
  })
  .attrs<Styles>((props) => {
    const dynamicStyle: CSSProperties = {}

    // Layout
    if (props.display) dynamicStyle.display = props.display
    if (props.position) dynamicStyle.position = props.position
    if (props.top !== undefined) dynamicStyle.top = toPx(props.top)
    if (props.right !== undefined) dynamicStyle.right = toPx(props.right)
    if (props.bottom !== undefined) dynamicStyle.bottom = toPx(props.bottom)
    if (props.left !== undefined) dynamicStyle.left = toPx(props.left)
    if (props.zIndex !== undefined) dynamicStyle.zIndex = props.zIndex

    // Size
    if (props.width !== undefined) dynamicStyle.width = toPx(props.width)
    if (props.height !== undefined) dynamicStyle.height = toPx(props.height)
    if (props.minWidth !== undefined)
      dynamicStyle.minWidth = toPx(props.minWidth)
    if (props.minHeight !== undefined)
      dynamicStyle.minHeight = toPx(props.minHeight)
    if (props.maxWidth !== undefined)
      dynamicStyle.maxWidth = toPx(props.maxWidth)
    if (props.maxHeight !== undefined)
      dynamicStyle.maxHeight = toPx(props.maxHeight)

    // Margin
    if (props.margin !== undefined || props.m !== undefined)
      dynamicStyle.margin = toPx(props.margin ?? props.m)
    if (props.marginTop !== undefined || props.mt !== undefined)
      dynamicStyle.marginTop = toPx(props.marginTop ?? props.mt)
    if (props.marginRight !== undefined || props.mr !== undefined)
      dynamicStyle.marginRight = toPx(props.marginRight ?? props.mr)
    if (props.marginBottom !== undefined || props.mb !== undefined)
      dynamicStyle.marginBottom = toPx(props.marginBottom ?? props.mb)
    if (props.marginLeft !== undefined || props.ml !== undefined)
      dynamicStyle.marginLeft = toPx(props.marginLeft ?? props.ml)
    if (props.mx !== undefined) {
      dynamicStyle.marginLeft = toPx(props.mx)
      dynamicStyle.marginRight = toPx(props.mx)
    }
    if (props.my !== undefined) {
      dynamicStyle.marginTop = toPx(props.my)
      dynamicStyle.marginBottom = toPx(props.my)
    }

    // Padding
    if (props.padding !== undefined || props.p !== undefined)
      dynamicStyle.padding = toPx(props.padding ?? props.p)
    if (props.paddingTop !== undefined || props.pt !== undefined)
      dynamicStyle.paddingTop = toPx(props.paddingTop ?? props.pt)
    if (props.paddingRight !== undefined || props.pr !== undefined)
      dynamicStyle.paddingRight = toPx(props.paddingRight ?? props.pr)
    if (props.paddingBottom !== undefined || props.pb !== undefined)
      dynamicStyle.paddingBottom = toPx(props.paddingBottom ?? props.pb)
    if (props.paddingLeft !== undefined || props.pl !== undefined)
      dynamicStyle.paddingLeft = toPx(props.paddingLeft ?? props.pl)
    if (props.px !== undefined) {
      dynamicStyle.paddingLeft = toPx(props.px)
      dynamicStyle.paddingRight = toPx(props.px)
    }
    if (props.py !== undefined) {
      dynamicStyle.paddingTop = toPx(props.py)
      dynamicStyle.paddingBottom = toPx(props.py)
    }

    // Border
    if (props.border) dynamicStyle.border = props.border
    if (props.borderWidth !== undefined)
      dynamicStyle.borderWidth = toPx(props.borderWidth)
    if (props.borderStyle) dynamicStyle.borderStyle = props.borderStyle
    if (props.borderColor) dynamicStyle.borderColor = props.borderColor
    if (props.borderRadius !== undefined)
      dynamicStyle.borderRadius = toPx(props.borderRadius)
    if (props.borderTop) dynamicStyle.borderTop = props.borderTop
    if (props.borderRight) dynamicStyle.borderRight = props.borderRight
    if (props.borderBottom) dynamicStyle.borderBottom = props.borderBottom
    if (props.borderLeft) dynamicStyle.borderLeft = props.borderLeft

    // Background
    if (props.background) dynamicStyle.background = props.background
    if (props.backgroundColor)
      dynamicStyle.backgroundColor = props.backgroundColor
    if (props.backgroundImage)
      dynamicStyle.backgroundImage = props.backgroundImage
    if (props.backgroundSize) dynamicStyle.backgroundSize = props.backgroundSize
    if (props.backgroundPosition)
      dynamicStyle.backgroundPosition = props.backgroundPosition
    if (props.backgroundRepeat)
      dynamicStyle.backgroundRepeat = props.backgroundRepeat

    // Font
    if (props.color) dynamicStyle.color = props.color
    if (props.fontSize !== undefined)
      dynamicStyle.fontSize = toPx(props.fontSize)
    if (props.fontWeight) dynamicStyle.fontWeight = props.fontWeight
    if (props.fontFamily) dynamicStyle.fontFamily = props.fontFamily
    if (props.lineHeight !== undefined) {
      dynamicStyle.lineHeight =
        typeof props.lineHeight === 'number'
          ? `${props.lineHeight}px`
          : props.lineHeight
    }
    if (props.textAlign) dynamicStyle.textAlign = props.textAlign
    if (props.textDecoration) dynamicStyle.textDecoration = props.textDecoration
    if (props.textIndent !== undefined)
      dynamicStyle.textIndent = toPx(props.textIndent)
    if (props.whiteSpace) dynamicStyle.whiteSpace = props.whiteSpace
    if (props.textOverflow) dynamicStyle.textOverflow = props.textOverflow
    if (props.overflow) dynamicStyle.overflow = props.overflow
    if (props.overflowX) dynamicStyle.overflowX = props.overflowX
    if (props.overflowY) dynamicStyle.overflowY = props.overflowY

    // Text utilities
    if (props.nowrap) {
      dynamicStyle.whiteSpace = 'nowrap'
      dynamicStyle.overflow = 'hidden'
      dynamicStyle.textOverflow = 'ellipsis'
    }

    // Flex
    if (props.flex) dynamicStyle.flex = props.flex
    if (props.flexDirection) dynamicStyle.flexDirection = props.flexDirection
    if (props.flexWrap) dynamicStyle.flexWrap = props.flexWrap
    if (props.flexGrow !== undefined) dynamicStyle.flexGrow = props.flexGrow
    if (props.flexShrink !== undefined)
      dynamicStyle.flexShrink = props.flexShrink
    if (props.flexBasis) dynamicStyle.flexBasis = props.flexBasis
    if (props.justifyContent) dynamicStyle.justifyContent = props.justifyContent
    if (props.alignItems) dynamicStyle.alignItems = props.alignItems
    if (props.alignSelf) dynamicStyle.alignSelf = props.alignSelf
    if (props.alignContent) dynamicStyle.alignContent = props.alignContent
    if (props.gap !== undefined) dynamicStyle.gap = toPx(props.gap)

    // Grid
    if (props.gridColumn) dynamicStyle.gridColumn = props.gridColumn
    if (props.gridRow) dynamicStyle.gridRow = props.gridRow
    if (props.gridArea) dynamicStyle.gridArea = props.gridArea
    if (props.gridTemplateColumns)
      dynamicStyle.gridTemplateColumns = props.gridTemplateColumns
    if (props.gridTemplateRows)
      dynamicStyle.gridTemplateRows = props.gridTemplateRows

    // Other
    if (props.opacity !== undefined) dynamicStyle.opacity = props.opacity
    if (props.visibility) dynamicStyle.visibility = props.visibility
    if (props.cursor) dynamicStyle.cursor = props.cursor
    if (props.transform) dynamicStyle.transform = props.transform
    if (props.transition) dynamicStyle.transition = props.transition
    if (props.boxShadow) dynamicStyle.boxShadow = props.boxShadow

    return {
      style: {
        ...dynamicStyle,
        ...props.style,
      },
    }
  })<Styles>`
  /* Base styles only */
`
