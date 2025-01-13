import React, { useState, useEffect, memo } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Pagination,
  TextField,
  Checkbox,
  ListItemText,
  InputLabel,
  Typography,
  Tooltip,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { useField } from "formik";
import { Info } from "lucide-react";
import { red } from "@mui/material/colors";

const MyInput = ({
  formikProps,
  label,
  helperText,
  isRequired = false,
  showLabel = true,
  inputStyle,
  rightElement,
  customType,
  multiple = false,
  tooltipMsg,
  data = [],
  totalItems = 0,
  setFilterText,
  setCurrentPage,
  optionsPerPage = 10,
  setOptionsPerPage,
  ...props
}) => {
  const [filterText, setFilterTextState] = useState("");
  const [currentPage, setCurrentPageState] = useState(1);
  const [currentOptions, setCurrentOptions] = useState([]);
  const totalPages = Math.ceil(totalItems / optionsPerPage);
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error;

  useEffect(() => {
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(filterText.toLowerCase())
    );
    const startIndex = (currentPage - 1) * optionsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + optionsPerPage);
    setCurrentOptions(paginatedData);
  }, [data, currentPage, filterText, optionsPerPage]);

  const handlePageChange = (event, page) => {
    setCurrentPageState(page);
    setCurrentPage?.(page);
  };

  const handleSelectChange = (value) => {
    if (multiple) {
      const currentValues = formikProps.values[field.name] || [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      formikProps.setFieldValue(field.name, updatedValues);
    } else {
      formikProps.setFieldValue(field.name, value);
    }
  };

  const handleChipDelete = (chipToDeleteValue) => {
    const updatedValues = selectedValues.filter((value) => value !== chipToDeleteValue);
    formikProps.setFieldValue(field?.name, updatedValues);
  };

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilterTextState(newFilter);
    setFilterText?.(newFilter);
    setCurrentPageState(1);
  };

  const handleOptionsPerPageChange = (event) => {
    const newPerPage = event.target.value;
    setOptionsPerPage?.(newPerPage);
  };

  const NoDataInList = (props) => {
    return (
      <>
        {selectProps?.addMore && (
          <Button
            color='primary'
            fullWidth
            sx={{
              bgcolor: `${theme.palette.primary.light} !important`,
              borderRadius: 0,
              justifyContent: 'flex-start',
              pl: 2,
              mt: 1
            }}
            onClick={selectProps?.addMore}>
            <Plus size={15} style={{ marginRight: 4 }} /> Add New
          </Button>
        )}
        <Typography px={2} py={1}>
          No Result
        </Typography>
      </>
    );
  };

  const renderComponent = () => {
    switch (customType) {

      case 'select':
        const selectedValues = formikProps.values[field?.name] || (multiple ? [] : "");
        return (
          <FormControl fullWidth>
            <Select
              // size='small'
              multiple={multiple}
              value={selectedValues}
              renderValue={(selected) =>
                multiple ? (
                  <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    {selected?.map((value) => {
                      const option = data.find((item) => item.value === value);
                      return (
                        <Chip
                          key={value}
                          label={option?.title || value}
                          onDelete={() => handleChipDelete(value)}
                          sx={{ margin: 0.5 }}
                        />
                      );
                    })}
                  </Box>
                ) : (
                  data.find((item) => item.value === selected)?.title || ""
                )
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    marginTop: 10,
                  },
                },
              }}
            >
              <Box sx={{
                backgroundColor: "white",
                p: 1,
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Search options..."
                  value={filterText}
                  onChange={handleFilterChange}
                  onClick={(e) => e.stopPropagation()}
                />
              </Box>

              {currentOptions.length > 0 ? (
                currentOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectChange(option.value);
                    }}
                  >
                    {multiple && <Checkbox checked={selectedValues.includes(option.value)} />}
                    <ListItemText primary={option.title} />
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No options found</MenuItem>
              )}

              {totalPages > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    position: "sticky",
                    bottom: 0,
                    backgroundColor: "white",
                    zIndex: 1,
                  }}
                >
                  <FormControl size="small">
                    <Select
                      value={optionsPerPage}
                      onChange={handleOptionsPerPageChange}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                    </Select>
                  </FormControl>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    size="small"
                    siblingCount={1}
                    boundaryCount={1}
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </Select>
          </FormControl >
        )
      default:
        return (
          <OutlinedInput
            className={isRequired ? 'error-line' : ''}
            placeholder=''
            error={Boolean(error)}
            variant='outlined'
            sx={inputStyle}
            size='small'
            endAdornment={rightElement}
            inputProps={{
              min: 0
            }}
            {...field}
            {...props}
          />
        );
    }
  }

  return (
    <Box>
      {label && (
        <>
          <InputLabel sx={{ marginBottom: 1, textTransform: 'capitalize' }}>
            {showLabel ? (
              <span title={label}>{label}</span>
            ) : (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}>
                <Typography sx={{ mr: 1 }}>{label}</Typography>
                <Tooltip title={tooltipMsg} placement='right' arrow>
                  <Info />
                </Tooltip>
              </span>
            )}
            {isRequired && '*'}
          </InputLabel>
        </>
      )}
      <FormControl fullWidth>
        {renderComponent()}
        {helperText && (
          <FormHelperText
            sx={{
              marginLeft: 0
            }}>
            {helperText}
          </FormHelperText>
        )}
        {error && (
          <FormHelperText
            sx={{
              color: red[500],
              marginLeft: 0
            }}>
            {error}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default memo(MyInput);