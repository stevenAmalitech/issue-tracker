import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db/db";
import { hashPassword } from "../utils/hashPasswords";

interface ClientAttributes {
  id: number;
  name: string;
  organization: string;
  email: string;
  password: string;
  lastLogin: Date | null;
  adminId: number;
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
    name: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    organization: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    lastLogin: { type: DataTypes.DATE },
    adminId: { type: DataTypes.INTEGER },
  },
  { underscored: true }
);

export { clientModel };
