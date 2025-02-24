import { ReactElement, useCallback, useEffect, useRef } from 'react';
import { Box, Button, Divider, Paper, Stack, Typography, alpha, useTheme } from '@mui/material';

const CustomerFulfillment = (): ReactElement => {
  const theme = useTheme();


  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.getEchartsInstance().resize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <Paper sx={{ p: { xs: 4, sm: 8 }, height: 1 }}>
      <Typography variant="h4" color="common.white">
        Customer Fulfillment
      </Typography>
      <CustomerFulfillmentChart
        chartRef={chartRef}
        sx={{ height: '220px !important', flexGrow: 1 }}
        data={customerFulfillmentData}
      />
      <Stack
        direction="row"
        justifyContent="space-around"
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: alpha(theme.palette.common.white, 0.06), height: 1 }}
          />
        }
        px={2}
        pt={3}
        sx={{
          transitionProperty: 'all',
          transitionDelay: '1s',
        }}
      >
        <Stack gap={1.25} alignItems="center">
          <Button
            variant="text"
            sx={{
              p: 0.5,
              borderRadius: 1,
              fontSize: 'body2.fontSize',
              color: 'text.disabled',
              '&:hover': {
                bgcolor: 'transparent',
              },
              '& .MuiButton-startIcon': {
                mx: 0,
                mr: 1,
              },
            }}
            disableRipple
            startIcon={
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  bgcolor: 'secondary.main',
                  borderRadius: 400,
                }}
              />
            }
          >
            This Month
          </Button>
          <Typography variant="body2" color="common.white">
            {getTotalFulfillment(customerFulfillmentData['This Month'])}
          </Typography>
        </Stack>
        <Stack gap={1.25} alignItems="center">
          <Button
            variant="text"
            sx={{
              p: 0.5,
              borderRadius: 1,
              fontSize: 'body2.fontSize',
              color: 'text.disabled',
              '&:hover': {
                bgcolor: 'transparent',
              },
              '& .MuiButton-startIcon': {
                mx: 0,
                mr: 1,
              },
            }}
            disableRipple
            startIcon={
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  bgcolor: 'primary.main',
                  borderRadius: 400,
                }}
              />
            }
          >
            Last Month
          </Button>
          <Typography variant="body2" color="common.white">
            {getTotalFulfillment(customerFulfillmentData['Last Month'])}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CustomerFulfillment;
