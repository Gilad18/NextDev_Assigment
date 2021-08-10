const Users = require("../model/user.model");

const createNewUser = async (req, res) => {
  const { userName, email, firstName, lastName, city, country, postalCode } =
    req.body;
  const newUser = new Users({
    userName,
    email,
    firstName,
    lastName,
    city,
    country,
    postalCode,
  });

  try {
    await newUser.generateToken();
    await newUser.save();
    res
      .status(200)
      .json({ success: "New User was Succesfully created", newUser });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  const { userName, email } = req.body;
  try {
    const user = await Users.findOne({ userName: userName, email: email });
    if (!user) {
      throw new Error("Unable to login");
    }
    await user.generateToken();
    res.status(200).json({ success: "You are now logged in", user });
  } catch (err) {
    res.status(400).send(err.message);
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
    res.status(500).send(err);
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
      .json({ succes: "User details was succesfuly updated", updatedUser });
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
