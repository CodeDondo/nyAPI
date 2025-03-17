import dbConfig from '../config/dbConfig.js';
import { DataTypes, Model } from "sequelize";

export class typeModel extends Model { }

typeModel.jnit({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: dbConfig,
    modelName: "estate_type",
    timestamps: false,
    underscored: true,
}
)