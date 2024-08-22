import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // For date handling
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "../component/Navbar/SimpleNavBar.js";

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale // Register the time scale
);

function Records() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState('All');
  const [allData, setAllData] = useState([]);
  const [filteredGraphData, setFilteredGraphData] = useState({
    labels: [],
    datasets: []
  });
  const [tableData, setTableData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  useEffect(() => {
    fetch('http://localhost:5205/history') // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => {
        // Process and format data
        const formattedData = data.map(item => {
          const date = new Date(item.CreatedDate);
          const position = item.Positions.split(',').map(Number).filter(num => !isNaN(num));
          return {
            ...item,
            CreatedDate: isNaN(date.getTime()) ? null : date.toISOString(), // Handle invalid dates
            Position: position.length ? Math.min(...position) : null
          };
        }).filter(item => item.CreatedDate !== null && item.Position !== null); // Filter out invalid dates or positions

        setAllData(formattedData);
        setTableData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to run once on component mount

  useEffect(() => {
    // Apply filters for graph
    const filteredData = allData
      .filter(item => item.Keyword === 'land registry searches' &&
                      item.Url === 'infotrack.co.uk' &&
                      item.Display === 1);

    // Prepare datasets for graph
    const datasets = [];
    const datePositionMap = new Map();

    filteredData.forEach(item => {
      const date = new Date(item.CreatedDate).toDateString();
      if (!datePositionMap.has(date)) {
        datePositionMap.set(date, {});
      }
      datePositionMap.get(date)[item.SearchEngine] = item.Position;
    });

    const labels = Array.from(datePositionMap.keys()).sort((a, b) => new Date(a) - new Date(b));

    console.log('Sorted Labels:', labels); // Log labels for debugging

    // Group data by search engine
    const engines = [...new Set(filteredData.map(item => item.SearchEngine))];

    engines.forEach(engine => {
      if (selectedEngine === 'All' || selectedEngine === engine) {
        const positions = labels.map(date => {
          const positionsForDate = datePositionMap.get(date);
          return positionsForDate ? positionsForDate[engine] || null : null;
        });

        const dataset = {
          label: engine,
          data: positions,
          borderColor: engine === 'Google' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)', // Different color for each engine
          backgroundColor: engine === 'Google' ? 'rgba(75,192,192,0.2)' : 'rgba(255,99,132,0.2)', // Different color for each engine
          fill: true,
        };

        console.log(`Dataset for ${engine}:`, dataset); // Log dataset for debugging

        datasets.push(dataset);
      }
    });

    console.log('Final datasets with dates:', datasets);

    setFilteredGraphData({
      labels: labels.map(date => new Date(date)), // Convert back to Date objects
      datasets: datasets
    });
  }, [selectedEngine, allData]);

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  // Sort table data
  const sortDataByDate = () => {
    const sortedData = [...tableData].sort((a, b) => {
      const dateA = new Date(a.CreatedDate);
      const dateB = new Date(b.CreatedDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setTableData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString(); // Handle invalid dates
  };

  return (
    <div className="App">
      <Navbar />
      <div className="App-header">
        <Container>
          <Row>
            <Col md={12}>
              <h2>Ranking Trend</h2>
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>
                  {selectedEngine}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setSelectedEngine('All')}>Show All</DropdownItem>
                  <DropdownItem onClick={() => setSelectedEngine('Google')}>Google</DropdownItem>
                  <DropdownItem onClick={() => setSelectedEngine('Bing')}>Bing</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Line
                data={filteredGraphData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          // Display only the position
                          return `Position: ${context.raw}`;
                        },
                        title: function (context) {
                          // Hide date in tooltip title
                          return '';
                        }
                      },
                    },
                  },
                  scales: {
                    x: {
                      type: 'time',
                      time: {
                        unit: 'day',
                        tooltipFormat: 'dd/MM/yyyy', // Ensure this is a valid format
                      },
                      title: {
                        display: true,
                        text: 'Date',
                      },
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10, // Adjust this to avoid clutter
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Rank',
                      },
                      suggestedMin: 1,
                      suggestedMax: 100,
                      reverse: true, // Flip the y-axis
                    },
                  },
                }}
              />
            </Col>
          </Row>
          <br/>
          <Row>
            <Col md={12}>
              <h3>History Records</h3>
              <Table striped>
                <thead>
                  <tr>
                    <th>Keyword</th>
                    <th>URL</th>
                    <th>Search Engine</th>
                    <th>Positions</th>
                    <th onClick={sortDataByDate} style={{ cursor: 'pointer' }}>
                      Date {sortOrder === 'asc' ? '🔼' : '🔽'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((record, index) => (
                    <tr key={index}>
                      <td>{record.Keyword}</td>
                      <td>{record.Url}</td>
                      <td>{record.SearchEngine}</td>
                      <td>{record.Position}</td>
                      <td>{formatDate(record.CreatedDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Records;
