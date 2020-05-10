const path = require("path");
const fs = require('fs');
const request = require("../request");
const save = require("../save");
const apiUrl = require("../helpers/api-url");
const localPath = require("../helpers/local-path");
const process = require("./process");
const download = require("./download-images");
const cards = require("./import");

jest.mock("../request");
jest.mock("../save");
jest.mock("./process");
jest.mock("./download-images");
jest.mock("../helpers/api-url");
jest.mock("../helpers/local-path");

const mockUrl = 'https://foo.co.uk/bar';
const mockPath = './test/foo/bar/file.json';

const mockData = {
  foo: "bar",
};

const mockProcessedData = {
  bar: "foo",
};

describe("main", () => {
  beforeEach(() => {
    request.mockClear();
    save.mockClear();
    process.mockClear();
    apiUrl.mockClear();
    localPath.mockClear();
    download.mockClear();

    apiUrl.mockImplementation(() => Promise.resolve(mockUrl));
    request.mockImplementation(() => Promise.resolve(mockData));
    localPath.mockImplementation(() => mockPath);
    process.mockImplementation(() => mockProcessedData);
    save.mockImplementation(() => Promise.resolve());
  });

  it("calls NRDB cards endpoint", async () => {
    await cards();

    expect(apiUrl).toHaveBeenCalledWith('/cards');
  });

  it("calls NRDB cards endpoint", async () => {
    await cards();

    expect(request).toHaveBeenCalledWith(mockUrl);
  });

  it("applies the card processor", async () => {
    await cards();

    expect(process).toHaveBeenCalledWith(mockData);
  });

  it("applies the card processor", async () => {
    await cards();

    expect(localPath).toHaveBeenCalledWith('cards.json');
  });

  it("saves the processed data", async () => {
    await cards();

    expect(save).toHaveBeenCalledWith(
      mockProcessedData,
      mockPath
    );
  });

  it("downloads the images", async () => {
    const path = fs.realpathSync(`${__dirname}/../../../client/public/img/cards`);

    await cards();

    expect(download).toHaveBeenCalledWith(path, mockProcessedData);
  });
});
