function efectoTecla(tecla) {
    tecla.style.padding = "2px";
    tecla.style.background = "#858080";
    tecla.style.border = "solid 2px #858080";
    tecla.style.borderRadius = "15px";
}

function efectoTeclaSoltar(tecla) {
    tecla.style.padding = "0px";
    tecla.style.background = "";
    tecla.style.border = "";
    tecla.style.borderRadius = "0px";
}

var Calculadora = {
    verPant: '',
    primerOp: 0,
    segundOp: 0,
    auxiliar: 0,
    operacion: 0,
    iniciarCalc: function() {
        console.log('Iniciando Calculadora...!'); // ---> Borrar
        document.onkeypress = this.verificaTecla;
        this.asignaClick('img');
        /*document.getElementById('on').onclick = this.aCeroYprender;
        document.getElementById('1').onclick = this.verificaClick;
        document.getElementById('2').onclick = this.verificaClick;*/
    },
    teclaClick: function(clkTecla) {
        if (document.getElementById('display').innerHTML.length == 1 && document.getElementById('display').innerHTML == '0') {
            verPant = '';
        }
        switch (clkTecla.path[0].id) {
            case 'on':
                verPant = '0';
                document.getElementsByTagName('span')[1].innerHTML = verPant;
                break;
            case 'punto':
                if (!verPant.includes('.')) {
                    if (verPant == '') {
                        verPant = '0';
                    }
                    verPant = verPant + '.';
                }
                break;
            default:
                console.log(clkTecla.path[0].id); // ---> Borrar
                verPant = verPant + clkTecla.path[0].id.toString();
                break;
        }
        if (document.getElementById('display').innerHTML.length < 9) {
            document.getElementsByTagName('span')[1].innerHTML = verPant;
            if (verPant == 'E') {
                verPant = '';
            }
        }
    },
    fxClickDown: function(clkTecla) {
        efectoTecla(clkTecla.target);
    },
    fxClikcUp: function(clkTecla) {
        efectoTeclaSoltar(clkTecla.target);
    },
    asignaClick: function(e_tecla) {
        var tecla = document.getElementsByTagName(e_tecla);
        for (i = 0; i < tecla.length; i++) {
            tecla[i].onmousedown = this.fxClickDown;
            tecla[i].onmouseup = this.fxClickUp;
            tecla[i].onclick = this.teclaClick;
        }
    },
    verificaTecla: function(e_tecla) {
        var teclaPres = e_tecla.which || e_tecla.keyCode;
        if (document.getElementById('display').innerHTML.length == 1 && document.getElementById('display').innerHTML == '0') {
            verPant = '';
        }
        if (teclaPres == 13 || (teclaPres >= 45 && teclaPres <= 57) || (teclaPres >= 42 && teclaPres <= 43)) {
            if (teclaPres == 13) {
                console.log('Presionaste Enter...'); // ---> Borrar
            } else if (teclaPres >= 49 && teclaPres <= 57) {
                verPant = verPant + String.fromCharCode(teclaPres);
            } else {
                switch (teclaPres) {
                    case 42:
                        if (verPant.length >= 1 && parseFloat(verPant) != 0) {
                            primerOp = parseFloat(verPant);
                            operacion = 1;
                            console.log('Multiplicando***'); // ---> Borrar
                        }
                        break;
                    case 43:
                        primerOp = parseFloat(verPant);
                        if (verPant.length > 1 && primerOp != 0) {
                            operacion = 2;
                            console.log('Sumando+++'); // ---> Borrar
                        }
                        break;
                    case 45:
                        if (verPant.includes('-')) {
                            verPant = Math.abs(verPant).toString();
                        } else if (verPant == '') {
                            verPant = verPant + String.fromCharCode(teclaPres);
                        } else {
                            primerOp = parseFloat(verPant);
                            operacion = 3;
                            console.log('Restando---'); // ---> Borrar
                        }
                        break;
                    case 47:
                        if (parseFloat(verPant) == 0 || verPant == '') {
                            verPant = 'E';
                        } else {
                            primerOp = parseFloat(verPant);
                            operacion = 3;
                            console.log('Dividiendo///'); // ---> Borrar
                        }
                        break;
                    case 48:
                        if (parseFloat(verPant) != 0 || verPant.includes('.')) {
                            verPant = verPant + String.fromCharCode(teclaPres);
                        }
                }
                if (teclaPres == 46 && !verPant.includes('.')) {
                    if (verPant == '') {
                        verPant = '0';
                    }
                    verPant = verPant + String.fromCharCode(teclaPres);
                }
            }
            console.log('Presionaste: ' + String.fromCharCode(teclaPres) + ' = ' + teclaPres + '---> ' + parseFloat(verPant)); // ---> Borrar
            if (document.getElementById('display').innerHTML.length < 9) {
                document.getElementsByTagName('span')[1].innerHTML = verPant;
                if (verPant == 'E') {
                    verPant = '';
                }
            }
        }
    }
}

Calculadora.iniciarCalc();