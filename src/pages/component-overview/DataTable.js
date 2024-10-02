// DataTable.js
import React, { useEffect, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableHeaderCell,
    CTableRow,
    CTableHead,
    CButton,
} from '@coreui/react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DataTable = ({ onEdit, onDelete }) => {
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/datas');
                setAllData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id, index) => {
        try {
            await axios.delete(`http://localhost:3001/datas/${id}`);
            const updatedData = allData.filter((_, i) => i !== index);
            setAllData(updatedData);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const navigate = useNavigate()
const handleEdit = (id) => {
    navigate(`/forms/edit-data/${id}`)
}
    return (
        <CCard className="mt-3">
            <CCardBody>
                <CTable striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Full Name</CTableHeaderCell>
                            <CTableHeaderCell>Data</CTableHeaderCell>
                            <CTableHeaderCell>Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {allData.map((data, index) => (
                            <CTableRow key={data.id}>
                                <CTableHeaderCell>{data.fullname}</CTableHeaderCell>
                                <CTableHeaderCell>
                                    <div>
                                        {data.data.map((item, itemIndex) => (
                                            <div key={itemIndex}>
                                                {item.test}
                                            </div>
                                        ))}
                                    </div>
                                </CTableHeaderCell>
                                <CTableHeaderCell>
                                    <div>
                                        <CButton
                                            color="link"
                                            onClick={() => handleEdit(data.id)}
                                            style={{ color: 'blue', marginRight: '10px' }}
                                        >
                                            <FaEdit />
                                        </CButton>
                                        <CButton
                                            color="link"
                                            onClick={() => handleDelete(data.id, index)}
                                            style={{ color: 'red' }}
                                        >
                                            <FaTimes />
                                        </CButton>
                                    </div>
                                </CTableHeaderCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    );
};

export default DataTable;
