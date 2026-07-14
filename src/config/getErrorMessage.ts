import { isAxiosError } from "axios";

export const getErrorMessage = (err: unknown) => {
  if (isAxiosError(err)) {
    return err.response?.status ? String(err.response.status) : err.message;
  }
  return err instanceof Error ? err.message : "Unknown error";
};
