import { useCallback } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useMessage = () => {
	return useCallback((text, status) => {
		if (!text) return;
		if (status === 200) {
			toast.success(text, {
				position: 'top-right',
				autoClose: 3500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined
			});
		} else {
			toast.error(text, {
				position: 'top-right',
				autoClose: 3500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined
			});
		}
	}, []);
};
