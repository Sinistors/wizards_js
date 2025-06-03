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

        if (this.hp == 0)
        {
            let deadSymbol = document.createElement("img");
            deadSymbol.src = "Images/human-skull.png";
            deadSymbol.style.width = "50px";
            this.hudElement.append(deadSymbol);
        }
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
        atkStr += "Il lui reste " + wizard.hp.toFixed(2) + " PV";

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
}


document.querySelector("#startBtn").addEventListener("click", async () => 
{
    let wizard1 = new Wizard("player1");
    let wizard2 = new Wizard("player2");


    let fight = document.querySelector("#fightDiv");
    fight.innerHTML = "";

    let hud = document.createElement("div");
    hud.classList.add("d-flex");
    hud.append(wizard1.initHUD());
    hud.append(wizard2.initHUD());
    fight.append(hud);

    fight.innerHTML += "<h2>Historique du duel :</h2>";

    let historicDiv = document.createElement("div");
    fight.append(historicDiv);

    wizard1.getElementsHUD();
    wizard2.getElementsHUD();
    let turn = 0;
    let random = randomRange(1,2)-1;
    while (wizard1.hp > 0 && wizard2.hp > 0) 
    {
        let historic = document.createElement("p");
        if ((turn + random) % 2 == 0) 
        {
            if ((wizard1.hp / wizard1.hpMax) < 0.5 && !wizard1.isHealed)
            {
                historic.innerHTML = wizard1.heal();
            }
            else
            {
                historic.innerHTML = wizard1.attack(wizard2);
            }
        } 
        else 
        {
            if ((wizard2.hp / wizard2.hpMax) < 0.5 && !wizard2.isHealed)
            {
                historic.innerHTML = wizard2.heal();
            }
            else
            {
                historic.innerHTML = wizard2.attack(wizard1);
            }
        }
        historicDiv.prepend(historic);

        wizard1.updateHUD();
        wizard2.updateHUD();



        turn++;
        await sleep(1000);
    }

    let deadPlayerName;
    if (wizard1.hp <= 0)
    {
        deadPlayerName = wizard1.name;
    }
    else if(wizard2.hp <= 0)
    {
        deadPlayerName = wizard2.name;
    }
    const resultElement = document.createElement("p");
    resultElement.innerText = deadPlayerName + " est mort !";
    historicDiv.prepend(resultElement);
});
