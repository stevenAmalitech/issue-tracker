import {
  Model,
  DataTypes,
  Optional,
} from "sequelize";
import { sequelize } from "../db/db";
import { hashPassword } from "../utils/hashPasswords";

interface ClientAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  adminId: number;
}

interface ClientCreationAttributes
  extends Optional<ClientAttributes, "id" | "firstName" | "lastName"> {}

interface ClientInstance
  extends Model<ClientAttributes, ClientCreationAttributes>,
    ClientAttributes {}

const clientModel = sequelize.define<ClientInstance>(
  "client",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    lastName: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    adminId: { type: DataTypes.INTEGER },
  },
  { underscored: true }
);

clientModel.addHook("beforeCreate", async (client, options) => {
  // @ts-expect-error
  client.password = await hashPassword(client.password);
});

export { clientModel };
