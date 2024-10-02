import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, TextField, IconButton } from '@mui/material';
import { Formik, Form } from 'formik';
import { Typography as MuiTypography } from '@mui/material';
import * as Yup from 'yup';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
// import DataTable from './DataTable';

const validationSchema = Yup.object().shape({
  data: Yup.string().required('Data is required'),
  fullname: Yup.string().required('Full Name is required'),
});

const typography = () => {
  const [datas, setDatas] = useState([]);

  const handleDelete = (index) => {
    setDatas((prevdata) => prevdata.filter((_, i) => i !== index));
  };

  const handleData = (data) => {
    setDatas((prevdata) => [...prevdata, { test: data }]);
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (datas.length > 0) {
      const allData = {
        fullname: values.fullname,
        data: datas,
      };

      try {
        const response = await axios.post('http://localhost:3001/datas', allData);
        console.log('Response from server:', response.data);
        setDatas([]);
        resetForm();
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card className="mb-4">
          <CardContent>
            <Formik initialValues={{ fullname: '', data: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ errors, touched, handleChange, values }) => (
                <Form>
                  <MuiTypography variant="h6">Form Control</MuiTypography>

                  <TextField
                    fullWidth
                    id="fullname"
                    name="fullname"
                    label="Full Name"
                    value={values.fullname}
                    onChange={handleChange}
                    error={touched.fullname && Boolean(errors.fullname)}
                    helperText={touched.fullname && errors.fullname}
                    margin="normal"
                  />

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={9}>
                      <TextField
                        fullWidth
                        id="data"
                        name="data"
                        label="Data"
                        value={values.data}
                        onChange={handleChange}
                        error={touched.data && Boolean(errors.data)}
                        helperText={touched.data && errors.data}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          if (values.data) {
                            handleData(values.data);
                          }
                        }}
                        style={{ width: '100%', height: '100%' }}
                      >
                        Add Data
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} style={{ marginTop: '10px' }}>
                    {datas.map((data, index) => (
                      <Grid item xs={12} sm={4} key={index}>
                        <Card>
                          <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <MuiTypography variant="body1">{data.test}</MuiTypography>
                            <IconButton onClick={() => handleDelete(index)} style={{ color: 'red' }}>
                              <FaTimes />
                            </IconButton>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  <Button type="submit" variant="contained" color="primary" style={{ marginTop: '24px' }} fullWidth>
                    Add Service
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>

          {/* <DataTable /> */}
        </Card>
      </Grid>
    </Grid>
  );
};

export default typography;
