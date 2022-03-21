import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db/db";

interface JiraTokenAtrributes {
  id: number;
  sessionId: string;
  accessToken: string;
  scope: string;
  expiresIn: number;
  cloudId: string;
}

interface JiraTokenCreationAttributes
  extends Optional<JiraTokenAtrributes, "id"> {}

interface JiraTokenInstance
  extends Model<JiraTokenAtrributes, JiraTokenCreationAttributes>,
    JiraTokenAtrributes {}

const jiraTokenModel = sequelize.define<JiraTokenInstance>(
  "jiraToken",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    sessionId: { type: DataTypes.STRING, allowNull: false },
    accessToken: { type: DataTypes.TEXT, allowNull: false },
    scope: { type: DataTypes.TEXT, allowNull: false },
    expiresIn: { type: DataTypes.INTEGER, allowNull: false },
    cloudId: { type: DataTypes.STRING, allowNull: false },
  },
  { underscored: true }
);

export { jiraTokenModel };
