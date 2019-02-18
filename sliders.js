// CREATION DE OBJET SLIDER
var sliders = {
    decalage : 0,
    // GESTION DU DECALAGE DU SLIDER
    mouvement : function(decalage) {
        var repete = false;
        if (!repete) {
            repete = true;
            $("#sliders").animate({left: decalage + "%"}, 1000, "swing", function () {
                 repete = false;
            });
        }
    },
    // GESTION DES COULEURS DES BOUTONS PAGINATION DU SLIDER
    bouton_couleur : function(decalage) {
        if (decalage === 0) {
            $(".bouton").css("background-color", "white");
            $("#bouton1").css("background-color", "blue");

        }
        else if (decalage === -100) {
            $(".bouton").css("background-color", "white");
            $("#bouton2").css("background-color", "blue");
        }
        else if (decalage === -200) {
            $(".bouton").css("background-color", "white");
            $("#bouton3").css("background-color", "blue");
        }
        else {
            $(".bouton").css("background-color", "white");
            $("#bouton4").css("background-color", "blue");
        }
    }
};

// FONCTIONNALITE DU SLIDER
$(document).ready(function () {
    // INITIALISATION DU DECALGE À 0
    var decalage = sliders.decalage;

    // AJOUT DE L'EVENEMENT KEYDOWN SUR LES TOUCHES FLECHE GAUCHE ET DROIT
    $("body").on("keydown", function (event) {
        if(decalage >= -300 && decalage <= 0) {
            if (event.which === 37) {
                decalage += 100;
                if (decalage <= 0) {
                    sliders.mouvement(decalage);
                    sliders.bouton_couleur(decalage);
                }
                else{
                    decalage = 0;
                }
            }
            else if (event.which === 39) {
                decalage -= 100;
                if (decalage >= -300) {
                    sliders.mouvement(decalage);
                    sliders.bouton_couleur(decalage);
                }
                else{
                    decalage = -300;
                }
            }
        }
    });

    // AJOUT DES L'EVENEMENTS SUR LES FLECHE DU SLIDERS
    $("#bouton-gauche").on("click", function() {
        if(decalage >= -300 && decalage <= 0) {
            decalage += 100;
            if (decalage <= 0) {
                sliders.mouvement(decalage);
                sliders.bouton_couleur(decalage);
            }
            else {
                decalage = 0;
            }
        }
    });

    $("#bouton-droit").on("click", function() {
        if(decalage >= -300 && decalage <= 0) {
            decalage -= 100;
            if (decalage >= -300) {
                sliders.mouvement(decalage);
                sliders.bouton_couleur(decalage);
            }
            else {
                decalage = -300;
            }
        }
    });

    // AJOUT DE L'EVENEMENT CLICK SUR LES BOUTONS DE PAGINATION
    $("#bouton1").on("click", function() {
        decalage = 0;
        sliders.mouvement(decalage);
        sliders.bouton_couleur(decalage);
    });

    $("#bouton2").on("click", function() {
        decalage = -100;
        sliders.mouvement(decalage);
        sliders.bouton_couleur(decalage);
    });

    $("#bouton3").on("click", function() {
        decalage = -200;
        sliders.mouvement(decalage);
        sliders.bouton_couleur(decalage);
    });

    $("#bouton4").on("click", function() {
        decalage = -300;
        sliders.mouvement(decalage);
        sliders.bouton_couleur(decalage);
    });
});