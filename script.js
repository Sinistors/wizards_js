function randomRangeFloat(first, last) {
    return first + (Math.random() * last);
}

function randomRange(first, last) {
    return first + Math.floor(Math.random() * last);
}

class Wizard {
    name;
    hpMax;
    hp;
    minDamage;
    maxDamage;
    
    constructor(name, hpMax, minDamage, maxDamage) 
    {
        this.name = name;
        this.hpMax = hpMax;
        this.hp = this.hpMax;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
    }

    attack(wizard)
    {
        let damage = randomRange(this.minDamage, this.maxDamage);
        wizard.hp -= damage;

        return this.name + " attaque ! " + wizard.name + " a pris " + damage + " dégats !";
    }
}

let wizard1 = new Wizard("Harry", 100, 5, 15);
let wizard2 = new Wizard("Voldemort", 100, 5, 20);

let turn = 0;
while (wizard1.hp > 0 || wizard2.hp > 0)
{
    if (turn % 2 == 0)
    {
        console.log(wizard1.attack(wizard2));
    }
    else
    {
        console.log(wizard2.attack(wizard1));
    }
    turn++;
}