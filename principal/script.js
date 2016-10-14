var data = "";
function test(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){data = JSON.parse(xhr.responseText); return data};
    xhr.onerror = function(){console.log("Erreur requete xhtml")};

    xhr.open("GET","http://localhost/sygolomia/principal/donneeMusique.json",true);
    xhr.send(null);
}
