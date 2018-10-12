import { put, takeLatest, call, all, select } from 'redux-saga/effects'
import api from '../lib/api'
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  POSTS_FETCH,
  POSTS_FETCH_SUCCESS,
  ADMINS_FETCH,
  ADMINS_FETCH_SUCCESS,
  POST_CREATE,
  POST_CREATE_SUCCESS,
  POST_DELETE,
  POST_DELETE_SUCCESS,
  POST_EDIT_SUCCESS,
  POST_EDIT,
  ADMIN_DELETE,
  ADMIN_DELETE_SUCCESS,
  ADMIN_CREATE,
  ADMIN_CREATE_SUCCESS,
} from './actions'

const getTokenFromState = state => state.auth.token

function* login(action) {
  const res = yield call(api.login, action.email, action.password)
  if (res.ok) {
    localStorage.setItem('token', res.token)
    yield put({ type: LOGIN_SUCCESS, token: res.token })
  } else yield put({ type: LOGIN_FAILURE, message: res.message })
}

function* fetchPosts() {
  const posts = yield call(api.fetchPosts)
  yield put({ type: POSTS_FETCH_SUCCESS, posts })
}

function* createPost(action) {
  const token = yield select(getTokenFromState)
  // TODO: check result
  const post = yield call(api.createPost, token, action.title, action.body, action.options)
  yield put({
    type: POST_CREATE_SUCCESS,
    post,
  })
}

function* deletePost(action) {
  const token = yield select(getTokenFromState)
  // TODO: check result
  yield call(api.deletePost, token, action.id)
  yield put({
    type: POST_DELETE_SUCCESS,
    id: action.id,
  })
}

function* editPost(action) {
  const token = yield select(getTokenFromState)
  // TODO: check result
  const post = yield call(api.editPost, token, action.id, action.title, action.body)
  yield put({
    type: POST_EDIT_SUCCESS,
    post,
  })
}

function* fetchAdmins() {
  const token = yield select(getTokenFromState)
  const admins = yield call(api.fetchAdmins, token)
  yield put({ type: ADMINS_FETCH_SUCCESS, admins })
}

function* createAdmin(action) {
  const token = yield select(getTokenFromState)
  // TODO: check result
  const admin = yield call(api.createAdmin, token, action.email, action.password)
  yield put({
    type: ADMIN_CREATE_SUCCESS,
    admin,
  })
}

function* deleteAdmin(action) {
  const token = yield select(getTokenFromState)
  // TODO: check result
  yield call(api.deleteAdmin, token, action.id)
  yield put({
    type: ADMIN_DELETE_SUCCESS,
    id: action.id,
  })
}

function* rootSaga() {
  yield all([
    takeLatest(LOGIN, login),
    takeLatest(POSTS_FETCH, fetchPosts),
    takeLatest(POST_CREATE, createPost),
    takeLatest(POST_DELETE, deletePost),
    takeLatest(POST_EDIT, editPost),
    takeLatest(ADMINS_FETCH, fetchAdmins),
    takeLatest(ADMIN_CREATE, createAdmin),
    takeLatest(ADMIN_DELETE, deleteAdmin),
  ])
}

export default rootSaga
