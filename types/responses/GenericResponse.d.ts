type GenericResponse<Payload> = {
  success: boolean;
  message: string;
  data: Payload;
};
