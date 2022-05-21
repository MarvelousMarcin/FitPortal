const express = require("express");
const Friends = require("../Models/friends");
const User = require("../Models/user");

const { reDirToMain } = require("../Routes/auth");

const friendRoute = express.Router();

friendRoute.post("/addfriend", reDirToMain, async (req, res) => {
  const mainUser = req.user.login;
  const userToAdd = req.body.login;

  //Adding yourself

  if (mainUser === userToAdd) {
    return res.status(403).send({ error: "You can't add yourself" });
  }

  // Adding exisitign user

  const user = await User.findOne({ login: userToAdd });
  if (!user) {
    return res.status(403).send({ error: "User doesn't exist" });
  }

  // Check if users are not already friends
  let friends = await Friends.findOne({ user1: mainUser, user2: userToAdd });
  if (!friends) {
    friends = await Friends.findOne({ user1: userToAdd, user2: mainUser });
  }

  if (friends) {
    return res.status(403).send({ error: "You are already friends!" });
  }

  // Add friends
  try {
    const friends = new Friends({ user1: mainUser, user2: userToAdd });
    await friends.save();
    res.send({ message: "Friend added" });
  } catch (error) {
    res.status(403).send({ error: "Problem with adding!" });
  }
});

friendRoute.get("/friendlist", reDirToMain, async (req, res) => {
  const userLogin = req.user.login;

  const getFriendsList = await Friends.find({ user1: userLogin });
  const friendLogins = getFriendsList.map((obj) => obj.user2);

  const usAsFriends = await Friends.find({ user2: userLogin });
  const usAsFriendsLogins = usAsFriends.map((obj) => obj.user1);

  usAsFriendsLogins.forEach((login) => {
    if (!friendLogins.includes(login)) friendLogins.push(login);
  });

  res.send(friendLogins);
});

module.exports = friendRoute;
