import React from 'react';
import { Table } from 'reactstrap';

const BookingListTable = (props) => {
    const data = props.data || [];

    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Tour Name</th>
                    <th>Phone Number</th>
                    <th>Guest</th>
                    <th>Booking Date</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <th scope='row'>{index + 1}</th>
                        <td>{row.fullName ? row.fullName : '-'}</td>
                        <td>{row.tourName ? row.tourName : '-'}</td>
                        <td>{row.phone ? row.phone : '-'}</td>
                        <td>{row.guestSize ? row.guestSize : '-'}</td>
                        <td>
                            {row.bookAt
                                ? new Date(row.bookAt).toLocaleDateString(
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

export default BookingListTable;
