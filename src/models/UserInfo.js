import {model, models, Schema} from "mongoose";

const UserInfoSchema = new Schema({
  username: {type: String},
  email: {type: String, required: true},
  phone: {type: String},
  streetAddress: {type: String},
  postalCode: {type: String},
  city: {type: String},
  country: {type: String},
  admin: {type: Boolean, default: false},
}, {timestamps: true});

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);