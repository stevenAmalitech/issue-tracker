import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db/db";
import { adminModel } from "./admin.model";
import { clientModel } from "./client.model";

export interface Screenshot {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

interface IssueAttributes {
  title: string;
  description: string;
  screenshot: Screenshot | null;
  adminId: number;
  clientId: number;
}

interface IssueCreationAttributes
  extends Optional<IssueAttributes, "screenshot"> {}

interface IssueInstance
  extends Model<IssueAttributes, IssueCreationAttributes>,
    IssueAttributes {}

const issueModel = sequelize.define<IssueInstance>(
  "issue",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    screenshot: { type: DataTypes.JSON, allowNull: true },
    adminId: { type: DataTypes.INTEGER, allowNull: false },
    clientId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { underscored: true }
);

// TODO: ENFORCE FOREIGN KEYS

// adminModel.hasMany(issueModel);
// issueModel.belongsTo(adminModel);

// clientModel.hasMany(issueModel);
// issueModel.belongsTo(clientModel);

export { issueModel };
