import axios from 'axios'

const urlDefault = 'http://localhost:3000'

export const routes = {
  create_user: async ({ username, password }: { username: string; password: string }) => {
    return await axios.post(`${urlDefault}/users`, {
      data: {
        username,
        password
      }
    })
  },
  login_user: async ({ username, password }: { username: string; password: string }) => {
    return await axios.post(`${urlDefault}/login`, {
      data: {
        username,
        password
      }
    })
  },
  create_hint: async ({ content, source, token }: { content: string; source: string, token: string }) => {
    return await axios.get(`${urlDefault}/hints`, {
      headers: {
        'Contenty-type': 'application/json',
        authorization: token
      },
      data: {
        content,
        source
      }
    })
  },
  list_hints: async ({ token }: { token: string }) => {
    return await axios.get(`${urlDefault}/hints`, {
      headers: {
        'Contenty-type': 'application/json',
        authorization: token
      }
    })
  },
}