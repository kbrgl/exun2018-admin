function url(route) {
  return `/api/v1/${route}`
}

async function login(email, password) {
  const payload = {
    email,
    password,
  }
  const response = await fetch(url('auth'), {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(payload),
  })
  const json = await response.json()
  return json
}

async function fetchPosts() {
  const response = await fetch(url('posts'))
  const json = await response.json()
  return json.posts
}

async function createPost(token, title, body, options) {
  const payload = {
    title,
    body,
    shouldPost: options.shouldPost,
    shouldNotify: options.shouldNotify,
    isTest: options.isTest,
  }
  const response = await fetch(url('posts'), {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(payload),
  })
  const json = await response.json()
  // TODO: handle error
  return json.post
}

async function deletePost(token, id) {
  const response = await fetch(url(`posts/${id}`), {
    method: 'DELETE',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
  })
  const json = await response.json()
  // TODO: handle error
  return json.post
}

async function editPost(token, id, title, body) {
  const payload = {
    title,
    body,
  }
  const response = await fetch(url(`posts/${id}`), {
    method: 'PATCH',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(payload),
  })
  const json = await response.json()
  // TODO: handle error
  return json.post
}

async function fetchAdmins(token) {
  const response = await fetch(url('admins'), {
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  })
  const json = await response.json()
  return json.admins
}

async function createAdmin(token, email, password) {
  const payload = {
    email,
    password,
  }
  const response = await fetch(url('admins'), {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(payload),
  })
  const json = await response.json()
  // TODO: handle error
  return json.admin
}

async function deleteAdmin(token, id) {
  const response = await fetch(url(`admins/${id}`), {
    method: 'DELETE',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }),
  })
  const json = await response.json()
  // TODO: handle error
  return json.post
}

export default {
  login,
  fetchPosts,
  createPost,
  deletePost,
  editPost,
  fetchAdmins,
  createAdmin,
  deleteAdmin,
}
