import { useState, useCallback, useEffect } from 'react';
import { routes } from '../utils/routes';

const storageName = 'userData';

export const useAuth = () => {
	const [ token, setToken ] = useState(null);
	const [ refreshToken, setRefreshToken ] = useState(null);
	const [ userId, setUserId ] = useState(null);
	const [ userName, setUserName ] = useState(null);
	const [ avatar, setAvatar ] = useState(null);
	const [ ready, setReady ] = useState(false);

	const login = useCallback((jwtToken, jwtRefreshToken, id, name) => {
		setToken(jwtToken);
		setRefreshToken(jwtRefreshToken);
		setUserId(id);
		setUserName(name);
		localStorage.setItem(
			storageName,
			JSON.stringify({
				token: jwtToken,
				refreshToken: jwtRefreshToken,
				userId: id,
				userName: name
			})
		);
	}, []);

	const uploadAvatar = useCallback(
		async (file) => {
			const formData = new FormData();
			formData.append('avatar', file);
			const res = await fetch(routes.upload, {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			const data = await res.json();
			setAvatar(data.avatarURL);
			const local = JSON.parse(localStorage.getItem(storageName));
			const updateLocal = { ...local, avatar: data.avatarURL };
			localStorage.setItem(storageName, JSON.stringify(updateLocal));
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
				login(data.token, data.refreshToken, data.useId, data.userName);
			}
			setReady(true);
		},
		[ login ]
	);

	return { login, logout, token, refreshToken, userId, ready, userName, uploadAvatar, avatar };
};
