import express from 'express';
import dbConfig from '../config/dbConfig.js';
import { seedFromCsv } from '../utils/seedUtils.js';
import { userModel, estateModel, cityModel, typeModel, imageModel, estateImageRelModel, staffModel, reviewModel, favouriteModel, energyLabelModel } from '../models/index.js';
 import { errorResponse, successResponse } from '../utils/responseUtils.js';

export const dbController = express.Router();

dbController.get('/sync', async (req, res) => {
    try {
        const resp = await dbConfig.sync({ force: true});
        res.send('Data succesfully synchronized');
    } 
    catch (error) {
        res.send(error);
    }
});

dbController.get('/sync', async (req, res) => {
    try {
        const forceSync = req.query.force === 'true';
        await dbConfig.sync({ force: forceSync});
        successResponse(res, '', `Database sunchonized ${forceSync ? 'with force' : 'without force'}`)
    } catch (error) {
        errorResponse(res, `Synchonized failed!`, error)
    }
});

dbController.get('/seedfromcsv', async (req, res) => {
    try {
        const files_to_seed = [
            { file: 'user.csv', model: userModel },
            { file: 'estate.csv', model: estateModel },
            { file: 'city.csv', model: cityModel },
            { file: 'type.csv', model: typeModel },
            { file: 'image.csv', model: imageModel },
            { file: 'estate_image_rel.csv', model: estateImageRelModel },
            { file: 'staff.csv', model: staffModel },
            { file: 'review.csv', model: reviewModel },
            { file: 'favourite.csv', model: favouriteModel },
            { file: 'energy_label.csv', model: energyLabelModel },
        ]

        const files_seeded = []

        await dbConfig.sync({ force: true});

        for(let item of files_to_seed) {
            files_seeded.push(await seedFromCsv(item.file, item.model))
        }
        successResponse(res,{ 'Files seeded': files_seeded}, `Seeding completed!,`)
    } catch (error) {
        errorResponse(res, `Seeding failed!`, error)       
    }
})