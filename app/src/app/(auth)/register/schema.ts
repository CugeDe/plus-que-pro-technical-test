import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().required('Email is required').email(),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required')
        .test(
            'lowercase',
            'Password must contain at least one lowercase letter',
            (value) => /[a-z]/.test(value),
        ).test(
            'uppercase',
            'Password must contain at least one uppercase letter',
            (value) => /[A-Z]/.test(value),
        ).test(
            'number',
            'Password must contain at least one number',
            (value) => /[0-9]/.test(value),
        ).test(
            'special',
            'Password must contain at least one special character',
            (value) => /[*.!@#$%^&(){}\[\]:;<>,.?/~_+-=|'"`\\]/.test(value),
        ),
    passwordConfirmation: yup.string()
        .required('Password confirmation is required')
        .oneOf(
            [yup.ref('password'), ''],
            'Passwords must match',
        ),
    terms: yup.boolean().required()
        .oneOf([true], 'You must agree to the terms and conditions'),
  })
  .required();

export default schema;
