import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [form, setForm] = useState(initialState);

  const handleInputChange = ({ target: { value, name } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleResetForm = () => {
    setForm( initialState );
  }

  const updateDataForm = newData => setForm(newData)

  return{
    ...form,
    formValues: form,
    // datos formulario
    
    handleResetForm,
    handleInputChange,
    updateDataForm
  };
};
