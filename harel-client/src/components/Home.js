import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const styles = {
  tr: {
    background: "#f1f1f1",
    "&:hover": {
      background: "#f00",
    },
  },
};

const Home = (props) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  let navigate = useNavigate();

  const fetchData = async () => {
    try {
      let result = await axios.get("http://localhost:8080/web-api/customer");
      setData(result.data);
    } catch (e) {
      alert(e.message);
    }
  };
  useEffect(() => {fetchData()}, []);
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></Box>
      <MaterialTable
        columns={[
          { title: "Id", field: "id" },
          { title: "Name", field: "firstName" },
          { title: "Last Name", field: "lastName" },
          {
            title: "Date",
            field: "date",
            type: "datetime",
          },
          {
            title: "Phone",
            field: "phone",
          },
        ]}
        data={data}
        title="Customers"
        onRowClick={(evt, selectedRow) => {
          setSelectedRow(selectedRow.tableData.id);
          navigate(`/Edit/${selectedRow.id }`);
        }}
        className={styles.tr}
        options={{
          headerStyle: {
            backgroundColor: "#9c27b0",
            color: "#FFF",
          },
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? "#f7e8fa" : "#FFF",
          }),
        }}
      />
    </Container>
  );
};
export default Home;
