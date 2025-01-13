import React, { Fragment, useState, useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import axios from "axios";
import MyInput from "components/MyInput";
import { FieldArray, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  injured_persons: Yup.array().of(
    Yup.object({
      parts_of_body_affected: Yup.string().required("This field is required"),
      body_affected: Yup.array()
        .of(Yup.string().required("Each option is required"))
        .min(1, "At least one option must be selected"),
    })
  ),
  body: Yup.string().required("This field is required"),
  body_parts: Yup.array()
    .of(Yup.string().required("Each option is required"))
    .min(1, "At least one option must be selected"),
});

const MultiSelectWithPagination = () => {
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [optionsPerPage, setOptionsPerPage] = useState(10);
  const [options, setOptions] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/data", {
          params: {
            page: currentPage,
            perPage: optionsPerPage,
            search: filterText,
          },
        });

        const { data } = response;
        setOptions(data[0]?.data || []);
        setTotalItems(data[0]?.total?.totalItems || 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOptions();
  }, [currentPage, filterText, optionsPerPage]);

  const handleSubmit = async (values) => {
    console.log("Form Values:", values);
  };

  return (
    <Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={{

          injured_persons: [
            {
              parts_of_body_affected: '3',
              body_affected: ['3', '33', '32',]
            }
          ]
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <>
            <Grid item xs={12} md={12} lg={12}>
              <FieldArray
                name={'injured_persons'}
                render={(arrayHelpers) => (
                  <>
                    {props?.values?.injured_persons?.length > 0 &&
                      props?.values?.injured_persons?.map((data, index) => (
                        <React.Fragment key={index}>
                          <Grid item xs={12} md={4} lg={4}>
                            <MyInput
                              isRequired
                              label="Select Single Option"
                              name={`injured_persons.${index}.parts_of_body_affected`}
                              formikProps={props}
                              customType="select"
                              data={options}
                              totalItems={totalItems}
                              setFilterText={setFilterText}
                              setCurrentPage={setCurrentPage}
                              optionsPerPage={optionsPerPage}
                              setOptionsPerPage={setOptionsPerPage}
                            />
                          </Grid>

                          <Grid item xs={12} md={4} lg={4}>
                            <MyInput
                              name={`injured_persons.${index}.body_affected`}
                              label="Select Multiple Options"
                              customType="select"
                              multiple
                              formikProps={props}
                              data={options}
                              totalItems={totalItems}
                              setFilterText={setFilterText}
                              setCurrentPage={setCurrentPage}
                              optionsPerPage={optionsPerPage}
                              setOptionsPerPage={setOptionsPerPage}
                            />
                          </Grid>

                          <Grid item mb={1} xs={12} md={12} lg={12}>
                            <Button
                              onClick={() =>
                                arrayHelpers.push({
                                  parts_of_body_affected: '',
                                  body_affected: [],
                                })
                              }
                              variant="contained"
                              color="primary"
                            >
                              Add More
                            </Button>

                            <Button
                              onClick={() => arrayHelpers.remove(index)}
                              variant="outlined"
                              color="secondary"
                              style={{ marginLeft: 8 }}
                            >
                              Remove
                            </Button>
                          </Grid>
                        </React.Fragment>
                      ))}
                  </>
                )}
              />
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              <MyInput
                isRequired
                label="Select Single Options"
                customType="select"
                name={'body'}
                formikProps={props}
                data={options}
                totalItems={totalItems}
                setFilterText={setFilterText}
                setCurrentPage={setCurrentPage}
                optionsPerPage={optionsPerPage}
                setOptionsPerPage={setOptionsPerPage}
              />
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              <MyInput
                isRequired
                label="Select Multiple Options"
                customType="select"
                name={'body_parts'}
                multiple
                formikProps={props}
                data={options}
                totalItems={totalItems}
                setFilterText={setFilterText}
                setCurrentPage={setCurrentPage}
                optionsPerPage={optionsPerPage}
                setOptionsPerPage={setOptionsPerPage}
              />
            </Grid>

            <Box textAlign={"center"} paddingBlock={2}>
              <Button
                variant="contained"
                type="submit"
                onClick={props.handleSubmit}
              >
                save
              </Button>
            </Box>
          </>
        )}
      </Formik>
    </Fragment >
  );
};

export default MultiSelectWithPagination;

// json-server --watch db.json --port 5000