import { ObjectId } from "mongodb";

export default interface PlayerModel {
  _id: ObjectId;
  username: string;
}
