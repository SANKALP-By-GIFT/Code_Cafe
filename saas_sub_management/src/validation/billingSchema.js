import * as yup from "yup";

export const billingSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, "Card number must be 16 digits")
    .required("Card number is required"),
  expiry: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be MM/YY")
    .required("Expiry date is required"),
  cvv: yup
    .string()
    .matches(/^\d{3}$/, "CVV must be 3 digits")
    .required("CVV is required"),
  address: yup.string().required("Billing address is required"),
});
