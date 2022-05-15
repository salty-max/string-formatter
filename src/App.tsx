import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import "./App.css";

enum CaseChoice {
  Lower,
  Upper,
  Capitalize,
  AllCaps,
}

const defaultValues = {
  item: "",
  caseChoice: CaseChoice.Lower,
};

const Layout = styled.main`
  width: 80%;
  margin: 0 auto;
`;

const CasesContainer = styled.div`
  display: flex;
  padding: 1rem 0;
`;

const CaseContainer = styled.div`
  &:not(:last-of-type) {
    margin-right: 1rem;
  }
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 40% 20% 40%;
`;

const TextArea = styled.textarea`
  border: 1px solid #000;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
  line-height: 1.6;
`;

const Result = styled.div`
  border: 1px solid #000;
  border-radius: 4px;
  padding .5rem;
  font-size: 1rem;
  line-height: 1.6;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: #9c88ff;
  transition: all 0.3s;
  padding: 0.75rem 1rem;
  color: #f5f6fa;
  box-shadow: none;
  border: none;
  font-size: 1.25rem;
  border-radius: 4px;

  &:hover {
    background-color: #8c7ae6;
  }
`;

const Radio = styled.input`
  &:checked,
  &:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  &:checked + label,
  &:not(:checked) + label {
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
  }
  &:checked + label:before,
  &:not(:checked) + label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #fff;
  }
  &:checked + label:after,
  &:not(:checked) + label:after {
    content: "";
    width: 12px;
    height: 12px;
    background: #9c88ff;
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  &:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  &:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

const toAllCaps = (s: string): string =>
  s
    .split(" ")
    .map((w) => `${w.charAt(0).toUpperCase()}${w.substring(1).toLowerCase()}`)
    .join(" ");

const App: React.FC = () => {
  const [result, setResult] = useState<string>("");
  const form = useForm<typeof defaultValues>({
    defaultValues,
  });

  const { register, handleSubmit } = form;

  const onSubmit: SubmitHandler<typeof defaultValues> = (data) => {
    const { item, caseChoice } = data;

    switch (+caseChoice) {
      case CaseChoice.Lower:
        setResult(item.toLowerCase());
        break;
      case CaseChoice.Upper:
        setResult(item.toUpperCase());
        break;
      case CaseChoice.Capitalize:
        setResult(
          `${item.charAt(0).toUpperCase()}${item.substring(1).toLowerCase()}`,
        );
        break;
      case CaseChoice.AllCaps:
        setResult(toAllCaps(item));
        break;
      default:
        setResult(item);
        break;
    }
  };

  return (
    <div className="App">
      <Layout>
        <header className="App-header">
          <h1>String Formatter</h1>
        </header>
        <FormProvider {...form}>
          <CasesContainer>
            <CaseContainer>
              <Radio
                type="radio"
                id="lower"
                {...register("caseChoice")}
                value={CaseChoice.Lower}
              />
              <label htmlFor="lower">Lowercase</label>
            </CaseContainer>
            <CaseContainer>
              <Radio
                type="radio"
                id="upper"
                {...register("caseChoice")}
                value={CaseChoice.Upper}
              />
              <label htmlFor="upper">Uppercase</label>
            </CaseContainer>
            <CaseContainer>
              <Radio
                type="radio"
                id="capitalize"
                {...register("caseChoice")}
                value={CaseChoice.Capitalize}
              />
              <label htmlFor="capitalize">Capitalize</label>
            </CaseContainer>
            <CaseContainer>
              <Radio
                type="radio"
                id="all_caps"
                {...register("caseChoice")}
                value={CaseChoice.AllCaps}
              />
              <label htmlFor="all_caps">Capitalize all</label>
            </CaseContainer>
          </CasesContainer>
          <Grid>
            <TextArea
              rows={5}
              {...register("item")}
              placeholder="Ex: Hello world"
            />
            <ButtonWrapper>
              <Button onClick={handleSubmit(onSubmit)}>Convert</Button>
            </ButtonWrapper>
            <Result>
              <span>{result}</span>
            </Result>
          </Grid>
        </FormProvider>
      </Layout>
    </div>
  );
};

export default App;
