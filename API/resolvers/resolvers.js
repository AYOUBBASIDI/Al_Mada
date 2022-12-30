const { importData, deleteData, getData } = require('../controllers/controllers');

const root = {
    importData:importData,
    deleteData: deleteData,
    documents: getData
};

module.exports = root;