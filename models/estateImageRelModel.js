import dbConfig from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";
import { erstateModel, imageModel } from "./index.js";

export class estateImageRelModel extends Model { }

erstateImageRelModel.init({
    id: {
        type: DateTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    estate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: estateImageRelModel,
            key: 'id'
        }
    },
    image_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: imageModel,
            key: 'id'
        }
    },
    is_main: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
    {
        sequelize: dbConfig,
        modelName: "estate_image_rel",
        timestamps: true,
        freezeTableName: true,
        underscored: true,
    }
);