import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Container, Typography } from '@mui/material';
import PatientForm from './PatientForm';
import MachineManagement from './MachineManagement';
// import ScheduleViewer from './ScheduleViewer';
// import Dashboard from './Dashboard';

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <AppBar position="static" color="default" elevation={1}>
        <Tabs value={activeTab} onChange={handleChange} aria-label="navigation tabs" centered>
          <Tab label="Patient Form" />
          <Tab label="View Schedule" />
          <Tab label="Machine Management" />
          <Tab label="Dashboard" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0}>
        <PatientForm />
      </TabPanel>
      {/* {activeTab === 'scheduleViewer' && <ScheduleViewer />} */}
      {activeTab === 'machineManagement' && <MachineManagement />}
      {/* {activeTab === 'dashboard' && <Dashboard />} */}
    </Container>
  );
}

export default App;
