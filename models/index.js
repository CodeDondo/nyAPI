import { userModel } from "./userModel.js";
import { cityModel } from "./cityModel.js";
import { estateModel } from "./estateModel.js";
import { typeModel } from "./typeModel.js";
import { imageModel } from "./imageModel.js";
import { estateImageRelModel } from "./estateImageRelModel.js";
import { energyLabelModel } from "./energyLabelModel.js";
import { reviewModel } from "./reviewModel.js";
import { staffModel } from "./staffModel.js";
import { favouriteModel } from "./favouriteModel.js";

estateModel.belongsTo(cityModel, {
    foreignKey: 'city_id'
})

cityModel.hastMany(estateModel, {
    foreignKey: 'city_id'
})

estateModel.belongsTo(energyLabelModel, {
    foreignKey: 'energy_label_id'
})

energyLabelModel.hasMany(estateModel, {
    foreignKey: 'energy_label_id'
})

estateModel.belongsTo(typeModel, {
    foreignKey: 'type_id'
})

typeModel.hasMany(estateModel, {
    foreignKey: 'type_id'
})

reviewModel.beliongsTo(estateModel, {
    foreignKey: 'estate_id'
})

estateModel.hasMany(reviewModel, {
    foreignKey: 'estate_id'
})

reviewModel.belongsTo(userModel, {
    foreignKey: 'user_id'
})

userModel.hasMany(reviewModel, {
    foreignKey: 'user_id'
})

estateModel.belongsToMany(favouriteModel, {
    through: favouriteModel,
    foreignKey: 'estate_id'
})

userModel.belongsToMany(favouriteModel, {
    through: favouriteModel,
    foreignKey: 'user_id'
})

estateModel.belongsToMany(imageModel, {
    through: estateImageRelModel,
    as: 'images'
})

export {
    userModel,
    energyLabelModel,
    estateModel,
    typeModel,
    imageModel,
    estateImageRelModel,
    reviewModel,
    staffModel,
    favouriteModel,
    cityModel
}