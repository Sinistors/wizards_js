const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function randomRange(first, last) {
    return first + Math.floor(Math.random() * (last - first));
}
function randomize(number, percentOfRandom)
{
    let random = Math.random() * (percentOfRandom * 2) - percentOfRandom;
    return number + (random / 100 * number);
}


class Wizard 
{
    id;
    name;
    house;
    hpMax;
    hp;
    strength;
    randomPercent;
    critChance;
    healAmount;
    isHealed = false;

    hudElement;
    barElement;
    hasSkull = false;


    constructor(playerId) 
    {
        this.id = playerId;
        this.name = document.querySelector("#" + playerId + " input[data-type='name']").value;
        this.house = document.querySelector("#" + playerId + " select[data-type='house']").value;
        this.hpMax = document.querySelector("#" + playerId + " input[data-type='hp']").value;
        this.hp = this.hpMax;
        this.strength = parseFloat(document.querySelector("#" + playerId + " input[data-type='strength']").value);
        this.randomPercent = parseFloat(document.querySelector("#" + playerId + " input[data-type='strength']").value);
        this.critChance = parseFloat(document.querySelector("#" + playerId + " input[data-type='crit']").value);
        this.healAmount = parseFloat(document.querySelector("#" + playerId + " input[data-type='heal']").value);
    }

    initHUD()
    {
        this.hudElement = document.createElement("div");
        this.hudElement.id = this.id + "HUD";
        this.hudElement.classList.add("center-text");

        let title = document.createElement("h3");
        title.innerText = this.name;
        this.hudElement.append(title);

        let house = document.createElement("p");
        house.innerText = this.house;
        this.hudElement.append(house);

        this.barElement = document.createElement("div");
        this.barElement.id = this.id + "Bar";
        this.barElement.classList.add("hpBar");
        let bar = document.createElement("div");
        this.barElement.append(bar);


        this.hudElement.append(this.barElement);
        return this.hudElement;
    }

    updateHUD()
    {
        let bar = this.barElement.querySelector("div");
        console.log(this.barElement);
        bar.style.width = this.hp / this.hpMax * 100 + "%";

        bar.classList = "";
        let hpPercent = this.hp/this.hpMax * 100;
        if (hpPercent > 50)
        {
            bar.classList.add("bg-green");
        }
        else if (hpPercent > 20)
        {
            bar.classList.add("bg-orange");
        }
        else
        {
            bar.classList.add("bg-red");
        }

        if (this.hp == 0 && !this.hasSkull)
        {
            let deadSymbol = document.createElement("img");
            deadSymbol.src = "Images/human-skull.png";
            deadSymbol.style.width = "50px";
            this.hudElement.append(deadSymbol);
            this.hasSkull = true;
        }
    }
    playTurn(allies, enemies)
    {
        return this.attack(enemies[randomRange(0, enemies.length)]);
    }

    attack(wizard) 
    {
        let atkStr = this.name + " attaque ! ";
        let damage = randomize(this.strength, this.randomPercent);
        wizard.hp -= damage;
        if (randomRange(0,100) < this.critChance)
        {
            damage *= 2;
            atkStr += "COUP CRITIQUE ! ";
        }

        atkStr += wizard.name + " a pris " + damage.toFixed(2) + " dégats ! ";
        if (wizard.hp < 0)
        {
            wizard.hp = 0;
        }
        atkStr += "Il lui reste " + wizard.hp.toFixed(2) + " PV. ";

        if (wizard.isDead())
        {
            atkStr += wizard.name + " est mort !";
        }

        return atkStr;
    }

    heal()
    {
        this.hp += this.healAmount;
        this.isHealed = true;
        return "<span class='text-green'>" + this.name + " se soigne de " + this.healAmount + " PV. Il a maintenant " + this.hp.toFixed(2) + " PV</span>"; 
    }

    getElementsHUD()
    {
        this.hudElement = document.querySelector("#" + this.id + "HUD");
        this.barElement = document.querySelector("#" + this.id + "Bar");
    }

    isDead()
    {
        return (this.hp <= 0);
    }
}

class Fight
{
    //Team 
    goodGuys;
    badGuys;

    //Display
    fightDiv;
    hud;
    goodHUD;
    badHUD;
    historicDiv;

    constructor(team1, team2)
    {
        this.goodGuys = team1;
        this.badGuys = team2;
    }

    init()
    {
        this.fightDiv = document.querySelector("#fightDiv");

        this.hud = document.createElement("div");
        this.hud.classList.add("d-flex");

        this.goodHUD = document.createElement("div");
        this.goodHUD.classList.add("column-flex");
        this.badHUD = document.createElement("div");
        this.badHUD.classList.add("column-flex");

        this.hud.append(this.goodHUD);
        this.hud.append(this.badHUD);

        this.goodGuys.forEach(guy => 
        {
            this.goodHUD.append(guy.initHUD());    
        });
        this.badGuys.forEach(guy => 
        {
            this.badHUD.append(guy.initHUD());    
        });

        this.fightDiv.append(this.hud);

        
        
        this.fightDiv.innerHTML += "<h2>Historique du duel :</h2>";
        
        this.historicDiv = document.createElement("div");
        this.fightDiv.append(this.historicDiv);

        this.goodGuys.forEach(guy => 
        {
            guy.getElementsHUD();    
        });
        this.badGuys.forEach(guy => 
        {
            guy.getElementsHUD();   
        });
    }


    async gameloop()
    {
        while (!this.isTeamDead(this.goodGuys) && !this.isTeamDead(this.badGuys))
        {
            for (let i = 0; i < goodGuys.length(); i++)
            {

            }
            this.goodGuys.forEach(player => 
            {
                if(!player.isDead())
                {
                    let historic = document.createElement("p");
                    historic.innerText = player.playTurn(this.goodGuys, this.badGuys);
                    this.historicDiv.prepend(historic);
                }
            });
            this.badGuys.forEach(player => 
            {
                if(!player.isDead())
                {
                    let historic = document.createElement("p");
                    historic.innerText = player.playTurn(this.badGuys, this.goodGuys);
                    this.historicDiv.prepend(historic);
                }
            });

            this.goodGuys.forEach(player => 
            {
                player.updateHUD();
            });
            this.badGuys.forEach(player => 
            {
                player.updateHUD();
            });

            await sleep(500);
        }
    }

    isTeamDead(players)
    {
        let isDead = true;
        players.forEach(player => 
        {
            if (!player.isDead())
            {
                isDead = false;
            }
        });
        return isDead;
    }

    finish()
    {
        let element = document.createElement("p");
        if (this.isTeamDead(this.goodGuys))
        {
            element.innerText = "Les méchants ont gagnés !";
        }
        else
        {
            element.innerText = "Les gentils ont gagnés !";
        }
        this.historicDiv.prepend(element);
    }
}


document.querySelector("#startBtn").addEventListener("click", async () => 
{
    let goodGuys = document.querySelector("#goodGuys");
    let goodPlayerElements = goodGuys.querySelectorAll("div[data-type='player']");
    let goodPlayers = [];
    console.log(goodPlayerElements);
    goodPlayerElements.forEach(element => 
    {
        goodPlayers.push(new Wizard(element.id));
    });
    let badPlayerElements = document.querySelector("#badGuys").querySelectorAll("div[data-type='player']");
    let badPlayers = [];
    badPlayerElements.forEach(element => 
    {
        badPlayers.push(new Wizard(element.id));
    });

    let fight = new Fight(goodPlayers, badPlayers);

    fight.init();

    fight.gameloop();

    fight.finish();
});

let playerStartId = 10;
function addPlayer(btn) 
{
    let newElement = document.createElement("div");
    newElement.id = "player" + playerStartId;
    newElement.setAttribute("data-type", "player");
    newElement.innerHTML = "<div><label for='name'>Nom</label><input type='text' data-type='name'></div><div><label for='house'>Maison</label><select name='houses' data-type='house'><option value='Gryffondor'>Gryffondor</option><option value='Poufsouffle'>Poufsouffle</option><option value='Serdaigle'>Serdaigle</option><option value='Serpentard'>Serpentard</option></select></div><div><label for='hp'>HP</label><input type='number' data-type='hp'></div><div><label for='strengh'>Force</label><input type='number' data-type='strength'></div><div><label for='random'>Aléatoire (en %)</label><input type='number' data-type='random'></div><div><label for='crit'>Chance de coup critique (en %)</label><input type='number' data-type='crit'></div><div><label for='heal'>Quantité de soin</label><input type='number' data-type='heal'></div>"
    playerStartId++;
    btn.insertAdjacentElement('beforebegin', newElement);
}

let goodBtn = document.querySelector("#addGoodBtn");
goodBtn.addEventListener("click", () =>
{
    addPlayer(goodBtn);
});

let badBtn = document.querySelector("#addBadBtn");
badBtn.addEventListener("click", () =>
{
    addPlayer(badBtn);
});
