import React from 'react';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../util/IntlMessages';

const Footer = () => {
    return (
      <footer className="app-footer">
        <span className="d-inline-block">ETC Tunisie &copy; 2023</span>
        <Button
          href="https://etctn.com/"
          target="_blank"
          size="small"
          color="primary"
        ><IntlMessages id="sidebar.extraPages.contactUs"/></Button>
      </footer>
    );
  }
;

export default Footer;
