import {
    IS_BLOCK,
    IS_LOADER,
    SIGN_IN,
    SIGN_UP,
    UPLOAD_AVATAR,
    SET_SETTINGS,
    POST_SETTINGS,
    LOG_OUT,
    SET_LEVEL,
    SET_ACTIVE_WORDS,
    UPDATE_USER_WORD,
    POST_STATS,
    SET_NAME,
} from './types'

const initialState = {
    block: false,
    level: null,
    loading: false,
    userData: {
        userName: '',
        userId: '',
        avatarURL: '',
        token: '',
    },
    settings: {
        musicVolume: 0,
        soundVolume: 0,
        wordVolume: 50,
        difficultWord: true,
        deleteWord: true,
        translateWord: true,
        translateSentences: true,
        theme: 'light',
    },
    userWords: [],
    activeWords: [],
    statistics: {},
}

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SIGN_UP:
            return { ...state, userData: { ...action.payload } }
        case SIGN_IN:
            return {
                ...state,
                userData: { ...action.payload.userData },
                settings: { ...action.payload.settings },
                statistics: { ...action.payload.statistics },
                userWords: [...action.payload.userWords],
            }
        case LOG_OUT:
            return {
                ...initialState,
            }
        case SET_ACTIVE_WORDS:
            return {
                ...state,
                activeWords: [...action.payload],
            }
        case UPDATE_USER_WORD:
            return {
                ...state,
                userWords: [...action.payload],
            }
        case UPLOAD_AVATAR:
            return {
                ...state,
                userData: { ...state.userData, avatarURL: action.payload },
            }
        case IS_LOADER:
            return { ...state, loading: action.payload }
        case IS_BLOCK:
            return { ...state, block: action.payload }
        case SET_SETTINGS:
            return {
                ...state,
                settings: { ...state.settings, ...action.payload },
            }
        case SET_LEVEL:
            return { ...state, level: action.payload }
        case SET_NAME:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    userName: action.payload,
                },
            }
        case POST_SETTINGS:
            return { ...state, settings: { ...action.payload } }
        case POST_STATS:
            return {
                ...state,
                statistics: { ...action.payload.statistics },
                userWords: [...action.payload.userWords],
            }
        default:
            return state
    }
}
