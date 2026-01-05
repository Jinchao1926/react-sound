import { Fragment, type FC } from 'react'

import {
  footerCopyRights,
  footerFilings,
  footerLinks,
} from '@/constants/footer'

import {
  AppFooterWrapper,
  CopyrightIcon,
  FooterCopyrightDivider,
  FooterCopyrights,
  FooterLink,
  FooterLinkText,
} from './AppFooter.styles'
import { Box, Container, Flex, Text, TextNavLink } from '../Core'

const FillingItem: FC<{
  item: { title: string; link?: string; logo?: string }
}> = ({ item }) => {
  return item.link ? (
    <TextNavLink to={item.link}>
      {item.logo && <CopyrightIcon icon={item.logo} />}
      {item.title}
    </TextNavLink>
  ) : (
    <Text>
      {item.logo && <CopyrightIcon icon={item.logo} />}
      {item.title}
    </Text>
  )
}

export const AppFooter: FC = () => {
  return (
    <AppFooterWrapper>
      <Container pt={33}>
        <Flex justify="space-between" mx={70}>
          {footerLinks.map((item) => (
            <div key={item.title}>
              <FooterLink icon={item.logo} href={item.link} />
              <FooterLinkText>{item.title}</FooterLinkText>
            </div>
          ))}
        </Flex>
        <Box mt={60} color="#666">
          <FooterCopyrights>
            {footerCopyRights.map((item, index) => (
              <Fragment key={item.title}>
                <TextNavLink to={item.link}>{item.title}</TextNavLink>
                {index < footerCopyRights.length - 1 && (
                  <FooterCopyrightDivider>|</FooterCopyrightDivider>
                )}
              </Fragment>
            ))}
          </FooterCopyrights>

          {footerFilings.map((row, rowIndex) => (
            <FooterCopyrights key={rowIndex} gap={row.gap}>
              {row.items.map((item, itemIndex) => (
                <Fragment key={item.title}>
                  {item.more ? (
                    <Flex>
                      <FillingItem item={item} />
                      <FillingItem item={item.more} />
                    </Flex>
                  ) : (
                    <FillingItem item={item} />
                  )}
                </Fragment>
              ))}
            </FooterCopyrights>
          ))}
        </Box>
      </Container>
    </AppFooterWrapper>
  )
}
