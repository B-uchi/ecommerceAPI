import emailValidator from "email-validator";
import User from "../models/User";
import createSecretToken from "../utils/createToken";

export const signUp = async (req, res) => {
  console.log("Sign Up request");
  const { name, email, password, location, username } = req.body;
  if (!name || !email || !password || !location || !username)
    return res.status(400).json({ message: "Please enter all fields" });

  if (!emailValidator.validate(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  try {
    const salt = await bcryptjs.genSalt();
    const passwordHash = await bcryptjs.hash(password, salt);
    const user = await User({
      name,
      email,
      password: passwordHash,
      location,
      username,
    });
    const savedUser = await user.save();
    const userCart = await Cart({ user: savedUser._id });
    const token = createSecretToken(savedUser._id);

    delete savedUser.password;
    res.status(201).json({ token, user: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  console.log("Sign In request");
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Please enter all fields" });

  if (!emailValidator.validate(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = createSecretToken(user._id);

    delete user.password;

    res.status(200).json({ token, user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
