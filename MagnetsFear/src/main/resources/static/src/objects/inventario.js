
function Inventario(x_init, y_init, x_paddin, y_paddin, rows, cols, sprite_tam, storedIn, typeOf) {
    this.storedIn = storedIn;
    this.typeOf = typeOf;
    this.rows = rows;
    this.cols = cols;
    this.x_init = x_init;
    this.y_init = y_init;
    this.x_paddin = x_paddin;
    this.y_paddin = y_paddin;

    this.icons = [];
    this.iconNamesArray = [];

    for (i = 0; i < rows; i++) {
        this.icons[i] = [];
        this.iconNamesArray[i] = [];
    }


    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            this.iconNamesArray[i][j] = undefined;
        }
    }


    this.nextPos = [0, 0];
    this.addItem = function (x, y, itemName) {
        //si esta dentro de la matrix
        if (x < this.rows && y < this.cols) {
            if (this.icons[x][y] == undefined) {
                this.iconNamesArray[x][y] = itemName;
                return true;
            }
            else return false;
        }
        else return false;

    }

    this.Show = function () {
        var x = this.x_init;
        var y = this.y_init;
        for (i = 0; i < this.rows; i++) {
            for (j = 0; j < this.cols; j++) {
                var name = this.iconNamesArray[i][j];
                this.icons[i][j] = new Icon(x, y, i, j, name, this.storedIn, this.typeOf);
                x += x_paddin + sprite_tam;
            }
            y += this.y_paddin + sprite_tam;
            x = this.x_init;
        }
    }

    this.clean = function () {
        for (i = 0; i < rows; i++) {
            for (j = 0; j < cols; j++) {
                this.icons[i][j].clean();
            }
        }

    }

    this.clearIcons = function () {
        for (i = 0; i < this.rows; i++)
            for (j = 0; j < this.cols; j++) {
                this.icons[i][j].clear();


            }
    }
}
