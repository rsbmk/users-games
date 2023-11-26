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

export const CreateUserDto = z.object({
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

export const GetUsersDto = z.object({
  params: z.object({
    id: z.string({ required_error: ERRORS_MESSAGES.PARAMS_ID }),
  }),
});

export const UpdateUserDto = z.object({
  body: CreateUserDto.shape.body.omit({ password: true }).partial(),
  params: GetUsersDto.shape.params,
});

export type IGetUsersDto = z.infer<typeof GetUsersDto>["params"];

export type IUpdateUserDto = z.infer<typeof UpdateUserDto>["body"];

export type ICreateUserDto = z.infer<typeof CreateUserDto>["body"];
