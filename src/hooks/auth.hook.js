import { useState, useCallback, useEffect } from 'react';
import { backRoutes } from '../utils/backRoutes';
import { LOCAL_STORAGE_KEY } from '../utils/storageKey';
const storageName = 'userData';

export const useAuth = () => {
	const [ token, setToken ] = useState(null);
	const [ refreshToken, setRefreshToken ] = useState(null);
	const [ userId, setUserId ] = useState(null);
	const [ userName, setUserName ] = useState(null);
	const [ avatar, setAvatar ] = useState(null);
	const [ ready, setReady ] = useState(false);

	const login = useCallback((jwtToken, jwtRefreshToken, id, name, avatarURL) => {
		setToken(jwtToken);
		setRefreshToken(jwtRefreshToken);
		setUserId(id);
		setUserName(name);
		setAvatar(avatarURL);
		localStorage.setItem(
			storageName,
			JSON.stringify({
				token: jwtToken,
				refreshToken: jwtRefreshToken,
				userId: id,
				userName: name,
				avatar: avatarURL
			})
		);
	}, []);

	const uploadAvatar = useCallback(
		async (file) => {
			if (!file) return;
			const userId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData))
				? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData)).userId
				: '';
			console.log(file);
			const formData = new FormData();
			formData.append('avatar', file);
			const res = await fetch(`${backRoutes.signUp}/${userId}`, {
				method: 'PUT',
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			const data = await res.json();
			console.log(data)
			if (data.avatarURL) {
				setAvatar(data.avatarURL);
				const local = JSON.parse(localStorage.getItem(storageName));
				const updateLocal = { ...local, avatar: data.avatarURL };
				localStorage.setItem(storageName, JSON.stringify(updateLocal));
			}

			return { status: res.status, message: data.message };
		},
		[ token ]
	);

	const logout = useCallback(() => {
		setToken(null);
		setRefreshToken(null);
		setUserId(null);
		setUserName(null);
		localStorage.removeItem(storageName);
	}, []);

	useEffect(
		() => {
			const data = JSON.parse(localStorage.getItem(storageName));

			if (data && data.token) {
				login(data.token, data.refreshToken, data.userId, data.userName, data.avatar);
			}
			setReady(true);
		},
		[ login ]
	);

	return { login, logout, token, refreshToken, userId, ready, userName, uploadAvatar, avatar };
};
