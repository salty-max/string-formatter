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
    margin-right: 0.5rem;
  }
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

const toAllCaps = (s: string): string =>
  s
    .split(" ")
    .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
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
        setResult(`${item.charAt(0).toUpperCase()}${item.slice(1)}`);
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
              <label htmlFor="lower">Lowercase</label>
              <input
                type="radio"
                id="lower"
                {...register("caseChoice")}
                value={CaseChoice.Lower}
              />
            </CaseContainer>
            <CaseContainer>
              <label htmlFor="upper">Uppercase</label>
              <input
                type="radio"
                id="upper"
                {...register("caseChoice")}
                value={CaseChoice.Upper}
              />
            </CaseContainer>
            <CaseContainer>
              <label htmlFor="capitalize">Capitalize</label>
              <input
                type="radio"
                id="capitalize"
                {...register("caseChoice")}
                value={CaseChoice.Capitalize}
              />
            </CaseContainer>
            <CaseContainer>
              <label htmlFor="all_caps">Capitalize all</label>
              <input
                type="radio"
                id="all_caps"
                {...register("caseChoice")}
                value={CaseChoice.AllCaps}
              />
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
