/* 

  The only function that is required in this file is the "move" function

  You MUST export the move function, in order for your code to run
  So, at the bottom of this code, keep the line that says:

  module.exports = move;

  The "move" function must return "North", "South", "East", "West", or "Stay"
  (Anything else will be interpreted by the game as "Stay")
  
  The "move" function should accept two arguments that the website will be passing in: 
    - a "gameData" object which holds all information about the current state
      of the battle

    - a "helpers" object, which contains useful helper functions
      - check out the helpers.js file to see what is available to you

    (the details of these objects can be found on javascriptbattle.com/#rules)

  This file contains four example heroes that you can use as is, adapt, or
  take ideas from and implement your own version. Simply uncomment your desired
  hero and see what happens in tomorrow's battle!

  Such is the power of Javascript!!!

*/

//TL;DR: If you are new, just uncomment the 'move' function that you think sounds like fun!
//       (and comment out all the other move functions)


// // The "Northerner"
// // This hero will walk North.  Always.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   return 'North';
// };

// // The "Blind Man"
// // This hero will walk in a random direction each turn.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   var choices = ['North', 'South', 'East', 'West'];
//   return choices[Math.floor(Math.random()*4)];
// };

// // The "Priest"
// // This hero will heal nearby friendly champions.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 60) {
//     return helpers.findNearestHealthWell(gameData);
//   } else {
//     return helpers.findNearestTeamMember(gameData);
//   }
// };

// // The "Unwise Assassin"
// // This hero will attempt to kill the closest enemy hero. No matter what.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 30) {
//     return helpers.findNearestHealthWell(gameData);
//   } else {
//     return helpers.findNearestEnemy(gameData);
//   }
// };

// // The "Careful Assassin"
// // This hero will attempt to kill the closest weaker enemy hero.
var moveCarefulAssasin = function(gameData, helpers) {
  var myHero = gameData.activeHero;
  if (myHero.health < 50) {
    return helpers.findNearestHealthWell(gameData);
  } else {
    return helpers.findNearestWeakerEnemy(gameData);
  }
};

// // The "Safe Diamond Miner"
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;

//   //Get stats on the nearest health well
//   var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
//     if (boardTile.type === 'HealthWell') {
//       return true;
//     }
//   });
//   var distanceToHealthWell = healthWellStats.distance;
//   var directionToHealthWell = healthWellStats.direction;
  

//   if (myHero.health < 40) {
//     //Heal no matter what if low health
//     return directionToHealthWell;
//   } else if (myHero.health < 100 && distanceToHealthWell === 1) {
//     //Heal if you aren't full health and are close to a health well already
//     return directionToHealthWell;
//   } else {
//     //If healthy, go capture a diamond mine!
//     return helpers.findNearestNonTeamDiamondMine(gameData);
//   }
// };

var oposite = function(direction){
  //"North", "South", "East", "West", or "Stay"
  if (direction === 'North'){
    return "South";
  }else if (direction === 'South'){
    return "North";
  }else if (direction === "East"){
    return "West";
  }else if (direction === "West"){
    return "East";
  }else{
    return "Stay";
  }
};

// // my attempt
var move = function(gameData, helpers) {
  var myHero = gameData.activeHero;
  var board = gameData.board;
  //var data = JSON.stringify(gameData, null, 1);
  //gameData.maxTurn = 5000;

  //Get stats on the nearest health well
  var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
    if (boardTile.type === 'HealthWell') {
      return true;
    }
  });
  var distanceToHealthWell = healthWellStats.distance;
  var directionToHealthWell = healthWellStats.direction;

  var enemy = helpers.findNearestObjectDirectionAndDistance(board, myHero, function(enemyTile) {
    return enemyTile.type === 'Hero' && enemyTile.team !== myHero.team && enemyTile.health < 50;
  });
  if (!enemy){
    enemy = {};
    enemy.distance = 10000;
    enemy.health = 10000;
    enemy.direction = 'Stay';
  }

  var nearestEnemy = helpers.findNearestObjectDirectionAndDistance(board, myHero, function(enemyTile) {
    return enemyTile.type === 'Hero' && enemyTile.team !== myHero.team
  });
  
  var nearestDiamond = helpers.findNearestNonTeamDiamondMine(gameData);



  if (healthWellStats.distance === 1 && myHero.health < 100){
    if (enemy.health <= 30 && enemy.distance === 1){
      return enemy.direction;
    }else{
      return healthWellStats.direction;
    }
  }else{
    if (myHero.health < 50){
      if (enemy.health <= 30 && enemy.distance === 1){
        return enemy.direction;
      }else{
        return healthWellStats.direction;
      }
      
      
    }else{
      if (enemy.distance <= 2){
        return enemy.direction;
      }else{
        if (myHero.health < 70) {
          return directionToHealthWell;
        }else{
          if (nearestDiamond){
            return nearestDiamond;
          }else{
            return nearestEnemy.direction;
          }
        }
      }
    }
  }
};

// // The "Selfish Diamond Miner"
// // This hero will attempt to capture diamond mines (even those owned by teammates).
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;

//   //Get stats on the nearest health well
//   var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
//     if (boardTile.type === 'HealthWell') {
//       return true;
//     }
//   });

//   var distanceToHealthWell = healthWellStats.distance;
//   var directionToHealthWell = healthWellStats.direction;

//   if (myHero.health < 40) {
//     //Heal no matter what if low health
//     return directionToHealthWell;
//   } else if (myHero.health < 100 && distanceToHealthWell === 1) {
//     //Heal if you aren't full health and are close to a health well already
//     return directionToHealthWell;
//   } else {
//     //If healthy, go capture a diamond mine!
//     return helpers.findNearestUnownedDiamondMine(gameData);
//   }
// };

// // The "Coward"
// // This hero will try really hard not to die.
// var move = function(gameData, helpers) {
//   return helpers.findNearestHealthWell(gameData);
// }


// Export the move function here
module.exports = move;
