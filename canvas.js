// CREATION DE OBJET DESSIN
var dessin = {

    signature_active : function(e) {
        action = true;
        dessin.signature(e);
    },
    signature_desactive : function() {
        action = false;
        context.beginPath();
    },
    signature : function(e) {
        if (action) {

            context.lineWidth = "6";
            context.strokeStyle = "black";
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();

            context.beginPath();
            context.fillStyle = "black";
            context.arc(e.offsetX, e.offsetY, 3, 0, 2 * Math.PI);
            context.fill();


            context.beginPath();
            context.moveTo(e.offsetX, e.offsetY);
        }
    },
    efface : function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
};

// CREATION DE OBJET BOUTTON
var boutton = {
    annuler_active : function() {
        $("#boutonEffacer, #boutonReserver").on("click", function() {
            dessin.efface();
            $("#boutonReserver").css("display", "none");
        });
    },
    reserver_active : function(station, velo_dispo, status, adresse, place) {
        $("#boutonReserver").on("click", function(){
            $("#station").text(station);
            $("#compteur, #boutonAnnuler, #aide").css("display", "block");
            $("#veloSelect").text(velo_dispo - 1);
            $("#boutonReserver").css("display", "none");
            $("#conteneur_signature").css("display", "none");
            $("#aide").text("Votre vélo est réservé à cette station.").css("margin-top", "");
            $("#infos_encours").css("display", "none");
            //STOCKAGES DES DONNEES DE RESERVATION
            sessionStorage.setItem("station1", station);
            sessionStorage.setItem("status", status);
            sessionStorage.setItem("adresse", adresse);
            sessionStorage.setItem("place", place);
            sessionStorage.setItem("velodispo", velo_dispo);
            stock_station = station;
            stock_velo = velo_dispo;
            compteur.desactive();
            compteur.active();
        });
    },
    annuler : function () {
        $("#boutonAnnuler").on("click", function() {
            compteur.desactive();
            $("#boutonAnnuler").css("display", "none");
            $("#infos_encours").css("display", "block").css("color", "").text("Aucune réservation en cours");
            $("#compteur").css("display", "none");
            if (sessionStorage.getItem("station1") === $("#stationSelect").text()) {
                $("#veloSelect").text(sessionStorage.getItem("velodispo"));
            }
            $("#aide").text("Veuillez selectionner une station sur la carte.").css("margin-top", "").css("display", "block");
            //SUPPRESION DE LA CLE STATION1 POUR AFFICHER LA VRAI VALEUR DES VELOS DISPO LORSQUE LE COMPTEUR EST A ZERO LORS D'UN PROCHAIN CLIQUE D'UNE STATION
            sessionStorage.removeItem("station1");
            // VARIABLE MIN ET SECONDE REMIT À -2 POUR  L'APPARITION DU BLOC DE SIGNATURE
            min = -2;
            seconde = -2;
            // SUPRESSION DU STOCKAGE
            sessionStorage.removeItem("min");
            sessionStorage.removeItem("seconde");
        });
    }
};

// VARIABLE DE STOCKAGE DE LA STATION ET DU NOMBRE DE VELO
var stock_station;
var stock_velo;

// RECUPERATION DU CONTEXTE DU CANVAS
var canvas = $("#canvas").get(0);
var context = canvas.getContext("2d");
var action = false;

// EVENEMENTS POUR LA SIGNATURE DANS LE CANVAS
$("canvas").on({"mousedown" : dessin.signature_active,
                "mousemove" : dessin.signature,
                "click" : function() { $("#boutonReserver, #boutonEffacer").css("display", "block");}});

$("body").on({"mouseup" : dessin.signature_desactive});

// EVENEMENT SUR LE BOUTON EFFACER

boutton.annuler_active();