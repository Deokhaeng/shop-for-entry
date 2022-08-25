import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { InputPropsType } from '@lib/shop/interface';

function Input({
  placeholder, XS, S, M, file, ref, id, accept, width, height, onChange, value, phone, password,
  register, setValue, margin, color, inputOn, disabled, center, onKeyUp, authentication,
  map, mode, maxLength,
}: InputPropsType) {
  if (XS) {
    return (
      <XSmallInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        center={center}
        defaultValue={value || ''}
        {...register}
      />
    );
  }
  if (S) {
    return (
      <SmallInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        defaultValue={value || ''}
      />
    );
  }
  if (M) {
    return (
      <MiddleInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        defaultValue={value || ''}
        setValue={setValue}
        map={map}
        disabled={disabled}
        maxLength={maxLength}
        {...register}
      />
    );
  }
  if (password) {
    return (
      <MiddleInput
        type="password"
        placeholder={placeholder}
        value={value}
        defaultValue={value || ''}
        onChange={onChange}
        onKeyUp={onKeyUp}
        {...register}
        mode={mode}
      />
    );
  }
  if (phone) {
    return (
      <PhonNumInput
        type="tel"
        placeholder={placeholder}
        value={value}
        maxLength="13"
        defaultValue={value || ''}
        onChange={onChange}
        onKeyUp={onKeyUp}
        {...register}
      />
    );
  }
  if (authentication) {
    return (
      <AuthenticationInput
        placeholder={placeholder}
        maxLength="6"
        value={value}
        defaultValue={value || ''}
        // onChange={onChange}
        onKeyUp={onKeyUp}
        {...register}
      />
    );
  }
  if (file) {
    return (
      <FileInput
        type="file"
        ref={ref}
        id={id}
        accept={accept}
        placeholder={placeholder}
        value={value}
        defaultValue={value || ''}
        // onChange={onChange}
        onKeyUp={onKeyUp}
        {...register}
      />
    );
  }
  return (
    <DefaultInput
      placeholder={placeholder}
      width={width}
      height={height}
      value={value}
      margin={margin}
      color={color}
      defaultValue={value || ''}
      onKeyUp={onKeyUp}
      inputOn={inputOn}
      disabled={disabled}
      readonly
      center={center}
      {...register}
      {...setValue}
    />
  );
}

const DefaultInput = styled.input<{ width: string, height: string, margin: string, color: string, inputOn: boolean, center: boolean }>`
  &:focus {
    box-shadow: none;
    outline: none;
    border-color: #E3E3E3;
  }
  background: #FBFBFB;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  padding: 0 16px;
  color: #574030;
  font-size: 14px;
  font-weight: 500;
  ${({ width }) => (width ? css`width: ${width}` : 'width: 105px')};
  ${({ height }) => (height ? css`height: ${height}` : 'height: 50px')};
  ${({ margin }) => (margin && css`height: ${margin}`)};
  ${({ center }) => (center && css`text-align: center`)}; 
  ::placeholder {
      color: #9A8576;
      ${({ inputOn }) => (inputOn && css`color: #C7C7C7`)};
      font-size: 14px;
      font-weight: 500;
      ${({ center }) => (center && css`text-align: center`)}; 
  }
`;

const XSmallInput = styled.input<{center: boolean}>`
  &:focus {
    box-shadow: none;
    outline: none;
    border-color: #E3E3E3;
  }
  width: 100%;
  height: 50px;
  background: #FBFBFB;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  padding: 0 16px;
  color: #574030;
  font-size: 14px;
  font-weight: 500;
  ${({ center }) => (center && css`text-align: center`)}; 
  ::placeholder {
      color: #C7C7C7;
      font-size: 14px;
      font-weight: 500;
      ${({ center }) => (center && css`text-align: center`)}; 
  }
`;

const SmallInput = styled.input`
  &:focus {
    box-shadow: none;
    outline: none;
    border-color: #E3E3E3;
  }
  max-width: 126px ;
  height: 50px;
  background: #FBFBFB;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  margin-right: 6px;
  padding-left: 32px;
  color: #574030;
  font-size: 14px;
  font-weight: 500;
  ::placeholder {
      color: #C7C7C7;
      font-size: 14px;
      font-weight: 500;
  }
`;

const MiddleInput = styled.input<{map: boolean}>`
  &:focus {
    box-shadow: none;
    outline: none;
    border-color: #E3E3E3;
  }
  width: 100%;
  height: 50px;
  background: #FBFBFB;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  margin-right: 9px;
  padding-left: 15px;
  ${({ map }) => (map && css`padding-right: 50px;`)}; 
  ${({ map }) => (map && css`cursor: pointer;`)}; 
  ${({ map }) => (map && css`&:hover {   
    box-shadow: none;
    outline: none;
    border-color: #E3E3E3;}`)}; 
  color: #574030;
  font-size: 14px;
  font-weight: 500;
  ::placeholder {
      color: #C7C7C7;
      font-size: 14px;
      font-weight: 500;
  }
`;

const PhonNumInput = styled.input`
    &:focus {
    box-shadow: none;
    outline: none;
    border-color: #E3E3E3;
  }
  width: 100%;
  height: 50px;
  background: #FBFBFB;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  margin-right: 9px;
  padding-left: 15px;
  color: #574030;
  font-size: 14px;
  font-weight: 500;
  ::placeholder {
      color: #C7C7C7;
      font-size: 14px;
      font-weight: 500;
  }
`;

const AuthenticationInput = styled.input`
    &:focus {
    box-shadow: none;
    outline: none;
    border-color: #E3E3E3;
  }
  width: 100%;
  min-height: 50px;
  background: #FBFBFB;
  border: 1px solid #F0F0F0;
  border-radius: 8px;
  margin-top: 5px;
  padding-left: 15px;
  padding-right: 4.5rem;
  color: #574030;
  font-size: 14px;
  font-weight: 500;
  ::placeholder {
      color: #C7C7C7;
      font-size: 14px;
      font-weight: 500;
  }
`;

const FileInput = styled.input`
  display: none;
`;

export default Input;
