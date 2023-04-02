import React, { useState } from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Form from "../Common/Form";
const DisplayCell = ({ item }) => {
  //states for toggling the form and updating the data
  //Here I reused our form component also ;-)
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState(item);
  const toggleFunction = () => {
    setToggle(!toggle);
  };
  const addItems = (payload) => {
    setToggle(!toggle);
    setData(payload);
  };
  console.log(item);
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <List
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          gap: "5px",
          bgcolor: "#6126ce",
          borderRadius: "10px",
          marginY: "10px",
        }}
      >
        <ListItem>
          <Typography sx={{ color: "#fdfdfd", fontSize: 16, fontWeight: 600 }}>
            Quantity:{data.quantity}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography sx={{ color: "#fdfdfd", fontSize: 16, fontWeight: 600 }}>
            Price:{data.price}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography sx={{ color: "#fdfdfd", fontSize: 16, fontWeight: 600 }}>
            Discount:{data.discount}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography sx={{ color: "#fdfdfd", fontSize: 16, fontWeight: 600 }}>
            Tax:{data.tax}
          </Typography>
        </ListItem>
        <ListItem sx={{ whiteSpace: "nowrap" }}>
          <Typography sx={{ color: "#fdfdfd", fontSize: 16, fontWeight: 600 }}>
            Total Price:{data.totalPrice}
          </Typography>
        </ListItem>
        <ListItem>
          <EditOutlinedIcon
            onClick={toggleFunction}
            sx={{ color: "#fdfdfd", cursor: "pointer" }}
          />
        </ListItem>
      </List>
      {toggle && <Form type={"Edit"} addItems={addItems} items={data} />}
    </Box>
  );
};
const ListDisplay = ({ list }) => {
  return (
    <Box>
      {list.map((item) => (
        <DisplayCell item={item} />
      ))}
    </Box>
  );
};

export default ListDisplay;
