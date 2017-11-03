var game = new Phaser.Game(1500, 900, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var run = false;
var speed = 5;
var turningSpeed = 1.5;
var angleOffset = 90;

function preload () {

    game.load.image('tank', 'assets/images/tmp_tank.png');
    game.load.image('tankGun', 'assets/images/tankGun.png');

}

function create () {

    tank = game.add.sprite(game.world.centerX, game.world.centerY, 'tank');
    tankGun = game.add.sprite(game.world.centerX, game.world.centerY, 'tankGun');

    tank.scale.setTo(0.5);
    tankGun.scale.setTo(0.5);
    
    tank.anchor.setTo(0.5);
    tankGun.anchor.setTo(0.5, 0.75);

    tankGun.angle = angleOffset
    tank.angle = angleOffset;
    
    wasd = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D), 
    };

}

function update() {
    if(run){
        var angle = Math.atan((game.input.mousePointer.x-tank.x)/(game.input.mousePointer.y-tank.y))*-180/Math.PI;
        if(game.input.mousePointer.y >= tank.y){
            angle += 180;
        }
        tankGun.angle = angle;

        if(wasd.left.isDown){
            tank.angle -= turningSpeed;
        }else if(wasd.right.isDown){
            tank.angle += turningSpeed;
        }
        if(wasd.down.isDown){
            x = tank.x - (speed * 0.5 * Math.cos((tank.angle-angleOffset) * Math.PI /180));7
            if(50<=x && x<=1450){
               tank.x = x;   
            }
            y = tank.y - (speed * 0.5 * Math.sin((tank.angle-angleOffset)* Math.PI /180));
            if(50<=y && y<=850){
                tank.y = y;
            }
            tankGun.x = tank.x;
            tankGun.y = tank.y;
        }else if(wasd.up.isDown){
            x = tank.x + (speed * Math.cos((tank.angle-angleOffset) * Math.PI /180));
            if(50<=x && x<=1450){
               tank.x = x;   
            }
            y = tank.y + (speed * Math.sin((tank.angle-angleOffset)* Math.PI /180));
            if(50<=y && y<=850){
                tank.y = y;
            }
            tankGun.x = tank.x;
            tankGun.y = tank.y;
        }
    } 
}

function stop(){

    if(run){
        run=false;
        document.getElementById('btnStart').textContent ='START';
    }
    else{
        run=true;
        document.getElementById('btnStart').textContent ='STOP';
    }

}
