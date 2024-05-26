import * as yup from 'yup';

export const registerFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email inválido')
    .required('O email é obrigatório!'),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
      'A senha precisa ter no minímo 8 caracteres, 1 letra maiúscula, 1 letra minúsculas, 1 número e 1 caractere especial!'
    )
    .required('A senha é obrigatório!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não são compativeis!'),
});

export const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email inválido')
    .required('O email é obrigatório!'),
  password: yup.string().required('A senha é obrigatório!'),
});
