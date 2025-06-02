function randomRangeFloat(first, last) {
    return first + Math.random() * last;
}
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function randomRange(first, last) {
    return first + Math.floor(Math.random() * last);
}

class Wizard 
{
    name;
    house;
    hpMax;
    hp;
    minDamage;
    maxDamage;

    constructor(playerId, hpMax, minDamage, maxDamage) 
    {
        this.name = document.querySelector("#" + playerId + " input[data-type='name']").value;
        this.house = document.querySelector("#" + playerId + " select[data-type='house']").value;
        this.hpMax = hpMax;
        this.hp = this.hpMax;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
    }

    attack(wizard) 
    {
        let damage = randomRange(this.minDamage, this.maxDamage);
        wizard.hp -= damage;

        return this.name + " attaque ! " + wizard.name + " a pris " + damage + " dégats ! Il lui en reste " + wizard.hp;
    }


}

document.querySelector("#startBtn").addEventListener("click", async () => 
{
    let wizard1 = new Wizard("player1", 100, 5, 15);
    let wizard2 = new Wizard("player2", 100, 5, 20);


    let fight = document.querySelector("#fightDiv");
    fight.innerHTML = "";

    fight.innerHTML += "<div class='d-flex center-text'><div><h3>" + wizard1.name + "</h3><p>" + wizard1.house + "</p><div id='hpBar1' class='hpBar'><div></div></div></div><div><h3>" + wizard2.name + "</h3><p>" + wizard2.house + "</p><div id='hpBar2' class='hpBar'><div></div></div></div></div>";

    fight.innerHTML += "<h2>Historique du duel :</h2>";

    let turn = 0;
    let random = randomRange(1,2)-1;
    while (wizard1.hp > 0 && wizard2.hp > 0) 
    {
        let historic = document.createElement("p");
        if ((turn + random) % 2 == 0) 
        {
            historic.innerText = wizard1.attack(wizard2);
        } 
        else 
        {
            historic.innerText = wizard2.attack(wizard1);
        }
        fight.append(historic);
        document.querySelector("#hpBar1 div").style.width = wizard1.hp / wizard1.hpMax * 100 + "%";
        document.querySelector("#hpBar2 div").style.width = wizard2.hp / wizard2.hpMax * 100 + "%";



        turn++;
        await sleep(1000);
    }

    let deadPlayerName;
    if (wizard1.hp < 0)
    {
        deadPlayerName = wizard1.name;
    }
    else if(wizard2.hp < 0)
    {
        deadPlayerName = wizard2.name;
    }
    const resultElement = document.createElement("p");
    resultElement.innerText = deadPlayerName + " est mort !";
    fight.append(resultElement);
});
