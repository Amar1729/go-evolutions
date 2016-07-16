// Calculates each of the respective things
// cs - candies it takes to evolve
// np - # of that pokemon
// nc - # of that candy
function calc(cs, np, nc) {
    // Do naive - evolutions first
    var evolutions = Math.floor(nc / cs);
    var remainder_candies = nc % cs;
    var to_transfer = 0;
    var remainder_pokemon = np;
    
    // Figure out how much to take when starting off (one time) to get a nice multiple of cs
    if ( /*(cs - remainder_candies > 0) &&*/
            (cs - remainder_candies) < (remainder_pokemon - evolutions)) {
        to_transfer += cs - remainder_candies;
        remainder_candies += cs - remainder_candies;
        remainder_pokemon -= cs - remainder_candies;
        
        evolutions += 1;
        remainder_candies += 1;
        remainder_pokemon -= 1;
    }

/*
    // Fix possible #pokemon >> candy issues
    while ( remainder_pokemon > cs && remainder_candies < cs) {
        // Count the evolution
        to_transfer += cs;
        remainder_pokemon -= cs;
        remainder_candies += cs;
        
        evolutions += 1;
        remainder_candies += 1;
        remainder_pokemon -= 1;

        // Do the evolution
        //evolutions -= 1;
        remainder_candies -= cs;
    }
//*/


    
    //var remainder_pokemon = np - evolutions - to_transfer;
    //remainder_pokemon = remainder_pokemon - evolutions - to_transfer;
    //remainder_candies += evolutions;

    // Then re-optimize based on remainder_candies and remainder_pokemon
    if (remainder_pokemon>0 && remainder_candies>0) {
        while (remainder_candies > cs) {
            evolutions += 1;
            remainder_pokemon -= 1;

            remainder_candies -= cs;
            remainder_candies += 1;     // evo gives one candy back
        }
        if ((cs - remainder_candies) < (remainder_pokemon - evolutions)) {
            evolutions += 1;
            remainder_pokemon -= 1;
            remainder_candies += 1;

            to_transfer += cs - remainder_candies;
            remainder_pokemon -= to_transfer;
            remainder_candies += cs - remainder_candies;
        }
    }

    return {
        evolve : evolutions,
        transfer : to_transfer,
        rem_candies : remainder_candies,
        rem_pokes : remainder_pokemon
    };
}

function FillOut() {
    // 12 candies
    var pidgey_np = document.getElementById("pidgey_num").value;
    var pidgey_nc = document.getElementById("pidgey_candies").value;
    var pidgey = calc(12, parseInt(pidgey_np), parseInt(pidgey_nc));
    document.getElementById("pidgey_evo").textContent = pidgey.evolve;
    document.getElementById("pidgey_transfer").textContent = pidgey.transfer;
    document.getElementById("pidgey_remp").textContent = pidgey.rem_pokes;
    document.getElementById("pidgey_remc").textContent = pidgey.rem_candies;

    var weedle_np = document.getElementById("weedle_num").value;
    var weedle_nc = document.getElementById("weedle_candies").value;
    var weedle = calc(12, weedle_np, weedle_nc);
    document.getElementById("weedle_evo").textContent = weedle.evolve;
    document.getElementById("weedle_transfer").textContent = weedle.transfer;
    document.getElementById("weedle_remp").textContent = weedle.rem_pokes;
    document.getElementById("weedle_remc").textContent = weedle.rem_candies;

    var caterpie_np = document.getElementById("caterpie_num").value;
    var caterpie_nc = document.getElementById("caterpie_candies").value;
    var caterpie = calc(12, caterpie_np, caterpie_nc);
    document.getElementById("caterpie_evo").textContent = caterpie.evolve;
    document.getElementById("caterpie_transfer").textContent = caterpie.transfer;
    document.getElementById("caterpie_remp").textContent = caterpie.rem_pokes;
    document.getElementById("caterpie_remc").textContent = caterpie.rem_candies;

    // 25 candies
    var rattata_np = document.getElementById("rattata_num").value;
    var rattata_nc = document.getElementById("rattata_candies").value;
    var rattata = calc(25, rattata_np, rattata_nc);
    document.getElementById("rattata_evo").textContent = rattata.evolve;
    document.getElementById("rattata_transfer").textContent = rattata.transfer;
    document.getElementById("rattata_remp").textContent = rattata.rem_pokes;
    document.getElementById("rattata_remc").textContent = rattata.rem_candies;

    var eevee_np = document.getElementById("eevee_num").value;
    var eevee_nc = document.getElementById("eevee_candies").value;
    var eevee = calc(25, eevee_np, eevee_nc);
    document.getElementById("eevee_evo").textContent = eevee.evolve;
    document.getElementById("eevee_transfer").textContent = eevee.transfer;
    document.getElementById("eevee_remp").textContent = eevee.rem_pokes;
    document.getElementById("eevee_remc").textContent = eevee.rem_candies;

    // 50 candies
    var spearow_np = document.getElementById("spearow_num").value;
    var spearow_nc = document.getElementById("spearow_candies").value;
    var spearow = calc(50, spearow_np, spearow_nc);
    document.getElementById("spearow_evo").textContent = spearow.evolve;
    document.getElementById("spearow_transfer").textContent = spearow.transfer;
    document.getElementById("spearow_remp").textContent = spearow.rem_pokes;
    document.getElementById("spearow_remc").textContent = spearow.rem_candies;

    var zubat_np = document.getElementById("zubat_num").value;
    var zubat_nc = document.getElementById("zubat_candies").value;
    var zubat = calc(50, zubat_np, zubat_nc);
    document.getElementById("zubat_evo").textContent = zubat.evolve;
    document.getElementById("zubat_transfer").textContent = zubat.transfer;
    document.getElementById("zubat_remp").textContent = zubat.rem_pokes;
    document.getElementById("zubat_remc").textContent = zubat.rem_candies;

    var venonat_np = document.getElementById("venonat_num").value;
    var venonat_nc = document.getElementById("venonat_candies").value;
    var venonat = calc(50, venonat_np, venonat_nc);
    document.getElementById("venonat_evo").textContent = venonat.evolve;
    document.getElementById("venonat_transfer").textContent = venonat.transfer;
    document.getElementById("venonat_remp").textContent = venonat.rem_pokes;
    document.getElementById("venonat_remc").textContent = venonat.rem_candies;
}
