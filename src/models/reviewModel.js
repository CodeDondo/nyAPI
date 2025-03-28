import dbConfig from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";
import { estateModel } from "./estateModel.js";
import { userModel } from "./userModel.js";

export class reviewModel extends Model { }

reviewModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    num_stars: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: estateModel,
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel,
            key: 'id'
        }
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize: dbConfig,
    modelName: "review",
    timestamps: true,
    underscored: true,
}
)