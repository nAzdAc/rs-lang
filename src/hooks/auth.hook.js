import { useState, useCallback, useEffect } from 'react';
import { backRoutes } from '../utils/backRoutes';
import { useMessage } from './message.hook';
const storageName = 'userData';

export const useAuth = () => {
	const [ token, setToken ] = useState(null);
	const [ userId, setUserId ] = useState(null);
	const [ userName, setUserName ] = useState(null);
	const [ avatarURL, setAvatarURL ] = useState('');
	const [ settings, setSettings ] = useState({
		musicVolume: 0,
		soundVolume: 0,
		wordVolume: 0,
		difficultWord: true,
		deleteWord: true,
		translateWord: true,
		translateSentences: true,
	});
	const [ ready, setReady ] = useState(false);
	const message = useMessage();

	const login = useCallback(({token, userId, userName, avatarURL, settings}) => {
		setToken(token);
		setUserId(userId);
		setUserName(userName);
		setAvatarURL(avatarURL);
    setSettings(settings)
		localStorage.setItem(
			storageName,
			JSON.stringify({
				token,
				userId,
				userName,
				avatarURL,
        settings,
			})
		);
	}, []);

	const uploadAvatar = useCallback(
		async (file) => {
			if (!token) {
				return message('Для загрузки фото необходимо авторизоваться.', 400);
			}
			if (!file) {
				return message('Что-то не так с файлом.', 400);
			}
			const formData = new FormData();
			formData.append('avatar', file);
			const res = await fetch(backRoutes.upload, {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			const data = await res.json();
			message(data.message, res.status);
			if (data.avatarURL) {
				setAvatarURL(data.avatarURL);
				const local = JSON.parse(localStorage.getItem(storageName));
				const updateLocal = { ...local, avatarURL: data.avatarURL };
				localStorage.setItem(storageName, JSON.stringify(updateLocal));
			}
		},
		[ message, token ]
	);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		setUserName(null);
		localStorage.removeItem(storageName);
	}, []);

	useEffect(
		() => {
			const data = JSON.parse(localStorage.getItem(storageName));
			console.log(data)
			if (data && data.token) {
				login({
					token: data.token,
					userId: data.userId,
					userName: data.name,
					avatarURL: data.avatarURL,
					settings: data.settings
				});
			}
			setReady(true);
		},
		[ login ]
	);

	return {
		login,
		logout,
		token,
		userId,
		userName,
		uploadAvatar,
		avatarURL,
    settings,
		setSettings,
		ready
	};
};
