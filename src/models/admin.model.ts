import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db/db";

interface AdminAttributes {
  id: number;
  email: string;
  clients: [number];
}

interface AdminCreationAttributes extends Optional<AdminAttributes, "id" | "clients"> {}

interface AdminInstance
  extends Model<AdminAttributes, AdminCreationAttributes>,
    AdminAttributes {}

const adminModel = sequelize.define<AdminInstance>(
  "Admin",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    clients: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  },
  { underscored: true }
);

export { adminModel };
