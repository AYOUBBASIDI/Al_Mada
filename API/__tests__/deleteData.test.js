const { deleteData } = require('../controllers/controllers');

describe('deleteData', () => {
    it('should delete all data from the test collection', async () => {
        const result = await deleteData();
        expect(result).toEqual('Data deleted');
      });
});