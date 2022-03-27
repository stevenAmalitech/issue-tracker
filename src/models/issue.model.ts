import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../db/db";
import { JiraIssueDetails } from "../typings/jira.types";
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

export interface IssueAttributes {
  title: string;
  description: string;
  screenshot: Screenshot | null;
  adminId: number;
  clientId: number;
  jiraDetails: JiraIssueDetails;
  id: number;
}

interface IssueCreationAttributes
  extends Optional<IssueAttributes, "screenshot" | "id" | "jiraDetails"> {}

interface IssueInstance
  extends Model<IssueAttributes, IssueCreationAttributes>,
    IssueAttributes {}

const issueModel = sequelize.define<IssueInstance>(
  "issue",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    screenshot: { type: DataTypes.JSON, allowNull: true },
    adminId: { type: DataTypes.INTEGER, allowNull: false },
    clientId: { type: DataTypes.INTEGER, allowNull: false },
    jiraDetails: { type: DataTypes.JSON, allowNull: true },
  },
  { underscored: true }
);

clientModel.hasMany(issueModel);
adminModel.hasMany(issueModel);

issueModel.belongsTo(adminModel);
issueModel.belongsTo(clientModel);

export { issueModel };
