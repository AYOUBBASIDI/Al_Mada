test('the importData function should throw an error if the CSV file is not found', () => {
    expect(() => {
      importData('invalid.csv');
    }).toThrow();
  });