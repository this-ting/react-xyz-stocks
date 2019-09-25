import React from 'react';
import { Container, Tabs, Tab, Typography, Box } from '@material-ui/core';

// import components
import Graph from './Stock-overview-graph.js';
import GraphStats from './Stock-overview-graphStats.js';

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`graph-tabpanel-${index}`}
      aria-labelledby={`graph-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
};

function a11yProps(index) {
  return {
    id: `graph-tab-${index}`,
    'aria-controls': `graph-tabpanel-${index}`
  };
}

const GraphContainer = () => {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  if (value === 0) {
    return (
      <Container>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="graph length tabs example"
        >
          <Tab label="5d" {...a11yProps(0)} />
          <Tab label="1m" {...a11yProps(1)} />
          <Tab label="3m" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Graph time="5d" />
        </TabPanel>
        <GraphStats />
      </Container>
    );
  }
  if (value === 1) {
    return (
      <Container>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="graph length tabs example"
        >
          <Tab label="5d" {...a11yProps(0)} />
          <Tab label="1m" {...a11yProps(1)} />
          <Tab label="3m" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={1}>
          <Graph time="1m" />
        </TabPanel>
        <GraphStats />
      </Container>
    );
  }
  if (value === 2) {
    return (
      <Container>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="graph length tabs example"
        >
          <Tab label="5d" {...a11yProps(0)} />
          <Tab label="1m" {...a11yProps(1)} />
          <Tab label="3m" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={2}>
          <Graph time="3m" />
        </TabPanel>
        <GraphStats />
      </Container>
    );
  }
};

export default GraphContainer;
