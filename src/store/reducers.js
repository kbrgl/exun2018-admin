import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  POSTS_FETCH_SUCCESS,
  POST_CREATE_SUCCESS,
  POST_DELETE_SUCCESS,
  POST_EDIT_SUCCESS,
  ADMINS_FETCH_SUCCESS,
  ADMIN_CREATE_SUCCESS,
  ADMIN_DELETE_SUCCESS,
  LOGOUT_SUCCESS,
} from './actions'

const token = localStorage.getItem('token')

const initialState = {
  auth: {
    ok: !!token,
    message: '',
    token,
  },
  posts: [],
  admins: [],
}

const sortAdmins = arr =>
  arr.slice(0).sort((a, b) => {
    if (a.email < b.email) {
      return -1
    }
    if (a.email > b.email) {
      return 1
    }
    return 0
  })

function app(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          ok: true,
          token: action.token,
        },
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        auth: {
          ok: false,
          message: action.message,
        },
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        auth: {
          ok: false,
          message: '',
        },
      }
    case POSTS_FETCH_SUCCESS:
      return {
        ...state,
        posts: action.posts,
      }
    case POST_CREATE_SUCCESS:
      return {
        ...state,
        posts: [action.post, ...state.posts],
      }
    case POST_DELETE_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id),
      }
    case POST_EDIT_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => (post.id === action.post.id ? action.post : post)),
      }
    case ADMINS_FETCH_SUCCESS:
      return {
        ...state,
        admins: action.admins,
      }
    case ADMIN_CREATE_SUCCESS:
      return {
        ...state,
        admins: sortAdmins([action.admin, ...state.admins]),
      }
    case ADMIN_DELETE_SUCCESS:
      return {
        ...state,
        admins: state.admins.filter(admin => admin.id !== action.id),
      }
    default:
      return state
  }
}

export default app
