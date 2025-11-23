import { CSSProperties, HTMLAttributes } from 'react'

import styled from 'styled-components'

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

export const Box = styled.div.withConfig({
  shouldForwardProp: (prop) => !styleProps.has(prop),
})<Styles>`
  /* Layout */
  ${({ display }) => display && `display: ${display};`}
  ${({ position }) => position && `position: ${position};`}
  ${({ top }) => top !== undefined && `top: ${toPx(top)};`}
  ${({ right }) => right !== undefined && `right: ${toPx(right)};`}
  ${({ bottom }) => bottom !== undefined && `bottom: ${toPx(bottom)};`}
  ${({ left }) => left !== undefined && `left: ${toPx(left)};`}
  ${({ zIndex }) => zIndex !== undefined && `z-index: ${zIndex};`}

  /* Size */
  ${({ width }) => width !== undefined && `width: ${toPx(width)};`}
  ${({ height }) => height !== undefined && `height: ${toPx(height)};`}
  ${({ minWidth }) => minWidth !== undefined && `min-width: ${toPx(minWidth)};`}
  ${({ minHeight }) =>
    minHeight !== undefined && `min-height: ${toPx(minHeight)};`}
  ${({ maxWidth }) => maxWidth !== undefined && `max-width: ${toPx(maxWidth)};`}
  ${({ maxHeight }) =>
    maxHeight !== undefined && `max-height: ${toPx(maxHeight)};`}

  /* Margin */
  ${({ margin, m }) =>
    (margin !== undefined || m !== undefined) &&
    `margin: ${toPx(margin ?? m)};`}
  ${({ marginTop, mt }) =>
    (marginTop !== undefined || mt !== undefined) &&
    `margin-top: ${toPx(marginTop ?? mt)};`}
  ${({ marginRight, mr }) =>
    (marginRight !== undefined || mr !== undefined) &&
    `margin-right: ${toPx(marginRight ?? mr)};`}
  ${({ marginBottom, mb }) =>
    (marginBottom !== undefined || mb !== undefined) &&
    `margin-bottom: ${toPx(marginBottom ?? mb)};`}
  ${({ marginLeft, ml }) =>
    (marginLeft !== undefined || ml !== undefined) &&
    `margin-left: ${toPx(marginLeft ?? ml)};`}
  ${({ mx }) =>
    mx !== undefined && `margin-left: ${toPx(mx)}; margin-right: ${toPx(mx)};`}
  ${({ my }) =>
    my !== undefined && `margin-top: ${toPx(my)}; margin-bottom: ${toPx(my)};`}

  /* Padding */
  ${({ padding, p }) =>
    (padding !== undefined || p !== undefined) &&
    `padding: ${toPx(padding ?? p)};`}
  ${({ paddingTop, pt }) =>
    (paddingTop !== undefined || pt !== undefined) &&
    `padding-top: ${toPx(paddingTop ?? pt)};`}
  ${({ paddingRight, pr }) =>
    (paddingRight !== undefined || pr !== undefined) &&
    `padding-right: ${toPx(paddingRight ?? pr)};`}
  ${({ paddingBottom, pb }) =>
    (paddingBottom !== undefined || pb !== undefined) &&
    `padding-bottom: ${toPx(paddingBottom ?? pb)};`}
  ${({ paddingLeft, pl }) =>
    (paddingLeft !== undefined || pl !== undefined) &&
    `padding-left: ${toPx(paddingLeft ?? pl)};`}
  ${({ px }) =>
    px !== undefined &&
    `padding-left: ${toPx(px)}; padding-right: ${toPx(px)};`}
  ${({ py }) =>
    py !== undefined &&
    `padding-top: ${toPx(py)}; padding-bottom: ${toPx(py)};`}

  /* Border */
  ${({ border }) => border && `border: ${border};`}
  ${({ borderWidth }) =>
    borderWidth !== undefined && `border-width: ${toPx(borderWidth)};`}
  ${({ borderStyle }) => borderStyle && `border-style: ${borderStyle};`}
  ${({ borderColor }) => borderColor && `border-color: ${borderColor};`}
  ${({ borderRadius }) =>
    borderRadius !== undefined && `border-radius: ${toPx(borderRadius)};`}
  ${({ borderTop }) => borderTop && `border-top: ${borderTop};`}
  ${({ borderRight }) => borderRight && `border-right: ${borderRight};`}
  ${({ borderBottom }) => borderBottom && `border-bottom: ${borderBottom};`}
  ${({ borderLeft }) => borderLeft && `border-left: ${borderLeft};`}

  /* Background */
  ${({ background }) => background && `background: ${background};`}
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor};`}
  ${({ backgroundImage }) =>
    backgroundImage && `background-image: ${backgroundImage};`}
  ${({ backgroundSize }) =>
    backgroundSize && `background-size: ${backgroundSize};`}
  ${({ backgroundPosition }) =>
    backgroundPosition && `background-position: ${backgroundPosition};`}
  ${({ backgroundRepeat }) =>
    backgroundRepeat && `background-repeat: ${backgroundRepeat};`}

  /* Font */
  ${({ color }) => color && `color: ${color};`}
  ${({ fontSize }) => fontSize !== undefined && `font-size: ${toPx(fontSize)};`}
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight};`}
  ${({ fontFamily }) => fontFamily && `font-family: ${fontFamily};`}
  ${({ lineHeight }) =>
    lineHeight !== undefined &&
    `line-height: ${typeof lineHeight === 'number' ? `${lineHeight}px` : lineHeight};`}
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}
  ${({ textDecoration }) =>
    textDecoration && `text-decoration: ${textDecoration};`}
  ${({ textIndent }) =>
    textIndent !== undefined && `text-indent: ${toPx(textIndent)};`}
  ${({ whiteSpace }) => whiteSpace && `white-space: ${whiteSpace};`}
  ${({ textOverflow }) => textOverflow && `text-overflow: ${textOverflow};`}
  ${({ overflow }) => overflow && `overflow: ${overflow};`}
  ${({ overflowX }) => overflowX && `overflow-x: ${overflowX};`}
  ${({ overflowY }) => overflowY && `overflow-y: ${overflowY};`}

  /* Text utilities */
  ${({ nowrap }) =>
    nowrap &&
    `white-space: nowrap; overflow: hidden; text-overflow: ellipsis; `}

  /* Flex */
  ${({ flex }) => flex && `flex: ${flex};`}
  ${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection};`}
  ${({ flexWrap }) => flexWrap && `flex-wrap: ${flexWrap};`}
  ${({ flexGrow }) => flexGrow !== undefined && `flex-grow: ${flexGrow};`}
  ${({ flexShrink }) =>
    flexShrink !== undefined && `flex-shrink: ${flexShrink};`}
  ${({ flexBasis }) => flexBasis && `flex-basis: ${flexBasis};`}
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf};`}
  ${({ alignContent }) => alignContent && `align-content: ${alignContent};`}
  ${({ gap }) => gap !== undefined && `gap: ${toPx(gap)};`}

  /* Grid */
  ${({ gridColumn }) => gridColumn && `grid-column: ${gridColumn};`}
  ${({ gridRow }) => gridRow && `grid-row: ${gridRow};`}
  ${({ gridArea }) => gridArea && `grid-area: ${gridArea};`}
  ${({ gridTemplateColumns }) =>
    gridTemplateColumns && `grid-template-columns: ${gridTemplateColumns};`}
  ${({ gridTemplateRows }) =>
    gridTemplateRows && `grid-template-rows: ${gridTemplateRows};`}

  /* Other */
  ${({ opacity }) => opacity !== undefined && `opacity: ${opacity};`}
  ${({ visibility }) => visibility && `visibility: ${visibility};`}
  ${({ cursor }) => cursor && `cursor: ${cursor};`}
  ${({ transform }) => transform && `transform: ${transform};`}
  ${({ transition }) => transition && `transition: ${transition};`}
  ${({ boxShadow }) => boxShadow && `box-shadow: ${boxShadow};`}
`
