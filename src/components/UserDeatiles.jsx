import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import jsPDF from "jspdf";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  age: Yup.number()
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .required("Phone number is required"),
});

const UserDetails = () => {
  const [rows, setRows] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const storedRows = JSON.parse(localStorage.getItem("formData")) || [];
    setRows(storedRows);
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    const newRow = {
      id: rows.length + 1,
      ...values,
    };
    setRows((prevRows) => {
      const updatedRows = [...prevRows, newRow];
      localStorage.setItem("formData", JSON.stringify(updatedRows));
      return updatedRows;
    });
    resetForm();
  };

  const handleRowClick = (rowData) => {
    const doc = new jsPDF();
    doc.text(`Name: ${rowData.row.name}`, 10, 10);
    doc.text(`Email: ${rowData.row.email}`, 10, 20);
    doc.text(`Age: ${rowData.row.age}`, 10, 30);
    doc.text(`Phone Number: ${rowData.row.phoneNumber}`, 10, 40);
    doc.save("form-data.pdf");
  };

  const handleClearAll = () => {
    localStorage.removeItem("formData");
    setRows([]);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 350 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "phoneNumber", headerName: "Phone Number", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => handleRowClick(params)}
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            "&:hover": {
              backgroundColor: "#115293",
            },
          }}
        >
          Print
        </Button>
      ),
    },
  ];

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <Box p={2} className="user-details-container">
      <Formik
        initialValues={{ name: "", email: "", age: "", phoneNumber: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2} alignItems="center" style={{ display: 'flex', justifyContent: 'space-between' }}>
              {['name', 'email', 'age', 'phoneNumber'].map((field) => (
                <Grid item xs={12} sm={6} md={3} key={field}>
                  <ErrorMessage name={field}>
                    {(msg) => <Typography color="error">{msg}</Typography>}
                  </ErrorMessage>
                  <Field
                    as={TextField}
                    name={field}
                    label={field === 'phoneNumber' ? "Phone Number" : field.charAt(0).toUpperCase() + field.slice(1)}
                    type={field === 'email' ? 'email' : field === 'age' ? 'number' : 'text'}
                    fullWidth
                    error={touched[field] && Boolean(errors[field])}
                    sx={{ marginBottom: 1 }}
                    InputProps={{
                      style: { color: 'black' },
                    }}
                    InputLabelProps={{
                      style: { color: 'black' },
                    }}
                  />
                </Grid>
              ))}

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Search by Name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  className="clear_submit_button"
                  variant="contained"
                  color="secondary"
                  onClick={handleClearAll}
                  fullWidth
                  sx={{
                    "&:hover": {
                      backgroundColor: "#b71c1c",
                    },
                  }}
                >
                  Clear All
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  className="submit_button"
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{
                    "&:hover": {
                      backgroundColor: "#007bb2",
                    },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

   
      <div style={{ height: 400, width: "100%", backgroundColor: "#ffffff" }}>
  <DataGrid
    style={{ display: 'flex', justifyContent: 'center' }}
    rows={filteredRows}
    columns={columns.map((column) => ({
      ...column,
      headerAlign: 'center', 
      align: 'center', 
    }))}
    pageSize={7}
    rowsPerPageOptions={[7]}
  />
</div>


    </Box>
  );
};

export default UserDetails;
