import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// import component
import NewsArticles from './portfolio-news-articles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '80vh'
  },
  card: {
    maxWidth: 600,
    margin: '2rem 0'
  },
  root2: {
    maxWidth: 980,
    margin: '2rem 0'
  },
  media: {
    maxWidth: 580,
    height: 140
  },
  media2: {
    maxWidth: 345,
    height: 170
  },
  header: {
    maxWidth: 345,
    height: 140
  },
  link: {
    textDecoration: 'none'
  },
  tabHeader: {
    '@media (max-width: 600px)': {
      fontSize: '0.5rem'
    }
  },
  tabContent: {
    overflow: 'auto'
  }
});

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
};

const a11yProps = index => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
};

const PortfolioNews = ({ companies }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        News Feed
      </Typography>
      <Paper className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab
            label="Top News"
            {...a11yProps(0)}
            className={classes.tabHeader}
          />
          <Tab
            label="Your Picks"
            {...a11yProps(1)}
            className={classes.tabHeader}
          />
          <Tab label="U.S." {...a11yProps(2)} className={classes.tabHeader} />
          <Tab
            label="Business"
            {...a11yProps(3)}
            className={classes.tabHeader}
          />
          <Tab
            label="Technology"
            {...a11yProps(4)}
            className={classes.tabHeader}
          />
          <Tab
            label="Entertainment"
            {...a11yProps(5)}
            className={classes.tabHeader}
          />
          <Tab
            label="Science"
            {...a11yProps(6)}
            className={classes.tabHeader}
          />
        </Tabs>
        <TabPanel value={value} index={value} className={classes.tabContent}>
          <NewsArticles companies={companies} value={value} />
        </TabPanel>
      </Paper>
    </>
  );
};

export default PortfolioNews;
