// CREATION DE OBJET CARTE

var carte = {
    paris : {lat: 48.862725, lng: 2.287592},
    init : function() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: this.paris,
            zoom: 15,
            scrollwheel: false
        })
    },
    centre : function() {
        google.maps.event.addDomListener(window, "resize", function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        })
    },
    creation_marqueur : function (icon, positionLat, positionLng) {
           return new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(positionLat, positionLng),
            icon: icon
        });
    },
    marqueur : function() {
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Paris&apiKey=64d2e253001c347d050bf64f1d8ecb62ddb09ff4", function (reponse) {
            var geoMarqueur = JSON.parse(reponse);
            //VARIABLE POUR ARRETER L'ANIMATION DE L'ANCIEN MARQUEUR
            var lastMarkerClick = false;

            // STOCKAGE DES COORDONNEES DES MARQUEURS
            geoMarqueur.forEach(function (valeur) {
                var positionLat = valeur.position.lat;
                var positionLng = valeur.position.lng;

                // CREATION DES MARQUEURS
                var marker;
                if (valeur.status === "OPEN" && valeur.available_bikes !== 0) {
                     marker = carte.creation_marqueur("icon-map/cyclingblue.png", positionLat, positionLng)
                }
                else if(valeur.status === "OPEN" && valeur.available_bikes === 0){
                    marker = carte.creation_marqueur("icon-map/cyclingorange.png", positionLat, positionLng)
                }
                else {
                    marker = carte.creation_marqueur("icon-map/cyclingred.png", positionLat, positionLng)
                }

                // CREATION DE LA VARIABLE STATION POUR RECUPERER LE STRING ET LA COUPER AVEC LA METHODE SPLIT
                 var station = valeur.name;
                 var stationElt = station.split("-");

                // AJOUT DES EVENEMENTS SUR LES MARQUEURS
                marker.addListener("click", function () {
                    // ANIMATION DU MARQUEUR ET LE CENTRER
                    map.panTo(marker.getPosition());
                    marker.setAnimation(google.maps.Animation.BOUNCE);

                    // STOP ANIMATION DE L'ANCIEN MARQUEUR CLIQUÉ
                    if(lastMarkerClick !== false && lastMarkerClick !== marker){
                        lastMarkerClick.setAnimation(null);
                    }
                    lastMarkerClick = marker;

                    // TRACDUCTION DE LA VALEUR DE OPEN ET CLOSED EN OUVERT ET FERME
                    if (valeur.status === "OPEN") {
                        $("#statutSelect").text("OUVERT !");
                    }
                    else{
                        $("#statutSelect").text("FERMÉ !");

                    }

                    // AJOUT DES CONDITIONS SUIVANT LES VÉLOS DISPONIBLE
                    if(valeur.available_bikes !== 0){
                        // SI LE COMPTEUR ET ACTIVE LE CONTENU DE LA SIGNATURE N'EST PAS DISPONIBLE
                        if (min >= -1 && seconde >= 0) {
                            $("#conteneur_signature").css("display", "none");
                            $("#aide").css("margin-top", "").css("display", "none");
                        }
                        else{
                            $("#conteneur_signature").css("display", "block");
                            $("#aide").css("margin-top", "").css("display", "none");
                        }
                    }
                    else{
                        $("#conteneur_signature").css("display", "none");
                        $("#aide").html("Aucun vélo disponible à cette station <br />Veuillez cliquez sur une autre station").css("margin-top", "100px");
                    }

                    // RECUPERATION DES DONNEES LORS DU CLIQUE SUR LE MARQUEUR
                    stock_stationencours = stationElt[1];
                    $("#stationSelect").text(stationElt[1]);
                    $("#addressSelect").text(valeur.address);
                    $("#placeSelect").text(valeur.available_bike_stands);
                    // AFFICHE LES VELO DISPO - 1 SI ON SE TROUVE SUR LA MEME STATION DE RESERVATION
                    if (sessionStorage.getItem("station1") === stationElt[1]) {
                        if (min >= -1 && seconde >= 0) {
                            $("#veloSelect").text(sessionStorage.getItem("velodispo") - 1);
                            $("#aide").text("Votre vélo est réservé à cette station.").css("display", "block");
                        }
                    }
                    else {
                        $("#veloSelect").text(valeur.available_bikes);
                    }

                    // AJOUT EVENEMENT SUR LE BOUTTON RESERVER ET ENVOIE LES ARGUMENTS POUR LE STOCKAGE EN SESSIONSTORAGE
                    boutton.reserver_active(stationElt[1], valeur.available_bikes, $("#statutSelect").text(), valeur.address, valeur.available_bike_stands);

                    // STOCKAGE DES VALEURS DES STATIONS DANS LE SESSIONSTORAGE
                    sessionStorage.setItem("station", stationElt[1]);
                });
                boutton.annuler(valeur.available_bikes);
            });
        });
    }
};

var stock_stationencours;
var map;
function initMap() {

    // CREATION DE LA CARTE
    carte.init();

    // CENTRAGE DE LA CARTE
    carte.centre();

    // REQUETE ASYNCHRONE VERS API OPEN DATA DE PARIS POUR LA CREATION DES MARQUEURS
    carte.marqueur();
}

