import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import Papa from 'papaparse';
import Navbar from '../Navbar';
import Header from '../Header';
import SideBar from '../Home/SideBar';
import './LiveCandle.css';

const LiveCandle = () => {
  const [csvData, setCsvData] = useState([]);
  const [chart, setChart] = useState(null);
  const [csvFiles, setCsvFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('ADANIPOWER.csv');
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index of data to be added

  useEffect(() => {
    const fetchCSVList = async () => {
      try {
        setCsvFiles(['ADANIPOWER.csv', 'BLUEDART.csv', 'NHPC.csv']);
      } catch (error) {
        console.error('Error fetching CSV file list:', error);
      }
    };
    fetchCSVList();
  }, []);

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        // const response = await fetch(`http://localhost:3000/read-csv`);
        const response = await fetch(`http://localhost:3000/read-csv`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileName: selectedFile }), // Send selected file name to backend
        });

        if (!response.ok) {
          throw new Error(`Error fetching data for ${selectedFile}`);
        }
        // console.log(response)
        const text = await response.json();
        console.log(text) 
        // const text = await response.text();
        // const parsedData = Papa.parse(text, { header: true, skipEmptyLines: true });

        const formattedData = text.map(row => [
          new Date(row.Date).getTime(),       // Convert date to timestamp
          parseFloat(row.open),               // Open price
          parseFloat(row.high),               // High price
          parseFloat(row.low),                // Low price
          parseFloat(row.close)               // Close price
        ]);

        setCsvData(formattedData);
        setCurrentIndex(0); // Reset the index when new file is loaded
      } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
      }
    };

    fetchCSVData();
  }, [selectedFile]);

  useEffect(() => {
    if (csvData.length === 0 || chart) return;

    const newChart = Highcharts.stockChart('container', {
      chart: {
        type: 'candlestick',
        backgroundColor: '#f4f6f8',
      },
      rangeSelector: {
        selected: 1,
      },
      navigator: {
        enabled: true,
      },
      scrollbar: {
        enabled: true,
      },
      series: [
        {
          type: 'candlestick',
          name: 'Stock Price',
          data: [],
          color: '#FF0000', // Red for decreasing
          upColor: '#008000', // Green for increasing
          dataGrouping: { enabled: false },
        },
      ],
    });

    setChart(newChart);
  }, [csvData]);

  useEffect(() => {
    if (!chart || csvData.length === 0 || currentIndex >= csvData.length) return;

    const addDataPoint = () => {
      const nextPoint = csvData[currentIndex];
      chart.series[0].addPoint(nextPoint, true, false); // Add the next data point
      setCurrentIndex(prevIndex => prevIndex + 1); // Move to the next data point
    };

    const intervalId = setInterval(addDataPoint, 500); // Add a new point every 2 seconds

    return () => clearInterval(intervalId);
  }, [chart, csvData, currentIndex]);

  return (
    <div>
      <Navbar />
      <Header text="Live Candle Stick" />
      <div className="live-candle-container">
        <SideBar />
        <div className="chart-content">
          <div className="dropdown-container">
            <label htmlFor="csvSelect">Select Dataset: </label>
            <select
              id="csvSelect"
              value={selectedFile}
              onChange={(e) => {
                setSelectedFile(e.target.value);
                setChart(null); // Reset chart when file changes
              }}
              className="dropdown"
            >
              {csvFiles.map((file, index) => (
                <option key={index} value={file}>
                  {file}
                </option>
              ))}
            </select>
          </div>
          <div id="container" className="chart-container"></div>
        </div>
      </div>
    </div>
  );
};

export default LiveCandle;
