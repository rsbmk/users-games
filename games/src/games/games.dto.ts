import { z } from "zod";

const ERRORS_MESSAGES = {
  NAME: {
    MIN: "El nombre tiene que tener mínimo 3 caracteres",
    MAX: "El nombre tiene que tener máximo 255 caracteres",
    TYPE: "El nombre tiene que ser un string",
    REQUIRED: "El nombre es requerido",
  },
  DESCRIPTION: {
    MIN: "La descripcion tiene que tener mínimo 3 caracteres",
    MAX: "La descripcion tiene que tener máximo 255 caracteres",
    TYPE: "La descripcion tiene que ser un string",
    REQUIRED: "La descripcion es requerido",
  },
  URLIMG: {
    MIN: "La url de la imagen tiene que tener mínimo 3 caracteres",
    MAX: "La url de la imagen tiene que tener máximo 255 caracteres",
    TYPE: "La url de la imagen tiene que ser un string",
    REQUIRED: "La url de la imagen es requerido",
    URL: "La url de la imagen tiene que ser una url valida",
  },
  PARAMS: {
    ID: "El id es requerido",
  },
};

export const CreateGameDto = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: ERRORS_MESSAGES.NAME.TYPE, required_error: ERRORS_MESSAGES.NAME.REQUIRED }).min(3, ERRORS_MESSAGES.NAME.MIN).max(255, ERRORS_MESSAGES.NAME.MAX),
    description: z
      .string({
        invalid_type_error: ERRORS_MESSAGES.DESCRIPTION.TYPE,
        required_error: ERRORS_MESSAGES.DESCRIPTION.REQUIRED,
      })
      .min(3, ERRORS_MESSAGES.DESCRIPTION.MIN)
      .max(255, ERRORS_MESSAGES.DESCRIPTION.MAX),
    urlImg: z
      .string({
        invalid_type_error: ERRORS_MESSAGES.URLIMG.TYPE,
        required_error: ERRORS_MESSAGES.URLIMG.REQUIRED,
      })
      .min(3, ERRORS_MESSAGES.URLIMG.MIN)
      .max(255, ERRORS_MESSAGES.URLIMG.MAX)
      .url(ERRORS_MESSAGES.URLIMG.URL),
  }),
});

export const GetGameDto = z.object({
  params: z.object({
    id: z.string({ required_error: ERRORS_MESSAGES.PARAMS.ID }),
  }),
});

export const UpdateGameDto = z.object({
  body: CreateGameDto.shape.body.partial(),
  params: GetGameDto.shape.params,
});

export type IGetGamesDto = z.infer<typeof GetGameDto>["params"];

export type IUpdateGameDto = z.infer<typeof UpdateGameDto>["body"];

export type ICreateGameDto = z.infer<typeof CreateGameDto>["body"];
