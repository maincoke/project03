function calcularOp(numop1, numop2, opnum) {
    var resultop = 0;
    if (numop2 != 0 && numop1 != 0) {
        switch (opnum) {
            case 1:
                return resultop = parseFloat(numop1 * numop2);
            case 2:
                return resultop = parseFloat(numop1 + numop2);
            case 3:
                return resultop = parseFloat(numop1 - numop2);
            case 4:
                return resultop = parseFloat(numop1 / numop2);
        }
    } else {
        return resultop = 0;
    }
}

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
    resultado: 0,
    operacion: 0,
    iniciarCalc: function() {
        primerOp = 0,
            segundOp = 0,
            resultado = 0,
            operacion = 0
        document.onkeypress = this.verificaTecla;
        this.asignaClick('img');
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
                    if (verPant == '' || verPant == '-') {
                        verPant = '0';
                    }
                    verPant = verPant + '.';
                }
                break;
            case 'sign':
                if (Math.sign(parseFloat(verPant)) == -1 && parseFloat(verPant) < 0) {
                    verPant = Math.abs(verPant).toString();
                } else if (parseFloat(verPant) > 0) {
                    verPant = '-' + Math.abs(verPant).toString();
                } else {
                    verPant = '-';
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
    fxClickUp: function(clkTecla) {
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
                primerOp = 0, segundOp = 0;
            } else if ((teclaPres >= 48 && teclaPres <= 57) && (parseFloat(verPant) != 0 || verPant.includes('.'))) {
                verPant = verPant + String.fromCharCode(teclaPres);
            } else if (teclaPres == 46 && !verPant.includes('.')) {
                if (verPant == '' || verPant == '-') {
                    verPant = '0';
                }
                verPant = verPant + String.fromCharCode(teclaPres);
            } else {
                if ((verPant.length >= 1 && parseFloat(verPant) != 0) && parseFloat(primerOp) != 0) {
                    segundOp = parseFloat(verPant);
                } else if ((verPant.length >= 1 && parseFloat(verPant) != 0) && parseFloat(segundOp) == 0) {
                    primerOp = parseFloat(verPant);
                }
                switch (teclaPres) {
                    case 42:
                        operacion = 1;
                        //resultado =
                        console.log('Multiplicando***'); // ---> Borrar
                        verPant = ''
                        break;
                    case 43:
                        operacion = 2;
                        console.log('Sumando+++'); // ---> Borrar
                        verPant = ''
                        break;
                    case 45:
                        operacion = 3;
                        console.log('Restando---'); // ---> Borrar
                        verPant = ''
                        break;
                    case 47:
                        if (parseFloat(verPant) == 0 || verPant == '') {
                            verPant = 'E';
                        } else {
                            operacion = 4;
                            console.log('Dividiendo///'); // ---> Borrar
                            verPant = ''
                        }
                        break;
                }
            }
            console.log('Presionaste: ' + String.fromCharCode(teclaPres) + ' = ' + teclaPres + '---> ' + parseFloat(verPant) + ' - ' + primerOp + ' - ' + segundOp); // ---> Borrar
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