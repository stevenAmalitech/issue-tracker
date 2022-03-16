import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db/db";

interface SessionsAttributes {
  id: number;
  sessionId: string;
  accessToken: string;
  scope: string;
  expiresIn: number;
}

interface SessionCreationAttributes
  extends Optional<SessionsAttributes, "id"> {}

interface SessionInstance
  extends Model<SessionsAttributes, SessionCreationAttributes>,
    SessionsAttributes {}

const sessionModel = sequelize.define<SessionInstance>(
  "Session",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    sessionId: { type: DataTypes.STRING, allowNull: false },
    accessToken: { type: DataTypes.TEXT, allowNull: false },
    scope: { type: DataTypes.STRING, allowNull: false },
    expiresIn: { type: DataTypes.INTEGER, allowNull: false },
  },
  { underscored: true }
);

export { sessionModel };
