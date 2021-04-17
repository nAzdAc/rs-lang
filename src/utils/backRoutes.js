import { LOCAL_STORAGE_KEY } from './storageKey';

// export const originURL = 'http://localhost:8080';
export const originURL = 'https://react-learnwords.herokuapp.com';

//  ?group=1&page=1

const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData))
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.userData)).token
  : '';

const getRoute = (trailing) => `${originURL}/${trailing}`;

export const backRoutes = {
  signUp: getRoute('users'),
  signIn: getRoute('signin'),
  upload: getRoute('upload'),
  words: getRoute('words'),
  statistics: getRoute('statistics'),
  uploadAvatar: async (userId, file) => {
    console.log(file);
    console.log(userId);
    const formData = new FormData();
    formData.append('avatar', file);
    const res = await fetch(`${originURL}/users/${userId}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  },
  putStatistics: async ({ userId, token, data }) => {
    console.log(userId);
    console.log(token);
    console.log(data);
    const res = await fetch(`${originURL}/users/${userId}/statistics/`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const content = await res.json();
    console.log(content);
    return content;
  },
  getStats: async ({ userId, token }) => {
    console.log('userId', userId);
    console.log('token', token);
    if (!userId || !token) return;
    const res = await fetch(`${originURL}/users/${userId}/statistics/`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const content = await res.json();
    console.log(content);
    return content;
  },
  getWordsPage(group = 0, page = 0) {
    return `${originURL}/words?group=${group}&page=${page}`;
  },
  createUserWord: async ({ userId, wordId, word, token }) => {
    const rawResponse = await fetch(
      `${originURL}/users/${userId}/words/${wordId}`,
      {
        method: 'POST',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
      }
    );
    const content = await rawResponse.json();

    console.log(content);
  },
  updateUserWord: async ({ userId, wordId, word, token }) => {
    console.log(token);
    const rawResponse = await fetch(
      `${originURL}/users/${userId}/words/${wordId}`,
      {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
      }
    );
    const content = await rawResponse.json();

    console.log(content);
  },
  deleteUserWord: async ({ userId, wordId, token }) => {
    console.log(token);
    const rawResponse = await fetch(
      `${originURL}/users/${userId}/words/${wordId}`,
      {
        method: 'DELETE',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(word)
      }
    );
    const content = await rawResponse.json();

    console.log(content);
  },
  getUserWord: async ({ userId, wordId }) => {
    const rawResponse = await fetch(
      `${originURL}/users/${userId}/words/${wordId}`,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );
    const content = await rawResponse.json();

    console.log(content);
  },
  getUserWords: async ({ userId, token }) => {
    try {
      const rawResponse = await fetch(`${originURL}/users/${userId}/words`, {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const content = await rawResponse.json();
      console.log(content);
      return content;
    } catch (e) {
      console.log(e);
    }
  },
  getUserWordsForDictionary: async ({ userId, token }) => {
    try {
      const rawResponse = await fetch(`${originURL}/users/${userId}/words/dictionary`, {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const content = await rawResponse.json();
      console.log(content);
      return content;
    } catch (e) {
      console.log(e);
    }
  },
  getWord(wordId) {
    return `${originURL}/words/${wordId}`;
  },
};
