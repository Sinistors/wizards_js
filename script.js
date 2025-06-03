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
    name;
    house;
    hpMax;
    hp;
    strength;
    randomPercent;
    critChance;
    healAmount;
    isHealed = false;

    constructor(playerId) 
    {
        this.name = document.querySelector("#" + playerId + " input[data-type='name']").value;
        this.house = document.querySelector("#" + playerId + " select[data-type='house']").value;
        this.hpMax = document.querySelector("#" + playerId + " input[data-type='hp']").value;
        this.hp = this.hpMax;
        this.strength = parseFloat(document.querySelector("#" + playerId + " input[data-type='strength']").value);
        this.randomPercent = parseFloat(document.querySelector("#" + playerId + " input[data-type='strength']").value);
        this.critChance = parseFloat(document.querySelector("#" + playerId + " input[data-type='crit']").value);
        this.healAmount = parseFloat(document.querySelector("#" + playerId + " input[data-type='heal']").value);
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


}

document.querySelector("#startBtn").addEventListener("click", async () => 
{
    let wizard1 = new Wizard("player1", 5, 15);
    let wizard2 = new Wizard("player2", 5, 20);


    let fight = document.querySelector("#fightDiv");
    fight.innerHTML = "";

    fight.innerHTML += "<div class='d-flex center-text'><div><h3>" + wizard1.name + "</h3><p>" + wizard1.house + "</p><div id='hpBar1' class='hpBar'><div></div></div></div><div><h3>" + wizard2.name + "</h3><p>" + wizard2.house + "</p><div id='hpBar2' class='hpBar'><div></div></div></div></div>";

    fight.innerHTML += "<h2>Historique du duel :</h2>";

    let historicDiv = document.createElement("div");
    fight.append(historicDiv);

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

        document.querySelector("#hpBar1 div").style.width = wizard1.hp / wizard1.hpMax * 100 + "%";
        document.querySelector("#hpBar2 div").style.width = wizard2.hp / wizard2.hpMax * 100 + "%";



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
