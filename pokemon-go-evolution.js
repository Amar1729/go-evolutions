// Calculate on input change
window.addEventListener("input", function(event) {
    FillOut(event.target.parentElement);
});

// Calculate on page load
window.addEventListener("DOMContentLoaded", function(event) {
    FillOut();
});

function inputValid(inputs) {
    var inputs_valid = true;

    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].value.length) {
            inputs_valid = false;
            inputs[i].style.boxShadow = "0 0 5px #ff4040";
        } else
            inputs[i].style.boxShadow = "0 0 5px lightgreen";
    }

    return inputs_valid;
}

// Calculates each of the respective things
// cs - candies it takes to evolve
// np - # of that pokemon
// nc - # of that candy
function calc(cs, np, nc) {
    cs = parseInt(cs);
    np = parseInt(np);
    nc = parseInt(nc);
    if (isNaN(cs))
        cs = 0;
    if (isNaN(np))
        np = 0;
    if (isNaN(nc))
        nc = 0;
    // Do naive - evolutions first
    var evolutions = Math.floor(nc / cs);   // possible evolutions at start
    var remainder_candies = nc % cs;
    var to_transfer = 0;
    var remainder_pokemon = np;

    // Approach 2 ... just count candies
    // Keep running while loop until we don't have enough candies ... ?
    var current_candies = nc;
    var evos = 0;
    while ( remainder_pokemon > 0 ) {

        if ( current_candies >= cs ) {
            // Do an evolution
            current_candies -= cs;
            evos += 1;
            current_candies += 1;
            remainder_pokemon -= 1;
        }

        // Transfer pokemon if candies are the limiting case
        if ( current_candies < cs ) {
            var deficit = cs - current_candies;
            if ( remainder_pokemon >= deficit ) {
                current_candies += deficit;
                to_transfer += deficit;
                remainder_pokemon -= deficit;
            }
            else
                break;
        }
    }

    return {
        evolve : evos,
        transfer : to_transfer,
        rem_candies : current_candies,
        rem_pokes : remainder_pokemon
    };
}

function FillOut(pokemon) {
    if (pokemon) {
        if (inputValid([pokemon.children[1], pokemon.children[3]])) {
            var np = pokemon.children[1].value;
            var nc = pokemon.children[3].value;
            var needed_candies;
            if (document.getElementById("sec-1").contains(pokemon))
                needed_candies = 12;
            else if (document.getElementById("sec-2").contains(pokemon))
                needed_candies = 25;
            else if (document.getElementById("sec-3").contains(pokemon))
                needed_candies = 50;

            var cur_pokemon = calc(needed_candies, np, nc);
            pokemon.children[4].textContent = cur_pokemon.transfer;
            pokemon.children[5].textContent = cur_pokemon.evolve;
            pokemon.children[6].textContent = cur_pokemon.rem_pokes;
            pokemon.children[7].textContent = cur_pokemon.rem_candies;
        }
    }
    else {
        pokemon = document.getElementsByClassName("row");

        for (var i = 0; i < pokemon.length; i++) {
            if (inputValid([pokemon[i].children[1], pokemon[i].children[3]])) {
                var np = pokemon[i].children[1].value;
                var nc = pokemon[i].children[3].value;
                var needed_candies;
                if (document.getElementById("sec-1").contains(pokemon[i]))
                    needed_candies = 12;
                else if (document.getElementById("sec-2").contains(pokemon[i]))
                    needed_candies = 25;
                else if (document.getElementById("sec-3").contains(pokemon[i]))
                    needed_candies = 50;

                var cur_pokemon = calc(needed_candies, np, nc);
                pokemon[i].children[4].textContent = cur_pokemon.transfer;
                pokemon[i].children[5].textContent = cur_pokemon.evolve;
                pokemon[i].children[6].textContent = cur_pokemon.rem_pokes;
                pokemon[i].children[7].textContent = cur_pokemon.rem_candies;
            }
        }
    }
}
