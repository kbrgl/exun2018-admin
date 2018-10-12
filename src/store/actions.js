// @flow

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const POSTS_FETCH = 'POSTS_FETCH'
export const POSTS_FETCH_SUCCESS = 'POSTS_FETCH_SUCCESS'
export const POST_CREATE = 'POST_CREATE'
export const POST_CREATE_SUCCESS = 'POST_CREATE_SUCCESS'
export const POST_DELETE = 'POST_DELETE'
export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS'
export const POST_EDIT = 'POST_EDIT'
export const POST_EDIT_SUCCESS = 'POST_EDIT_SUCCESS'
export const ADMINS_FETCH = 'ADMINS_FETCH'
export const ADMINS_FETCH_SUCCESS = 'ADMINS_FETCH_SUCCESS'
export const ADMIN_CREATE = 'ADMIN_CREATE'
export const ADMIN_CREATE_SUCCESS = 'ADMIN_CREATE_SUCCESS'
export const ADMIN_DELETE = 'ADMIN_DELETE'
export const ADMIN_DELETE_SUCCESS = 'ADMIN_DELETE_SUCCESS'

export const login = (email: string, password: string) => ({
  type: LOGIN,
  email,
  password,
})

export const fetchPosts = () => ({
  type: POSTS_FETCH,
})

export const createPost = (title: string, body: string, options: Object) => ({
  type: POST_CREATE,
  title,
  body,
  options,
})

export const deletePost = (id: number) => ({
  type: POST_DELETE,
  id,
})

export const editPost = (id: number, title: string, body: string) => ({
  type: POST_EDIT,
  id,
  title,
  body,
})

export const fetchAdmins = () => ({
  type: ADMINS_FETCH,
})

export const createAdmin = (email: string, password: string) => ({
  type: ADMIN_CREATE,
  email,
  password,
})

export const deleteAdmin = (id: number) => ({
  type: ADMIN_DELETE,
  id,
})
