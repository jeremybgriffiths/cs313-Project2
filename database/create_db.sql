DROP TABLE IF EXISTS RecipeIngredient;
DROP TABLE IF EXISTS Ingredient;
DROP TABLE IF EXISTS Recipe;
DROP TABLE IF EXISTS UserAccount;

CREATE TABLE UserAccount
(
	userId SERIAL PRIMARY KEY NOT NULL,
	userName VARCHAR(100) UNIQUE NOT NULL,
	userPassword VARCHAR(100) NOT NULL
);

CREATE TABLE Recipe
(
  recipeId SERIAL PRIMARY KEY NOT NULL,
  recipeName VARCHAR(256) NOT NULL,
  userId INT REFERENCES UserAccount(userId)
);

CREATE TABLE Ingredient
(
  ingredientId SERIAL PRIMARY KEY NOT NULL,
  ingredientName VARCHAR(128) NOT NULL
);

CREATE TABLE RecipeIngredient
(
  recipeId INT REFERENCES Recipe(recipeId) NOT NULL,
  ingredientId INT REFERENCES Ingredient(ingredientId) NOT NULL
);

INSERT INTO UserAccount(userName, userPassword) VALUES
  ('user1', 'user1');

INSERT INTO Recipe(recipeName, userId) VALUES
  ('Crispy Peach Cobbler', 1);

INSERT INTO Ingredient(ingredientName) VALUES
  ('4 1/2 pounds peaches, unpeeled, cut into 1-inch chunks or slices'),
  ('Zest and juice of 1 lemon'),
  ('4 ounces unsalted butter, softened'),
  ('2 cups granulated sugar'),
  ('1 1/2 cups all-purpose flour'),
  ('2 teaspoons baking powder'),
  ('1 teaspoon coarse or kosher salt'),
  ('3/4 cup milk'),
  ('1/2 cup hot water'),
  ('Heavy cream, cold, for drizzling');

INSERT INTO RecipeIngredient VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (1, 7),
  (1, 8),
  (1, 9),
  (1, 10);