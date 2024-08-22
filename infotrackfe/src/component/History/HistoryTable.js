
import React from 'react';
import { Table } from 'reactstrap';

const HistoryTable = ({ tableData, sortDataByDate, sortOrder, formatDate }) => {
  return (
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
  );
};

export default HistoryTable;
