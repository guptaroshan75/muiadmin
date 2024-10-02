import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormLabel,
  CRow,
  CCardText,
} from '@coreui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  // data: Yup.string().required('Data is required'),
  fullname: Yup.string().required('Full Name is required'),
});

const EditData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]); // To hold additional data entries
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data for editing
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/datas/${id}`);
        setData(response.data);
        setDatas(response.data.data); // Set initial data entries
      } catch (error) {
        console.error('Error fetching data for editing:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = (index) => {
    setDatas((prevdata) => prevdata.filter((_, i) => i !== index));
  };

  // Handle adding a new data entry
  const handleData = (data) => {
    setDatas((prevdata) => [...prevdata, { test: data }]);
  };

  const handleSubmit = async (values) => {
    const allData = {
      fullname: values.fullname,
      data: datas,
    };

    try {
      const response = await axios.put(`http://localhost:3001/datas/${id}`, allData);
      console.log('Response from server:', response.data);
      alert('Data updated successfully!');
      navigate('/forms/form-control');
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Failed to update data');
    }
  };

  // Loading state or error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardBody>
          <Formik
            initialValues={{ fullname: data.fullname, data: '' }} // Pre-fill with existing values
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ errors, touched, handleChange, values }) => (
              <Form>
                <CFormLabel htmlFor="fullname">Full Name</CFormLabel>
                <CRow className="align-items-center mb-3">
                  <CCol xs={12}>
                    <Field
                      as="input"
                      type="text"
                      id="fullname"
                      name="fullname"
                      placeholder="Enter Your Full Name"
                      onChange={handleChange}
                      className={`form-control ${touched.fullname && errors.fullname ? 'is-invalid' : ''}`}
                    />
                    {touched.fullname && errors.fullname && (
                      <div className="text-danger">{errors.fullname}</div>
                    )}
                  </CCol>
                </CRow>

                <CFormLabel htmlFor="data">Data</CFormLabel>
                <CRow className="align-items-center">
                  <CCol xs={12} sm={9} md={10}>
                    <Field
                      as="input"
                      type="text"
                      id="data"
                      name="data"
                      placeholder="Enter Your Data"
                      onChange={handleChange}
                      className={`form-control ${touched.data && errors.data ? 'is-invalid' : ''}`}
                    />
                  </CCol>

                  <CCol xs={12} sm={3} md={2} className="d-flex align-items-center justify-content-center mt-2 mt-sm-0">
                    <CButton
                      type="button"
                      color="primary"
                      className="w-100 w-sm-auto"
                      onClick={() => {
                        if (values.data) {
                          handleData(values.data);
                          // values.data = ''; 
                        }
                      }}
                    >
                      Add Data
                    </CButton>
                  </CCol>

                  {touched.data && errors.data && (
                    <div className="text-danger">{errors.data}</div>
                  )}
                </CRow>

                <CRow>
                  {datas.map((data, index) => (
                    <CCol key={index} xs={12} sm={4} className="mt-3">
                      <CCard>
                        <CCardBody className="d-flex justify-content-between align-items-center">
                          <CCardText className='m-0'>{data.test}</CCardText>
                          <FaTimes
                            style={{ cursor: 'pointer', color: 'red' }}
                            onClick={() => handleDelete(index)}
                          />
                        </CCardBody>
                      </CCard>
                    </CCol>
                  ))}
                </CRow>

                <CButton type="submit" color="primary" className="w-100 mt-4">
                  Update Service
                </CButton>
              </Form>
            )}
          </Formik>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default EditData;