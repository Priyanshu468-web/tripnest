import { useState } from 'react';

export const useForm = (initialValues = {}, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setValues({
      ...values,
      [name]: val
    });
  };

  const handleCustomChange = (name, value) => {
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (onSubmit) => (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        onSubmit(values);
      }
    } else {
      onSubmit(values);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleCustomChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors
  };
};

export default useForm;
