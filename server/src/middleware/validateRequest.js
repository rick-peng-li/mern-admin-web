export const validateRequest = (schema, key = "body") => (req, _res, next) => {
  try {
    req[key] = schema.parse(req[key]);
    next();
  } catch (error) {
    next(error);
  }
};
