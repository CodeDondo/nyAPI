import dbConfig from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";

export class imageModel extends Model { }

imageModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},
    {
        sequelize: dbConfig,
        modelName: "image",
        timestamps: true,
        underscored: true,
    }
);