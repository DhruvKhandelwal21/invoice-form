import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import ListDisplay from "../Components/ListDisplay";
import Form from "../Common/Form";

const HomePage = () => {
  const [toggle, setToggle] = useState(false);
  //state for storing list of input
  const [myList, setMyList] = useState([]);

  //toggle function used for toggling the function
  const toggleFunction = () => {
    setToggle(!toggle);
  };
  //Call back function which we pass to the
  //form component for getting the form input
  const addItems = (payload) => {
    setToggle(!toggle);

    const newList = payload;

    setMyList((myList) => [...myList, newList]);
  };
  console.log(myList);
  return (
    <Box display="flex" alignItems="center" mt={2} flexDirection="column">
      <Button
        sx={{
          backgroundColor: "#6126ce",
          color: "#fdfdfd",

          width: "fit-content",
          minWidth: 130,
          fontSize: 16,
          fontWeight: 600,
          "&:hover": {
            opacity: 0.9,
            backgroundColor: "#6d7cf0",
          },
        }}
        onClick={toggleFunction}
      >
        Create Bill
      </Button>
      {toggle && <Form type={"Submit"} addItems={addItems} />}

      {myList?.length ? <ListDisplay list={myList} /> : ""}
    </Box>
  );
};

export default HomePage;
