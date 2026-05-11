const jwt = require("jsonwebtoken");

exports.authCheck = async (
  req,
  res,
  next
) => {
  try {
    const headerToken =
      req.headers.authorization;

    if (!headerToken) {
      return res.status(401).json({
        message: "No Token",
      });
    }

    // remove Bearer
    const token = headerToken.replace(
      "Bearer ",
      ""
    );

    // verify
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Token Invalid",
    });
  }
};