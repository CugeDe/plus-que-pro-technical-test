import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required'),
  })
  .required();

export default schema;
