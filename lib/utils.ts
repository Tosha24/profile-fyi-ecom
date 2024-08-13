export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(error as string);
};
