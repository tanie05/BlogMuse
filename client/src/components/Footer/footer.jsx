import React from 'react';
import { useFooterLogic } from './footerLogic';
import { FooterContainer } from './footerStyles';

export default function Footer() {
  useFooterLogic();

  return (
    <FooterContainer>
      this is the footer
    </FooterContainer>
  );
}