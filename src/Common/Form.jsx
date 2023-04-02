import { useState } from "react";
import { Box, FormHelperText, TextField, Stack, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({ type, addItems, items }) => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  //passed an object of inputs in usestate
  //so that we don't have to update and maintain
  //lots of states
  const [values, setValues] = useState({
    quantity: items ? items.quantity : "",
    price: items ? items.price : "",
    discount: items ? items.discount : "",
    discountPercent: items ? items.discountPercent : "",
    tax: items ? items.tax : "",
    taxPercent: items ? items.taxPercent : "",
    totalPrice: items ? items.totalPrice : "",
  });
  //function for calculating discount percent
  const calcPercent = (price) => {
    const listPrice = Number(values.price) * Number(values.quantity);

    return parseFloat(((price / listPrice) * 100).toFixed(2));
  };
  //function for calculating discount on changing percent
  const calcValue = (percent) => {
    const listPrice = Number(values.price) * Number(values.quantity);
    return parseFloat(((percent * listPrice) / 100).toFixed(2));
  };
  //function for calculating tax
  const calcTaxPercent = (price) => {
    const listPrice = Number(values.price) * Number(values.quantity);
    return parseFloat(((price * 100) / listPrice).toFixed(2));
  };
  //function for calculating tax with tax percent
  const calcTaxValue = (price) => {
    const listPrice = Number(values.price) * Number(values.quantity);
    return parseFloat(((price * listPrice) / 100).toFixed(2));
  };
  //input change handler
  const onChangeHandler = (event) => {
    const val = event.target.name;

    const temp = Number(event.target.value);

    if (temp === 0) {
      if(val==="quantity"){
             setValues({...values,[val]:"",totalPrice:""})
      }else if(val==="price"){
        setValues({...values,[val]:"",totalPrice:""})
      }
      else if(val==="discount"){
        setValues({ ...values, [val]: "",totalPrice:parseFloat(
          (
            Number(values.quantity) *Number(values.price) +
            Number(values.tax)
          ).toFixed(2)
        ),discountPercent: ""});
      }else if(val==="discountPercent"){
        setValues({ ...values, [val]: "",totalPrice:parseFloat(
          (
            Number(values.quantity)*Number(values.price) +
            Number(values.tax)
          ).toFixed(2)
        ),discount: ""});
      }else if(val==="tax"){
        setValues({ ...values, [val]: "",totalPrice:parseFloat(
          (
            Number(values.quantity)*Number(values.price) +
            Number(values.discount)
          ).toFixed(2)
        ),taxPercent: ""});
      }else if(val==="taxPercent"){
        setValues({ ...values, [val]: "",totalPrice:parseFloat(
          (
            Number(values.quantity)*Number(values.price) -
            Number(values.discount)
          ).toFixed(2)
        ),tax: ""});
      }
      
    } else {
      if (val === "quantity") {
        setValues({
          ...values,
          [event.target.name]: temp,
          totalPrice: parseFloat(
            (
              temp * Number(values.price) +
              Number(values.tax) -
              Number(values.discount)
            ).toFixed(2)
          ),
        });
      } else if (val === "price") {
        setValues({
          ...values,
          [val]: temp,
          totalPrice: parseFloat(
            (
              Number(values.quantity) * temp +
              Number(values.tax) -
              Number(values.discount)
            ).toFixed(2)
          ),
        });
      } else if (val === "discount") {
        setValues({
          ...values,
          [val]: temp,
          totalPrice: parseFloat(
            (
              Number(values.quantity) * Number(values.price) +
              Number(values.tax) -
              temp
            ).toFixed(2)
          ),
          discountPercent: calcPercent(temp),
        });
      } else if (val === "discountPercent") {
        setValues({
          ...values,
          [val]: temp,
          discount: calcValue(temp),
          totalPrice: parseFloat(
            (
              Number(values.quantity) * Number(values.price) +
              Number(values.tax) -
              calcValue(temp)
            ).toFixed(2)
          ),
        });
      } else if (val === "tax") {
        setValues({
          ...values,
          [val]: temp,
          totalPrice: parseFloat(
            (
              Number(values.quantity) * Number(values.price) +
              temp -
              Number(values.discount)
            ).toFixed(2)
          ),
          taxPercent: calcTaxPercent(temp),
        });
      } else if (val === "taxPercent") {
        setValues({
          ...values,
          [val]: temp,
          tax: calcTaxValue(temp),
          totalPrice: parseFloat(
            (
              Number(values.quantity) * Number(values.price) +
              calcTaxValue(temp) -
              Number(values.discount)
            ).toFixed(2)
          ),
        });
      }
    }
  };
  //Validation logic using very cool toast containers
  const formValidation = () => {
    const {
      quantity,
      price,
      discount,
      discountPercent,
      tax,
      taxPercent,
      totalPrice,
    } = values;

    if (quantity === "") {
      toast.error("enter the quantity", toastOptions);
      return false;
    } else if (price === "") {
      toast.error("enter the price", toastOptions);
      return false;
    } else if (discount === "") {
      toast.error("enter the discount", toastOptions);
      return false;
    } else if (discountPercent === "") {
      toast.error("enter the discount percent", toastOptions);
      return false;
    } else if (tax === "") {
      toast.error("enter the tax", toastOptions);
      return false;
    } else if (taxPercent === "") {
      toast.error("enter the tax percent", toastOptions);
      return false;
    } else if (totalPrice === "") {
      toast.error("enter the total price", toastOptions);
      return false;
    }
    return true;
  };
  //form submit handler
  const submitHandler = (event) => {
    event.preventDefault();

    if (formValidation()) {
      addItems(values);
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2} flexDirection="column">
      <form
        onSubmit={submitHandler}
        style={{
          marginTop: "15px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Stack direction="row" gap={4}>
          <Stack direction="column" gap={2}>
            <FormHelperText>Quantity</FormHelperText>

            <TextField
              name="quantity"
              placeholder="enter quantity"
              type="number"
              default=""
              value={values.quantity}
              onChange={onChangeHandler}
            />
          </Stack>
          <Stack direction="column" gap={2}>
            <FormHelperText>Price</FormHelperText>

            <TextField
              name="price"
              type="number"
              value={values.price}
              onChange={onChangeHandler}
            />
          </Stack>
        </Stack>

        <Stack direction="row" gap={4}>
          <Stack direction="column" gap={2}>
            <FormHelperText>Discount</FormHelperText>

            <TextField
              name="discount"
              type="number"
              value={values.discount}
              onChange={onChangeHandler}
            />
          </Stack>
          <Stack direction="column" gap={2}>
            <FormHelperText>Discount Percent</FormHelperText>

            <TextField
              name="discountPercent"
              type="number"
              value={values.discountPercent}
              onChange={onChangeHandler}
            />
          </Stack>
        </Stack>

        <Stack direction="row" gap={4}>
          <Stack direction="column" gap={2}>
            <FormHelperText>Tax</FormHelperText>

            <TextField
              name="tax"
              type="number"
              value={values.tax}
              onChange={onChangeHandler}
            />
          </Stack>
          <Stack direction="column" gap={2}>
            <FormHelperText>Tax Percent</FormHelperText>

            <TextField
              id="num"
              name="taxPercent"
              type="number"
              value={values.taxPercent}
              onChange={onChangeHandler}
            />
          </Stack>
        </Stack>
        <Stack direction="column" gap={2}>
          <FormHelperText>Total Price</FormHelperText>

          <TextField
            id="num"
            name="totalPrice"
            type="number"
            value={values.totalPrice}
            onChange={onChangeHandler}
          />
        </Stack>

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
          type="submit"
        >
          {type} form
        </Button>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default Form;
