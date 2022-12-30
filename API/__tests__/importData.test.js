const { importData } = require('../controllers/controllers');

describe('importData', () => {
    it('should import data from a CSV file', async () => {
        const result = await importData();
        expect(result).toEqual('Data imported');
      });
});