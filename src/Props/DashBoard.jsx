import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

export default function DashboardProp() {
  const metrics = [
    { label: 'Threats Detected', value: '5' },
    { label: 'Blocked Attempts', value: '12' },
    { label: 'Logs Reviewed', value: '50' },
  ];

  const actions = ['Add Rule', 'View Logs', 'Scan Network'];

  return (
    <div style={{ padding: '20px', backgroundColor: '#121212', height: '100%' }}>
      {/* <Grid container spacing={3} marginBottom={2}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                bgcolor: 'grey.800',
                color: 'white',
                textAlign: 'center',
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6">{metric.label}</Typography>
                <Typography variant="h4" color="primary">
                  {metric.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        {actions.map((action, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ padding: '10px 0' }}
            >
              {action}
            </Button>
          </Grid>
        ))}
      </Grid> */}
    </div>
  );
}
