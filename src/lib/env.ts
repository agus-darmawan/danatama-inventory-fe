const getEnvVar = (key: string, required: boolean = true): string => {
  const value = process.env[key];

  if (!value && required) {
    throw new Error(
      `Environment variable ${key} is required but was not provided.`,
    );
  }

  return value || '';
};

export const env = {
  NEXT_PUBLIC_API_URL: getEnvVar('NEXT_PUBLIC_API_URL'),
};
