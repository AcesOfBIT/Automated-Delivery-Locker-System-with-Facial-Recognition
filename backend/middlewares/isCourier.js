export const isCourier = (req, res, next) => {
  if (req.user && req.user.role === "courier") {
    return next();
  }
  return res.status(403).json({
    message: "Access Denied. Couriers only",
  });
};
