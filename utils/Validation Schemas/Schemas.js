const { z } = require("zod");
const { ROLES } = require("../constants/constants");
const passwordValidation = z
  .string()
  .regex(
    new RegExp(".*[A-Z].*"),
    "Password should contain one uppercase character"
  )
  .regex(
    new RegExp(".*[a-z].*"),
    "Password should contain one lowercase character"
  )
  .regex(new RegExp(".*\\d.*"), "Password should contain one number")
  .regex(
    new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
    "Password should contain one special character"
  )
  .min(8, "Password must be at least 8 characters in length");

const zodLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Please add an email")
    .email("Email must be a valid email"),
});

const zodCreateNewUserScehma = z.object({
  name: z
    .string()
    .min(4, "Name should be atleast 4 characters long")
    .max(20, "Name should not be more than 20 characters long"),
  email: z
    .string()
    .min(1, "Please add an email")
    .email("Email must be a valid email"),
  password: passwordValidation,
  role: z.nativeEnum(ROLES, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case "invalid_enum_value":
          return {
            message:
              "User role must be one of following, Admin | Editor | User",
          };
        default:
          return { message: "Invalid user role" };
      }
    },
  }),
});

const zodCreateNewPostScehma = z.object({
  title: z
    .string()
    .min(1, "Please add a title")
    .max(20, "Title should not be more than 20 characters long"),
  description: z.string().min(1, "Please add a description"),
});
module.exports = {
  zodLoginSchema,
  zodCreateNewUserScehma,
  zodCreateNewPostScehma,
};
