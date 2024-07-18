import { NextFunction } from "express";
import createHttpError from "http-errors";
import Joi from "joi";

const validator = async (
  schemaName: Joi.ObjectSchema,
  body: Object,
  next: NextFunction
) => {
  const { error } = schemaName.validate(body, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });

  try {
    // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
    error ? next(createHttpError(422, error?.details[0].message)) : next();
  } catch (error) {
    console.error(`[ValidatorMiddleError]: ${error} `);
  }
};

export default validator;
