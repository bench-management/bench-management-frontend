// import React, { useState, useEffect } from 'react';
// import { BarChart } from '@mui/x-charts';
// import axios from 'axios';
// import apiClient from '../lib/apiClient';

// export default function Charts() {
//   const [chartData, setChartData] = useState({ xAxisData: [], seriesData: [] });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await apiClient.get('/candidates/historical-bench-count');
//         const data = response.data; // Access the `data` property directly
//         const xAxisData = Object.keys(data); // Extract keys (e.g., months)
//         const seriesData = Object.values(data); // Extract values (e.g., counts)

//         setChartData({ xAxisData, seriesData });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <BarChart
//       xAxis={[{ scaleType: 'band', data: chartData.xAxisData }]}
//       series={[{ data: chartData.seriesData }]}
//       width={500}
//       height={300}
//     />
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { BarChart } from '@mui/x-charts';
// import axios from 'axios';
// import apiClient from '../lib/apiClient';

// export default function Charts() {
//   const [chartData, setChartData] = useState({ xAxisData: [], seriesData: [] });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await apiClient.get('/candidates/historical-bench-count');
//         const data = response.data; // Directly access the `data` property
//         const xAxisData = Object.keys(data).map(key => {
//           const [year, month] = key.split('-');
//           const formattedDate = new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
//           return formattedDate;
//         }); 
//         const seriesData = Object.values(data); // Extract values (e.g., counts)

//         setChartData({ xAxisData, seriesData });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <BarChart
//       xAxis={[{ scaleType: 'band', data: chartData.xAxisData }]}
//       series={[{ data: chartData.seriesData }]}
//       width={500}
//       height={300}
//     />
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { BarChart } from '@mui/x-charts';
// import axios from 'axios';
// import apiClient from '../lib/apiClient';

// const Charts = () => {
//   const [chartData, setChartData] = useState({ xAxisData: [], seriesData: [] });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await apiClient.get('/candidates/historical-bench-count');
//         const { data } = response; // Destructuring assignment to get data from response

//         const xAxisData = Object.keys(data).map((key) => {
//           const [year, month] = key.split('-');
//           const formattedDate = new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
//           return formattedDate;
//         });

//         const seriesData = Object.values(data);

//         setChartData({ xAxisData, seriesData });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <BarChart
//       xAxis={[{ scaleType: 'band', data: chartData.xAxisData }]}
//       series={[{ data: chartData.seriesData }]}
//       width={500}
//       height={300}
//     />
//   );
// };

// export default Charts;
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts';
import apiClient from '../lib/apiClient';

const Charts = () => {
  const [chartData, setChartData] = useState({ xAxisData: [], seriesData: [] });

  const xAxisLabel = "Month wrt year ->"; // Label for the x-axis
  const yAxisLabel = "Number of people on bench ->"; // Label for the y-axis


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/candidates/historical-bench-count');

        const { data } = response; // Destructuring assignment to get data from response
        


        const xAxisData = Object.keys(data).map((key) => {
          const [year, month] = key.split('-');
          const formattedDate = new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
          return formattedDate;
        });

        const seriesData = Object.values(data);

        setChartData({ xAxisData, seriesData });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        overflow: 'auto',
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>Monthly Report of Bench Candidates</Typography>
      <BarChart

        //xAxis={[{ scaleType: 'band', data: chartData.xAxisData }]}
        //series={[{ data: chartData.seriesData }]}
        width={800}
        height={400}
        xAxis={[{ scaleType: 'band', data: chartData.xAxisData, label: xAxisLabel }]} // Added label here
        yAxis={[{ label: yAxisLabel }]} // Added yAxis and label here
        series={[{ data: chartData.seriesData, label: "Candidates" }]} //Optional: added a label to the series
        margin={{
          top: 20,
          bottom: 70, // Increased bottom margin to prevent x-axis labels from being cut off
          left: 60, //Added left margin for y-axis label visibility
        }}
      />
    </Box>
  );
};
export default Charts;