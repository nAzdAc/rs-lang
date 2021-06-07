import React, { useState } from 'react';
import { useValidation } from './validation.hook';

export const useInput = (initValue, validations) => {
	const [ value, setValue ] = useState(initValue);
	const [ isDirty, setDirty ] = useState(false);
	const valid = useValidation(value, validations);

	const onChange = (event) => {
		setValue(event.target.value);
	};

	const onBlur = (event) => {
		setDirty(true);
	};

	return {
		value,
		onChange,
		onBlur,
		isDirty,
		...valid
	};
};
