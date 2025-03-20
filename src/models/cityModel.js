import dbConfig from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";

export class cityModel extends Model { }
cityModel.init({
    id: {
        type: DateTypes.INTERGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    zipcode: {
        type: Datatypes.INTERGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        sequelize: dbConfig,
        modelName: 'cities',
        timestamps: false,
        underscored: true,
    }
);