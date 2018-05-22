self.addEventListener('message', function(e) {
    /*    var e.data = e.data[0],
            w_pantalla = e.data[1];
        if (w_pantalla.length < 8) {
            if (w_panttal === '0') {
                w_pantalla = '';
            }*/
    var teclaPres = e.data.which || e.data.keyCode;
    var mens_wk
        //var w_pantalla = w_pantalla + String.fromCharCode(teclaPres);
    switch (String.fromCharCode(teclaPres)) {
        case 13:
            mens_wk = 'Presionaste Enter';
            break;
        case 48 > 57:
            mens_wk = 'Presionaste Numero del 0 al 9 - Teclado';
            break;
        case 96 > 111:
            mens_wk = 'Presionaste Numero del 0 al 9 - Numerico';
            break;
        default:
            mens_wk = 'Presionaste cualquier tecla';
    }
    self.postMessage(mens_wk);
})