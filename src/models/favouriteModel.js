import dbConfig from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";
import { estateModel, imageModel, userModel } from "./index.js";

export class favouriteModel extends Model { }

favouriteModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
            key: ' id'
        }
    }
}, {
    sequelize: dbConfig,
    modelName: "favourite",
    timestamps: true,
    underscored: true,
}
);