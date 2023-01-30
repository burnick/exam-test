import * as yup from 'yup';

/**Reusable validation */
const textValidation4Characters = yup.string().required().min(4, 'Min 4 characters');
const textValidationNoSpaces = yup
  .string()
  .required()
  .min(4, 'Min 4 characters')
  .matches(
    /^[a-zA-Z0-9@]+$/,
    'This field cannot contain white space and special character',
  );

const commonSchema = {
  branchId: yup.number().min(3).required('Please use numbers only'),
  userName: textValidationNoSpaces,
  password: textValidationNoSpaces,
};

const loginFormSchema = yup.object().shape({
  ...commonSchema,
});

const userFormSchema = yup.object().shape({
  ...commonSchema,
  firstName: textValidation4Characters,
  lastName: textValidation4Characters,
  middleName: textValidation4Characters,
  position: textValidation4Characters,
});

export { loginFormSchema, userFormSchema };
