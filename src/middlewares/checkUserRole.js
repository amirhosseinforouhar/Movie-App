const UnAuthorizedError = require("../errors/unAuthorizedError");

const checkUserRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UnAuthorizedError("you don't have permission");

    next();
  };
};
module.exports = checkUserRole;
