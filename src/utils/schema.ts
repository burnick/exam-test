import * as yup from 'yup';

 const commonSchema = {
    branchId: yup.number().min(3).required('Please enter numbers only'),
    userName: yup.string().required().min(4, 'Min 3 characters'),
    password: yup.string().required().min(4, 'Min 4 characters'),
  }


  const loginFormSchema = yup.object().shape({
    ...commonSchema,
  });


  const userFormSchema = yup.object().shape({
    ...commonSchema,
    firstName: yup.string().required().min(4, 'Min 4 characters'),
    lastName: yup.string().required().min(4, 'Min 4 characters'),
    middleName: yup.string().required().min(4, 'Min 4 characters'),
    position: yup.string().required().min(4, 'Min 4 characters'),
   
  });


  export {loginFormSchema, userFormSchema}