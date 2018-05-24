function calcularOp(numop1, numop2, opnum) {
    var resultop = 0;
    if (numop2 != 0 || numop1 != 0) {
        switch (opnum) {
            case 1:
                resultop = parseFloat(numop1 * numop2);
                break;
            case 2:
                resultop = parseFloat(numop1 + numop2);
                break;
            case 3:
                resultop = parseFloat(numop1 - numop2);
                break;
            case 4:
                resultop = parseFloat(numop1 / numop2);
                break;
            case 5:
                resultop = parseFloat(Math.sqrt(numop1));
        }
    }
    return resultop;
}

function verficaPant(refpant) {
    if (document.getElementById('display').innerHTML.length == 1 && document.getElementById('display').innerHTML == '0') {
        refpant = '';
    }
    return refpant;
}

function cambiarPant(refpant) {
    if (document.getElementById('display').innerHTML.length <= 8) {
        document.getElementsByTagName('span')[1].innerHTML = refpant;
        if (refpant == 'E') {
            refpant = '';
        }
    }
    if (refpant.includes("'")) {
        refpant = refpant.substr(0, refpant.length - 1);
    }
    return refpant;
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
        verPant = '',
            primerOp = 0,
            segundOp = 0,
            resultado = 0,
            operacion = 0;
        document.onkeypress = this.verificaTecla;
        this.asignaClick('img');
    },
    verficarOp: function(duvez) {
        if ((verPant.length >= 1 && parseFloat(verPant) != 0) && (operacion == 0 && primerOp.toString().length <= 8 && !duvez)) {
            primerOp = parseFloat(verPant);
        } else if ((verPant.length >= 1 && parseFloat(verPant) != 0) && (segundOp == 0 && operacion != 0 && parseFloat(primerOp) != 0 && !duvez)) {
            segundOp = parseFloat(verPant);
        } else if (primerOp != 0 && segundOp == 0 && operacion != 0 && duvez) {
            segundOp = primerOp;
        } else if (verPant.length >= 1 && parseFloat(verPant) != 0 && !duvez) {
            primerOp = parseFloat(verPant);
        }
        console.log(primerOp + ' --- ' + segundOp);
    },
    ceroReinico: function() {
        verPant = '0';
        primerOp = 0, segundOp = 0, operacion = 0, otvz = 0;
        document.getElementsByTagName('span')[1].innerHTML = verPant;
        verPant = cambiarPant(verPant);
    },
    puntoDecimal: function() {
        verPant = verficaPant(verPant);
        if (!verPant.includes('.')) {
            if (verPant == '' || verPant == '-') {
                verPant = '0';
            }
            verPant = verPant + '.';
        }
        verPant = cambiarPant(verPant);
    },
    signoNumero: function() {
        verPant = verficaPant(verPant);
        if (Math.sign(parseFloat(verPant)) == -1 && parseFloat(verPant) < 0) {
            verPant = Math.abs(verPant).toString();
        } else if (parseFloat(verPant) > 0) {
            verPant = '-' + Math.abs(verPant).toString();
        } else {
            verPant = '-';
        }
        verPant = cambiarPant(verPant);
    },
    teclaNumClick: function(clkTecla) {
        verPant = verficaPant(verPant);
        if ((clkTecla.target.id >= 0 && clkTecla.target.id <= 9) && (parseFloat(verPant) != 0 || verPant.includes('.')) && verPant.length < 8) {
            verPant = verPant + clkTecla.target.id.toString();
        }
        console.log('Presionaste: ' + clkTecla.target.id.toString() + ' ===> ' + clkTecla.target.id + '---> ' + parseFloat(verPant) + ' - ' + primerOp + ' - ' + segundOp + ' - ' + operacion); // ---> Borrar
        verPant = cambiarPant(verPant);
    },
    teclaOperacion: function(clkTecla) {
        operacion = 0, segundOp = 0;
        Calculadora.verficarOp(false);
        switch (clkTecla.target.id) {
            case 'por':
                operacion = 1;
                break;
            case 'mas':
                operacion = 2;
                break;
            case 'menos':
                operacion = 3;
                break;
            case 'dividido':
                operacion = 4;
                break;
            case 'raiz':
                operacion = 5;
                break;
        }
        if ((parseFloat(verPant) == 0 || verPant == '') && (clkTecla.target.id == 'dividido' || clkTecla.target.id == 'raiz')) {
            verPant = 'E';
        } else {
            verPant = ''
        }
        verPant = cambiarPant(verPant);
    },
    igualClick: function() {
        if (operacion != 0) {
            Calculadora.verficarOp(false);
            if (segundOp == 0) {
                Calculadora.verficarOp(true);
            }
            resultado = calcularOp(primerOp, segundOp, operacion);
            verPant = (parseFloat(resultado.toFixed(7)).toString()).substr(0, 8) + "'";
            verPant = cambiarPant(verPant);
        }
    },
    fxClickDown: function(clkTecla) {
        efectoTecla(clkTecla.target);
    },
    fxClickUp: function(clkTecla) {
        efectoTeclaSoltar(clkTecla.target);
        //console.log(clkTecla.target.id);
    },
    asignaClick: function(e_tecla) {
        var tecla = document.getElementsByTagName(e_tecla);
        for (i = 0; i < tecla.length; i++) {
            tecla[i].onmousedown = this.fxClickDown;
            tecla[i].onmouseup = this.fxClickUp;
            switch (tecla[i].id) {
                case 'on':
                    tecla[i].onclick = this.ceroReinico;
                    break;
                case 'punto':
                    tecla[i].onclick = this.puntoDecimal;
                    break;
                case 'sign':
                    tecla[i].onclick = this.signoNumero;
                case 'igual':
                    tecla[i].onclick = this.igualClick;
                    break;
                default:
                    if (tecla[i].id == 'por' || tecla[i].id == 'mas' || tecla[i].id == 'menos' ||
                        tecla[i].id == 'dividido' || tecla[i].id == 'raiz') {
                        tecla[i].onclick = this.teclaOperacion;
                    } else {
                        tecla[i].onclick = this.teclaNumClick;
                    }
                    break;
            }
        }
    },
    verificaTecla: function(e_tecla) {
        var teclaPres = e_tecla.which || e_tecla.keyCode;
        verPant = verficaPant(verPant);
        if (teclaPres == 13 || (teclaPres >= 42 && teclaPres <= 57) || (teclaPres >= 42 && teclaPres <= 43)) {
            if (teclaPres == 13 && operacion != 0) {
                Calculadora.verficarOp(false);
                if (segundOp == 0) {
                    Calculadora.verficarOp(true);
                }
                resultado = calcularOp(primerOp, segundOp, operacion);
                verPant = (parseFloat(resultado.toFixed(7)).toString()).substr(0, 8) + "'";
            } else if ((teclaPres >= 48 && teclaPres <= 57) && (parseFloat(verPant) != 0 || verPant.includes('.')) && verPant.length < 8) {
                verPant = verPant + String.fromCharCode(teclaPres);
            } else if (teclaPres == 46 && !verPant.includes('.') && verPant.length < 8) {
                if (verPant == '' || verPant == '-') {
                    verPant = '0';
                }
                verPant = verPant + String.fromCharCode(teclaPres);
            } else {
                operacion = 0, segundOp = 0;
                Calculadora.verficarOp(false);
                switch (teclaPres) {
                    case 42:
                        operacion = 1;
                        break;
                    case 43:
                        operacion = 2;
                        break;
                    case 45:
                        operacion = 3;
                        break;
                    case 47:
                        operacion = 4;
                        break;
                }
                if ((parseFloat(verPant) == 0 || verPant == '') && teclaPres == 47) {
                    verPant = 'E';
                } else {
                    verPant = ''
                }
            }
        }
        verPant = cambiarPant(verPant);
    }
}

Calculadora.iniciarCalc();