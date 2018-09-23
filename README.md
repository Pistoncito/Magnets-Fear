# Magnets-Fear

## Documento de Diseño
### Creative Condors

Álvaro Ramirez Míguez

Víctor González Rivera

## Descripción del Juego
*Magnets Fear* es un juego arcade 2D en red para dos jugadores, de partidas 1vs1 de dos minutos.

Cada jugador controla a una esfera magnética con dos polaridades intercambiables, con las que pueden atraer o repeler proyectiles dependiendo de la polaridad de los últimos, y así proteger sus bases de los mismos.

### Plataforma
Inicialmente se desarrollará para PC, teniendo en cuenta que los controles puedan adaptarse más adelante a otras plataformas como consola o smartphone.

### Propósito y Público Objetivo
El objetivo del juego es crear una alternativa sencilla dentro de los juegos competitivos buscando un público amplio en edad y gustos. Para ello ideamos mecánicas intuitivas y fáciles de aprender que puedan generar dinámicas más complejas a medida que aumenta la habilidad del jugador.

## Mecánicas
### Jugabilidad
El jugador puede mover su esfera en ocho direcciones y cambiar su polaridad.

### Reglas Básicas
* Hay 4 proyectiles en el escenario que son atraídos por las esferas de polaridad opuesta y repelidos en caso contrario, teniendo en cuenta su posición respecto a la esfera.
* Los proyectiles que toquen una esfera cambian de polaridad.
* Tanto las esferas como los proyectiles rebotan contra los limites del escenario.
* Hay 3 bases por cada jugador que desaparecen cada 30 segundos generando otras 3 en distintas posiciones, indiferentemente de cuántas quedasen anteriormente.
* Si un proyectil choca contra una base, la destruye.
https://github.com/Pistoncito/Magnets-Fear/blob/readme-edit/magnets%20fear%20classic%20design.png
### Puntuación
Cada vez que una base sea destruída el jugador propietario gana 10 puntos.

### Objetivo
Gana el jugador con menor puntuación al acabar la partida.

### Cámara
El juego se desarrolla en todo momento en vista cenital.

### Controles
Controles por defecto:
* Movimiento: W,A,S,D -> Arriba, Izquierda, Abajo y Derecha, respectivamente. Se permite la combinación de dos movimientos a la vez generando desplazamiento en diagonal (Ej: W + A -> Arriba + Izquierda). 
* Cambio de polaridad: Barra espaciadora.

## Modos de Juego
### Clásico 
2 jugadores compiten entre ellos con las normas explicadas en *Reglas Básicas*, *Puntuación* y *Objetivo*.

### Cooperativo 
2 jugadores juegan contra *RIPPED* un enemigo controlado por la máquina. Éste se sitúa en el centro de la pantalla y lanza proyectiles en todas las direcciones periódicamente que amenazan la integridad de las bases repartidas por el mapa. El objetivo de los jugadores es repeler los proyectiles para que no lleguen a las bases a la vez que golpean al enemigo en puntos débiles para acabar con él. 

A diferencia del modo *Clásico* las bases son más resistentes, aguantando hasta tres golpes. Una vez que las bases de un jugador son destruídas éste es eliminado y sólo volverá a aparecer si el otro jugador es capaz de poteger sus bases durante 10 segundos. Al reaparecer un jugador, reaparece también su última base. 

El juego termina cuando *RIPPED* es derrotado o al eliminarse 2 jugadores a la vez.

## MatchMaking
Los jugadores pueden jugar con un amigo conociendo su nombre de usuario o contra un jugador de su nivel buscando una partida de emparejamiento.

Los emparejamientos de un jugador se efectuarán con otros jugadores con un *ELO* (habilidad relativa) similar.
Cada vez que un jugador gana o es derrotado en una partida de emparejamiento obtiene o pierde *ELO* en función de:
* La diferencia de puntos entre el jugador y el oponente. 
* La diferencia de puntuación al terminar la partida.


## Interfaces
### Diagrama de Flujo
![Error al cargar la imagen](https://github.com/Pistoncito/Magnets-Fear/blob/readme-edit/Magnets%20Fear%20flow%20diagram.PNG)

### Pantalla de Inicio
Se reflejarán las opciones:
1. Jugar: Al seleccionar esta opción se abrirá otra interfaz donde podrás elegir jugar con un amigo o buscar un jugador de tu nivel, así como el modo de juego (*Clásico* o *Cooperativo*).
   * Buscar Partida: se busca un jugador de tu nivel que también esté buscando partida.
   * Jugar con un amigo: se introduce el usuario de un amigo y se envía una invitación de juego.
   * Volver: vuelve al menú de inicio.
2. Opciones: Se abre una nueva interfaz donde se podrá configurar:
   * Controles: Se permiten cambiar los botones con los que se controla el movimiento y el cambio de polaridad al gusto del jugador.
   * Audio: Se puede modificar el volumen del sonido y la música.
   * Resolución: Se permite alterar la resolución.
   * Volver: vuelve al menú de inicio.
3. Salir: Aparecerá un mensaje de confirmación y, en caso de que se acepte se saldrá del juego. 

## Arte
### Lore
Un grupo de civilizaciones bautizado con el nombre de X decidieron crear un sistema de recolección de energía para solventar sus problemas y avanzar más rápido tecnológicamente. A este proyecto lo llamaron RIPPED (Recursive Intergalactic and Procedural Project of Energy Development).

RIPPED fue diseñada con la capacidad  generar copias de sí misma y viajar por el espacio en busca de energía.
En poco tiempo RIPPED encontró una fuente de energía lo suficientemente grande como para repartir entre sus civilizaciones padre y además usarla para mejorar su capacidad de aprendizaje.
De esta forma, se convirtió en un ente autosuficiente con conciencia propia, decidiendo abandonar la tarea asignada por este grupo de civilizaciones.

Decide generar pequeñas copias de sí misma que viajen aleatoriamente por el espacio para buscar fuentes de energía de forma más eficiente.

Estas pequeñas copias aumentaron de forma exponencial en número y saturaron el espacio, provocando colisiones con los planetas de civilizaciones cercanas.

Ante este problema, X tuvo que gastar la energía proporcionada por la propia RIPPED para defenderse de ella, creando así un sistema de protección basada en viajes espacio-temporales. Con este sistema podían viajar de forma segura a la vez que avisaban a otras civilizaciones de la inminente amenaza.

Este método tenía un inconveniente: las bases quedaban desprotegidas 30 segundos mientras enviaban el mensaje de aviso, ponían en marcha el sistema y recogían energías de fuentes cercanas. Para solventar este problema, trataron de replicar a RIPPED con una menor inteligencia y capacidad de aprendizaje con la misión de proteger a las bases mientras se encontraban indefensas.
Pero hubo otro inconveniente que no pudieron prever: cada vez que realizaban un viaje creaban una línea temporal adyacente que la esfera también debía proteger.

Cada jugador que crea una cuenta hace el papel de la IA que controla la esfera de una nueva civilización, que le transmite el mensaje para que sepa cual es su misión.

### Estética
Estilo futurista-espacial simplificado. 
Utilizamos colores vivos y saturados para diferenciar los distintos elementos en pantalla. La polaridad positiva se representa con rojo y la negativa con azul. Cada jugador podrá diferenciar la esfera que controla por una tonalidad más clara, mientras que la de su enemigo es más oscura. Lo mismo pasa con las bases de tu propia civilización y las enemigas. A continuación adjuntamos una imagen con el concepto.
![Error al cargar la imagen](https://github.com/Pistoncito/Magnets-Fear/blob/readme-edit/Estetica%20in-game.png)

### Música y Sonido
* Música
  1. Menú de inicio, opciones.
  2. Durante la partida: Hay una base de fondo que se complementa dependiendo de la polaridad de los jugadores:
     * Jugador 1 y 2 con polaridad positiva.
     * Jugador 1 y 2 con polaridad negativa.
     * Jugador 1 con polaridad positiva y Jugador 2 con polaridad negativa.
     * Jugador 1 con polaridad negativa y Jugador 2 con polaridad positiva.
   La música se acelera al acercarse a los 30 segundos finales de la partida.

* Sonido
  1. Colisión proyectil-pared
  2. Colisión  proyectil-jugador
  3. Colisión proyectil-base
  4. Al ganar una partida
  5. Al perder una partida
  6. Animación momentos antes de que aparezcan las bases
  7. Aparición de las bases 
 
## Tecnología Necesaria
* Hardware: dos ordenadores con conexión a internet
* Software: editor de imagen (Photoshop), editor de audio, editor de código (Netbeans), Navegador (Google Chrome, Firefox), lenguaje de programación (Javascript), motor de videojuegos 2D (Phaser), framework (Spring).
