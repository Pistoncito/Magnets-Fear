function Interfaz(jugador){
    var oscuridad;
    var oscuridad_antorcha;
    var healthBar;
    var barConfig;
    var anteriorVida;
    var barExp, barMana;
    var barForj, barRec;
    var mochila;
    var bufos = new Array();
    var texto_estadisticas = new Array();
    var estadisticas = new Array();

    this.create = function(){
        grupo = game.add.group();

        ////////////CAMPO DE VISION///////////////
        //Sin antorcha
        oscuridad = game.add.sprite(0, 0, 'oscuridad');
        oscuridad.anchor.setTo(0.5);
        grupo.add(oscuridad);
        //Con antorcha
        /*oscuridad = game.add.sprite(0, 0, 'oscuridad_antorcha');
        oscuridad.animations.add('anim', [0,1,2,3]);
        oscuridad.animations.play('anim', 6, true);
        oscuridad.anchor.setTo(0.5);
        grupo.add(oscuridad);*/
        //////////FIN CAMPO DE VISION/////////////

        ////// MOCHILA //////
        mochila = game.add.sprite(0, 0, 'mochila');
        mochila.scale.setTo(0.25,0.25);
        grupo.add(mochila);
        mochila.fixedToCamera = true;
        mochila.cameraOffset.setTo(5, 5);

        ////// FIN MOCHILA //////

        ////// BARRA DE VIDA //////
        barConfig = {width: 200, height: 20, x: game.camera.x + 220, y: game.camera.y + 20,
                     bg: {color: 'red'}, bar: {color: 'green'}};
        healthBar = new HealthBar(game, barConfig);
        healthBar.setToGroup(grupo);
        healthBar.setFixedToCamera(true);
        anteriorVida = 100;
        ////// FIN BARRA DE VIDA //////

        ////// BARRA DE EXP + MANA ////// --> En esta versión, deshabilitadas
        barExp = game.add.sprite(game.camera.x + 120, game.camera.y + 34, 'exp');
        barMana = game.add.sprite(game.camera.x + 120, game.camera.y + 56, 'exp');
        grupo.add(barExp);
        grupo.add(barMana);
        barExp.fixedToCamera = true;
        barMana.fixedToCamera = true;
        ////// FIN BARRA DE EXP + MANA //////

        ////// BUFOS //////
        bufos[0] = game.add.sprite(game.camera.x + 120, game.camera.y + 78, 'bufo');
        bufos[1] = game.add.sprite(game.camera.x + 160, game.camera.y + 78, 'bufo');
        bufos[2] = game.add.sprite(game.camera.x + 200, game.camera.y + 78, 'bufo');
        for(var i = 0; i < 3; i++){
            grupo.add(bufos[i]);
            bufos[i].fixedToCamera = true;
        }
        ////// FIN BUFOS //////

        ////// BARRA DE RECETAS //////
        barRec = game.add.sprite(game.camera.x + 210, game.camera.y + game.camera.height - 74, 'inventarioBg');
        barRec.anchor.x = 0.5; barRec.anchor.y = 0.5;
        barRec.scale.setTo(1.15, 1.15);
        barRec.alpha = 0.6;
        grupo.add(barRec);
        barRec.fixedToCamera = true;

        invRec = new Inventario(barRec.x - 125, barRec.y, 10, 10, 1, 5, 52);
        
        var rec;
        invRec.Show();
        for(var i = 0; i < invRec.cols; i++){
            rec = personaje.recipeInventory.iconNamesArray[0][i];
            if(rec === "torch-recipe"){
                //Variable "recipe" es global en dungeon.js
                var x = invRec.icons[0][i].background.x;
                var y = invRec.icons[0][i].background.y;
                recipe = new Recipe(x, y, rec);
            }
            grupo.add(invRec.icons[0][i].background);
            invRec.icons[0][i].background.fixedToCamera = true;
        }
        if(recipe != undefined){
            grupo.add(recipe.sprite);
            recipe.sprite.fixedToCamera = true;
        }
        ////// FIN BARRA DE RECETAS //////

        ////// BARRA DE FORJADOS //////
        barForj = game.add.sprite(game.camera.width + game.camera.x - 74, game.camera.y + 270, 'inventarioBg');
        barForj.anchor.x = 0.5; barForj.anchor.y = 0.5;
        barForj.scale.setTo(1.1, 1.1);
        barForj.angle = 90;
        barForj.alpha = 0.6;
        grupo.add(barForj);
        barForj.fixedToCamera = true;

        invForj = new Inventario(barForj.x, barForj.y - 125, 10, 10, 5, 1, 52);
        
        var forj;
        invForj.Show();
        for(var i = 0; i < invForj.rows; i++){
            if(personaje.forgedInventory.iconNamesArray[0][i] != undefined) {
                forj = personaje.forgedInventory.iconNamesArray[0][i];
                if(forj === "antorcha"){
                    //Variable "forjado" es global en dungeon.js
                var x = invForj.icons[i][0].background.x;
                var y = invForj.icons[i][0].background.y;
                forjado = new Forged(x, y, forj);
                    
                }
            }
            grupo.add(invForj.icons[i][0].background);
            invForj.icons[i][0].background.fixedToCamera = true;
        }
        if(forjado != undefined){
            grupo.add(forjado.sprite);
            forjado.sprite.fixedToCamera = true;
        }
        ////// FIN BARRA DE FORJADOS //////

        ////// ESTADÍSTICAS //////
        style = { font: "25px Averia Sans Libre", fill: "#a8a8a8", align: "left" };
        texto_estadisticas[0] = "Fuerza: 5";
        texto_estadisticas[1] = "Inteligencia: 5";
        texto_estadisticas[2] = "Def. Física: 7";
        texto_estadisticas[3] = "Def. Mágica: 9";
        texto_estadisticas[4] = "Velocidad: 15";
        
        for(var i = 0; i < 5; i++){
            estadisticas[i] = game.add.text(0, 0, texto_estadisticas[i], style);
            estadisticas[i].alpha = 0.7;
            estadisticas[i].fixedToCamera = true;
            switch(i){
                case 0:
                estadisticas[i].cameraOffset.setTo(10, 200);
                break;

                case 1:
                estadisticas[i].cameraOffset.setTo(10, 240);
                break;

                case 2:
                estadisticas[i].cameraOffset.setTo(10, 280);
                break;

                case 3:
                estadisticas[i].cameraOffset.setTo(10, 320);
                break;

                case 4:
                estadisticas[i].cameraOffset.setTo(10, 360);
                break;
            }
            grupo.add(estadisticas[i]);
        }
        ////// FIN ESTADÍSTICAS //////

        ////// PISO //////
        text = "PISO -1";
        style = { font: "50px Averia Sans Libre", fill: "#7a7a7a", align: "left" };
        piso = game.add.text(0, 0, text, style);
        piso.alpha = 0.7;
        piso.fixedToCamera = true;
        piso.cameraOffset.setTo(game.camera.width - 180, 20);
        grupo.add(piso);
        ////// FIN PISO //////
    }

    this.update = function(){
        //Si existe el forjado antorcha entonces creamos la animación de oscuridad y la actualizamos
        if(forjado != undefined){
            if(oscuridad_antorcha === undefined){
                //Destruimos la oscuridad normal
                grupo.remove(oscuridad);
                oscuridad.destroy();

                //Creamos oscuridad antorcha
                oscuridad_antorcha = game.add.sprite(0, 0, 'oscuridad_antorcha');
                oscuridad_antorcha.animations.add('anim', [0,1,2,3]);
                oscuridad_antorcha.animations.play('anim', 6, true);
                oscuridad_antorcha.anchor.setTo(0.5);
                oscuridad_antorcha.x = jugador.sprite.x + (jugador.sprite.width/2);
                oscuridad_antorcha.y = jugador.sprite.y + (jugador.sprite.height/2);
                grupo.add(oscuridad_antorcha, false, 0);
            } else {
                oscuridad_antorcha.x = jugador.sprite.x + (jugador.sprite.width/2);
                oscuridad_antorcha.y = jugador.sprite.y + (jugador.sprite.height/2);
            }
        } else {
            oscuridad.x = jugador.sprite.x + (jugador.sprite.width/2);
            oscuridad.y = jugador.sprite.y + (jugador.sprite.height/2);
        }
        

        if(anteriorVida != jugador.vida){
            healthBar.setPercent((jugador.vida * 100)/jugador.maxVida);
            anteriorVida = jugador.vida;
        }
        //game.world.bringToTop(iconsGroup);
        game.world.bringToTop(grupo);
    }
}
