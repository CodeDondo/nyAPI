import dbConfig from "../config/dbConfig";
import { DataTypes, Model } from "sequelize";
import { userModel } from "./userModel.js";

export class exampleModel extends Model { }

exampleModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    string_field: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Default String',
        validate: {
            len: { args: [1, 100], msg: "String must be between 5 and 100 characters" },
        }
    },
    text_field: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date_field: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: { msg: "Must be a valid date" }
        }
    },
    boolean_field: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    integer_field: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: "Must be integer" },
            min: { args: [0], msg: "Must be at least 0" },
            max: { args: [1000], msg: "Must be at most 1000" }
        }
    },
    float_field: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: { msg: "Must be a float" }
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
},
    {
        sequelize: dbConfig,
        modelName: "example",
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        indexes: [
            { unique: true, fields: ['string_field'] }
        ]
    }
)