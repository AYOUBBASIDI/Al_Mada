const { getData } = require('../controllers/controllers');
const connectToDb = require('../config/db');

describe('getData', () => {
  it('should return an array of documents', async () => {
    // Mock the connectToDb function to return a fake database object
    const mockDb = {
      collection: () => ({
        find: () => ({
          toArray: cb => cb(null, [{}, {}]),
        }),
      }),
    };
    jest.spyOn(connectToDb, 'connectToDb').mockImplementation(() => mockDb);

    // Call the getData function and assert that it returns an array of documents
    const result = await getData();
    expect(result).toEqual([{}, {}]);
  });
});