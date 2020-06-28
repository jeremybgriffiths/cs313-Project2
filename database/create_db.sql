DROP TABLE IF EXISTS RecipeIngredient;
DROP TABLE IF EXISTS Ingredient;
DROP TABLE IF EXISTS Recipe;
DROP TABLE IF EXISTS UserAccount;

CREATE TABLE UserAccount
(
	userId SERIAL PRIMARY KEY NOT NULL,
	userName VARCHAR(100) NOT NULL,
	userPassword VARCHAR(100) NOT NULL
);

CREATE TABLE Recipe
(
  recipeId SERIAL PRIMARY KEY NOT NULL,
  recipeName VARCHAR UNIQUE,
  userId INT REFERENCES UserAccount(userId)
);

CREATE TABLE Ingredient
(
  ingredientId SERIAL PRIMARY KEY NOT NULL,
  ingredientName VARCHAR UNIQUE
);

CREATE TABLE RecipeIngredient
(
  recipeId INT REFERENCES Recipe(recipeId) NOT NULL,
  ingredientId INT REFERENCES Ingredient(ingredientId) NOT NULL,
  quantity REAL NOT NULL,
  unit VARCHAR NOT NULL
);

INSERT INTO UserAccount(userName, userPassword) VALUES
  ('user1', 'user1');