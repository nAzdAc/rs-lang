import { useEffect, useState } from 'react';

export const useValidation = (value, validations) => {
	const [ passwordErrorText, setPasswordErrorText ] = useState('');
	const [ emailErrorText, setEmailErrorText ] = useState('');
	const [ nameErrorText, setNameErrorText ] = useState('');

	useEffect(
		() => {
			for (const validation in validations) {
				if (validation === 'passwordIsPassword') {
					const passwordRegExp = /^[\s|\S]{4,11}$/;
					passwordRegExp.test(String(value))
						? setPasswordErrorText('')
						: setPasswordErrorText(`Пароль должен быть от 4 до 12 символов`);
				} else if (validation === 'emailIsEmail') {
					const emailRegExp = /^[A-Za-z0-9_.-]{5,31}@mail\.ru$/;
					emailRegExp.test(String(value))
						? setEmailErrorText('')
						: setEmailErrorText(
								`Email должен содержать только латинские буквы, цифры, знак подчеркивания, точку и минус.
								Заканчиться на "mail.ru". 
								Cодержать всего от 12 до 38 символов`
							);
				} else if (validation === 'nameIsName') {
					const nameRegExp = /^[\s|\S]{1,14}$/;
					nameRegExp.test(String(value))
						? setNameErrorText('')
						: setNameErrorText(`Никнейм должен быть от 1 до 15 символов`);
				}
			}
		},
		[ validations, value ]
	);

	return {
		emailErrorText,
		passwordErrorText,
		nameErrorText
	};
};
