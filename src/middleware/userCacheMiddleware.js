import NodeCache from "node-cache";
import User from "../models/User";
const userCache = new NodeCache({ stdTTL: 3600 });

const userCacheMiddleware = async (req, res, next) => {
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

export default userCacheMiddleware;
