import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db/db";
import { clientModel } from "./client.model";

interface AdminAttributes {
  id: number;
  email: string;
}

interface AdminCreationAttributes extends Optional<AdminAttributes, "id"> {}

export interface AdminInstance
  extends Model<AdminAttributes, AdminCreationAttributes>,
    AdminAttributes {}

const adminModel = sequelize.define<AdminInstance>(
  "admin",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { underscored: true }
);

adminModel.hasMany(clientModel);
clientModel.belongsTo(adminModel);

export { adminModel };
