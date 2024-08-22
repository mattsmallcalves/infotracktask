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
import 'chartjs-adapter-date-fns'; 
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "../component/Navbar/SimpleNavBar.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale 
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
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    fetch('http://localhost:5205/history')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(item => {
          const date = new Date(item.CreatedDate);
          const position = item.Positions.split(',').map(Number).filter(num => !isNaN(num));
          return {
            ...item,
            CreatedDate: isNaN(date.getTime()) ? null : date.toISOString(),
            Position: position.length ? Math.min(...position) : null
          };
        }).filter(item => item.CreatedDate !== null && item.Position !== null);

        setAllData(formattedData);
        setTableData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const filteredData = allData
      .filter(item => item.Keyword === 'land registry searches' &&
                      item.Url === 'infotrack.co.uk' &&
                      item.Display === 1);

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
          borderColor: engine === 'Google' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)', 
          backgroundColor: engine === 'Google' ? 'rgba(75,192,192,0.2)' : 'rgba(255,99,132,0.2)', 
          fill: true,
        };

        datasets.push(dataset);
      }
    });

    setFilteredGraphData({
      labels: labels.map(date => new Date(date)),
      datasets: datasets
    });
  }, [selectedEngine, allData]);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const sortDataByDate = () => {
    const sortedData = [...tableData].sort((a, b) => {
      const dateA = new Date(a.CreatedDate);
      const dateB = new Date(b.CreatedDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setTableData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
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
                          return `Position: ${context.raw}`;
                        },
                        title: function () {
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
                        tooltipFormat: 'dd/MM/yyyy', 
                      },
                      title: {
                        display: true,
                        text: 'Date',
                      },
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10, 
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Rank',
                      },
                      suggestedMin: 1,
                      suggestedMax: 100,
                      reverse: true,
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
