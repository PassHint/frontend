import axios from 'axios';

const urlDefault = 'http://localhost:3000';
const axiosClass = axios.create();
axiosClass.defaults.timeout = 8000;

export const routes = {
  create_user: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const query = {
      url: `${urlDefault}/users`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username,
        password,
      },
    };
    return await axiosClass(query);
  },
  login_user: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const query = {
      url: `${urlDefault}/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username,
        password,
      },
    };
    return await axiosClass(query);
  },
  create_hint: async ({
    content,
    source,
    token,
  }: {
    content: string;
    source: string;
    token: string;
  }) => {
    const query = {
      url: `${urlDefault}/hints`,
      method: 'POST',
      headers: {
        'Contenty-type': 'application/json',
        authorization: token,
      },
      data: {
        content,
        source,
      },
    };
    return await axiosClass(query);
  },
  list_hints: async ({ token }: { token: string }) => {
    const query = {
      url: `${urlDefault}/hints`,
      method: 'GET',
      headers: {
        authorization: token,
      },
    };
    return await axiosClass(query);
  },
  delete_hint: async ({
    id,
    token,
  }: {
    id: number;
    token: string;
  }) => {
    const query = {
      url: `${urlDefault}/hints/${id}`,
      method: 'DELETe',
      headers: {
        'Contenty-type': 'application/json',
        authorization: token,
      },
    };
    return await axiosClass(query);
  },
};
