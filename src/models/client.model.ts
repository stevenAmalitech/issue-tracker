import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db/db";

export interface ClientAttributes {
  id: number;
  name: string;
  organization: string;
  email: string;
  password: string;
  lastLogin: Date | null;
  adminId: number;
  projectId: number;
}

interface ClientCreationAttributes
  extends Optional<ClientAttributes, "id" | "lastLogin"> {}

interface ClientInstance
  extends Model<ClientAttributes, ClientCreationAttributes>,
    ClientAttributes {}

const clientModel = sequelize.define<ClientInstance>(
  "client",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    organization: { type: DataTypes.STRING, allowNull: false },
    projectId: { type: DataTypes.INTEGER, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    lastLogin: { type: DataTypes.DATE },
    adminId: { type: DataTypes.INTEGER },
  },
  { underscored: true }
);

export { clientModel };
