// **++--// ---> Objeto-Modulo que realiza la operatividad y funcionalidad de la Calculadora <--- //--++** //
var Calculadora = {
    verPant: '',
    primerOp: 0,
    segundOp: 0,
    resultado: 0,
    operacion: 0,
    // ---> Funcion Nativa que inicia la operatividad de Calculadora <--- //
    iniciarCalc: function() {
        verPant = '',
            primerOp = 0,
            segundOp = 0,
            resultado = 0,
            operacion = 0;
        document.onkeypress = this.verificaTecla;
        this.asignaClick('img');
    },
    // ---> Funcion que calcula las operaciones aritmeticas de la calculadora <--- //
    calcularOp: function(numop1, numop2, opnum) {
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
    },
    // ---> Funcion Nativa que verifica los operandos en cada operacion aritmetica <--- //
    verficarOp: function(duvez) {
        if ((verPant.length >= 1 && parseFloat(verPant) != 0) && (operacion == 0 && primerOp.toString().length <= 9 && !duvez)) {
            primerOp = parseFloat(verPant);
        } else if ((verPant.length >= 1 && parseFloat(verPant) != 0) && (segundOp == 0 && operacion != 0 && parseFloat(primerOp) != 0 && !duvez)) {
            segundOp = parseFloat(verPant);
        } else if (primerOp != 0 && segundOp == 0 && operacion != 0 && duvez) {
            segundOp = primerOp;
        } else if (verPant.length >= 1 && parseFloat(verPant) != 0 && !duvez) {
            primerOp = parseFloat(verPant);
        }
    },
    // ---> Funciones de cambio y actualización de la Pantalla de la Calculadora <--- //
    verficaPant: function(refpant) {
        if (document.getElementById('display').innerHTML.length == 1 && document.getElementById('display').innerHTML == '0') {
            refpant = '';
        }
        return refpant;
    },
    cambiarPant: function(refpant) {
        if (document.getElementById('display').innerHTML.length <= 9) {
            document.getElementsByTagName('span')[1].innerHTML = refpant;
            if (refpant == 'E') {
                refpant = '';
            }
        }
        if (refpant.includes("'")) {
            refpant = refpant.substr(0, refpant.length - 1);
        }
        return refpant;
    },
    // **** // ---> Funciones del evento Click de las Teclas de la Calculadora <--- // **** //
    // ---> Tecla Cero(On/C): Funcion que reinicia y coloca en Cero la Calculadora <--- //
    ceroReinico: function() {
        verPant = '0';
        primerOp = 0, segundOp = 0, operacion = 0, otvz = 0;
        document.getElementsByTagName('span')[1].innerHTML = verPant;
        verPant = Calculadora.cambiarPant(verPant);
    },
    // ---> Tecla Punto(.): Funcion que coloca el punto decimal y verifica si ya existe el punto en cifra operando <--- //
    puntoDecimal: function() {
        verPant = Calculadora.verficaPant(verPant);
        if (!verPant.includes('.')) {
            if (verPant == '' || verPant == '-') {
                verPant = '0';
            }
            verPant = verPant + '.';
        }
        verPant = Calculadora.cambiarPant(verPant);
    },
    // ---> Tecla Signo(+/-): Funcion que asigna y retira el signo negativo en la cifra operando <--- //
    signoNumero: function() {
        verPant = Calculadora.verficaPant(verPant);
        if (Math.sign(parseFloat(verPant)) == -1 && parseFloat(verPant) < 0) {
            verPant = Math.abs(verPant).toString();
        } else if (parseFloat(verPant) > 0) {
            verPant = '-' + Math.abs(verPant).toString();
        } else {
            verPant = '-';
        }
        verPant = Calculadora.cambiarPant(verPant);
    },
    // ---> Teclas Numericas(0) al (9): Funcion que agrega los numeros del 0 al 9 en la cifra operando <--- //
    teclaNumClick: function(clkTecla) {
        verPant = Calculadora.verficaPant(verPant);
        if ((clkTecla.target.id >= 0 && clkTecla.target.id <= 9) && (parseFloat(verPant) != 0 || verPant.includes('.')) && verPant.length < 9) {
            verPant = verPant + clkTecla.target.id.toString();
        }
        verPant = Calculadora.cambiarPant(verPant);
    },
    /* / ---> Tecla Multiplicar(x) > Sumar(+) > Restar(-) > Dividir(:) > Raiz Cuadrada(\/¨):
            Funcion que se ejecuta en cada una de las teclas de operaciones aritmeticas <--- / */
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
        verPant = Calculadora.cambiarPant(verPant);
    },
    // ---> Tecla Igual(=): Funcion que ejecuta la operacion aritmetica y proporciona el resultado de la operacion <--- //
    // Realiza ejecucion y verificacion de operacion Flash(Rapida) y Repeat(Repite operacion con 2do operando) //
    igualClick: function() {
        if (operacion != 0) {
            Calculadora.verficarOp(false);
            if (segundOp == 0) {
                Calculadora.verficarOp(true);
            }
            resultado = Calculadora.calcularOp(primerOp, segundOp, operacion);
            if (resultado < -9999999 || resultado > 99999999) {
                verPant = 'E' + (parseFloat(resultado.toFixed(7)).toString()).substr(0, 8) + "'";
                primerOp = 0, segundOp = 0, operacion = 0;
            } else {
                verPant = (parseFloat(resultado.toFixed(7)).toString()).substr(0, 9) + "'";
            }
        }
        verPant = Calculadora.cambiarPant(verPant);
    },
    // ---> Funciones para el efecto de tecla presionada en las Teclas de la Calculadora (Hacer click en tecla) <--- //
    efectoTecla: function(tecla) {
        tecla.target.style.padding = "2px";
        tecla.target.style.background = "#858080";
        tecla.target.style.border = "solid 2px #858080";
        tecla.target.style.borderRadius = "15px";
    },
    efectoTeclaSoltar: function(tecla) {
        tecla.target.style.padding = "0px";
        tecla.target.style.background = "";
        tecla.target.style.border = "";
        tecla.target.style.borderRadius = "0px";
    },
    // ---> Funcion que realiza la asignacion de la funciones de cada tecla de la Calculadora <--- //
    asignaClick: function(e_tecla) {
        var tecla = document.getElementsByTagName(e_tecla);
        for (i = 0; i < tecla.length; i++) {
            tecla[i].onmousedown = this.efectoTecla;
            tecla[i].onmouseup = this.efectoTeclaSoltar;
            switch (tecla[i].id) {
                case 'on':
                    tecla[i].onclick = this.ceroReinico;
                    break;
                case 'punto':
                    tecla[i].onclick = this.puntoDecimal;
                    break;
                case 'sign':
                    tecla[i].onclick = this.signoNumero;
                    break;
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
    /* /--> Funcion que se ejecuta sobre las teclas del PC o computador interactuando con la aplicacion
            a la misma linea de tiempo. Se pueden realizar solo las operaciones de las teclas Numericas,
            Operacion aritmetica (excepto Raiz Cuadrada), Punto Decimal y resultado con -Enter- (<--|) <---/ */
    verificaTecla: function(e_tecla) {
        var teclaPres = e_tecla.which || e_tecla.keyCode;
        verPant = Calculadora.verficaPant(verPant);
        if (teclaPres == 13 || (teclaPres >= 42 && teclaPres <= 57) || (teclaPres >= 42 && teclaPres <= 43)) {
            if (teclaPres == 13) {
                Calculadora.igualClick();
            } else if ((teclaPres >= 48 && teclaPres <= 57) && (parseFloat(verPant) != 0 || verPant.includes('.')) && verPant.length < 9) {
                verPant = verPant + String.fromCharCode(teclaPres);
            } else if (teclaPres == 46 && !verPant.includes('.') && verPant.length < 9) {
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
            if (teclaPres != 13) {
                verPant = Calculadora.cambiarPant(verPant);
            }
        }
    }
}

// ---> Operacion principal y ejecucion de Inicio de la Calculadora <--- //
Calculadora.iniciarCalc();