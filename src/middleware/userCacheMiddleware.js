import NodeCache from "node-cache";
import User from "../models/User.js";
const userCache = new NodeCache({ stdTTL: 3600 });

export const userCacheMiddleware = async (req, res, next) => {
  const userID = req.userID;
  const cachedUser = userCache.get(userID);
  if (cachedUser) {
    req.user = cachedUser;
    next();
  } else {
    const user = await User.findById(userID);
    if (user) {
      userCache.set(userID, user);
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  }
};

export const checkAdminMiddleware = (req, res, next) => {
  const user = req.user;
  if (user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};
