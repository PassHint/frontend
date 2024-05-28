import * as yup from 'yup';

export const registerFormSchema = yup.object().shape({
  username: yup.string().required('O nome de usuário é obrigatório!'),
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
  username: yup.string().required('O nome de usuário é obrigatório!'),
  password: yup.string().required('A senha é obrigatório!'),
});

export const hintFormSchema = yup.object().shape({
  website: yup.string().required('O site é obrigatório!'),
  hint: yup
    .string()
    .min(3, 'Precisa ter no mínimo 3 caracteres!')
    .required('A dica é obrigatória'),
});
