# Magnets-Fear

## Documento de Diseño
Versión 1.1
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
El jugador puede cambiar su polaridad cada 0.5 segundos, creando un campo magnético con un rango determinado, y mover su esfera en ocho direcciones. Además podrá utilizar una habilidad especial que dependerá del personaje elegido. Inicialmente habrá 4 personajes:
* Saltador: Realiza un pequeño salto en su dirección de desplazamiento. Para poder volver a usar el salto tendrá que esperar 2 segundos.
* Constructor: crea una pared en la dirección en la que se esté moviendo que aguanta un impacto de un proyectil. No podrá crear una nueva pared hasta que hayan pasado 10 segundos desde que se destruyó la anterior
* Destructor: lanza un proyectil en la dirección en la que se esté desplazando que se destruye al impactar contra cualquier objeto. No podrá volver a lanzar un proyectil hasta que hayan pasado 7 segundos desde que desapareció el anterior
* Tiempo bala: Proyectiles y esfera enemiga se mueven más lento durante 5 segundos, lo que permite al jugador posicionarse para realizar una estrategia. Si toca a un proyectil, se desactiva el tiempo bala. Esta habilidad se recarga cada 15 segundos y si colisiona la esfera con un proyectil, a este tiempo se le añaden 5 segundos.

### Reglas Básicas
* Hay 2 proyectiles en el escenario que son atraídos por las esferas de polaridad opuesta y repelidos en caso contrario, teniendo en cuenta su posición respecto a la esfera.
* Los proyectiles que toquen una esfera cambian de polaridad.
* Tanto las esferas como los proyectiles rebotan contra los limites del escenario.
* Hay 3 bases por cada jugador, que son invulnerables durante 3 segundos al aparecer. Si no han sido destruídas, desaparecen 30 segundos después generando otras 3 en distintas posiciones, indiferentemente de cuántas quedasen anteriormente.
* Si un proyectil choca contra una base, la destruye. Una vez se destruyen todas las bases de un jugador, desaparecen todas las bases restantes en el escenario generando otras 3 para ambos jugadores en posiciones distintas.

![Error al cargar la imagen](https://github.com/Pistoncito/Magnets-Fear/blob/master/Images/magnets%20fear%20classic%20design.png)
![Error al cargar la imagen](https://github.com/Pistoncito/Magnets-Fear/blob/master/Images/magnets%20fear%20efecto%20de%20colision.png)

### Power Ups
Los Power Ups estarán representados gráficamente colisionando con todos los objetos moviéndose por toda la pantalla de juego.
Cuando la esfera de un jugador choque con un Power Up, éste se activará temporalmente dependiendo del Power Up.

 * Power Up 1: Las fuerzas de atracción y de repulsión de la esfera, se ven aumentadas.
 * Power Up 2: El rango de acción de una esfera se vuelve mayor.
 * Power Up 3: La esfera acelera más rapido.
 * Power Up 4: Una de tus bases recibe un golpe extra antes de ser destruida.
 * Power Up 5: Al cambiar la polaridad de tu esfera, cambias también la de tu enemigo.
 

### Puntuación
Cada vez que una base sea destruída el jugador propietario gana 10 puntos.

### Fin de Partida y Objetivo
La partida acaba a los 2 minutos y gana el jugador con menor puntuación.

### Cámara
El juego se desarrolla en todo momento en vista cenital.

### Controles
Controles por defecto:
* Movimiento: W,A,S,D -> Arriba, Izquierda, Abajo y Derecha, respectivamente. Se permite la combinación de dos movimientos a la vez generando desplazamiento en diagonal (Ej: W + A -> Arriba + Izquierda). 
* Cambio de polaridad: Barra espaciadora.
* Utilizar habilidad: Shift.

## Modos de Juego
### Clásico 
2 jugadores compiten entre ellos con las normas explicadas en *Reglas Básicas*, *Puntuación* y *Objetivo*.

### Cooperativo 
2 jugadores juegan contra *RIPPED* un enemigo controlado por la IA. Éste se sitúa en el centro de la pantalla y lanza proyectiles en todas las direcciones periódicamente que amenazan la integridad de las bases repartidas por el mapa. El juego empieza con 5 bases, que pertenecen a ambos jugadores, y cada 30 segundos aparece una nueva.

El objetivo de los jugadores es repeler los proyectiles para que no lleguen a las bases a la vez que golpean al *RIPPED* en puntos débiles para acabar con él. 

*RIPPED* se compone de 2 discos giratorios que protegen el núcleo. Cada disco tiene 2 compuertas que son a su vez sus puntos débiles y de las cuales salen los proyectiles. Cuando el jugador golpee los puntos débiles del disco éste se rompe y desaparece. Al golpear el núcleo *RIPPED* se rearma atrayendo todos los proyectiles del escenario  en línea recta hacia si mismo, volviendo a crear los discos. 

El juego termina cuando *RIPPED* es derrotado o al llegar a un número determinado de bases destruídas.

## MatchMaking

La manera de medir el nivel de un jugador se llamará *HR* (habilidad relativa).

Los emparejamientos de un jugador se efectuarán con otros jugadores según su *HR*.
Cada vez que un jugador gana o es derrotado en una partida de emparejamiento obtiene o pierde *HR* en función de:
* La diferencia de puntos entre el jugador y el oponente. 
* La racha de partidas que haya ganado o perdido, teniendo en cuenta las últimas 10 partidas.

Cada jugador tendrá un *HR* para el modo *Clásico* y otro para el modo *Cooperativo*.

Los jugadores pueden jugar con un amigo añadiendolo a su lista de amigos usando la opción con amigos de emparejamiento. En este tipo de matchmaking no se da ni quita *HR*.

## Interfaces
### Diagrama de Flujo
![Error al cargar la imagen](https://github.com/Pistoncito/Magnets-Fear/blob/master/Images/DiagramaFlujo1.3.PNG)

### Pantalla de Inicio
Se reflejarán las opciones:
1. Jugar: Al seleccionar esta opción se abrirá otra interfaz donde podrás elegir entre los modos de juego (*Clásico* o *Cooperativo*).
   * Clásico
   * Cooperativo
   * Volver: Vuelve al menú de inicio.
   
   Tanto si eliges el modo *Clásico* como el *Cooperativo* se abrirá una nueva interfaz para elegir entre buscar una partida online o emparejarte con un amigo.
   
   * Buscar Partida: se busca un jugador de tu nivel que también esté buscando partida.
   * Jugar con un amigo: Si elige entre los usuarios de su lista de amigos manda una petición de juego, mientras que si buscas el nombre del usuario con el que quieres jugar y no está en tu lista de amigos se envía una petición de amistad.
   * Volver: vuelve a selección de modos de juego.
   
   Antes de comenzar la partida el jugador tiene 10 segundos para escoger al personaje que quiere utilizar
2. Opciones: Se abre una nueva interfaz donde se podrá configurar:
   * Audio: Se puede modificar el volumen del sonido y la música.
   * Controles: Se permiten cambiar los botones con los que se controla el movimiento y el cambio de polaridad al gusto del jugador.
   * Volver: vuelve al menú de inicio.
3. Salir: Aparecerá un mensaje de confirmación y, en caso de que se acepte se saldrá del juego. 

![Error](https://github.com/Pistoncito/Magnets-Fear/blob/master/Images/Interfaces/Men%C3%BAInicio.PNG)
![Error](https://github.com/Pistoncito/Magnets-Fear/blob/master/Images/Interfaces/Opciones.PNG)
![Error](https://github.com/Pistoncito/Magnets-Fear/blob/master/Images/Interfaces/Audio.PNG)
![Error](https://github.com/Pistoncito/Magnets-Fear/blob/master/Images/Interfaces/Classic.PNG)
![Error](https://github.com/Pistoncito/Magnets-Fear/blob/master/Images/Interfaces/FinPartida.PNG)


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
Estilo futurista simplificado desarrollado en el espacio. 
Utilizamos colores vivos y saturados para diferenciar los distintos elementos en pantalla. La polaridad positiva se representa con rojo y la negativa con azul. Cada jugador podrá diferenciar la esfera que controla por una tonalidad más clara, mientras que la de su enemigo es más oscura. Lo mismo pasa con las bases de tu propia civilización y las enemigas. 

A los jugadores se les indicará el rango de acción de su magnetismo mediante un aura con el color de su polaridad. Antes de que las bases se intercambien, se mostrarán animaciones indicando dónde aparecerán las nuevas bases.

A continuación adjuntamos una imagen con el concepto.

![Error al cargar la imagen](https://github.com/Pistoncito/Magnets-Fear/blob/master/Images/Estetica%20in-game.png)

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

## Diagrama de Clases
![Error al cargar la imagen](https://github.com/Pistoncito/Magnets-Fear/blob/master/Images/Diagrama%20de%20clases%20API%20REST/MagnetsFear%20Class.PNG)

## Como usar la aplicacion
Para poder ejecutar la aplicación será necesario:
1. Tener instalado Spring o Eclipse STS.
2. Introducir el proyecto en la carpeta de direccionamiento del programa.
3. Una vez hecho esto hay que abrir el proyecto y ejecutar como aplicación java el documento situado en la carpeta:  src/main/java/CreativeCondors.MagnetsFear/Application.java
4. Para terminar, la url que hay que escribir en el navegador es: localhost:8080.

