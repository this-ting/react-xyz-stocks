import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: '980px',
    marginTop: '11rem',
    marginBottom: '2em'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '500'
  }
});

const Disclaimer = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h2" gutterBottom="true">
        Terms and Conditions
      </Typography>
      <Typography variant="body1" gutterBottom="true">
        Please read these Terms and Conditions (&quot;Terms&quot;, &quot;Terms
        and Conditions&quot;) carefully before using the
        <a href="https://react-xyz-stocks.firebaseapp.com/">
          https://react-xyz-stocks.firebaseapp.com/
        </a>
        website (the &quot;Service&quot;) operated by XYZ Stocks
        (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
        <br />
        <br />
        Your access to and use of the Service is conditioned on your acceptance
        of and compliance with these Terms. These Terms apply to all visitors,
        users and others who access or use the Service.
        <br />
        <br />
        By accessing or using the Service you agree to be bound by these Terms.
        If you disagree with any part of the terms then you may not access the
        Service. The Terms and Conditions agreement for XYZ Stocks has been
        created with the help of [TermsFeed](https://www.termsfeed.com/). <br />
        <br />
      </Typography>
      <Typography
        variant="subtitle1"
        className={classes.title}
        gutterBottom="true"
      >
        Links To Other Web Sites
      </Typography>
      <Typography variant="body1" gutterBottom="true">
        Our Service may contain links to third-party web sites or services that
        are not owned or controlled by XYZ Stocks.
        <br />
        <br />
        XYZ Stocks has no control over, and assumes no responsibility for, the
        content, privacy policies, or practices of any third party web sites or
        services. You further acknowledge and agree that XYZ Stocks shall not be
        responsible or liable, directly or indirectly, for any damage or loss
        caused or alleged to be caused by or in connection with use of or
        reliance on any such content, goods or services available on or through
        any such web sites or services.
        <br />
        <br />
        We strongly advise you to read the terms and conditions and privacy
        policies of any third-party web sites or services that you visit. <br />
        <br />
      </Typography>
      <Typography
        variant="subtitle1"
        className={classes.title}
        gutterBottom="true"
      >
        Termination
      </Typography>
      <Typography variant="body1" gutterBottom="true">
        We may terminate or suspend access to our Service immediately, without
        prior notice or liability, for any reason whatsoever, including without
        limitation if you breach the Terms.
        <br />
        <br />
        All provisions of the Terms which by their nature should survive
        termination shall survive termination, including, without limitation,
        ownership provisions, warranty disclaimers, indemnity and limitations of
        liability. <br />
        <br />
      </Typography>
      <Typography
        variant="subtitle1"
        className={classes.title}
        gutterBottom="true"
      >
        Governing Law
      </Typography>

      <Typography variant="body1" gutterBottom="true">
        These Terms shall be governed and construed in accordance with the laws
        of Taiwan, without regard to its conflict of law provisions.
        <br />
        <br />
        Our failure to enforce any right or provision of these Terms will not be
        considered a waiver of those rights. If any provision of these Terms is
        held to be invalid or unenforceable by a court, the remaining provisions
        of these Terms will remain in effect. These Terms constitute the entire
        agreement between us regarding our Service, and supersede and replace
        any prior agreements we might have between us regarding the Service.
        <br />
        <br />
      </Typography>
      <Typography
        variant="subtitle1"
        className={classes.title}
        gutterBottom="true"
      >
        Changes
      </Typography>

      <Typography variant="body1" gutterBottom="true">
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. If a revision is material we will try to provide at
        least 30 days notice prior to any new terms taking effect. What
        constitutes a material change will be determined at our sole discretion.
        <br />
        <br />
        By continuing to access or use our Service after those revisions become
        effective, you agree to be bound by the revised terms. If you do not
        agree to the new terms, please stop using the Service. <br />
        <br />
      </Typography>
      <Typography
        variant="subtitle1"
        className={classes.title}
        gutterBottom="true"
      >
        Contact Us
      </Typography>

      <Typography variant="body1" gutterBottom="true">
        If you have any questions about these Terms, please contact us. <br />
        <br />
      </Typography>

      <Typography variant="h2" gutterBottom="true">
        Disclaimer
      </Typography>

      <Typography variant="body1" gutterBottom="true">
        The information contained on
        <a href="https://react-xyz-stocks.firebaseapp.com/">
          https://react-xyz-stocks.firebaseapp.com/
        </a>
        website and XYZ Stocks mobile app (the &quot;Service&quot;) is for
        general information purposes only.
        <br />
        <br />
        XYZ Stocks assumes no responsibility for errors or omissions in the
        contents on the Service.
        <br />
        <br />
        In no event shall XYZ Stocks be liable for any special, direct,
        indirect, consequential, or incidental damages or any damages
        whatsoever, whether in an action of contract, negligence or other tort,
        arising out of or in connection with the use of the Service or the
        contents of the Service. XYZ Stocks reserves the right to make
        additions, deletions, or modification to the contents on the Service at
        any time without prior notice. This Disclaimer for XYZ Stocks has been
        created with the help of [TermsFeed](https://www.termsfeed.com/).
        <br />
        <br />
        XYZ Stocks does not warrant that the website is free of viruses or other
        harmful components.
        <br />
      </Typography>

      <Typography
        variant="subtitle1"
        className={classes.title}
        gutterBottom="true"
      >
        External links disclaimer
      </Typography>

      <Typography variant="body1" gutterBottom="true">
        <a href="https://react-xyz-stocks.firebaseapp.com/">
          https://react-xyz-stocks.firebaseapp.com/
        </a>
        website and XYZ Stocks mobile app may contain links to external websites
        that are not provided or maintained by or in any way affiliated with XYZ
        Stocks
        <br />
        <br />
        Please note that the XYZ Stocks does not guarantee the accuracy,
        relevance, timeliness, or completeness of any information on these
        external websites.
        <br />
      </Typography>
    </Container>
  );
};

export default Disclaimer;
