import clsx from 'clsx';
import React from 'react';
import Select from 'react-select';
import { useThemeMode } from '../../../partials';

type Prop = {
  label: string;
  formik: any;
  isUserLoading: boolean;
  name: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  options?: Array<{ value: string; label: string }>;
};

const SearshSelectMulti: React.FC<Prop> = ({
  formik,
  name,
  placeholder,
  label,
  isRequired = false,
  isDisabled = false,
  options = [],
}) => {
  const { mode } = useThemeMode();
  const isLight = mode === 'light';

  return (
    <div>
      <label className={` ${isRequired ? 'required' : ''} fw-bold fs-6 mb-2`}>
        {label}
      </label>
      <Select
        options={options}
        name={name}
        value={options.length>0?options.filter((option) =>
          formik.values[name].includes(option.value)
        ):[]}
        isDisabled={isDisabled}
        placeholder={placeholder}
        onChange={(selectedOptions) => {
          const selectedValues = selectedOptions
            ? selectedOptions.map((option) => option.value)
            : [];
          formik.setFieldValue(name, selectedValues);
        }}
        isMulti  // This enables multi-select functionality
        classNamePrefix={`react-select-${isLight ? 'light' : 'dark'}`}
        className={clsx(
          `react-select-container`,
          { 'is-invalid': formik.touched[name] && formik.errors[name] },
          { 'is-valid': formik.touched[name] && !formik.errors[name] }
        )}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{formik.errors[name]}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearshSelectMulti;
