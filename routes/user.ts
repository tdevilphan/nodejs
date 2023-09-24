import express, { Router } from "express";

const route: Router = express.Router();

route.get("/", (req, res) => {
  res.send("Get User");
});

route.post("/login", (req, res) => {
  res.send("Post Login");
});

route.post("/register", (req, res) => {
  res.send("Post Register");
});

export default route;
