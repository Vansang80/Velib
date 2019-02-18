// CREATION DE OBJET COMPTEUR
// VARIABLE SET POUR STOCKER LA REPETITION
var set;
var compteur = {
    //ACTIVE LE COMPTEUR
    active : function() {
        if(min >= 0 && seconde > 0) {
            seconde--;
            sessionStorage.setItem("seconde", seconde);
            sessionStorage.setItem("min", min);

            $("#temps").text(min +  " minute" + (min > 1 ? "s" : "") + " et " + seconde + " seconde" + (seconde > 1 ? "s" : ""));
            if(seconde === 0){
                min--;
                seconde = 60;
            }
            set = setTimeout(compteur.active, 1000);
        }
        else{
            $("#infos_encours").text("Votre réservation est expirée, cliquez à nouveau sur une station pour réserver votre velib !").css("display", "block").css("color", "red");
            $("#compteur, #boutonAnnuler").css("display", "none");
            if (stock_station === stock_stationencours) {
                $("#veloSelect").text(sessionStorage.getItem("velodispo"));
            }
            $("#aide").text("Veuillez selectionner une station sur la carte");
            //SUPPRESION DE LA CLE STATION1 POUR AFFICHER LA VRAI VALEUR DES VELOS DISPO LORSQUE LE COMPTEUR EST A ZERO LORS D'UN PROCHAIN CLIQUE D'UNE STATION
            sessionStorage.removeItem("station1");
            // VARIABLE MIN ET SECONDE REMIT À -2 POUR  L'APPARITION DU BLOC DE SIGNATURE
            min = -2;
            seconde = -2;
        }
    },
    //SUPPRIME LA REPETITION ET REMET LE COMPTEUR A ZERO
    desactive : function () {
        clearTimeout(set);
        min = 19;
        seconde = 60;
    }
};

// VARIABLE POUR LES MINUTES ET SECONDES
var min;
var seconde;

// SESSIONSTORAGE
// VARIABLE POUR LE STOCKAGE DES MINUTES ET SECONDES
var stock_s = sessionStorage["seconde"];
var stock_m = sessionStorage["min"];

// REAFFICHER LE COMPTEUR LA OU IL S'EST ARRETE
if (stock_s > 0 && stock_m >= 0) {
    //REMET LA VARIABLE MIN ET SECONDE LORS DU RAFRAICHISSEMENT POUR RELANCER LE COMPTEUR OU IL S'EST ARRETE
    seconde = stock_s;
    min = stock_m;
    compteur.active();
    // REAFRICHE DANS LE DOM LES DONNEES DE RESERVATION GRACE AU SESSIONSTORAGE
    $("#infos_encours").css("display", "none");
    $("#compteur, #boutonAnnuler").css("display", "block");
    $("#station").text(sessionStorage.getItem("station"));
    $("#stationSelect").text(sessionStorage.getItem("station1"));
    $("#statutSelect").text(sessionStorage.getItem("status"));
    $("#addressSelect").text(sessionStorage.getItem("adresse"));
    $("#placeSelect").text(sessionStorage.getItem("place"));
    $("#veloSelect").text(sessionStorage.getItem("velodispo") -1);
    $("#aide").css("display", "block").text("Votre vélo est réservé à cette station.");
}

// SI LE COMPTEUR EST ARRETE
if (stock_s == 0 && stock_m == 0) {
    $("#compteur").css("display", "none");
    $("#infos_encours").text("Aucune réservation en cours").css("display", "block").css("color", "black");
}