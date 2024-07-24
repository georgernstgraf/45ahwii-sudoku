/*
Nature has placed mankind under the governance of two sovereign masters, pain and pleasure. 
It is for them alone to point out what we ought to do.
... By the principle of utility is meant that principle which approves or disapproves of every
action whatsoever according to the tendency it appears to have to augment or diminish the happiness
of the party whose interest is in question: or, what is the same thing in other words to promote or to oppose that happiness.
I say of every action whatsoever, and therefore not only of every action of a private individual, but of every measure of government.

Jeremy Bentham 

http://www.koeblergerhard.de/Fontes/BenthamJeremyMoralsandLegislation1789.pdf#page=43

-->

1. 2 unabhängige parameter der Natur: Schmerz und Glück

diese bestimmen unsere aktionen. Ähnelt dem Hedonismus und Epikureismus. 
(Wobei Hedonismus metaphorisch die helle Flamme die schnell ausbrennt ist 
und der Epikureismus dennoch versuch so lange wie möglich zu brennen
--> Hedonismus: kurzfristiges Glück, Epikureismus: langfristiges Glück)
*/ 

class HomoUtiliarismus {
    constructor() {
        this.pain = 0;
        this.pleasure = 0;
    }
    addPain(pain) {
        this.pain += pain;
    }
    addPleasure(pleasure) {
        this.pleasure += pleasure;
    }

}
let PersonA = new HomoUtiliarismus();

PersonA.addPain(1);
console.log(PersonA.pain)
/*
2. Prinzip der Nützlichkeit:

- jede Handlung wird nach dem Prinzip der Nützlichkeit beurteilt
- Nützlichkeit: Handlung die das Glück fördert, ist nützlich
- Nützlichkeit: Handlung die das Glück mindert, ist nicht nützlich
- Nützlichkeit: Handlung die den Schmerz fördert, ist nicht nützlich
- Nützlichkeit: Handlung die den Schmerz mindert, ist nützlich
3. Das Prinzip der Nützlichkeit gilt für jede Handlung, nicht nur für private Handlungen, sondern auch für Regierungsmaßnahmen
*/





//4. Das Prinzip der Nützlichkeit ist ein moralisches Prinzip, das die Handlungen von Individuen und Regierungen leiten sollte

