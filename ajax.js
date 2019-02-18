function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();

    req.open("GET", url, true);

    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) { // Le serveur a réussi à traiter la requête
            callback(req.responseText);
        } else {
            // Affichage des informations sur l'échec du traitement de la requête
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });

    req.addEventListener("error", function () {
        // La requête n'a pas réussi à atteindre le serveur
        console.error("Erreur réseau avec url" + url);
    });

    req.send(null);
}