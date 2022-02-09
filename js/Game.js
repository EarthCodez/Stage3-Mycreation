class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }


  updateCount(count){
    database.ref('/').update({
      carsAtEnd: count
    });
  }


  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    poweruI=createSprite(powupdist,em[0],25,25)
    poweruU=createSprite(Math.round(random(5090,12340)),em[1],25,25)
    if(abrand>1 && abrand<500){
      poweruI.addImage(pu[0])
      powI=1;
    }
    else if(abrand>500 && abrand<900){
      poweruI.addImage(pu[1])
      powI=2;
    }
    else if(abrand>900 && abrand<1200){
      poweruI.addImage(pu[2])
      powI=3;
    }
    else if(abrand>1200 && abrand<1300){
      poweruI.addImage(pu[3])
      powI=4;
    }
    else if(abrand>1300 && abrand<1450){
      poweruI.addImage(pu[4])
      powI=5;
    }
    else if(abrand>1450 && abrand<1475){
      poweruI.addImage(pu[5])
      powI=6;
    }
    poweruI.scale=0.25
    poweruU.scale=0.25
    obstacle = createSprite(200,400)
    player1 = createSprite(200,400);
    player1.addAnimation("car1",player1_img);
    player2 = createSprite(300,400);
    player2.addAnimation("car2",player2_img);
    players = [player1, player2];
    
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      
      var display_position = 100;
      
      //index of the array
      var index = 0;

      //y and y position of the cars
      var y = 250 ;
      var x;

      for(var plr in allPlayers){

        index = index + 1 ;
        
        y = y + 300;

        x = displayWidth*3+250 + allPlayers[plr].distance;
        
        players[index-1].y = y;
        players[index-1].x = x;

        if (index === player.index){
          if(player.index==1){
          notplayerindex=player.index+1
          }
          else if(player.index==2){
            notplayerindex=player.index-1
          }
          else{
            console.log("error:line106")
          }
          var locvariable1 = database.ref("players/player" + notplayerindex+ "/pu/pudistance");
          locvariable1.on("value",(data)=>{
          puU[0] = data.val();
          })
          var locvariable2 = database.ref("players/player" + notplayerindex + "/pu/putype");
          locvariable2.on("value",(data)=>{
          puU[1] = data.val();
          })
          longcode()
          fill("red");
          ellipse(x,y,200,200);
          players[index - 1].shapeColor = "red";
          camera.position.y = displayWidth/2;
         camera.position.x = players[index-1].x+500;
         player.playerPu(powupdist,abrand)
         if(player.index==1){
         poweruI.y=585
         }
         else{
         poweruI.y=885
         }
        }
       
        textSize(30);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, displayWidth*3+250 + allPlayers[plr].distance ,allPlayers[plr].y-100)
      }

    }
    
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=speed
      player.update();
      // console.log(allPlayer[plr])
    }

    if(poweruI.y<505){
      locvar2=false
      }
      else if(poweruI.y>585){
        locvar2=true
      }
    if(locvar2==false){
    poweruI.y+=0.5
    }
    else{
      poweruI.y-=0.5
    }

    // if(player1.isTouching(poweruI)){
    //   if(powI==1){
      
    //   }
    //   else if(powI==2){
        
    //   }
    //   else if(powI==3){
        
    //   }
    //   else if(powI==4){
        
    //   }
    //   else if(powI==5){
        
    //   }
    //   else if(powI==6){
        
    //   }
    //   else if(powI==7){
        
    //   }
    // }
    if(player.distance > displayHeight*15-550){
      gameState = 2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
      this.showRank();
    }

    if(keyIsDown(LEFT_ARROW)){
      player1.debug=true
      player2.debug=true
      poweruI.debug=true
      // poweruU.debug=true
      console.log("luck:"+ powI +" debug:"+abrand)
      }
      else{
      player1.debug=false
      player2.debug=false
      poweruI.debug=false
      // poweruU.debug=false
      }
    drawSprites();
  }

  showRank(){
    swal({
       title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
        text: "You reached the finish line successfully",
         imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png", 
          imageSize: "100x100",
           confirmButtonText: "Ok" });
  }
  
  end(){
    console.log(player.rank());
    // if(count===1)
    // alert("GAME ENDED");
    // count++;
  }
}

function longcode(){
  poweruU.x=puU[0]
  if(player.index==1){
  poweruU.y=885
  }
  else if(player.index==2){
    poweruU.y=585
    }
  if(puU[1]>1 && puU[1]<500){
    poweruU.addImage(pu[0])
    powU=1;
  }
  else if(puU[1]>500 && puU[1]<900){
    poweruU.addImage(pu[1])
    powU=2;
  }
  else if(puU[1]>900 && puU[1]<1200){
    poweruU.addImage(pu[2])
    powU=3;
  }
  else if(puU[1]>1200 && puU[1]<1300){
    poweruU.addImage(pu[3])
    powU=4;
  }
  else if(puU[1]>1300 && puU[1]<1450){
    poweruU.addImage(pu[4])
    powU=5;
  }
  else if(puU[1]>1450 && puU[1]<1475){
    poweruU.addImage(pu[5])
    powU=6;
  }
}