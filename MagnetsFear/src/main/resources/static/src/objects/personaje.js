function Personaje() {
  this.recipeInventory;
  this.forgedInventory;
  this.equipmentInventory;

  this.cajonRecipes;
  this.cajonForged;
  this.cajonEquipment;

  //inventarios
  this.createRecipeInv = function (x_init, y_init, x_paddin, y_paddin, rows, cols, sprite_tam) {
    this.recipeInventory = new Inventario(x_init, y_init, x_paddin, y_paddin, rows, cols, sprite_tam, "inventory", "recipe");
  }
  this.createForgedInv = function (x_init, y_init, x_paddin, y_paddin, rows, cols, sprite_tam) {
    this.forgedInventory = new Inventario(x_init, y_init, x_paddin, y_paddin, rows, cols, sprite_tam, "inventory", "forged");
  }
  this.createEquipmentInv = function (x_init, y_init, x_paddin, y_paddin, rows, cols, sprite_tam) {
    this.equipmentInventory = new Inventario(x_init, y_init, x_paddin, y_paddin, rows, cols, sprite_tam, "inventory", "equipment");
  }

  //cajones
  this.createCajonRecipes = function (x_init, y_init, x_paddin, y_paddin, rows, cols, sprite_tam) {
    this.cajonRecipes = new Inventario(x_init, y_init, x_paddin, y_paddin, rows, cols, sprite_tam, "baul", "recipe");
  }
  this.createCajonForged = function (x_init, y_init, x_paddin, y_paddin, rows, cols, sprite_tam) {
    this.cajonForged = new Inventario(x_init, y_init, x_paddin, y_paddin, rows, cols, sprite_tam, "baul", "forged");
  }
  this.createCajonEquipment = function (x_init, y_init, x_paddin, y_paddin, rows, cols, sprite_tam) {
    this.cajonEquipment = new Inventario(x_init, y_init, x_paddin, y_paddin, rows, cols, sprite_tam, "baul", "equipment");
  }

  //Añadir a  recipes
  this.addToRecipesInv = function (x, y, itemName) {
    return this.recipeInventory.addItem(x, y, itemName, "inventory", "recipe");
  }
  this.addToForgedInv = function (x, y, itemName) {
    return this.forgedInventory.addItem(x, y, itemName, "inventory", "forged");
  }

  this.addToEquipmentInv = function (x, y, itemName) {
    return this.equipmentInventory.addItem(x, y, itemName, "inventory", "equipment");
  }

  //Añadir a Cajones
  this.addToCajonRecipes = function (x, y, itemName) {
    return this.cajonRecipes.addItem(x, y, itemName, "baul", "recipe");
  }
  this.addToCajonForged = function (x, y, itemName) {
    return this.cajonForged.addItem(x, y, itemName, "baul", "forged");
  }
  this.addToCajonEquipment = function (x, y, itemName) {
    return this.cajonEquipment.addItem(x, y, itemName, "baul", "equipment");
  }

  this.swapIfNeeded= function(x, y, sprite_name, storedIn, typeOf)
  {
    var source;
    var target;
    switch (typeOf) {
      case "recipe":
        if (storedIn === "inventory") {
          source = this.recipeInventory;
          target = this.cajonRecipes;
        }
        else {
          source = this.cajonRecipes;
          target = this.recipeInventory;
        }
        break;

      case "forged":
        if (storedIn === "inventory") {
          source = this.forgedInventory;
          target = this.cajonForged;
        }
        else {
          source = this.cajonForged;
          target = this.forgedInventory;
        }
        break;

      case "equipment":
        if (storedIn === "inventory") {
          source = this.equipmentInventory;
          target = this.cajonEquipment;
        }
        else {
          source = this.cajonEquipment;
          target = this.equipmentInventory;
        }
        break;
    }

    var needToSwap = false;
    var tgX;
    var tgY;
    for (i = 0; i < target.rows; i++) {
      for (j = 0; j < target.cols; j++) {
        if (game.physics.arcade.collide(source.icons[x][y].sprite, target.icons[i][j].background))
         {
          needToSwap = true;
          tgX = i;
          tgY = j;
          break;
        }
      }
      if (needToSwap === true) break;
    }

    if(needToSwap===true)
    {
      source.iconNamesArray[x][y] = target.iconNamesArray[tgX][tgY];
      target.iconNamesArray[tgX][tgY] = sprite_name;
  

    //borro todos los iconos
    target.clearIcons();
    source.clearIcons();
    //enseño todos los arrays
      target.Show();
      source.Show();
      game.world.bringToTop(iconsGroup);
    }
    return needToSwap;
  }



}

