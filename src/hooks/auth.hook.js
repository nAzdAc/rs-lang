import { useState, useCallback, useEffect } from 'react';
import { backRoutes } from '../utils/backRoutes';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
import { useMessage } from './message.hook';

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
		translateSentences: true
	});
	const [ ready, setReady ] = useState(false);
	const message = useMessage();

	const login = useCallback(({ token, userId, userName, avatarURL, settings }) => {
		setToken(token);
		setUserId(userId);
		setUserName(userName);
		setAvatarURL(avatarURL);
		setSettings(settings);
		localStorage.setItem(
			LOCAL_STORAGE_KEY.userData,
			JSON.stringify({
				token,
				userId,
				userName,
				avatarURL
			})
		);
		console.log(settings);
		localStorage.setItem(
			LOCAL_STORAGE_KEY.userSettings,
			JSON.stringify({
				settings
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
				const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData));
				const updateLocal = { ...local, avatarURL: data.avatarURL };
				localStorage.setItem(LOCAL_STORAGE_KEY.userData, JSON.stringify(updateLocal));
			}
		},
		[ message, token ]
	);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		setUserName(null);
		localStorage.removeItem(LOCAL_STORAGE_KEY.userData);
	}, []);

	useEffect(
		() => {
			const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData));
			const userSettings = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userSettings));
			console.log(userData);
			console.log(userSettings)
			if (userData && userData.token) {
				login({
					token: userData.token,
					userId: userData.userId,
					userName: userData.name,
					avatarURL: userData.avatarURL,
					settings: userSettings
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
