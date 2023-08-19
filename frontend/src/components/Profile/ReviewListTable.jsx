import React from 'react';
import { Table } from 'reactstrap';

const ReviewListTable = (props) => {
    const data = props.data || [];

    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Review Text</th>
                    <th>Rating</th>
                    <th>Review Date</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <th scope='row'>{index + 1}</th>
                        <td>{row.username ? row.username : '-'}</td>
                        <td>{row.reviewText ? row.reviewText : '-'}</td>
                        <td>{row.rating ? row.rating : '-'}</td>
                        <td>
                            {row.createdAt
                                ? new Date(row.createdAt).toLocaleDateString(
                                      'en-US',
                                      {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric'
                                      }
                                  )
                                : '-'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ReviewListTable;
