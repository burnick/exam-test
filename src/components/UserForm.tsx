import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import InputText from './InputText';
import { UserProps, VariantButton } from 'types';
import Button from 'components/Button';
import { addUser } from 'store/slice/users';
import { useAppDispatch } from 'store/hooks';
import { userFormSchema } from 'utils/schema';

const UserForm = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      branchId: 0,
      userName: '',
      firstName: '',
      middleName: '',
      lastName: '',
      position: '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: userFormSchema,
    onSubmit: (data: UserProps) => {
      console.log(data);
      if (data) {
        dispatch(addUser(data));
        formik.resetForm();
        formik.setErrors({});
      }
    },
  });

  const handleReset = useCallback(() => {
    formik.setErrors({});
    formik.resetForm();
  }, [formik]);

  return (
    <Container>
      <FormContainer onSubmit={formik.handleSubmit}>
        <InputText
          placeHolder="Branch Id"
          name="branchId"
          onChange={formik.handleChange}
          value={formik.values.branchId > 0 ? formik.values.branchId : ''}
        />
        <InputText
          placeHolder="Username"
          name="userName"
          onChange={formik.handleChange}
          value={formik.values.userName}
        />
        <InputText
          placeHolder="First Name"
          name="firstName"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        <InputText
          placeHolder="Middle Name"
          name="middleName"
          onChange={formik.handleChange}
          value={formik.values.middleName}
        />
        <InputText
          placeHolder="Last Name"
          name="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        <InputText
          placeHolder="Position"
          name="position"
          onChange={formik.handleChange}
          value={formik.values.position}
        />
        <InputText
          placeHolder="Password"
          type={'password'}
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <ButtonContainer>
          <Button
            label="reset"
            type="button"
            variant={VariantButton.RESET}
            onClick={handleReset}
          />
          <Button
            label="add"
            type="button"
            variant={VariantButton.CUSTOM}
            onClick={formik.submitForm}
            disabled={!formik.isValid && formik.dirty}
          />
        </ButtonContainer>

        <ErrorContainer>
          {Object.values(formik.errors).map((error, indexKey) => (
            <span key={indexKey}>{`Error: ${error}`}</span>
          ))}
        </ErrorContainer>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  height: auto;
  flex-direction: column;
  width: 450px;
  border: 1.5px solid ${(props) => props.theme.palette.common.black};
  padding: 15px;
  box-sizing: border-box;
  background-color: #dadada;
  @media only screen and (hover: none) and (pointer: coarse) and (orientation: portrait) {
    width: 100%;
    height: auto;
    border: 0.5px solid ${(props) => props.theme.palette.common.black};
  }

  @media only screen and (hover: none) and (pointer: coarse) and (orientation: landscape) {
    width: 80%;
    min-height: 50vh;
    border: 0.5px solid ${(props) => props.theme.palette.common.black};
  }
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

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  gap: 10px;
`;

const ErrorContainer = styled.div`
  display: flex;
  width: 100%;
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
export default UserForm;
