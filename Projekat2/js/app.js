
//funkcija za dodavanje obaveza i pojedinacno brisanje


window.onload = function() {
    if (localStorage.length !== 0) {
        document.getElementById("list").innerHTML = localStorage.getItem("listaUStoridzu");
        } else {
    document.getElementById("list").innerHTML = "";
    }
}

    function dodajObavezu() {
        let lista = document.getElementById("list");
        let unetaObaveza = document.getElementById("inputObaveza").value;
        if (unetaObaveza != "") { 
        let stavka = document.createElement("li");
        let tekstStavke = document.createTextNode(unetaObaveza);

        //kreiranje "x" elementa za brisanje stavke
        let obrisi = document.createElement("strong");
        let x = document.createTextNode("x");
        obrisi.appendChild(x);
        let izolujTekstStavke = document.createElement("span");
        izolujTekstStavke.appendChild(tekstStavke);
        stavka.appendChild(izolujTekstStavke);
        stavka.appendChild(obrisi);
        lista.appendChild(stavka);

        let obrisiKlik = document.getElementsByTagName("strong");
        for (let i = 0; i < obrisiKlik.length; i++) {
        obrisiKlik[i].addEventListener("click", function() {
        this.parentElement.remove();
        });
    }

    } else {
        alert("Prvo morate popuniti polje");
    }
    dodajUStoridz(lista.innerHTML);
    
}

function dodajUStoridz (lista) {
    localStorage.setItem('listaUStoridzu', lista);
    obrisiStavku(strong);

}

//obrisi stavku

        


function filtriraj() {
    let poljeZaPretragu = document.getElementById("inputFilter");
    let filter = poljeZaPretragu.value.toUpperCase();
    let sveStavke = document.getElementsByTagName("span");
    for (i = 0; i < sveStavke.length; i++) {
        if (sveStavke[i].innerHTML.toUpperCase().indexOf(filter) != -1) {
            sveStavke[i].parentElement.style.display = "";
    } else sveStavke[i].parentElement.style.display = "none"
  }
}

function obrisiSve() {
    let potvrda = confirm("Jeste li sigurni da zelite da obrisete sve?");
    let sveStavke = document.getElementsByTagName("li");
    if (potvrda === true) {
        while (sveStavke[0]) sveStavke[0].parentNode.removeChild(sveStavke[0]);
        localStorage.removeItem("listaUStoridzu");
    }
}





