$(document).ready(function() {
  // Code out HTML View for Game
  //4 Clickable Character Boxes
  // Each has Name, image, and stats
  //Space for player character to appear
  //Space for enemy to appear

  //Create Variables
  // Characters
  // array of objects
  // each has different properties of health, attack power, counter attack power
  var characters = [];
  var playerPicked;
  var enemyPicked;

  var i = 0;

  // Active Characters
  var playerActive;
  var playerBaseAttack;
  var enemyActive;

  // Start new game function
  // Sets all characters to be able to be picked by player with reset stats
  // Once picked, player character gets put into player area while the rest go into Enemies area
  function startGame() {
    $(".player").empty();
    $(".enemy").empty();
    $(".characterList").empty();
    characters[0] = {
      name: "Paul Atreides",
      health: 170,
      attack: 16,
      counter: 11,
      pic: "assets/images/paulatreides.jpg"
    };
    characters[1] = {
      name: "Chani",
      health: 220,
      attack: 10,
      counter: 18,
      pic: "assets/images/chanibetter.jpg"
    };
    characters[2] = {
      name: "Feyd-Rautha Harkonnen",
      health: 150,
      attack: 20,
      counter: 10,
      pic: "assets/images/feyd.jpg"
    };
    characters[3] = {
      name: "Baron Vladimir Harkonnen",
      health: 200,
      attack: 18,
      counter: 8,
      pic: "assets/images/baron.jpg"
    };
    playerPicked = false;
    enemyPicked = true;

    $(characters).each(function() {
      $(".characterList").append(
        '<div class="character col-xs-3 col-sm-3 col-md-2"><div class="name"></div><img class="pic"/><div class="stats"></div></div>'
      );
    });

    $(".character").each(function() {
      $(this).attr("data-value", i);
      i++;
    });
    i = 0;

    $(".name").each(function() {
      $(this).html(characters[i].name);
      i++;
    });
    i = 0;

    $(".pic").each(function() {
      $(this).attr("src", characters[i].pic);
      i++;
    });
    i = 0;
    $(".stats").each(function() {
      $(this).html(
        "Health: " +
          characters[i].health +
          "<br/>Attack: " +
          characters[i].attack +
          "<br/>Counter: " +
          characters[i].counter
      );
      i++;
    });
    i = 0;

    $(".pickCharacter").html("<h3>Pick A Player!</h3>");
    console.log(characters);
    playerPicked = false;
    enemyPicked = true;
  }

  startGame();

  // If there are enemies
  // Player picks Enemy
  // Enemies stats load

  $(".characterList").on("click", ".character", function() {
    var p;
    console.log("click");

    if (playerPicked === false && enemyPicked) {
      $(".pickCharacter").html("<h3>Pick An Enemy!</h3>");
      var playerInfo = $(this).html();
      p = $(this).attr("data-value");
      playerActive = characters[p];
      playerBaseAttack = playerActive.attack;
      characters.splice(p, 1);

      $(this).remove();
      $(".player").html(playerInfo);
      $(".character").each(function() {
        $(this).attr("data-value", i);
        i++;
      });

      $(".player .stats").html(
        "Health: " +
          playerActive.health +
          "<br/>Attack: " +
          playerActive.attack +
          "<br/>Counter: " +
          playerActive.counter
      );
      i = 0;
      playerPicked = true;
      enemyPicked = false;
    } else if (enemyPicked === false && playerPicked === true) {
      var enemyInfo = $(this).html();
      p = $(this).attr("data-value");
      enemyActive = characters[p];
      characters.splice(p, 1);

      $(this).remove();
      $(".enemy").html(enemyInfo);
      $(".character").each(function() {
        $(this).attr("data-value", i);
        i++;
      });
      $(".enemy .stats").html(
        "Health: " +
          enemyActive.health +
          "<br/>Attack: " +
          enemyActive.attack +
          "<br/>Counter: " +
          enemyActive.counter
      );

      i = 0;
      enemyPicked = true;
    } else if (enemyPicked && playerPicked) {
      return;
    }
  });

  // playerActive & enemyActive

  // Player attacks enemy
  // Enemy loses health (health - attack)
  // Enemy counterattacks
  //  Increase player attack stat by base attack power

  // If player health <= 0
  // End game

  // If enemy health <= 0
  // remove enemy from list of enemies
  // If there are more enemies, repeat pick

  // If no enemies left, player wins and restart game

  $(".attack").on("click", function() {
    if (enemyActive.health <= 0) {
      $(".enemy").html("<h2>Enemy vanquished, pick a new battle</h2>");
      playerActive.attack = playerBaseAttack;
      enemyPicked = false;
    } else if (enemyActive.health > 0 && playerActive.health > 0) {
      enemyActive.health = enemyActive.health - playerActive.attack;
      $(".enemy .stats").html(
        "Health: " +
          enemyActive.health +
          "<br/>Attack: " +
          enemyActive.attack +
          "<br/>Counter: " +
          enemyActive.counter
      );
      playerActive.attack = playerActive.attack + playerBaseAttack;

      playerActive.health = playerActive.health - enemyActive.counter;
      $(".player .stats").html(
        "Health: " +
          playerActive.health +
          "<br/>Attack: " +
          playerActive.attack +
          "<br/>Counter: " +
          playerActive.counter
      );
    } else if (playerActive.health <= 0) {
      $(".player").html("<h2>You lose! Start a new game. </h2>");
    } else if (enemyActive.health <= 0 && enemyPicked === false) {
      $(".characterList").html("<h2>You win!</h2>");
    }
  });

  $(".startGame").on("click", function() {
    startGame();
  });
});
