const mongoose = require("../../common/services/mongoose.service").mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number,
});

userSchema.virtual("id").get(() => {
  return this._id.toHexString();
});

//ensure virtual fields are saserialized
userSchema.set("toJSON", {
  virtuals: true,
});

userSchema.findById = (cb) => {
  return this.model("Users").find(
    {
      id: this.id,
    },
    cb
  );
};

const User = mongoose.model("Users", userSchema);

//find user by email
exports.findByEmail = (email) => {
  return User.find({
    email: email,
  });
};

//find user by Id
exports.findById = (id) => {
  return User.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};

//create user
exports.createUser = (userData) => {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec((err, users) => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });
};

//update user
exports.patchUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, user) => {
      if (err) reject(err);
      for (let i in userData) {
        user[i] = userData[i];
        resolve(updateUser);
      }
    });
  });
};

// remove user
exports.removeById = (userId) => {
  return new Promise((resolve, reject) => {
    User.remove(
      {
        _id: userId,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(err);
        }
      }
    );
  });
};
