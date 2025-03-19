import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import dbConfig from '../config/dbConfig.js';

/**
 * 
 * @param {String} fileName
 * @returns {Promise<Array>} A Promise that resolves with the parsed CSV data
 */

const getCsvData = async fileName => {
    const csvPath = path.resolve(`./data/${fileName}`);
    const data = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (row) => data.push(row))
            .on('end', () => resolve(data))
            .on('error', (error) => reject(error));
    });
};

/**
 * 
 * @param {string} fileName
 * @param {Object} model
 */

const seedFromCsv = async (fileName, model) => {
    const transaction = await dbConfig.transaction();

    try {
        const data = await getCsvData(fileName);
        await model.bulkCreate(data, { transaction });
        await transaction.commit();
        console.log(`Seeding completed for $(fileName)`);
        return fileName;
    } catch (error) {
        await transaction.rollback();
        console.error('Seeding error:', error);
        return false;
    }
};

export { getCsvData, seedFromCsv };