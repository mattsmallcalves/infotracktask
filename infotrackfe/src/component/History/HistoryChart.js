
import React from 'react';
import { Line } from 'react-chartjs-2';
import {  Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
const HistoryChart = ({ filteredGraphData, selectedEngine, dropdownOpen, toggleDropdown, setSelectedEngine }) => {
  return (
    <>
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
    </>
  );
};

export default HistoryChart;
