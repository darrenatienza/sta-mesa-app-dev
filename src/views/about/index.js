import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import OrgChart from '../../components/OrgChart';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing.apply(3)
  },
  card: {
    maxWidth: '411px'
  }
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
const AboutView = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="About">
          <Tab label="Organizational Structure" {...a11yProps(0)} />
          <Tab label="Mission / Vision" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <OrgChart />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          <Grid item lg={6} xs={12}>
            <Card>
              <CardHeader title="Mission" />
              <Divider />
              <CardContent>
                <Typography variant="body1">
                  To formulate and enforce Transparent Plans, Programs, and
                  Regulations for the protection of the interest of the
                  community with regards to Environment, Education,
                  infrastructure, Health, Social Services, Moral, Financial,
                  Peace and Order. To establish a harmonious relationship and
                  networking with the community: National and Local Government
                  Agencies; Non-Government Organizations; Peoples Organizations
                  and Private sectors.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Card>
              <CardHeader title="Vision" />
              <Divider />
              <CardContent>
                <Typography variant="body1">
                  Envisions a Progressive, Healthy, Peaceful community,
                  empowered constituents and collectively participating in
                  decision making towards good governance.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </div>
  );
};

export default AboutView;
