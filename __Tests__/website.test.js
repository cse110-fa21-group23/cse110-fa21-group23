const getRecipeCardInfo = require("../source/scripts/helper");

const data = [
  {
    "id": 1,
    "title": 'hello world',
    "image": "google.com",
    "diets": "vegetarian",
    "bad_key": "bad",
    "extra": "key",
  },
  {
    "id": 2,
    "title": 'hello globe',
    "image": "yahoo.com",
    "diets": "vegetarian",
    "bad_key": "bad",
    "extra": "key",
  },
  {
    "id": 3,
    "title": 'hello, friend',
    "image": "google.com",
    "diets": "vegan",
    "bad_key": "bad",
    "extra": "key",
  }
];

const dataMissingKey = [
  {
    "id": 1,
    "title": 'hello world',
    "image": "google.com",
    "diets": "vegetarian",
    "bad_key": "bad",
    "extra": "key",
  },
  {
    "id": 2,
    "title": 'hello globe',
    "image": "yahoo.com",
  },
];

const expectData = [
  {
    "id": 1,
    "title": 'hello world',
    "image": "google.com",
    "diets": "vegetarian",
  },
  {
    "id": 2,
    "title": 'hello globe',
    "image": "yahoo.com",
    "diets": "vegetarian",
  },
  {
    "id": 3,
    "title": 'hello, friend',
    "image": "google.com",
    "diets": "vegan",
  }
];

test("Checking the getRecipeCardInfo() function properly cleans up the data", async () => {
  const checkData = getRecipeCardInfo(data);
  expect(checkData).toEqual(expectData);
});

test("Checking the getRecipeCardInfo() function properly works with missing keys", async () => {
  const checkData = getRecipeCardInfo(dataMissingKey);
  const dataMissingKeyFilter = [
    {
      "id": 1,
      "title": 'hello world',
      "image": "google.com",
      "diets": "vegetarian",
    },
    {
      "id": 2,
      "title": 'hello globe',
      "image": "yahoo.com",
      "diets": undefined,
    },
  ];

  expect(checkData).toEqual(dataMissingKeyFilter);
});