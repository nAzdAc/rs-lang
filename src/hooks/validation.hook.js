import { useEffect, useState } from 'react';

export const useValidation = (value, validations) => {
	const [ passwordMinLengthErrorText, setPasswordMinLegthErrorText ] = useState('');
	const [ passwordMaxLengthErrorText, setPasswordMaxLengthErrorText ] = useState('');
	const [ emailIsEmailErrorText, setEmailIsEmailErrorText ] = useState('');
	const [ nameMaxLengthErrorText, setNameMaxLengthErrorText ] = useState('');

	useEffect(
		() => {
			for (const validation in validations) {
				if (validation === 'passwordMinLength') {
					value.length < validations[validation]
						? setPasswordMinLegthErrorText('Пароль должен быть больше 4 символов')
						: setPasswordMinLegthErrorText('');
				} else if (validation === 'passwordMaxLength') {
					value.length > validations[validation]
						? setPasswordMaxLengthErrorText('Пароль должен быть меньше 12 символов')
						: setPasswordMaxLengthErrorText('');
				} else if (validation === 'emailIsEmail') {
					const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					emailRegExp.test(String(value).toLowerCase())
						? setEmailIsEmailErrorText('')
						: setEmailIsEmailErrorText('Электропочта не соответствует шаблону');
				} else if (validation === 'nameMaxLength') {
					value.length > validations[validation]
						? setNameMaxLengthErrorText('Это что у вас за имя такое больше чем 15 символов?)')
						: setNameMaxLengthErrorText('');
				}
			}
		},
		[ validations, value ]
	);

	return { emailIsEmailErrorText, passwordMinLengthErrorText, passwordMaxLengthErrorText, nameMaxLengthErrorText };
};
