import { z } from "zod";

const ERRORS_MESSAGES = {
  EGE: {
    MIN: "La edad mínima es 13 años",
    TYPE: "La edad tiene que ser un número",
    REQUIRED: "La edad es requerido",
  },
  NAME: {
    MIN: "El nombre tiene que tener mínimo 3 caracteres",
    MAX: "El nombre tiene que tener máximo 100 caracteres",
    TYPE: "El nombre tiene que ser un string",
    REQUIRED: "El nombre es requerido",
  },
  USERNAME: {
    MIN: "El nombre de usuario tiene que tener mínimo 3 caracteres",
    MAX: "El nombre de usuario tiene que tener máximo 100 caracteres",
    TYPE: "El nombre de usuario tiene que ser un string",
    REQUIRED: "El nombre de usuario es requerido",
  },
  EMAIL: {
    INVALID: "El email es inválido",
    TYPE: "El email tiene que ser un string",
    REQUIRED: "El email es requerido",
  },
  PASSWORD: {
    MIN: "La contraseña tiene que tener mínimo 6 caracteres",
    MAX: "La contraseña tiene que tener máximo 100 caracteres",
    TYPE: "La contraseña tiene que ser un string",
    REQUIRED: "La contraseña es requerido",
  },
  PARAMS_ID: "El id tiene que ser un valido",
};

export const SignUpDto = z.object({
  body: z.object({
    ege: z
      .number({
        invalid_type_error: ERRORS_MESSAGES.EGE.TYPE,
        required_error: ERRORS_MESSAGES.EGE.REQUIRED,
      })
      .min(13, ERRORS_MESSAGES.EGE.MIN),
    name: z
      .string({
        invalid_type_error: ERRORS_MESSAGES.NAME.TYPE,
        required_error: ERRORS_MESSAGES.NAME.REQUIRED,
      })
      .min(3, ERRORS_MESSAGES.NAME.MIN)
      .max(100, ERRORS_MESSAGES.NAME.MAX),
    username: z
      .string({
        invalid_type_error: ERRORS_MESSAGES.USERNAME.TYPE,
        required_error: ERRORS_MESSAGES.USERNAME.REQUIRED,
      })
      .min(3, ERRORS_MESSAGES.USERNAME.MIN)
      .max(100, ERRORS_MESSAGES.USERNAME.MAX),
    email: z
      .string({
        invalid_type_error: ERRORS_MESSAGES.EMAIL.TYPE,
        required_error: ERRORS_MESSAGES.EMAIL.REQUIRED,
      })
      .email(ERRORS_MESSAGES.EMAIL.INVALID),
    password: z
      .string({
        invalid_type_error: ERRORS_MESSAGES.PASSWORD.TYPE,
        required_error: ERRORS_MESSAGES.PASSWORD.REQUIRED,
      })
      .min(6, ERRORS_MESSAGES.PASSWORD.MIN)
      .max(100, ERRORS_MESSAGES.PASSWORD.MAX),
  }),
});

export const SignInDto = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: ERRORS_MESSAGES.PASSWORD.TYPE,
        required_error: ERRORS_MESSAGES.PASSWORD.REQUIRED,
      })
      .min(6, ERRORS_MESSAGES.PASSWORD.MIN)
      .max(100, ERRORS_MESSAGES.PASSWORD.MAX),
    username: z
      .string({
        invalid_type_error: ERRORS_MESSAGES.USERNAME.TYPE,
        required_error: ERRORS_MESSAGES.USERNAME.REQUIRED,
      })
      .min(3, ERRORS_MESSAGES.USERNAME.MIN)
      .max(100, ERRORS_MESSAGES.USERNAME.MAX),
  }),
});

export type ISignUpUserDto = z.infer<typeof SignUpDto>["body"];
export type ISignInUserDto = z.infer<typeof SignInDto>["body"];
