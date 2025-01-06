// For Single Select Without Pgaination
// import React, { Fragment, useState } from "react";
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Box,
//   Button,
//   Pagination,
// } from "@mui/material";

// const SingleSelectWithPagination = () => {
//   const [selectedValue, setSelectedValue] = useState("");
//   const [filterText, setFilterText] = useState("");
//   const [open, setOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [optionsPerPage, setOptionsPerPage] = useState(10);
//   const dynamicOptions = Array.from({ length: 100 }, (_, i) => `Option ${i + 1}`);

//   const filteredOptions = dynamicOptions.filter((option) =>
//     option.toLowerCase().includes(filterText.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredOptions.length / optionsPerPage);
//   const paginatedOptions = filteredOptions.slice(
//     (currentPage - 1) * optionsPerPage,
//     currentPage * optionsPerPage
//   );

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//     setFilterText("");
//     // setOpen(false);
//   };

//   const handlePageChange = (event, page) => {
//     setCurrentPage(page);
//   };

//   const handleOptionsPerPageChange = (event) => {
//     setOptionsPerPage(event.target.value);
//     setCurrentPage(1);
//   };

//   return (
//     <Fragment>
//       <InputLabel>Select an Option</InputLabel>
//       <FormControl fullWidth>
//         <Select
//           size="small"
//           open={open}
//           onClose={() => setOpen(false)}
//           onOpen={() => setOpen(true)}
//           value={selectedValue}
//           onChange={handleChange}
//           renderValue={(value) => (value ? value : "Select an Option")}
//           MenuProps={{
//             PaperProps: {
//               style: {
//                 maxHeight: 300,
//                 marginTop: 10,
//               },
//             },
//           }}
//         >
//           <Box sx={{ backgroundColor: "white", p: 1, position: "sticky", top: 0, zIndex: 1 }}>
//             <TextField
//               size="small"
//               fullWidth
//               placeholder="Search options..."
//               value={filterText}
//               onChange={(e) => {
//                 setFilterText(e.target.value);
//                 setCurrentPage(1);
//               }}
//               onClick={(e) => e.stopPropagation()}
//             />
//           </Box>

//           {paginatedOptions.length > 0 ? (
//             paginatedOptions.map((option) => (
//               <MenuItem key={option} value={option}>
//                 {option}
//               </MenuItem>
//             ))
//           ) : (
//             <MenuItem disabled>No options found</MenuItem>
//           )}

//           {filteredOptions.length > optionsPerPage && (
//             <Box sx={{ display: "flex", alignItems: 'center', p: 1, position: "sticky", bottom: 0, backgroundColor: "white", zIndex: 1 }}>
//               <FormControl size="small">
//                 <Select
//                   value={optionsPerPage}
//                   onChange={handleOptionsPerPageChange}
//                 >
//                   <MenuItem value={10}>10</MenuItem>
//                   <MenuItem value={20}>20</MenuItem>
//                   <MenuItem value={30}>30</MenuItem>
//                 </Select>
//               </FormControl>

//               <Pagination
//                 count={totalPages}
//                 page={currentPage}
//                 onChange={handlePageChange}
//                 size="small"
//                 siblingCount={1}
//                 boundaryCount={1}
//                 showFirstButton
//                 showLastButton
//               />
//             </Box>
//           )}
//         </Select>
//       </FormControl>
//     </Fragment>
//   );
// };

// export default SingleSelectWithPagination;


// For Single Select
// import React, { Fragment, useState, useEffect } from "react";
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Box,
//   Pagination,
// } from "@mui/material";
// import axios from "axios";

// const SingleSelectWithPagination = () => {
//   const [selectedValue, setSelectedValue] = useState("");
//   const [filterText, setFilterText] = useState("");
//   const [open, setOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [optionsPerPage, setOptionsPerPage] = useState(10);
//   const [options, setOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [totalItems, setTotalItems] = useState(0);

//   useEffect(() => {
//     const fetchOptions = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://localhost:5000/data', {
//           params: {
//             page: currentPage,
//             perPage: optionsPerPage,
//             search: filterText,
//           },
//         });

//         const { data } = response;
//         setOptions(data[0]?.data);
//         setTotalItems(data[0]?.total.totalItems);
//       } catch (err) {
//         setError("Failed to fetch options");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOptions();
//   }, [currentPage, optionsPerPage, filterText]);

//   const filteredOptions = options.filter((option) =>
//     option.title.toLowerCase().includes(filterText.toLowerCase())
//   );

//   const totalPages = Math.ceil(totalItems / optionsPerPage);
//   const paginatedOptions = filteredOptions.slice(
//     (currentPage - 1) * optionsPerPage,
//     currentPage * optionsPerPage
//   );

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//     setFilterText("");
//   };

//   const handlePageChange = (event, page) => {
//     setCurrentPage(page);
//   };

//   const handleOptionsPerPageChange = (event) => {
//     setOptionsPerPage(event.target.value);
//     setCurrentPage(1);
//   };

//   return (
//     <Fragment>
//       <InputLabel>Select an Option</InputLabel>
//       <FormControl fullWidth>
//         <Select
//           size="small"
//           open={open}
//           onClose={() => setOpen(false)}
//           onOpen={() => setOpen(true)}
//           value={selectedValue}
//           onChange={handleChange}
//           renderValue={(value) => (value ? value : "Select an Option")}
//           MenuProps={{
//             PaperProps: {
//               style: {
//                 maxHeight: 300,
//                 marginTop: 10,
//               },
//             },
//           }}
//         >
//           <Box sx={{ backgroundColor: "white", p: 1, position: "sticky", top: 0, zIndex: 1 }}>
//             <TextField
//               size="small"
//               fullWidth
//               placeholder="Search options..."
//               value={filterText}
//               onChange={(e) => {
//                 setFilterText(e.target.value);
//                 setCurrentPage(1);
//               }}
//               onClick={(e) => e.stopPropagation()}
//             />
//           </Box>

//           {paginatedOptions.length > 0 ? (
//             paginatedOptions.map((option) => (
//               <MenuItem key={option.value} value={option.title}>
//                 {option.title}
//               </MenuItem>
//             ))
//           ) : loading ? (
//             <MenuItem disabled>Loading...</MenuItem>
//           ) : error ? (
//             <MenuItem disabled>{error}</MenuItem>
//           ) : (
//             <MenuItem disabled>No options found</MenuItem>
//           )}

//           {totalPages > 1 && (
//             <Box sx={{ display: "flex", alignItems: "center", p: 1, position: "sticky", bottom: 0, backgroundColor: "white", zIndex: 1 }}>
//               <FormControl size="small">
//                 <Select
//                   value={optionsPerPage}
//                   onChange={handleOptionsPerPageChange}
//                 >
//                   <MenuItem value={10}>10</MenuItem>
//                   <MenuItem value={20}>20</MenuItem>
//                   <MenuItem value={30}>30</MenuItem>
//                 </Select>
//               </FormControl>

//               <Pagination
//                 count={totalPages}
//                 page={currentPage}
//                 onChange={handlePageChange}
//                 size="small"
//                 siblingCount={1}
//                 boundaryCount={1}
//                 showFirstButton
//                 showLastButton
//               />
//             </Box>
//           )}
//         </Select>
//       </FormControl>
//     </Fragment>
//   );
// };

// export default SingleSelectWithPagination;

// For Multiple Select
import React, { Fragment, useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Pagination,
  Checkbox,
  ListItemText,
  Chip,
} from "@mui/material";
import axios from "axios";

const MultiSelectWithPagination = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [optionsPerPage, setOptionsPerPage] = useState(10);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/data", {
          params: {
            page: currentPage,
            perPage: optionsPerPage,
            search: filterText,
          },
        });

        const { data } = response;
        setOptions(data[0]?.data);
        setTotalItems(data[0]?.total.totalItems);
      } catch (err) {
        setError("Failed to fetch options");
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [currentPage, optionsPerPage, filterText]);

  const filteredOptions = options.filter((option) =>
    option.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const totalPages = Math.ceil(totalItems / optionsPerPage);
  const paginatedOptions = filteredOptions.slice(
    (currentPage - 1) * optionsPerPage,
    currentPage * optionsPerPage
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValues(value);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleOptionsPerPageChange = (event) => {
    setOptionsPerPage(event.target.value);
    setCurrentPage(1);
  };

  const handleChipDelete = (chipToDelete) => {
    setSelectedValues((prevSelectedValues) =>
      prevSelectedValues.filter((item) => item.value !== chipToDelete.value)
    );
  };

  return (
    <Fragment>
      <InputLabel>Select Options</InputLabel>
      <FormControl fullWidth>
        <Select
          multiple
          size="small"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={selectedValues}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {selected.map((value) => {
                const option = options.find((opt) => opt.value === value);
                return (
                  <Chip
                    key={value}
                    label={option?.title}
                    onDelete={() => handleChipDelete(option)}
                    sx={{ margin: 0.5 }}
                  />
                );
              })}
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
                marginTop: 10,
              },
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              p: 1,
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <TextField
              size="small"
              fullWidth
              placeholder="Search options..."
              value={filterText}
              onChange={(e) => {
                setFilterText(e.target.value);
                setCurrentPage(1);
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </Box>

          {paginatedOptions.length > 0 ? (
            paginatedOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox
                  checked={selectedValues.indexOf(option.value) > -1}
                />
                <ListItemText primary={option.title} />
              </MenuItem>
            ))
          ) : loading ? (
            <MenuItem disabled>Loading...</MenuItem>
          ) : error ? (
            <MenuItem disabled>{error}</MenuItem>
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
                <Select value={optionsPerPage} onChange={handleOptionsPerPageChange}>
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
      </FormControl>
    </Fragment>
  );
};

export default MultiSelectWithPagination;


// json-server --watch db.json --port 5000