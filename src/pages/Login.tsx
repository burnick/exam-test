import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import InputText from '../components/InputText';
import Button from '../components/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { LoginFormProps, VariantButton } from 'types';
import { findUser } from 'store/slice/users';
import { useAppDispatch } from 'store/hooks';
import useUserContext from 'components/UserContext';
import { loginFormSchema } from 'utils/schema';

const Login = () => {
  const { foundUser } = useUserContext();
  const dispatch = useAppDispatch();
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const handleSubmit = useCallback(
    (values: LoginFormProps) => {
      dispatch(findUser(values));
      setIsSubmitClicked(true);
    },
    [dispatch],
  );

  const formik = useFormik({
    initialValues: {
      branchId: 0,
      userName: '',
      password: '',
    },
    validationSchema: loginFormSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container>
      <Title>Login</Title>
      <FormContainer noValidate onSubmit={formik.handleSubmit}>
        <InputText
          placeHolder="Branch Id"
          name="branchId"
          onChange={formik.handleChange}
          value={formik.values.branchId > 0 ? formik.values.branchId : ''}
        />
        <InputText
          placeHolder="User name"
          name="userName"
          onChange={formik.handleChange}
          value={formik.values.userName}
        />
        <InputText
          placeHolder="Password"
          type={'password'}
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Button
          label={'login'}
          onClick={formik.submitForm}
          disabled={!formik.isValid && formik.dirty}
          variant={VariantButton.PRIMARY}
        />
      </FormContainer>

      <ErrorContainer role="alert" arial-aria-live="assertive">
        {Object.values(formik.errors).map((error, indexKey) => (
          <span key={indexKey}>{`Error: ${error}`}</span>
        ))}
        {!foundUser && isSubmitClicked ? (
          <span>Error: Username or Password is incorrect</span>
        ) : null}
      </ErrorContainer>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: start;
  height: 350px;
  flex-direction: column;
  width: 300px;
  border: 1.5px solid ${(props) => props.theme.palette.common.black};
  padding: 15px;
  box-sizing: border-box;

  @media only screen and (hover: none) and (pointer: coarse) {
    width: 100%;
    height: 50vh;
  }

  @media only screen and (hover: none) and (pointer: coarse) and (orientation: landscape) {
    width: 50%;
    height: 90vh;
  }
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  flex-direction: row;
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  gap: 15px;
  max-width: 1000px;
`;

const ErrorContainer = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: start;
  justify-content: start;
  flex-direction: column;
  background-color: #fcb8b8;
  color: #ff0000;

  span {
    padding: 5px;
    font-weight: bold;
    font-size: 10px;
  }
`;
export default Login;
