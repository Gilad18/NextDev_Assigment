const Users = require("../model/user.model");

const createNewUser = async (req, res) => {
  const {
    userName,
    email,
    firstName,
    lastName,
    city,
    country,
    postalCode,
    password,
    passwordConfirm,
  } = req.body;

  if (password !== passwordConfirm) throw new Error("pasword are not matched");

  if (await isUserExist(userName)) {
    return res.status(400).send("user name already exist");
  }

  const newUser = new Users({
    userName,
    email,
    firstName,
    lastName,
    city,
    country,
    postalCode,
    password,
  });

  try {
    const token = await newUser.generateToken();
    await newUser.save();
    res
      .status(200)
      .json({ success: "New User was Succesfully created", newUser, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const isUserExist = async (userName) => {
  const exist = await Users.find({ userName });
  return exist.length > 0 ? true : false;
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await Users.findByCredentials(userName, password);
    const token = await user.generateToken();
    res.status(200).json({ success: "You are now logged in", user, token });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res
      .status(200)
      .json({ success: "You are now logged out, we hope to see you soon" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const update = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowupdates = [
    "userName",
    "email",
    "firstName",
    "lastName",
    "city",
    "country",
    "postalCode",
  ];
  const isValidProps = updates.every((item) => allowupdates.includes(item));
  if (!isValidProps) {
    return res.status(406).send({ error: " Invalid Updates" });
  }
  try {
    const updatedUser = await Users.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    updatedUser.save();
    res
      .status(200)
      .json({ succes: "Yours details were succesfuly updated", updatedUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createNewUser,
  login,
  logout,
  update,
};
