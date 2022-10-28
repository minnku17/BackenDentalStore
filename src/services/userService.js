import db from "../models/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let handleRegisterUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      ///Hash password
      const salt = await bcrypt.genSalt(10);
      const hased = await bcrypt.hash(data.password, salt);

      let checkMail = await checkUserEmail(data.email);

      if (checkMail === true) {
        resolve({
          errCode: 1,
          errMessage: "Email already exists",
        });
      } else {
        await db.User.create({
          email: data.email,
          password: hased,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          positionId: data.positionId,
          gender: data.gender,
          roleId: data.roleId,
        });

        resolve({
          errCode: 0,
          errMessage: "Create user successfully!",
        });
      }
      //Create new user
    } catch (e) {
      reject(e);
    }
  });
};

//GENERATE ACCESS TOKEN
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      roleId: user.roleId,
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: "20s",
    }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      roleId: user.roleId,
    },
    process.env.JWT_REFRESH_KEY,
    {
      expiresIn: "365d",
    }
  );
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExits = await checkUserEmail(email);
      if (isExits) {
        //user is already exits
        let user = await db.User.findOne({
          attributes: ["id", "email", "password", "roleId", "rememberToken"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            await db.User.update(
              {
                rememberToken: refreshToken,
              },
              {
                where: { id: user.id },
              }
            );

            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password;
            userData.user = user;
            userData.accessToken = accessToken;
            userData.refreshToken = refreshToken;
            delete user.rememberToken;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          (userData.errCode = 2), (userData.errMessage = "User is not found! ");
        }
      } else {
        //return error
        (userData.errCode = 1),
          (userData.errMessage =
            "Your's Email isn't exits in your system. Plz try other email! ");
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
let handleRefreshToken = (refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { rememberToken: refreshToken },
      });

      console.log(user);
      if (!user) {
        resolve({
          errCode: -1,
          errMessage: "Refresh token is not valid",
        });
      }
      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_KEY,
        async (err, userToken) => {
          if (err) {
            console.log(err);
          }
          const newAccessToken = generateAccessToken(userToken);
          const newFreshToken = generateRefreshToken(userToken);

          await db.User.update(
            {
              rememberToken: newFreshToken,
            },
            {
              where: { id: user.id },
            }
          );

          resolve({
            accessToken: newAccessToken,
            refreshToken: newFreshToken,
          });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};
let checkUserEmail = (emailUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: emailUser },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleGetAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      if (user) {
        resolve({
          errCode: 0,
          data: user,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Cannot find user",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleDeleteUser = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: inputId },
      });
      if (user) {
        // await db.User.destroy({
        //   where: { id: inputId },
        // });
        resolve({
          errCode: 0,
          errMessage: "Deleted user!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Cannot find user on system",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleLogout = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.update(
        {
          rememberToken: null,
        },
        {
          where: { id: id },
        }
      );

      resolve({
        errCode: 0,
        errMessage: "Logged out!!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin,
  checkUserEmail,
  handleRegisterUser,
  handleGetAllUsers,
  handleDeleteUser,
  generateAccessToken,
  generateRefreshToken,
  handleRefreshToken,
  handleLogout,
};
