import React, { useState } from 'react';
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
} from 'chart.js';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
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
  Legend
);

function Records() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState('All');
  const [data, setData] = useState({
    labels: generateDatesForMonth(8, 2024), // August 2024
    datasets: [
      {
        label: 'Google',
        data: generateRandomRankings(30), // Simulated rankings for Google
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
      {
        label: 'Bing',
        data: generateRandomRankings(30), // Simulated rankings for Bing
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: true,
      },
    ],
  });

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  // Filter data based on selected engine
  const filteredData = () => {
    if (selectedEngine === 'All') {
      return data;
    }

    return {
      labels: data.labels,
      datasets: data.datasets.filter(dataset => dataset.label === selectedEngine),
    };
  };

  // Generate dates for a given month and year
  function generateDatesForMonth(month, year) {
    const dates = [];
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
    }
    return dates;
  }

  // Generate random rankings for each day in the month
  function generateRandomRankings(days) {
    return Array.from({ length: days }, () => Math.floor(Math.random() * 100) + 1);
  }

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
                data={filteredData()}
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
                      },
                    },
                  },
                  scales: {
                    x: {
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
        </Container>
      </div>
    </div>
  );
}

export default Records;
