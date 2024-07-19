import Joi from "joi";

const userSchemaValidation = {
  signupUser: Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .label("The passwords you entered do not match. Please try again."),
    isVerified: Joi.boolean(),
    isDeleted: Joi.boolean(),
  }),
  verifyUserEmail: Joi.object({
    token: Joi.string().min(3).max(300).required(),
    userId: Joi.string().required(),
  }),
  validatedUserId: Joi.object({
    userId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$}/)
      .required(),
  }),
};

export default userSchemaValidation;
