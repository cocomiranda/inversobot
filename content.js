var request = new XMLHttpRequest();



//////////////////////// INFO DOLAR Y CONVERSOR ////////////////////////
async function dolar() {
  const url = 'https://api.bluelytics.com.ar/v2/latest';
  const url2 = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
  const url3 = 'https://api-dolar-argentina.herokuapp.com/api/mayorista';


  const response = await fetch(url);
  const data = await response.json();
  const oficial = Object.values(data)[0];
  const blue = Object.values(data)[1];

  const lista_oficial = [];
  const lista_blue = [];  
  const lista_cambio = [];

  oficial_avg = Object.values(oficial)[0];
  oficial_sell = Object.values(oficial)[1];
  oficial_buy = Object.values(oficial)[2];
  blue_avg = Object.values(blue)[0];
  blue_sell = Object.values(blue)[1];
  blue_buy = Object.values(blue)[2];
  

  const dolarsi = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales");
  const data1 = await dolarsi.json();
  // console.log(data1);

  const ccl_const = Object.values(data1)[3];
  ccl_objeto = Object.values(ccl_const)[0];
  ccl_compra = Object.values(ccl_objeto)[0];
  ccl_compra = ccl_compra.replace(",", ".");
  ccl_venta = Object.values(ccl_objeto)[1];
  ccl_venta = ccl_venta.replace(",", ".");
  // console.log(ccl_compra);
  // console.log(ccl_venta);

  const mep_const = Object.values(data1)[4];
  mep_objeto = Object.values(mep_const)[0];
  mep_compra = Object.values(mep_objeto)[0];
  mep_compra = mep_compra.substring(0, mep_compra.length - 1);
  mep_compra = mep_compra.replace(",", ".");
  mep_venta = Object.values(mep_objeto)[1];
  mep_venta = mep_venta.substring(0, mep_venta.length - 1);
  mep_venta = mep_venta.replace(",", ".");
  // console.log(mep_compra);
  // console.log(mep_venta);

  const turista_const = Object.values(data1)[6];
  turista_objeto = Object.values(turista_const)[0];
  turista_compra = Object.values(turista_objeto)[1];
  turista_compra = turista_compra.replace(",", ".");
  turista_venta = Object.values(turista_objeto)[2];
  turista_venta = turista_venta.replace(",", ".");
  // console.log(turista_compra);
  // console.log(turista_venta);


  // const response3 = await fetch(url3);
  // const data3 = await response3.json();
  // console.log(data3)

  const dolar_cripto = await fetch("https://criptoya.com/api/usdt/ars");
  const data_cripto = await dolar_cripto.json();
  for (i = 0; i < Object.keys(data_cripto).length; i++) {
    const exchange = Object.keys(data_cripto)[i];
    if (exchange == 'belo') {
      var belo_v = Object.values(Object.values(data_cripto)[i])[1]
      var belo_c = Object.values(Object.values(data_cripto)[i])[3]
    }
    if (exchange == 'buenbit') {
      var buenbit_v = Object.values(Object.values(data_cripto)[i])[1]
      var buenbit_c = Object.values(Object.values(data_cripto)[i])[3]
    }
    if (exchange == 'lemoncash') {
      var lemon_v = Object.values(Object.values(data_cripto)[i])[1]
      var lemon_c = Object.values(Object.values(data_cripto)[i])[3]
    }
    if (exchange == 'letsbit') {
      var letsbit_v = Object.values(Object.values(data_cripto)[i])[1]
      var letsbit_c = Object.values(Object.values(data_cripto)[i])[3]
    }
    if (exchange == 'tiendacrypto') {
      var tienda_v = Object.values(Object.values(data_cripto)[i])[1]
      var tienda_c = Object.values(Object.values(data_cripto)[i])[3]
    }
  }  
  var cripto_compra = ((belo_c + buenbit_c + lemon_c + letsbit_c + tienda_c ) / 5).toFixed(2)
  var cripto_venta = ((belo_v + buenbit_v + lemon_v + letsbit_v + tienda_v ) / 5).toFixed(2)


  function createTable() {
    var oficial = '<tr><td>OFICIAL</td>\n<td>$ ' + oficial_buy + '</td><td>$ ' + oficial_sell + '</td></tr>';
    var blue = '<tr><td>PARALELO</td>\n<td>$ ' + blue_buy + '</td><td>$ ' + blue_sell + '</td></tr>';
    var ccl = '<tr><td>CCL</td>\n<td>$ ' + ccl_compra + '</td><td>$ ' + ccl_venta + '</td></tr>';
    var mep = '<tr><td>MEP</td>\n<td>$ ' + mep_compra + '</td><td>$ ' + mep_venta + '</td></tr>';
    var cripto = '<tr><td>CRIPTO</td>\n<td>$ ' + cripto_compra + '</td><td>$ ' + cripto_venta + '</td></tr>';
    var turista = '<tr><td>TURISTA</td>\n<td> - </td><td>$ ' + turista_venta + '</td></tr><br>';
    var html = document.getElementById("dolar_table").innerHTML + oficial + blue + ccl + mep + cripto + turista
    document.getElementById("dolar_table").innerHTML = html;
  }
  createTable();

  var tablaaa = document.getElementById("dolar_table")
  tablaaa.style.display = "block";
  
  function input() {
    var pesos = document.createElement("INPUT");
    pesos.setAttribute("type", "text");
    pesos.setAttribute("placeholder", "ARS");
    pesos.setAttribute("class", 'input');
    pesos.setAttribute("id", "pesos");
    pesos.style.display = "block";
    pesos.style.position = "absolute";
    pesos.style.width = "80px";
    pesos.style.top = "410px";
    pesos.style.left = "90px";
    document.body.appendChild(pesos);

    var dolar = document.createElement("INPUT");
    dolar.setAttribute("type", "text");
    dolar.setAttribute("placeholder", "USD");
    dolar.setAttribute("class", 'input');
    dolar.setAttribute("id", "dolar");
    dolar.style.display = "block";
    dolar.style.position = "absolute";
    dolar.style.width = "80px";
    dolar.style.top = "410px";
    dolar.style.left = "190px";
    document.body.appendChild(dolar);
  }
  input();

  function button() {
    var boton = document.createElement("BUTTON");
    var t = document.createTextNode("Convertir");
    boton.setAttribute("class", 'boton');
    boton.setAttribute("id", 'boton');
    boton.style.display = "block";
    boton.style.position = "absolute";
    boton.style.top = "450px";
    boton.style.left = "140px";
    boton.appendChild(t);
    document.body.appendChild(boton);
    var convertir = document.getElementById("boton");
    convertir.addEventListener("click", submit);
  }
  button();


  function resultado() {
    var oficial = document.createElement("INPUT");
    oficial.setAttribute("type", "text");
    oficial.setAttribute("placeholder", "oficial");
    oficial.setAttribute("class", 'input');
    oficial.setAttribute("id", "oficial");
    oficial.style.display = "none";
    oficial.style.position = "absolute";
    oficial.style.width = "170px";
    oficial.style.top = "485px";
    oficial.style.left = "95px";
    document.body.appendChild(oficial);

    var blue = document.createElement("INPUT");
    blue.setAttribute("type", "text");
    blue.setAttribute("placeholder", "paralelo");
    blue.setAttribute("class", 'input');
    blue.setAttribute("id", "blue");
    blue.style.display = "none";
    blue.style.position = "absolute";
    blue.style.width = "170px";
    blue.style.top = "515px";
    blue.style.left = "95px";
    document.body.appendChild(blue);
  }
  resultado();

  function submit() 
  {
    const ars = document.getElementById("pesos").value;
    const usd = document.getElementById("dolar").value;
    if (ars == 0 && usd == 0) {
      document.getElementById('oficial').style.display = 'none';
      document.getElementById('blue').style.display = 'none';
      var modal = document.getElementById("myModal");
      var btn = document.getElementById("myBtn");
      var span = document.getElementsByClassName("close")[0];
      modal.style.display = "block";
      span.onclick = function() {
        modal.style.display = "none";
      }
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    }
    if (ars != 0 && usd != 0) {
      document.getElementById('oficial').style.display = 'none';
      document.getElementById('blue').style.display = 'none';
      var modal = document.getElementById("myModal");
      var btn = document.getElementById("myBtn");
      var span = document.getElementsByClassName("close")[0];
      modal.style.display = "block";
      span.onclick = function() {
        modal.style.display = "none";
      }
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    }
    if (ars != 0 && usd == 0) {
      a_oficial = ars / oficial_avg;
      a_blue = ars / blue_avg;
      a_oficial = Number.parseFloat(a_oficial.toFixed(2)).toLocaleString();
      a_blue = Number.parseFloat(a_blue.toFixed(2)).toLocaleString();
      document.getElementById('oficial').style.display = 'block';
      document.getElementById('blue').style.display = 'block';
      document.getElementById('oficial').setAttribute("value", 'USD ' + a_oficial + '   (oficial)');
      document.getElementById('blue').setAttribute("value", 'USD ' + a_blue + '   (paralelo)');
    }
    if (ars == 0 && usd != 0) {
      a_oficial = usd * oficial_avg;
      a_blue = usd * blue_avg;
      a_oficial = Number.parseFloat(a_oficial.toFixed(2)).toLocaleString()
      a_blue = Number.parseFloat(a_blue.toFixed(2)).toLocaleString()
      document.getElementById('oficial').style.display = 'block';
      document.getElementById('blue').style.display = 'block';
      document.getElementById('oficial').setAttribute("value", 'ARS ' + a_oficial + '   (oficial)');
      document.getElementById('blue').setAttribute("value", 'ARS ' + a_blue + '   (paralelo)');
    }
  }
}
dolar();
















//////////////////////// PAGINAS WEB ////////////////////////

const link_argenbtc = "https://argenbtc.com/";
const link_belo = "https://www.belo.app/";
const link_bitex = "https://bitex.la/";
const link_bitmonedero = "https://www.bitmonedero.com/";
const link_bitso = "https://bitso.com/?l=es-ar";
const link_buda = "https://www.buda.com/argentina";
const link_buenbit = "https://www.buenbit.com/";
const link_copter = "https://exchangecopter.com/";
const link_criptofacil = "https://www.criptofacil.com.ar/";
const link_cryptomkt = "https://www.cryptomkt.com/es/";
const link_decrypto = "https://www.decrypto.la/";
const link_fiwind = "https://fiwind.io/";
const link_latamex = "https://www.latamex.com/";
const link_lemoncash = "https://www.lemon.me/";
const link_letsbit = "https://letsbit.io/";
const link_ripio = "https://www.ripio.com/ar/";
const link_ripioexchange = "https://exchange.ripio.com/es/";
const link_satoshitango = "https://www.satoshitango.com/es-AR/";
const link_sesocio = "https://www.sesocio.com/";
const link_tiendacrypto = "https://www.tiendacrypto.com/";
const link_universalcoins = "https://www.universalcoins.net/";
const link_ftx = "https://ftx.com/";
const link_saldo = "https://saldo.com.ar/";
const link_kriptonmarket = "https://kriptonmarket.com/";
const link_vibrant = 'https://vibrantapp.com/';
const link_null = 'https://www.google.com.ar/';









//////////////////////// TABLA COTIZACIONES DAI ////////////////////////
async function dai_ars() {
  const dai_ars = await fetch("https://criptoya.com/api/dai/ars/0.1");
  const dai_ars_data = await dai_ars.json();
  // console.log(dai_ars_data);

  len_dai = (Object.keys(dai_ars_data)).length;

  const lista_exchange = [];
  const lista_compra = [];
  const lista_venta = [];
  const lista_link = [];

  for (let i = 0; i < len_dai ; i++) {
    const exchange = Object.keys(dai_ars_data)[i];
    const exchange2 = Object.values(dai_ars_data)[i];
    const exchange_compra = Object.values(exchange2)[0];
    const exchange_venta = Object.values(exchange2)[2];
    // console.log(exchange);
    if (exchange == 'argenbtc') {
        lista_link.push(link_argenbtc)
    }
    if (exchange == 'belo') {
      lista_link.push(link_belo)
    }
    if (exchange == 'bitex') {
      lista_link.push(link_bitex)
    }
    if (exchange == 'bitso') {
      lista_link.push(link_bitso)
    }
    if (exchange == 'buda') {
      lista_link.push(link_buda)
    }
    if (exchange == 'buenbit') {
      lista_link.push(link_buenbit)
    }
    if (exchange == 'copter') {
      lista_link.push(link_copter)
    }
    if (exchange == 'criptofacil') {
      lista_link.push(link_criptofacil)
    }
    if (exchange == 'cryptomkt') {
      lista_link.push(link_cryptomkt)
    }
    if (exchange == 'decrypto') {
      lista_link.push(link_decrypto)
    }
    if (exchange == 'fiwind') {
      lista_link.push(link_fiwind)
    }
    if (exchange == 'latamex') {
      lista_link.push(link_latamex)
    }
    if (exchange == 'lemoncash') {
      lista_link.push(link_lemoncash)
    }
    if (exchange == 'letsbit') {
      lista_link.push(link_letsbit)
    }
    if (exchange == 'ripio') {
      lista_link.push(link_ripio)
    }
    if (exchange == 'ripioexchange') {
      lista_link.push(link_ripioexchange)
    }
    if (exchange == 'satoshitango') {
      lista_link.push(link_satoshitango)
    }
    if (exchange == 'sesocio') {
      lista_link.push(link_sesocio)
    }
    if (exchange == 'tiendacrypto') {
      lista_link.push(link_tiendacrypto)
    }
    if (exchange == 'universalcoins') {
      lista_link.push(link_universalcoins)
    }
    if (exchange == 'ftx') {
      lista_link.push(link_ftx)
    }
    if (exchange == 'kriptonmarket') {
      lista_link.push(link_kriptonmarket)
    }
    if (exchange == 'saldo') {
      lista_link.push(link_saldo)
    }
    if (exchange == 'bitmonedero') {
      lista_link.push(link_bitmonedero)
    }
    if (exchange == 'vibrant') {
      lista_link.push(link_vibrant)
    }
    else if (exchange != 'argenbtc' && exchange != 'belo' && exchange != 'bitex' && exchange != 'bitmonedero' && exchange != 'bitso' && exchange != 'buda' && exchange != 'buenbit' && exchange != 'copter' && exchange != 'criptofacil' && exchange != 'cryptomkt' && exchange != 'decrypto' && exchange != 'fiwind' && exchange != 'latamex' && exchange != 'lemoncash' && exchange != 'letsbit' && exchange != 'ripio' && exchange != 'ripioexchange' && exchange != 'satoshitango' && exchange != 'sesocio' && exchange != 'tiendacrypto' && exchange != 'universalcoin' && exchange != 'ftx' && exchange != 'saldo' && exchange != 'kriptonmarket' && exchange != 'vibrant')
    {
      lista_link.push(link_null)
    }
    // console.log(exchange_compra);
    // console.log(exchange_venta);
    lista_exchange.push(exchange);
    lista_compra.push(exchange_compra);
    lista_venta.push(exchange_venta);
  }
  // console.log(lista_link[0])
  // console.log(link_belo)

  function createTable() {
    for (let i = 0; i < len_dai; i++) {
      var row = '<tr><td style="column-width: 100px;"><a href="' + lista_link[i] + '" target="_blank">' + lista_exchange[i] + '</a></td>\n<td style="column-width: 100px;">' + lista_compra[i] + '</td><td style="column-width: 100px;">' + lista_venta[i] + '</td></tr>';
      let html = document.getElementById("dai_ars_table").innerHTML + row;
        document.getElementById("dai_ars_table").innerHTML = html;
    }
  }
  createTable();

}
dai_ars();
























//////////////////////// TABLA COTIZACIONES BTC ////////////////////////

async function btc_ars() {
  const btc_ars = await fetch("https://criptoya.com/api/btc/ars/0.1");
  const btc_ars_data = await btc_ars.json();
  
  len_btc = (Object.keys(btc_ars_data)).length;

  const lista_exchange = [];
  const lista_compra = [];
  const lista_venta = [];
  const lista_link = [];


  for (let i = 0; i < len_btc ; i++) {
    const exchange = Object.keys(btc_ars_data)[i];
    const exchange2 = Object.values(btc_ars_data)[i];
    const exchange_compra = Number.parseInt(Object.values(exchange2)[0]).toLocaleString().replace(/,/g, ".");
    const exchange_venta = Number.parseInt(Object.values(exchange2)[2]).toLocaleString().replace(/,/g, ".");
    if (exchange == 'argenbtc') {
      lista_link.push(link_argenbtc)
    }
    if (exchange == 'belo') {
      lista_link.push(link_belo)
    }
    if (exchange == 'bitex') {
      lista_link.push(link_bitex)
    }
    if (exchange == 'bitso') {
      lista_link.push(link_bitso)
    }
    if (exchange == 'buda') {
      lista_link.push(link_buda)
    }
    if (exchange == 'buenbit') {
      lista_link.push(link_buenbit)
    }
    if (exchange == 'copter') {
      lista_link.push(link_copter)
    }
    if (exchange == 'criptofacil') {
      lista_link.push(link_criptofacil)
    }
    if (exchange == 'cryptomkt') {
      lista_link.push(link_cryptomkt)
    }
    if (exchange == 'decrypto') {
      lista_link.push(link_decrypto)
    }
    if (exchange == 'fiwind') {
      lista_link.push(link_fiwind)
    }
    if (exchange == 'latamex') {
      lista_link.push(link_latamex)
    }
    if (exchange == 'lemoncash') {
      lista_link.push(link_lemoncash)
    }
    if (exchange == 'letsbit') {
      lista_link.push(link_letsbit)
    }
    if (exchange == 'ripio') {
      lista_link.push(link_ripio)
    }
    if (exchange == 'ripioexchange') {
      lista_link.push(link_ripioexchange)
    }
    if (exchange == 'satoshitango') {
      lista_link.push(link_satoshitango)
    }
    if (exchange == 'sesocio') {
      lista_link.push(link_sesocio)
    }
    if (exchange == 'tiendacrypto') {
      lista_link.push(link_tiendacrypto)
    }
    if (exchange == 'universalcoins') {
      lista_link.push(link_universalcoins)
    }
    if (exchange == 'ftx') {
      lista_link.push(link_ftx)
    }
    if (exchange == 'kriptonmarket') {
      lista_link.push(link_kriptonmarket)
    }
    if (exchange == 'saldo') {
      lista_link.push(link_saldo)
    }
    if (exchange == 'bitmonedero') {
      lista_link.push(link_bitmonedero)
    }
    if (exchange == 'vibrant') {
      lista_link.push(link_vibrant)
    }
    else if (exchange != 'argenbtc' && exchange != 'belo' && exchange != 'bitex' && exchange != 'bitmonedero' && exchange != 'bitso' && exchange != 'buda' && exchange != 'buenbit' && exchange != 'copter' && exchange != 'criptofacil' && exchange != 'cryptomkt' && exchange != 'decrypto' && exchange != 'fiwind' && exchange != 'latamex' && exchange != 'lemoncash' && exchange != 'letsbit' && exchange != 'ripio' && exchange != 'ripioexchange' && exchange != 'satoshitango' && exchange != 'sesocio' && exchange != 'tiendacrypto' && exchange != 'universalcoin' && exchange != 'ftx' && exchange != 'saldo' && exchange != 'kriptonmarket' && exchange != 'vibrant')
    {
      lista_link.push(link_null)
    }
    lista_exchange.push(exchange);
    lista_compra.push(exchange_compra);
    lista_venta.push(exchange_venta);
  }

  function createTable() {
    for (let i = 0; i < len_btc; i++) {
      var row = '<tr><td style="column-width: 100px;"><a href="' + lista_link[i] + '" target="_blank">' + lista_exchange[i] + '</td>\n<td style="column-width: 100px;">' + lista_compra[i] + '</td><td style="column-width: 100px;">' + lista_venta[i] + '</td></tr>';
      let html = document.getElementById("btc_ars_table").innerHTML + row;
        document.getElementById("btc_ars_table").innerHTML = html;
    }
  }
  createTable();
}
btc_ars();


























//////////////////////// TABLA COTIZACIONES ETH ////////////////////////

async function eth_ars() {
  const eth_ars = await fetch("https://criptoya.com/api/eth/ars/0.1");
  const eth_ars_data = await eth_ars.json();
  
  len_eth = (Object.keys(eth_ars_data)).length;

  const lista_exchange = [];
  const lista_compra = [];
  const lista_venta = [];
  const lista_link = [];

  for (let i = 0; i < len_eth ; i++) {
    const exchange = Object.keys(eth_ars_data)[i];
    const exchange2 = Object.values(eth_ars_data)[i];
    const exchange_compra = Number.parseInt(Object.values(exchange2)[0]).toLocaleString().replace(/,/g, ".");
    const exchange_venta = Number.parseInt(Object.values(exchange2)[2]).toLocaleString().replace(/,/g, ".");
    if (exchange == 'argenbtc') {
      lista_link.push(link_argenbtc)
    }
    if (exchange == 'belo') {
      lista_link.push(link_belo)
    }
    if (exchange == 'bitex') {
      lista_link.push(link_bitex)
    }
    if (exchange == 'bitso') {
      lista_link.push(link_bitso)
    }
    if (exchange == 'buda') {
      lista_link.push(link_buda)
    }
    if (exchange == 'buenbit') {
      lista_link.push(link_buenbit)
    }
    if (exchange == 'copter') {
      lista_link.push(link_copter)
    }
    if (exchange == 'criptofacil') {
      lista_link.push(link_criptofacil)
    }
    if (exchange == 'cryptomkt') {
      lista_link.push(link_cryptomkt)
    }
    if (exchange == 'decrypto') {
      lista_link.push(link_decrypto)
    }
    if (exchange == 'fiwind') {
      lista_link.push(link_fiwind)
    }
    if (exchange == 'latamex') {
      lista_link.push(link_latamex)
    }
    if (exchange == 'lemoncash') {
      lista_link.push(link_lemoncash)
    }
    if (exchange == 'letsbit') {
      lista_link.push(link_letsbit)
    }
    if (exchange == 'ripio') {
      lista_link.push(link_ripio)
    }
    if (exchange == 'ripioexchange') {
      lista_link.push(link_ripioexchange)
    }
    if (exchange == 'satoshitango') {
      lista_link.push(link_satoshitango)
    }
    if (exchange == 'sesocio') {
      lista_link.push(link_sesocio)
    }
    if (exchange == 'tiendacrypto') {
      lista_link.push(link_tiendacrypto)
    }
    if (exchange == 'universalcoins') {
      lista_link.push(link_universalcoins)
    }
    if (exchange == 'ftx') {
      lista_link.push(link_ftx)
    }
    if (exchange == 'kriptonmarket') {
      lista_link.push(link_kriptonmarket)
    }
    if (exchange == 'saldo') {
      lista_link.push(link_saldo)
    }
    if (exchange == 'bitmonedero') {
      lista_link.push(link_bitmonedero)
    }
    if (exchange == 'vibrant') {
      lista_link.push(link_vibrant)
    }
    else if (exchange != 'argenbtc' && exchange != 'belo' && exchange != 'bitex' && exchange != 'bitmonedero' && exchange != 'bitso' && exchange != 'buda' && exchange != 'buenbit' && exchange != 'copter' && exchange != 'criptofacil' && exchange != 'cryptomkt' && exchange != 'decrypto' && exchange != 'fiwind' && exchange != 'latamex' && exchange != 'lemoncash' && exchange != 'letsbit' && exchange != 'ripio' && exchange != 'ripioexchange' && exchange != 'satoshitango' && exchange != 'sesocio' && exchange != 'tiendacrypto' && exchange != 'universalcoin' && exchange != 'ftx' && exchange != 'saldo' && exchange != 'kriptonmarket' && exchange != 'vibrant')
    {
      lista_link.push(link_null)
    }
    // console.log(exchange);
    // console.log(exchange_compra);
    // console.log(exchange_venta);
    lista_exchange.push(exchange);
    lista_compra.push(exchange_compra);
    lista_venta.push(exchange_venta);
  }

  function createTable() {
    for (let i = 0; i < len_eth; i++) {
      var row = '<tr><td style="column-width: 100px;"><a href="' + lista_link[i] + '" target="_blank">' + lista_exchange[i] + '</td>\n<td style="column-width: 100px;">' + lista_compra[i] + '</td><td style="column-width: 100px;">' + lista_venta[i] + '</td></tr>';
      let html = document.getElementById("eth_ars_table").innerHTML + row;
        document.getElementById("eth_ars_table").innerHTML = html;
    }
  }
  createTable();

}
eth_ars();







//////////////////////// TABLA COTIZACIONES USDT ////////////////////////
async function usdt_ars() {
  const usdt_ars = await fetch("https://criptoya.com/api/usdt/ars/0.1");
  const usdt_ars_data = await usdt_ars.json();
  // console.log(usdt_ars_data);

  len_usdt = (Object.keys(usdt_ars_data)).length;

  const lista_exchange = [];
  const lista_compra = [];
  const lista_venta = [];
  const lista_link = [];

  for (let i = 0; i < len_usdt ; i++) {
    const exchange = Object.keys(usdt_ars_data)[i];
    const exchange2 = Object.values(usdt_ars_data)[i];
    const exchange_compra = Object.values(exchange2)[0];
    const exchange_venta = Object.values(exchange2)[2];
    // console.log(exchange);
    if (exchange == 'argenbtc') {
        lista_link.push(link_argenbtc)
    }
    if (exchange == 'belo') {
      lista_link.push(link_belo)
    }
    if (exchange == 'bitex') {
      lista_link.push(link_bitex)
    }
    if (exchange == 'bitso') {
      lista_link.push(link_bitso)
    }
    if (exchange == 'buda') {
      lista_link.push(link_buda)
    }
    if (exchange == 'buenbit') {
      lista_link.push(link_buenbit)
    }
    if (exchange == 'copter') {
      lista_link.push(link_copter)
    }
    if (exchange == 'criptofacil') {
      lista_link.push(link_criptofacil)
    }
    if (exchange == 'cryptomkt') {
      lista_link.push(link_cryptomkt)
    }
    if (exchange == 'decrypto') {
      lista_link.push(link_decrypto)
    }
    if (exchange == 'fiwind') {
      lista_link.push(link_fiwind)
    }
    if (exchange == 'latamex') {
      lista_link.push(link_latamex)
    }
    if (exchange == 'lemoncash') {
      lista_link.push(link_lemoncash)
    }
    if (exchange == 'letsbit') {
      lista_link.push(link_letsbit)
    }
    if (exchange == 'ripio') {
      lista_link.push(link_ripio)
    }
    if (exchange == 'ripioexchange') {
      lista_link.push(link_ripioexchange)
    }
    if (exchange == 'satoshitango') {
      lista_link.push(link_satoshitango)
    }
    if (exchange == 'sesocio') {
      lista_link.push(link_sesocio)
    }
    if (exchange == 'tiendacrypto') {
      lista_link.push(link_tiendacrypto)
    }
    if (exchange == 'universalcoins') {
      lista_link.push(link_universalcoins)
    }
    if (exchange == 'ftx') {
      lista_link.push(link_ftx)
    }
    if (exchange == 'kriptonmarket') {
      lista_link.push(link_kriptonmarket)
    }
    if (exchange == 'saldo') {
      lista_link.push(link_saldo)
    }
    if (exchange == 'bitmonedero') {
      lista_link.push(link_bitmonedero)
    }
    if (exchange == 'vibrant') {
      lista_link.push(link_vibrant)
    }
    else if (exchange != 'argenbtc' && exchange != 'belo' && exchange != 'bitex' && exchange != 'bitmonedero' && exchange != 'bitso' && exchange != 'buda' && exchange != 'buenbit' && exchange != 'copter' && exchange != 'criptofacil' && exchange != 'cryptomkt' && exchange != 'decrypto' && exchange != 'fiwind' && exchange != 'latamex' && exchange != 'lemoncash' && exchange != 'letsbit' && exchange != 'ripio' && exchange != 'ripioexchange' && exchange != 'satoshitango' && exchange != 'sesocio' && exchange != 'tiendacrypto' && exchange != 'universalcoin' && exchange != 'ftx' && exchange != 'saldo' && exchange != 'kriptonmarket' && exchange != 'vibrant')
    {
      lista_link.push(link_null)
    }
    // console.log(exchange_compra);
    // console.log(exchange_venta);
    lista_exchange.push(exchange);
    lista_compra.push(exchange_compra);
    lista_venta.push(exchange_venta);
  }
  // console.log(lista_link[0])
  // console.log(link_belo)

  function createTable() {
    for (let i = 0; i < len_usdt; i++) {
      var row = '<tr><td style="column-width: 100px;"><a href="' + lista_link[i] + '" target="_blank">' + lista_exchange[i] + '</a></td>\n<td style="column-width: 100px;">' + lista_compra[i] + '</td><td style="column-width: 100px;">' + lista_venta[i] + '</td></tr>';
      let html = document.getElementById("usdt_ars_table").innerHTML + row;
        document.getElementById("usdt_ars_table").innerHTML = html;
    }
  }
  createTable();

}
usdt_ars();



//////////////////////// TABLA COTIZACIONES USDC ////////////////////////
async function usdc_ars() {
  const usdc_ars = await fetch("https://criptoya.com/api/usdc/ars/0.1");
  const usdc_ars_data = await usdc_ars.json();
  // console.log(usdc_ars_data);

  len_usdc = (Object.keys(usdc_ars_data)).length;

  const lista_exchange = [];
  const lista_compra = [];
  const lista_venta = [];
  const lista_link = [];

  for (let i = 0; i < len_usdc ; i++) {
    const exchange = Object.keys(usdc_ars_data)[i];
    const exchange2 = Object.values(usdc_ars_data)[i];
    const exchange_compra = Object.values(exchange2)[0];
    const exchange_venta = Object.values(exchange2)[2];
    if (exchange == 'argenbtc') {
        lista_link.push(link_argenbtc)
    }
    if (exchange == 'belo') {
      lista_link.push(link_belo)
    }
    if (exchange == 'bitex') {
      lista_link.push(link_bitex)
    }
    if (exchange == 'bitso') {
      lista_link.push(link_bitso)
    }
    if (exchange == 'buda') {
      lista_link.push(link_buda)
    }
    if (exchange == 'buenbit') {
      lista_link.push(link_buenbit)
    }
    if (exchange == 'copter') {
      lista_link.push(link_copter)
    }
    if (exchange == 'criptofacil') {
      lista_link.push(link_criptofacil)
    }
    if (exchange == 'cryptomkt') {
      lista_link.push(link_cryptomkt)
    }
    if (exchange == 'decrypto') {
      lista_link.push(link_decrypto)
    }
    if (exchange == 'fiwind') {
      lista_link.push(link_fiwind)
    }
    if (exchange == 'latamex') {
      lista_link.push(link_latamex)
    }
    if (exchange == 'lemoncash') {
      lista_link.push(link_lemoncash)
    }
    if (exchange == 'letsbit') {
      lista_link.push(link_letsbit)
    }
    if (exchange == 'ripio') {
      lista_link.push(link_ripio)
    }
    if (exchange == 'ripioexchange') {
      lista_link.push(link_ripioexchange)
    }
    if (exchange == 'satoshitango') {
      lista_link.push(link_satoshitango)
    }
    if (exchange == 'sesocio') {
      lista_link.push(link_sesocio)
    }
    if (exchange == 'tiendacrypto') {
      lista_link.push(link_tiendacrypto)
    }
    if (exchange == 'universalcoins') {
      lista_link.push(link_universalcoins)
    }
    if (exchange == 'ftx') {
      lista_link.push(link_ftx)
    }
    if (exchange == 'kriptonmarket') {
      lista_link.push(link_kriptonmarket)
    }
    if (exchange == 'saldo') {
      lista_link.push(link_saldo)
    }
    if (exchange == 'bitmonedero') {
      lista_link.push(link_bitmonedero)
    }
    if (exchange == 'vibrant') {
      lista_link.push(link_vibrant)
    }
    else if (exchange != 'argenbtc' && exchange != 'belo' && exchange != 'bitex' && exchange != 'bitmonedero' && exchange != 'bitso' && exchange != 'buda' && exchange != 'buenbit' && exchange != 'copter' && exchange != 'criptofacil' && exchange != 'cryptomkt' && exchange != 'decrypto' && exchange != 'fiwind' && exchange != 'latamex' && exchange != 'lemoncash' && exchange != 'letsbit' && exchange != 'ripio' && exchange != 'ripioexchange' && exchange != 'satoshitango' && exchange != 'sesocio' && exchange != 'tiendacrypto' && exchange != 'universalcoin' && exchange != 'ftx' && exchange != 'saldo' && exchange != 'kriptonmarket' && exchange != 'vibrant')
    {
      lista_link.push(link_null)
    }
    // console.log(exchange_compra);
    // console.log(exchange_venta);
    lista_exchange.push(exchange);
    lista_compra.push(exchange_compra);
    lista_venta.push(exchange_venta);

  }
  // console.log(lista_link)
  // console.log(link_belo)

  function createTable() {
    for (let i = 0; i < len_usdc; i++) {
      var row = '<tr><td style="column-width: 100px;"><a href="' + lista_link[i] + '" target="_blank">' + lista_exchange[i] + '</a></td>\n<td style="column-width: 100px;">' + lista_compra[i] + '</td><td style="column-width: 100px;">' + lista_venta[i] + '</td></tr>';
      let html = document.getElementById("usdc_ars_table").innerHTML + row;
        document.getElementById("usdc_ars_table").innerHTML = html;
    }
  }
  createTable();

}
usdc_ars();


//////////////////////// TABLA COTIZACIONES ADA ////////////////////////
async function ada_ars() {
  const ada_ars = await fetch("https://criptoya.com/api/ada/ars/0.1");
  const ada_ars_data = await ada_ars.json();
  // console.log(ada_ars_data);

  len_ada = (Object.keys(ada_ars_data)).length;

  const lista_exchange = [];
  const lista_compra = [];
  const lista_venta = [];
  const lista_link = [];

  for (let i = 0; i < len_ada ; i++) {
    const exchange = Object.keys(ada_ars_data)[i];
    const exchange2 = Object.values(ada_ars_data)[i];
    const exchange_compra = Object.values(exchange2)[0];
    const exchange_venta = Object.values(exchange2)[2];
    // console.log(exchange);
    if (exchange == 'argenbtc') {
        lista_link.push(link_argenbtc)
    }
    if (exchange == 'belo') {
      lista_link.push(link_belo)
    }
    if (exchange == 'bitex') {
      lista_link.push(link_bitex)
    }
    if (exchange == 'bitso') {
      lista_link.push(link_bitso)
    }
    if (exchange == 'buda') {
      lista_link.push(link_buda)
    }
    if (exchange == 'buenbit') {
      lista_link.push(link_buenbit)
    }
    if (exchange == 'copter') {
      lista_link.push(link_copter)
    }
    if (exchange == 'criptofacil') {
      lista_link.push(link_criptofacil)
    }
    if (exchange == 'cryptomkt') {
      lista_link.push(link_cryptomkt)
    }
    if (exchange == 'decrypto') {
      lista_link.push(link_decrypto)
    }
    if (exchange == 'fiwind') {
      lista_link.push(link_fiwind)
    }
    if (exchange == 'latamex') {
      lista_link.push(link_latamex)
    }
    if (exchange == 'lemoncash') {
      lista_link.push(link_lemoncash)
    }
    if (exchange == 'letsbit') {
      lista_link.push(link_letsbit)
    }
    if (exchange == 'ripio') {
      lista_link.push(link_ripio)
    }
    if (exchange == 'ripioexchange') {
      lista_link.push(link_ripioexchange)
    }
    if (exchange == 'satoshitango') {
      lista_link.push(link_satoshitango)
    }
    if (exchange == 'sesocio') {
      lista_link.push(link_sesocio)
    }
    if (exchange == 'tiendacrypto') {
      lista_link.push(link_tiendacrypto)
    }
    if (exchange == 'universalcoins') {
      lista_link.push(link_universalcoins)
    }
    if (exchange == 'ftx') {
      lista_link.push(link_ftx)
    }
    if (exchange == 'kriptonmarket') {
      lista_link.push(link_kriptonmarket)
    }
    if (exchange == 'saldo') {
      lista_link.push(link_saldo)
    }
    if (exchange == 'bitmonedero') {
      lista_link.push(link_bitmonedero)
    }
    if (exchange == 'vibrant') {
      lista_link.push(link_vibrant)
    }
    else if (exchange != 'argenbtc' && exchange != 'belo' && exchange != 'bitex' && exchange != 'bitmonedero' && exchange != 'bitso' && exchange != 'buda' && exchange != 'buenbit' && exchange != 'copter' && exchange != 'criptofacil' && exchange != 'cryptomkt' && exchange != 'decrypto' && exchange != 'fiwind' && exchange != 'latamex' && exchange != 'lemoncash' && exchange != 'letsbit' && exchange != 'ripio' && exchange != 'ripioexchange' && exchange != 'satoshitango' && exchange != 'sesocio' && exchange != 'tiendacrypto' && exchange != 'universalcoin' && exchange != 'ftx' && exchange != 'saldo' && exchange != 'kriptonmarket' && exchange != 'vibrant')
    {
      lista_link.push(link_null)
    }
    lista_exchange.push(exchange);
    lista_compra.push(exchange_compra);
    lista_venta.push(exchange_venta);
  }
  // console.log(lista_link[0])
  // console.log(link_belo)

  function createTable() {
    for (let i = 0; i < len_ada; i++) {
      var row = '<tr><td style="column-width: 100px;"><a href="' + lista_link[i] + '" target="_blank">' + lista_exchange[i] + '</a></td>\n<td style="column-width: 100px;">' + lista_compra[i] + '</td><td style="column-width: 100px;">' + lista_venta[i] + '</td></tr>';
      let html = document.getElementById("ada_ars_table").innerHTML + row;
        document.getElementById("ada_ars_table").innerHTML = html;
    }
  }
  createTable();

}
ada_ars();



//////////////////////// TABLA COTIZACIONES BNB ////////////////////////
async function bnb_ars() {
  const bnb_ars = await fetch("https://criptoya.com/api/bnb/ars/0.1");
  const bnb_ars_data = await bnb_ars.json();
  // console.log(bnb_ars_data);

  len_bnb = (Object.keys(bnb_ars_data)).length;

  const lista_exchange = [];
  const lista_compra = [];
  const lista_venta = [];
  const lista_link = [];

  for (let i = 0; i < len_bnb ; i++) {
    const exchange = Object.keys(bnb_ars_data)[i];
    const exchange2 = Object.values(bnb_ars_data)[i];
    // const exchange_compra = Object.values(exchange2)[0];
    // const exchange_venta = Object.values(exchange2)[2];
    const exchange_compra = Number.parseInt(Object.values(exchange2)[0]).toLocaleString().replace(/,/g, ".");
    const exchange_venta = Number.parseInt(Object.values(exchange2)[2]).toLocaleString().replace(/,/g, ".");
    // console.log(exchange);
    if (exchange == 'argenbtc') {
        lista_link.push(link_argenbtc)
    }
    if (exchange == 'belo') {
      lista_link.push(link_belo)
    }
    if (exchange == 'bitex') {
      lista_link.push(link_bitex)
    }
    if (exchange == 'bitso') {
      lista_link.push(link_bitso)
    }
    if (exchange == 'buda') {
      lista_link.push(link_buda)
    }
    if (exchange == 'buenbit') {
      lista_link.push(link_buenbit)
    }
    if (exchange == 'copter') {
      lista_link.push(link_copter)
    }
    if (exchange == 'criptofacil') {
      lista_link.push(link_criptofacil)
    }
    if (exchange == 'cryptomkt') {
      lista_link.push(link_cryptomkt)
    }
    if (exchange == 'decrypto') {
      lista_link.push(link_decrypto)
    }
    if (exchange == 'fiwind') {
      lista_link.push(link_fiwind)
    }
    if (exchange == 'latamex') {
      lista_link.push(link_latamex)
    }
    if (exchange == 'lemoncash') {
      lista_link.push(link_lemoncash)
    }
    if (exchange == 'letsbit') {
      lista_link.push(link_letsbit)
    }
    if (exchange == 'ripio') {
      lista_link.push(link_ripio)
    }
    if (exchange == 'ripioexchange') {
      lista_link.push(link_ripioexchange)
    }
    if (exchange == 'satoshitango') {
      lista_link.push(link_satoshitango)
    }
    if (exchange == 'sesocio') {
      lista_link.push(link_sesocio)
    }
    if (exchange == 'tiendacrypto') {
      lista_link.push(link_tiendacrypto)
    }
    if (exchange == 'universalcoins') {
      lista_link.push(link_universalcoins)
    }
    if (exchange == 'ftx') {
      lista_link.push(link_ftx)
    }
    if (exchange == 'kriptonmarket') {
      lista_link.push(link_kriptonmarket)
    }
    if (exchange == 'saldo') {
      lista_link.push(link_saldo)
    }
    if (exchange == 'bitmonedero') {
      lista_link.push(link_bitmonedero)
    }
    if (exchange == 'vibrant') {
      lista_link.push(link_vibrant)
    }
    else if (exchange != 'argenbtc' && exchange != 'belo' && exchange != 'bitex' && exchange != 'bitmonedero' && exchange != 'bitso' && exchange != 'buda' && exchange != 'buenbit' && exchange != 'copter' && exchange != 'criptofacil' && exchange != 'cryptomkt' && exchange != 'decrypto' && exchange != 'fiwind' && exchange != 'latamex' && exchange != 'lemoncash' && exchange != 'letsbit' && exchange != 'ripio' && exchange != 'ripioexchange' && exchange != 'satoshitango' && exchange != 'sesocio' && exchange != 'tiendacrypto' && exchange != 'universalcoin' && exchange != 'ftx' && exchange != 'saldo' && exchange != 'kriptonmarket' && exchange != 'vibrant')
    {
      lista_link.push(link_null)
    }
    lista_exchange.push(exchange);
    lista_compra.push(exchange_compra);
    lista_venta.push(exchange_venta);
  }
  // console.log(lista_link[0])
  // console.log(link_belo)

  function createTable() {
    for (let i = 0; i < len_bnb; i++) {
      var row = '<tr><td style="column-width: 100px;"><a href="' + lista_link[i] + '" target="_blank">' + lista_exchange[i] + '</a></td>\n<td style="column-width: 100px;">' + lista_compra[i] + '</td><td style="column-width: 100px;">' + lista_venta[i] + '</td></tr>';
      let html = document.getElementById("bnb_ars_table").innerHTML + row;
        document.getElementById("bnb_ars_table").innerHTML = html;
    }
  }
  createTable();

}
bnb_ars();


//////////////////////// TABLA COTIZACIONES SOL ////////////////////////
async function sol_ars() {
  const sol_ars = await fetch("https://criptoya.com/api/sol/ars/0.1");
  const sol_ars_data = await sol_ars.json();
  // console.log(sol_ars_data);

  len_sol = (Object.keys(sol_ars_data)).length;

  const lista_exchange = [];
  const lista_compra = [];
  const lista_venta = [];
  const lista_link = [];

  for (let i = 0; i < len_sol ; i++) {
    const exchange = Object.keys(sol_ars_data)[i];
    const exchange2 = Object.values(sol_ars_data)[i];
    // const exchange_compra = Object.values(exchange2)[0];
    // const exchange_venta = Object.values(exchange2)[2];
    // console.log(exchange);
    const exchange_compra = Number.parseInt(Object.values(exchange2)[0]).toLocaleString().replace(/,/g, ".");
    const exchange_venta = Number.parseInt(Object.values(exchange2)[2]).toLocaleString().replace(/,/g, ".");
    if (exchange == 'argenbtc') {
        lista_link.push(link_argenbtc)
    }
    if (exchange == 'belo') {
      lista_link.push(link_belo)
    }
    if (exchange == 'bitex') {
      lista_link.push(link_bitex)
    }
    if (exchange == 'bitso') {
      lista_link.push(link_bitso)
    }
    if (exchange == 'buda') {
      lista_link.push(link_buda)
    }
    if (exchange == 'buenbit') {
      lista_link.push(link_buenbit)
    }
    if (exchange == 'copter') {
      lista_link.push(link_copter)
    }
    if (exchange == 'criptofacil') {
      lista_link.push(link_criptofacil)
    }
    if (exchange == 'cryptomkt') {
      lista_link.push(link_cryptomkt)
    }
    if (exchange == 'decrypto') {
      lista_link.push(link_decrypto)
    }
    if (exchange == 'fiwind') {
      lista_link.push(link_fiwind)
    }
    if (exchange == 'latamex') {
      lista_link.push(link_latamex)
    }
    if (exchange == 'lemoncash') {
      lista_link.push(link_lemoncash)
    }
    if (exchange == 'letsbit') {
      lista_link.push(link_letsbit)
    }
    if (exchange == 'ripio') {
      lista_link.push(link_ripio)
    }
    if (exchange == 'ripioexchange') {
      lista_link.push(link_ripioexchange)
    }
    if (exchange == 'satoshitango') {
      lista_link.push(link_satoshitango)
    }
    if (exchange == 'sesocio') {
      lista_link.push(link_sesocio)
    }
    if (exchange == 'tiendacrypto') {
      lista_link.push(link_tiendacrypto)
    }
    if (exchange == 'universalcoins') {
      lista_link.push(link_universalcoins)
    }
    if (exchange == 'ftx') {
      lista_link.push(link_ftx)
    }
    if (exchange == 'kriptonmarket') {
      lista_link.push(link_kriptonmarket)
    }
    if (exchange == 'saldo') {
      lista_link.push(link_saldo)
    }
    if (exchange == 'bitmonedero') {
      lista_link.push(link_bitmonedero)
    }
    if (exchange == 'vibrant') {
      lista_link.push(link_vibrant)
    }
    else if (exchange != 'argenbtc' && exchange != 'belo' && exchange != 'bitex' && exchange != 'bitmonedero' && exchange != 'bitso' && exchange != 'buda' && exchange != 'buenbit' && exchange != 'copter' && exchange != 'criptofacil' && exchange != 'cryptomkt' && exchange != 'decrypto' && exchange != 'fiwind' && exchange != 'latamex' && exchange != 'lemoncash' && exchange != 'letsbit' && exchange != 'ripio' && exchange != 'ripioexchange' && exchange != 'satoshitango' && exchange != 'sesocio' && exchange != 'tiendacrypto' && exchange != 'universalcoin' && exchange != 'ftx' && exchange != 'saldo' && exchange != 'kriptonmarket' && exchange != 'vibrant')
    {
      lista_link.push(link_null)
    }
    lista_exchange.push(exchange);
    lista_compra.push(exchange_compra);
    lista_venta.push(exchange_venta);
  }
  // console.log(lista_link[0])
  // console.log(link_belo)

  function createTable() {
    for (let i = 0; i < len_sol; i++) {
      var row = '<tr><td style="column-width: 100px;"><a href="' + lista_link[i] + '" target="_blank">' + lista_exchange[i] + '</a></td>\n<td style="column-width: 100px;">' + lista_compra[i] + '</td><td style="column-width: 100px;">' + lista_venta[i] + '</td></tr>';
      let html = document.getElementById("sol_ars_table").innerHTML + row;
        document.getElementById("sol_ars_table").innerHTML = html;
    }
  }
  createTable();

}
sol_ars();


//////////////////////// TABLA COTIZACIONES DOT ////////////////////////
async function dot_ars() {
  const dot_ars = await fetch("https://criptoya.com/api/dot/ars/0.1");
  const dot_ars_data = await dot_ars.json();
  // console.log(dot_ars_data);

  len_dot = (Object.keys(dot_ars_data)).length;

  const lista_exchange = [];
  const lista_compra = [];
  const lista_venta = [];
  const lista_link = [];

  for (let i = 0; i < len_dot ; i++) {
    const exchange = Object.keys(dot_ars_data)[i];
    const exchange2 = Object.values(dot_ars_data)[i];
    // const exchange_compra = Object.values(exchange2)[0];
    // const exchange_venta = Object.values(exchange2)[2];
    // console.log(exchange);
    const exchange_compra = Number.parseInt(Object.values(exchange2)[0]).toLocaleString().replace(/,/g, ".");
    const exchange_venta = Number.parseInt(Object.values(exchange2)[2]).toLocaleString().replace(/,/g, ".");
    if (exchange == 'argenbtc') {
        lista_link.push(link_argenbtc)
    }
    if (exchange == 'belo') {
      lista_link.push(link_belo)
    }
    if (exchange == 'bitex') {
      lista_link.push(link_bitex)
    }
    if (exchange == 'bitso') {
      lista_link.push(link_bitso)
    }
    if (exchange == 'buda') {
      lista_link.push(link_buda)
    }
    if (exchange == 'buenbit') {
      lista_link.push(link_buenbit)
    }
    if (exchange == 'copter') {
      lista_link.push(link_copter)
    }
    if (exchange == 'criptofacil') {
      lista_link.push(link_criptofacil)
    }
    if (exchange == 'cryptomkt') {
      lista_link.push(link_cryptomkt)
    }
    if (exchange == 'decrypto') {
      lista_link.push(link_decrypto)
    }
    if (exchange == 'fiwind') {
      lista_link.push(link_fiwind)
    }
    if (exchange == 'latamex') {
      lista_link.push(link_latamex)
    }
    if (exchange == 'lemoncash') {
      lista_link.push(link_lemoncash)
    }
    if (exchange == 'letsbit') {
      lista_link.push(link_letsbit)
    }
    if (exchange == 'ripio') {
      lista_link.push(link_ripio)
    }
    if (exchange == 'ripioexchange') {
      lista_link.push(link_ripioexchange)
    }
    if (exchange == 'satoshitango') {
      lista_link.push(link_satoshitango)
    }
    if (exchange == 'sesocio') {
      lista_link.push(link_sesocio)
    }
    if (exchange == 'tiendacrypto') {
      lista_link.push(link_tiendacrypto)
    }
    if (exchange == 'universalcoins') {
      lista_link.push(link_universalcoins)
    }
    if (exchange == 'ftx') {
      lista_link.push(link_ftx)
    }
    if (exchange == 'kriptonmarket') {
      lista_link.push(link_kriptonmarket)
    }
    if (exchange == 'saldo') {
      lista_link.push(link_saldo)
    }
    if (exchange == 'bitmonedero') {
      lista_link.push(link_bitmonedero)
    }
    if (exchange == 'vibrant') {
      lista_link.push(link_vibrant)
    }
    else if (exchange != 'argenbtc' && exchange != 'belo' && exchange != 'bitex' && exchange != 'bitmonedero' && exchange != 'bitso' && exchange != 'buda' && exchange != 'buenbit' && exchange != 'copter' && exchange != 'criptofacil' && exchange != 'cryptomkt' && exchange != 'decrypto' && exchange != 'fiwind' && exchange != 'latamex' && exchange != 'lemoncash' && exchange != 'letsbit' && exchange != 'ripio' && exchange != 'ripioexchange' && exchange != 'satoshitango' && exchange != 'sesocio' && exchange != 'tiendacrypto' && exchange != 'universalcoin' && exchange != 'ftx' && exchange != 'saldo' && exchange != 'kriptonmarket' && exchange != 'vibrant')
    {
      lista_link.push(link_null)
    }
    lista_exchange.push(exchange);
    lista_compra.push(exchange_compra);
    lista_venta.push(exchange_venta);
  }
  // console.log(lista_link[0])
  // console.log(link_belo)

  function createTable() {
    for (let i = 0; i < len_dot; i++) {
      var row = '<tr><td style="column-width: 100px;"><a href="' + lista_link[i] + '" target="_blank">' + lista_exchange[i] + '</a></td>\n<td style="column-width: 100px;">' + lista_compra[i] + '</td><td style="column-width: 100px;">' + lista_venta[i] + '</td></tr>';
      let html = document.getElementById("dot_ars_table").innerHTML + row;
        document.getElementById("dot_ars_table").innerHTML = html;
    }
  }
  createTable();

}
dot_ars();

//////////////////////// TABLA COTIZACIONES MATIC ////////////////////////
async function matic_ars() {
  const matic_ars = await fetch("https://criptoya.com/api/matic/ars/0.1");
  const matic_ars_data = await matic_ars.json();
  // console.log(matic_ars_data);

  len_matic = (Object.keys(matic_ars_data)).length;

  const lista_exchange = [];
  const lista_compra = [];
  const lista_venta = [];
  const lista_link = [];

  for (let i = 0; i < len_matic ; i++) {
    const exchange = Object.keys(matic_ars_data)[i];
    const exchange2 = Object.values(matic_ars_data)[i];
    const exchange_compra = Object.values(exchange2)[0];
    const exchange_venta = Object.values(exchange2)[2];
    // console.log(exchange);
    if (exchange == 'argenbtc') {
        lista_link.push(link_argenbtc)
    }
    if (exchange == 'belo') {
      lista_link.push(link_belo)
    }
    if (exchange == 'bitex') {
      lista_link.push(link_bitex)
    }
    if (exchange == 'bitso') {
      lista_link.push(link_bitso)
    }
    if (exchange == 'buda') {
      lista_link.push(link_buda)
    }
    if (exchange == 'buenbit') {
      lista_link.push(link_buenbit)
    }
    if (exchange == 'copter') {
      lista_link.push(link_copter)
    }
    if (exchange == 'criptofacil') {
      lista_link.push(link_criptofacil)
    }
    if (exchange == 'cryptomkt') {
      lista_link.push(link_cryptomkt)
    }
    if (exchange == 'decrypto') {
      lista_link.push(link_decrypto)
    }
    if (exchange == 'fiwind') {
      lista_link.push(link_fiwind)
    }
    if (exchange == 'latamex') {
      lista_link.push(link_latamex)
    }
    if (exchange == 'lemoncash') {
      lista_link.push(link_lemoncash)
    }
    if (exchange == 'letsbit') {
      lista_link.push(link_letsbit)
    }
    if (exchange == 'ripio') {
      lista_link.push(link_ripio)
    }
    if (exchange == 'ripioexchange') {
      lista_link.push(link_ripioexchange)
    }
    if (exchange == 'satoshitango') {
      lista_link.push(link_satoshitango)
    }
    if (exchange == 'sesocio') {
      lista_link.push(link_sesocio)
    }
    if (exchange == 'tiendacrypto') {
      lista_link.push(link_tiendacrypto)
    }
    if (exchange == 'universalcoins') {
      lista_link.push(link_universalcoins)
    }
    if (exchange == 'ftx') {
      lista_link.push(link_ftx)
    }
    if (exchange == 'kriptonmarket') {
      lista_link.push(link_kriptonmarket)
    }
    if (exchange == 'saldo') {
      lista_link.push(link_saldo)
    }
    if (exchange == 'bitmonedero') {
      lista_link.push(link_bitmonedero)
    }
    if (exchange == 'vibrant') {
      lista_link.push(link_vibrant)
    }
    else if (exchange != 'argenbtc' && exchange != 'belo' && exchange != 'bitex' && exchange != 'bitmonedero' && exchange != 'bitso' && exchange != 'buda' && exchange != 'buenbit' && exchange != 'copter' && exchange != 'criptofacil' && exchange != 'cryptomkt' && exchange != 'decrypto' && exchange != 'fiwind' && exchange != 'latamex' && exchange != 'lemoncash' && exchange != 'letsbit' && exchange != 'ripio' && exchange != 'ripioexchange' && exchange != 'satoshitango' && exchange != 'sesocio' && exchange != 'tiendacrypto' && exchange != 'universalcoin' && exchange != 'ftx' && exchange != 'saldo' && exchange != 'kriptonmarket' && exchange != 'vibrant')
    {
      lista_link.push(link_null)
    }    
    lista_exchange.push(exchange);
    lista_compra.push(exchange_compra);
    lista_venta.push(exchange_venta);
  }
  // console.log(lista_link[0])
  // console.log(link_belo)

  function createTable() {
    for (let i = 0; i < len_matic; i++) {
      var row = '<tr><td style="column-width: 100px;"><a href="' + lista_link[i] + '" target="_blank">' + lista_exchange[i] + '</a></td>\n<td style="column-width: 100px;">' + lista_compra[i] + '</td><td style="column-width: 100px;">' + lista_venta[i] + '</td></tr>';
      let html = document.getElementById("matic_ars_table").innerHTML + row;
        document.getElementById("matic_ars_table").innerHTML = html;
    }
  }
  createTable();

}
matic_ars();






//////////////////////// TABLA SUPPORTED COINS ////////////////////////

async function soportadas() {
  
  const url_coins = await fetch("https://criptoya.com/api/fees");
  const coins_data = await url_coins.json();
  // console.log(coins_data);

  len_coins = (Object.keys(coins_data)).length;

  const lista_exchange = [];
  const lista_coins = [];
  

  for (let i = 0; i < len_coins ; i++) {
    const exchange = Object.keys(coins_data)[i]
    const exchange2 = Object.values(coins_data)[i]
    const exchange_coins = Object.keys(exchange2)
    // console.log(exchange);
    // console.log(exchange_coins);
    lista_exchange.push(exchange);
    lista_coins.push(exchange_coins);
  }

  function createTable() {

    for (let i = 0; i < len_coins; i++) {
      let row = '<tr><td>' + lista_exchange[i] + '</td><td style="column-width: 700px;">' + lista_coins[i] + '</td></tr>';
      let html = document.getElementById("coins_table").innerHTML + row;
        document.getElementById("coins_table").innerHTML = html;
    }
  }
  createTable();

}
soportadas();


























////////////////////////// TABLA COTIZACIONES RATES ////////////////////////

async function earn() {
  

  const uala_ars = '29.16%';
  const mercadopago_ars = '29.6 %';


  const url_belo = 'https://beta.belo.app/public/rate';
  const info_belo = await fetch(url_belo);
  const belo_data = await info_belo.json();
  // console.log((parseFloat(Object.values(Object.values(belo_data)[0])) * 100).toLocaleString().replace(".", ",") + '%')
  // console.log((parseFloat(Object.values(Object.values(belo_data)[1])) * 100).toLocaleString().replace(".", ",") + '%')
  // console.log((parseFloat(Object.values(Object.values(belo_data)[2])) * 100).toLocaleString().replace(".", ",") + '%')
  // console.log((parseFloat(Object.values(Object.values(belo_data)[3])) * 100).toLocaleString().replace(".", ",") + '%')
  // console.log((parseFloat(Object.values(Object.values(belo_data)[4])) * 100).toLocaleString().replace(".", ",") + '%')
  // console.log((parseFloat(Object.values(Object.values(belo_data)[5])) * 100).toLocaleString().replace(".", ",") + '%')
  // for (i = 0; i < belo_data.length; i++) {
    // if (Object.values(Object.values(belo_data)[i])[0] == 'USDT') {
      // var belo_usdt = (Number.parseFloat(Object.values(Object.values(belo_data)[4])[1]) * 100).toLocaleString().replace(".", ",") + '%';
    // }
    // if (Object.values(Object.values(belo_data)[i])[0] == 'DAI') {
    //   var belo_dai = (Number.parseFloat(Object.values(Object.values(belo_data)[5])[1]) * 100).toLocaleString().replace(".", ",") + '%';
    // }
    // if (Object.values(Object.values(belo_data)[i])[0] == 'USDC') {
    //   var belo_usdc = (Number.parseFloat(Object.values(Object.values(belo_data)[3])[1]) * 100).toLocaleString().replace(".", ",") + '%';
    // }
    // if (Object.values(Object.values(belo_data)[i])[0] == 'BTC') {
    //   var belo_btc = (Number.parseFloat(Object.values(Object.values(belo_data)[1])[1]) * 100).toLocaleString().replace(".", ",") + '%';
    // }
    // if (Object.values(Object.values(belo_data)[i])[0] == 'ETH') {
    //   var belo_eth = (Number.parseFloat(Object.values(Object.values(belo_data)[2])[1]) * 100).toLocaleString().replace(".", ",") + '%';
    // }
  // }
 
  // belo_usdt = '8%';  
  // belo_dai = '8.5%';
  // belo_usdc = '8.5%';
  // belo_btc = '3.5%';
  // belo_eth = '4.5%';

  belo_btc = (parseFloat(Object.values(Object.values(belo_data)[0])) * 100).toLocaleString().replace(".", ",") + '%';
  belo_eth = (parseFloat(Object.values(Object.values(belo_data)[1])) * 100).toLocaleString().replace(".", ",") + '%';
  belo_dai = (parseFloat(Object.values(Object.values(belo_data)[3])) * 100).toLocaleString().replace(".", ",") + '%';
  belo_usdt = (parseFloat(Object.values(Object.values(belo_data)[4])) * 100).toLocaleString().replace(".", ",") + '%';
  belo_usdc = (parseFloat(Object.values(Object.values(belo_data)[5])) * 100).toLocaleString().replace(".", ",") + '%';
  
  
  
  // const url_buenbit = 'https://be.buenbit.com/api/mobile/market/currencies/';
  // const info_buenbit = await fetch(url_buenbit, {
  //  headers: {
  //       'Access-Control-Allow-Origin': '*'
  //   }
  // });
  // const info_buenbit = await fetch(url_buenbit);
  // const buenbit_data = await info_buenbit.json();
  // console.log(buenbit_data);
  


  const url_lemon = 'https://api.lemoncash.com.ar/api/v1/interest-funds-percentages';
  const info_lemon = await fetch(url_lemon);
  const lemon_data = await info_lemon.json();
  for (i = 0; i < lemon_data.length; i++) {
    if (Object.values(Object.values(lemon_data)[i])[1] == 'USDT') {
      var lemon_usdt = (Number.parseFloat(Object.values(Object.values(lemon_data)[i])[0])).toLocaleString().replace(".", ",") + '%';
    }
    if (Object.values(Object.values(lemon_data)[i])[1] == 'DAI') {
      var lemon_dai = (Number.parseFloat(Object.values(Object.values(lemon_data)[i])[0])).toLocaleString().replace(".", ",") + '%';
    }
    if (Object.values(Object.values(lemon_data)[i])[1] == 'BTC') {
      var lemon_btc = (Number.parseFloat(Object.values(Object.values(lemon_data)[i])[0])).toLocaleString().replace(".", ",") + '%';
    }
    if (Object.values(Object.values(lemon_data)[i])[1] == 'ETH') {
      var lemon_eth = (Number.parseFloat(Object.values(Object.values(lemon_data)[i])[0])).toLocaleString().replace(".", ",") + '%';
    }
  }

  var lemon_usdc = '-';



  


  const url_tiendacrypto = 'https://api.tiendacrypto.com/v1/price/aUST/data';
  const info_tiendacrypto = await fetch(url_tiendacrypto);
  const tiendacrypto_data = await info_tiendacrypto.json();
  const tiendacrypto_dai = (((Object.values(tiendacrypto_data)[1]) * 100).toFixed(2)).toLocaleString().replace(".", ",") + '%';
  const tiendacrypto_usdt = '-';
  const tiendacrypto_usdc = '-';
  const tiendacrypto_btc = '-';
  const tiendacrypto_eth = '-';

  


  const url_quantia = 'https://api.quantiacapital.com:8080/1.0/interest/';
  const info_quantia = await fetch(url_quantia);
  const quantia_data = await info_quantia.json();
  // console.log(Object.values(quantia_data)[0].length);
  for (i = 0; i < Object.values(quantia_data)[0].length; i++) {
    // console.log(Object.values(quantia_data)[0]);
    if (Object.values(Object.values(Object.values(quantia_data)[0])[i])[0] == 'USDt') {
      var quantia_usdt = (Object.values(Object.values(Object.values(quantia_data)[0])[i])[1]).toLocaleString().replace(".", ",") + '%';
    }
    if (Object.values(Object.values(Object.values(quantia_data)[0])[i])[0] == 'USDC') {
      var quantia_usdc = (Object.values(Object.values(Object.values(quantia_data)[0])[i])[1]).toLocaleString().replace(".", ",") + '%';
    }
    if (Object.values(Object.values(Object.values(quantia_data)[0])[i])[0] == 'DAI') {
      var quantia_dai = (Object.values(Object.values(Object.values(quantia_data)[0])[i])[1]).toLocaleString().replace(".", ",") + '%';
    }
    if (Object.values(Object.values(Object.values(quantia_data)[0])[i])[0] == 'BTC') {
      var quantia_btc = (Object.values(Object.values(Object.values(quantia_data)[0])[i])[1]).toLocaleString().replace(".", ",") + '%';
    }
    if (Object.values(Object.values(Object.values(quantia_data)[0])[i])[0] == 'ETH') {
      var quantia_eth = (Object.values(Object.values(Object.values(quantia_data)[0])[i])[1]).toLocaleString().replace(".", ",") + '%';
    }
  }

  

  // const url_letsbit = 'https://api.letsbit.io/api/v1/lb/interests/public/currencies'
  // const info_letsbit = await fetch(url_letsbit);
  // const letsbit_data = await info_letsbit.json();
  // console.log(letsbit_data);


  // const url_letsbit = 'https://api.letsbit.io/api/v1/lb/interests/public/currencies'
  // const info_letsbit = await fetch(url_letsbit);
  // const letsbit_data = await info_letsbit.json();
  // lista = []
  // for (i = 0; i < letsbit_data.length; i++) {
  //     moneda = letsbit_data[i]['code'];
  //     strategy = letsbit_data[i]['strategies'];
  //     console.log(strategy);
  //     // if (len(strategy) > 1):
  //     //     rate1 = float(strategy[0]['rate']['rate'])
  //     //     rate2 = float(strategy[1]['rate']['rate'])
  //     //     if (rate1 > rate2):
  //     //         rate = rate1 * 100
  //     //         rate = round(rate, 2)
  //     //         rate_str = str(rate)
  //     //     else:
  //     //         rate = rate2 * 100
  //     //         rate = round(rate, 2)
  //     //         rate_str = str(rate)
  //     // elif (len(strategy) == 1):
  //     //     strategy_dict = strategy[0]
  //     //     rate_dict = strategy_dict['rate']
  //     //     rate = float(rate_dict['rate']) * 100
  //     //     rate = round(rate,2)
  //     //     rate_str = str(rate)
  //     // if (moneda == 'ars'):
  //     //     letsbit_ars_rate = rate_str
  // }
  


  const url_fiwind = 'https://api.fiwind.io/v1.0/earn/external/currencies';
  const info_fiwind = await fetch(url_fiwind);
  const fiwind_data = await info_fiwind.json();
  for (i = 0; i < fiwind_data.length; i++) {
    if (Object.values(Object.values(fiwind_data)[i])[1] == 'BTC') {
      var fiwind_btc = (Object.values(Object.values(fiwind_data)[i])[2]).toLocaleString().replace(".", ",") + '%'
    }
    if (Object.values(Object.values(fiwind_data)[i])[1] == 'ETH') {
      var fiwind_eth = (Object.values(Object.values(fiwind_data)[i])[2]).toLocaleString().replace(".", ",") + '%'
    }
    if (Object.values(Object.values(fiwind_data)[i])[1] == 'DAI') {
      var fiwind_dai = (Object.values(Object.values(fiwind_data)[i])[2]).toLocaleString().replace(".", ",") + '%'
    }
    if (Object.values(Object.values(fiwind_data)[i])[1] == 'USDT') {
      var fiwind_usdt = (Object.values(Object.values(fiwind_data)[i])[2]).toLocaleString().replace(".", ",") + '%'
    }
  }
  var fiwind_usdc = '-';

  
  const buenbit_usdt = '6%';
  const buenbit_usdc = '7%';
  const buenbit_dai = '5,25%';
  const buenbit_btc = '2,3%';
  const buenbit_eth = '3,55%';

  const ripio_usdt = '-';
  const ripio_usdc = '8%';
  const ripio_dai = '-';
  const ripio_btc = '2,5%';
  const ripio_eth = '4%';

  const decrypto_usdt = '9%';
  const decrypto_usdc = '-';
  const decrypto_dai = '-';
  const decrypto_btc = '6%';
  const decrypto_eth = '4,5%';

  const letsbit_usdt = '4,7%';
  const letsbit_usdc = '-';
  const letsbit_dai = '4,7';
  const letsbit_btc = '5,37%';
  const letsbit_eth = '5,46%';









  function createTable() {
    body = document.createElement('tbody');
    var belo = '<tr><td>belo</td>\n<td>' + belo_usdt + '</td><td>' + belo_usdc + '</td><td>' + belo_dai + '</td><td>' + belo_btc + '</td><td>' + belo_eth + '</td></tr>';
    var buenbit = '<tr><td>buenbit</td>\n<td>' + buenbit_usdt + '</td><td>' + buenbit_usdc + '</td><td>' + buenbit_dai + '</td><td>' + buenbit_btc + '</td><td>' + buenbit_eth + '</td></tr>';
    var lemon = '<tr><td>lemon</td>\n<td>' + lemon_usdt + '</td><td>' + lemon_usdc + '</td><td>' + lemon_dai + '</td><td>' + lemon_btc + '</td><td>' + lemon_eth + '</td></tr>';
    var ripio = '<tr><td>ripio</td>\n<td>' + ripio_usdt + '</td><td>' + ripio_usdc + '</td><td>' + ripio_dai + '</td><td>' + ripio_btc + '</td><td>' + ripio_eth + '</td></tr>';
    var fiwind = '<tr><td>fiwind</td>\n<td>' + fiwind_usdt + '</td><td>' + fiwind_usdc + '</td><td>' + fiwind_dai + '</td><td>' + fiwind_btc + '</td><td>' + fiwind_eth + '</td></tr>';
    var decrypto = '<tr><td>decrypto</td>\n<td>' + belo_usdt + '</td><td>' + decrypto_usdc + '</td><td>' + decrypto_dai + '</td><td>' + decrypto_btc + '</td><td>' + decrypto_eth + '</td></tr>';
    var quantia = '<tr><td>quantia_capital</td>\n<td>' + quantia_usdt + '</td><td>' + quantia_usdc + '</td><td>' + quantia_dai + '</td><td>' + quantia_btc + '</td><td>' + quantia_eth + '</td></tr>';
    var html = document.getElementById("earn_table").innerHTML +belo+buenbit+lemon+ripio+fiwind+decrypto+quantia+'<br></br>';
      document.getElementById("earn_table").innerHTML = html;
    
  }
  createTable();
}
earn();






// ORDENA POR LA COLUMNA COMPRA EN DAI
// let dai_compra = document.querySelectorAll("sort_dai_compra");
// let sort_daicompra = dai_compra.parentNode;

// console.log(dai_compra);
// dai_compra.sortDaiCompra();
// dai_compra.addEventListener(new Event("change"));
// dai_compra.dispatchEvent(new Event('change', { 'bubbles': true }));

// document.getElementById('sort_dai_compra')[0].dispatchEvent(evt);
// console.log(typeof(dai_compra));
// console.log(sort_daicompra);
// console.log(typeof(sort_dai_compra));
// dai_compra.addEventListener("click", sortDaiCompra);

// dai_compra.setAttribute("onclick","sortDaiCompra();");
// elemm.onclick = function() { alert('blah'); };

// document.addEventListener('click',function(e){
//     if(e.target && e.target.id== 'brnPrepend'){
//           //do something
//      }
//  });
// Get the element, add a click listener...
// document.getElementById("sort_dai_compra").addEventListener("click", sortDaiCompra());





//////////////////////// TABLA COMISIONES////////////////////////
// async function fees_ars() {
//   const fees_ars = await fetch("https://criptoya.com/api/fees");
//   const fees_ars_data = await fees_ars.json();
//   console.log(fees_ars_data);

//   len_fees = (Object.keys(fees_ars_data)).length;

//   const lista_exchange = [];
//   const lista_compra = [];
//   const lista_venta = [];
//   const lista_link = [];

//   for (let i = 0; i < len_fees ; i++) {
//     const exchange = Object.keys(fees_ars_data)[i];
//     const exchange2 = Object.values(fees_ars_data)[i];
//     const exchange_compra = Object.values(exchange2)[0];
//     const exchange_venta = Object.values(exchange2)[2];
//     if (exchange == 'argenbtc') {
//         lista_link.push(link_argenbtc)
//     }
//     if (exchange == 'belo') {
//       lista_link.push(link_belo)
//     }
//     if (exchange == 'bitex') {
//       lista_link.push(link_bitex)
//     }
//     if (exchange == 'bitso') {
//       lista_link.push(link_bitso)
//     }
//     if (exchange == 'buda') {
//       lista_link.push(link_buda)
//     }
//     if (exchange == 'buenbit') {
//       lista_link.push(link_buenbit)
//     }
//     if (exchange == 'copter') {
//       lista_link.push(link_copter)
//     }
//     if (exchange == 'criptofacil') {
//       lista_link.push(link_criptofacil)
//     }
//     if (exchange == 'cryptomkt') {
//       lista_link.push(link_cryptomkt)
//     }
//     if (exchange == 'decrypto') {
//       lista_link.push(link_decrypto)
//     }
//     if (exchange == 'fiwind') {
//       lista_link.push(link_fiwind)
//     }
//     if (exchange == 'latamex') {
//       lista_link.push(link_latamex)
//     }
//     if (exchange == 'lemoncash') {
//       lista_link.push(link_lemoncash)
//     }
//     if (exchange == 'letsbit') {
//       lista_link.push(link_letsbit)
//     }
//     if (exchange == 'ripio') {
//       lista_link.push(link_ripio)
//     }
//     if (exchange == 'ripioexchange') {
//       lista_link.push(link_ripioexchange)
//     }
//     if (exchange == 'satoshitango') {
//       lista_link.push(link_satoshitango)
//     }
//     if (exchange == 'sesocio') {
//       lista_link.push(link_sesocio)
//     }
//     if (exchange == 'tiendacrypto') {
//       lista_link.push(link_tiendacrypto)
//     }
//     if (exchange == 'universalcoins') {
//       lista_link.push(link_universalcoins)
//     }
//     if (exchange == 'ftx') {
//       lista_link.push(link_ftx)
//     }
//     if (exchange == 'kriptonmarket') {
//       lista_link.push(link_kriptonmarket)
//     }
//     if (exchange == 'saldo') {
//       lista_link.push(link_saldo)
//     }
//     if (exchange == 'bitmonedero') {
//       lista_link.push(link_bitmonedero)
//     }
//     if (exchange == 'vibrant') {
//       lista_link.push(link_vibrant)
//     }
//     else if (exchange != 'argenbtc' && exchange != 'belo' && exchange != 'bitex' && exchange != 'bitmonedero' && exchange != 'bitso' && exchange != 'buda' && exchange != 'buenbit' && exchange != 'copter' && exchange != 'criptofacil' && exchange != 'cryptomkt' && exchange != 'decrypto' && exchange != 'fiwind' && exchange != 'latamex' && exchange != 'lemoncash' && exchange != 'letsbit' && exchange != 'ripio' && exchange != 'ripioexchange' && exchange != 'satoshitango' && exchange != 'sesocio' && exchange != 'tiendacrypto' && exchange != 'universalcoin' && exchange != 'ftx' && exchange != 'saldo' && exchange != 'kriptonmarket' && exchange != 'vibrant')
//     {
//       lista_link.push(link_null)
//     }
//     // console.log(exchange_compra);
//     // console.log(exchange_venta);
//     lista_exchange.push(exchange);
//     lista_compra.push(exchange_compra);
//     lista_venta.push(exchange_venta);

//   }
//   // console.log(lista_link)
//   // console.log(link_belo)

//   // function createTable() {
//   //   for (let i = 0; i < len_fees; i++) {
//   //     var row = '<tr><td style="column-width: 100px;"><a href="' + lista_link[i] + '" target="_blank">' + lista_exchange[i] + '</a></td>\n<td style="column-width: 100px;">' + lista_compra[i] + '</td><td style="column-width: 100px;">' + lista_venta[i] + '</td></tr>';
//   //     let html = document.getElementById("fees_ars_table").innerHTML + row;
//   //       document.getElementById("fees_ars_table").innerHTML = html;
//   //   }
//   // }
//   // createTable();

// }
// fees_ars();










//////////////////////// BOTONES ////////////////////////

let boton_dai = document.getElementById("btnDai");
boton_dai.addEventListener("click", toggle_dai);
function toggle_dai() {
  let body_dai = document.getElementById("dai_ars_table");
  body_dai.style.display = "block";
  let body_btc = document.getElementById("btc_ars_table");
  body_btc.style.display = "none";
  let body_eth = document.getElementById("eth_ars_table");
  body_eth.style.display = "none";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "none";
  let body_usdc = document.getElementById("usdc_ars_table");
  body_usdc.style.display = "none";
  let body_dolar = document.getElementById("dolar_table");
  body_dolar.style.display = "none";
  let body_coins = document.getElementById("coins_table");
  body_coins.style.display = "none";
  let pesos_input = document.getElementById("pesos");
  pesos_input.style.display = "none";
  let dolar_input = document.getElementById("dolar");
  dolar_input.style.display = "none";
  let enter_boton = document.getElementById("boton");
  enter_boton.style.display = "none";
  let oficial = document.getElementById("oficial");
  oficial.style.display = "none";
  let blue = document.getElementById("blue");
  blue.style.display = "none";
  let earn = document.getElementById("earn_table");
  earn.style.display = "none";  
  let body_ada = document.getElementById("ada_ars_table");
  body_ada.style.display = "none";
  let body_bnb = document.getElementById("bnb_ars_table");
  body_bnb.style.display = "none";
  let body_sol = document.getElementById("sol_ars_table");
  body_sol.style.display = "none";
  let body_dot = document.getElementById("dot_ars_table");
  body_dot.style.display = "none";
  let body_matic = document.getElementById("matic_ars_table");
  body_matic.style.display = "none";
  boton_dolar.style.opacity = '0.5';
  boton_earn.style.opacity = '0.5';
  boton_btc.style.opacity = '0.5';
  boton_eth.style.opacity = '0.5';
  boton_usdt.style.opacity = '0.5';
  boton_usdc.style.opacity = '0.5';
  boton_ada.style.opacity = '0.5';
  boton_bnb.style.opacity = '0.5';
  boton_sol.style.opacity = '0.5';
  boton_dot.style.opacity = '0.5';
  boton_matic.style.opacity = '0.5';
  boton_dai.style.opacity = '1';
}

let boton_btc = document.getElementById("btnBtc");
boton_btc.addEventListener("click", toggle_btc);
function toggle_btc() {
  let body_dai = document.getElementById("dai_ars_table");
  body_dai.style.display = "none";
  let body_btc = document.getElementById("btc_ars_table");
  body_btc.style.display = "block";
  let body_eth = document.getElementById("eth_ars_table");
  body_eth.style.display = "none";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "none";
  let body_usdc = document.getElementById("usdc_ars_table");
  body_usdc.style.display = "none";
  let body_dolar = document.getElementById("dolar_table");
  body_dolar.style.display = "none";
  let body_coins = document.getElementById("coins_table");
  body_coins.style.display = "none";
  let pesos_input = document.getElementById("pesos");
  pesos_input.style.display = "none";
  let dolar_input = document.getElementById("dolar");
  dolar_input.style.display = "none";
  let enter_boton = document.getElementById("boton");
  enter_boton.style.display = "none";
  let oficial = document.getElementById("oficial");
  oficial.style.display = "none";
  let blue = document.getElementById("blue");
  blue.style.display = "none";
  let earn = document.getElementById("earn_table");
  earn.style.display = "none";
  let body_ada = document.getElementById("ada_ars_table");
  body_ada.style.display = "none";
  let body_bnb = document.getElementById("bnb_ars_table");
  body_bnb.style.display = "none";
  let body_sol = document.getElementById("sol_ars_table");
  body_sol.style.display = "none";
  let body_dot = document.getElementById("dot_ars_table");
  body_dot.style.display = "none";
  let body_matic = document.getElementById("matic_ars_table");
  body_matic.style.display = "none";
  boton_dolar.style.opacity = '0.5';
  boton_earn.style.opacity = '0.5';
  boton_dai.style.opacity = '0.5';
  boton_eth.style.opacity = '0.5';
  boton_usdt.style.opacity = '0.5'; 
  boton_usdc.style.opacity = '0.5';
  boton_ada.style.opacity = '0.5';
  boton_bnb.style.opacity = '0.5';
  boton_sol.style.opacity = '0.5';
  boton_dot.style.opacity = '0.5';
  boton_matic.style.opacity = '0.5';
  boton_btc.style.opacity = '1'; 
}

let boton_eth = document.getElementById("btnEth");
boton_eth.addEventListener("click", toggle_eth);
function toggle_eth() {
  let body_dai = document.getElementById("dai_ars_table");
  body_dai.style.display = "none";
  let body_btc = document.getElementById("btc_ars_table");
  body_btc.style.display = "none";
  let body_eth = document.getElementById("eth_ars_table");
  body_eth.style.display = "block";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "none";
  let body_usdc = document.getElementById("usdc_ars_table");
  body_usdc.style.display = "none";
  let body_dolar = document.getElementById("dolar_table");
  body_dolar.style.display = "none";
  let body_coins = document.getElementById("coins_table");
  body_coins.style.display = "none";
  let pesos_input = document.getElementById("pesos");
  pesos_input.style.display = "none";
  let dolar_input = document.getElementById("dolar");
  dolar_input.style.display = "none";
  let enter_boton = document.getElementById("boton");
  enter_boton.style.display = "none";
  let oficial = document.getElementById("oficial");
  oficial.style.display = "none";
  let blue = document.getElementById("blue");
  blue.style.display = "none";
  let earn = document.getElementById("earn_table");
  earn.style.display = "none";
  let body_ada = document.getElementById("ada_ars_table");
  body_ada.style.display = "none";
  let body_bnb = document.getElementById("bnb_ars_table");
  body_bnb.style.display = "none";
  let body_sol = document.getElementById("sol_ars_table");
  body_sol.style.display = "none";
  let body_dot = document.getElementById("dot_ars_table");
  body_dot.style.display = "none";
  let body_matic = document.getElementById("matic_ars_table");
  body_matic.style.display = "none";
  boton_dolar.style.opacity = '0.5';
  boton_earn.style.opacity = '0.5';
  boton_btc.style.opacity = '0.5';
  boton_dai.style.opacity = '0.5';
  boton_usdt.style.opacity = '0.5';
  boton_usdc.style.opacity = '0.5';
  boton_ada.style.opacity = '0.5';
  boton_bnb.style.opacity = '0.5';
  boton_sol.style.opacity = '0.5';
  boton_dot.style.opacity = '0.5';
  boton_matic.style.opacity = '0.5';
  boton_eth.style.opacity = '1';
}

let boton_usdt = document.getElementById("btnUsdt");
boton_usdt.addEventListener("click", toggle_usdt);
function toggle_usdt() {
  let body_dai = document.getElementById("dai_ars_table");
  body_dai.style.display = "none";
  let body_btc = document.getElementById("btc_ars_table");
  body_btc.style.display = "none";
  let body_eth = document.getElementById("eth_ars_table");
  body_eth.style.display = "none";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "block";
  let body_usdc = document.getElementById("usdc_ars_table");
  body_usdc.style.display = "none";
  let body_dolar = document.getElementById("dolar_table");
  body_dolar.style.display = "none";
  let body_coins = document.getElementById("coins_table");
  body_coins.style.display = "none";
  let pesos_input = document.getElementById("pesos");
  pesos_input.style.display = "none";
  let dolar_input = document.getElementById("dolar");
  dolar_input.style.display = "none";
  let enter_boton = document.getElementById("boton");
  enter_boton.style.display = "none";
  let oficial = document.getElementById("oficial");
  oficial.style.display = "none";
  let blue = document.getElementById("blue");
  blue.style.display = "none";
  let earn = document.getElementById("earn_table");
  earn.style.display = "none";
  let body_ada = document.getElementById("ada_ars_table");
  body_ada.style.display = "none";
  let body_bnb = document.getElementById("bnb_ars_table");
  body_bnb.style.display = "none";
  let body_sol = document.getElementById("sol_ars_table");
  body_sol.style.display = "none";
  let body_dot = document.getElementById("dot_ars_table");
  body_dot.style.display = "none";
  let body_matic = document.getElementById("matic_ars_table");
  body_matic.style.display = "none";
  boton_dolar.style.opacity = '0.5';
  boton_earn.style.opacity = '0.5';
  boton_btc.style.opacity = '0.5';
  boton_eth.style.opacity = '0.5';
  boton_dai.style.opacity = '0.5';
  boton_usdc.style.opacity = '0.5';
  boton_ada.style.opacity = '0.5';
  boton_bnb.style.opacity = '0.5';
  boton_sol.style.opacity = '0.5';
  boton_dot.style.opacity = '0.5';
  boton_matic.style.opacity = '0.5';
  boton_usdt.style.opacity = '1';
}

let boton_usdc = document.getElementById("btnUsdc");
boton_usdc.addEventListener("click", toggle_usdc);
function toggle_usdc() {
  let body_dai = document.getElementById("dai_ars_table");
  body_dai.style.display = "none";
  let body_btc = document.getElementById("btc_ars_table");
  body_btc.style.display = "none";
  let body_eth = document.getElementById("eth_ars_table");
  body_eth.style.display = "none";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "none";
  let body_usdc = document.getElementById("usdc_ars_table");
  body_usdc.style.display = "block";
  let body_dolar = document.getElementById("dolar_table");
  body_dolar.style.display = "none";
  let body_coins = document.getElementById("coins_table");
  body_coins.style.display = "none";
  let pesos_input = document.getElementById("pesos");
  pesos_input.style.display = "none";
  let dolar_input = document.getElementById("dolar");
  dolar_input.style.display = "none";
  let enter_boton = document.getElementById("boton");
  enter_boton.style.display = "none";
  let oficial = document.getElementById("oficial");
  oficial.style.display = "none";
  let blue = document.getElementById("blue");
  blue.style.display = "none";
  let earn = document.getElementById("earn_table");
  earn.style.display = "none";
  let body_ada = document.getElementById("ada_ars_table");
  body_ada.style.display = "none";
  let body_bnb = document.getElementById("bnb_ars_table");
  body_bnb.style.display = "none";
  let body_sol = document.getElementById("sol_ars_table");
  body_sol.style.display = "none";
  let body_dot = document.getElementById("dot_ars_table");
  body_dot.style.display = "none";
  let body_matic = document.getElementById("matic_ars_table");
  body_matic.style.display = "none";
  boton_dolar.style.opacity = '0.5';
  boton_earn.style.opacity = '0.5';
  boton_btc.style.opacity = '0.5';
  boton_eth.style.opacity = '0.5';
  boton_dai.style.opacity = '0.5';
  boton_usdt.style.opacity = '0.5';
  boton_ada.style.opacity = '0.5';
  boton_bnb.style.opacity = '0.5';
  boton_sol.style.opacity = '0.5';
  boton_dot.style.opacity = '0.5';
  boton_matic.style.opacity = '0.5';
  boton_usdc.style.opacity = '1';
}




let boton_dolar = document.getElementById("btnDolar");
boton_dolar.addEventListener("click", toggle_dolar);
function toggle_dolar() {
  let body_dai = document.getElementById("dai_ars_table");
  body_dai.style.display = "none";
  let body_btc = document.getElementById("btc_ars_table");
  body_btc.style.display = "none";
  let body_eth = document.getElementById("eth_ars_table");
  body_eth.style.display = "none";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "none";
  let body_usdc = document.getElementById("usdc_ars_table");
  body_usdc.style.display = "none";
  let body_coins = document.getElementById("coins_table");
  body_coins.style.display = "none";
  let body_dolar = document.getElementById("dolar_table");
  body_dolar.style.display = "block";
  let pesos_input = document.getElementById("pesos");
  pesos_input.style.display = "block";
  let dolar_input = document.getElementById("dolar");
  dolar_input.style.display = "block";
  let enter_boton = document.getElementById("boton");
  enter_boton.style.display = "block";
  let earn = document.getElementById("earn_table");
  earn.style.display = "none";
  let body_ada = document.getElementById("ada_ars_table");
  body_ada.style.display = "none";
  let body_bnb = document.getElementById("bnb_ars_table");
  body_bnb.style.display = "none";
  let body_sol = document.getElementById("sol_ars_table");
  body_sol.style.display = "none";
  let body_dot = document.getElementById("dot_ars_table");
  body_dot.style.display = "none";
  let body_matic = document.getElementById("matic_ars_table");
  body_matic.style.display = "none";
  boton_dai.style.opacity = '0.5';
  boton_earn.style.opacity = '0.5';
  boton_btc.style.opacity = '0.5';
  boton_eth.style.opacity = '0.5';
  boton_usdt.style.opacity = '0.5';
  boton_usdc.style.opacity = '0.5';
  boton_ada.style.opacity = '0.5';
  boton_bnb.style.opacity = '0.5';
  boton_sol.style.opacity = '0.5';
  boton_dot.style.opacity = '0.5';
  boton_matic.style.opacity = '0.5';
  boton_dolar.style.opacity = '1';
}

let boton_earn = document.getElementById("btnEarn");
boton_earn.addEventListener("click", toggle_earn);
function toggle_earn() {
  let body_dai = document.getElementById("dai_ars_table");
  body_dai.style.display = "none";
  let body_btc = document.getElementById("btc_ars_table");
  body_btc.style.display = "none";
  let body_eth = document.getElementById("eth_ars_table");
  body_eth.style.display = "none";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "none";
  let body_usdc = document.getElementById("usdc_ars_table");
  body_usdc.style.display = "none";
  let body_coins = document.getElementById("coins_table");
  body_coins.style.display = "none";
  let body_dolar = document.getElementById("dolar_table");
  body_dolar.style.display = "none";
  let pesos_input = document.getElementById("pesos");
  pesos_input.style.display = "none";
  let dolar_input = document.getElementById("dolar");
  dolar_input.style.display = "none";
  let enter_boton = document.getElementById("boton");
  enter_boton.style.display = "none";
  let oficial = document.getElementById("oficial");
  oficial.style.display = "none";
  let blue = document.getElementById("blue");
  blue.style.display = "none";
  let earn = document.getElementById("earn_table");
  earn.style.display = "block";
  let body_ada = document.getElementById("ada_ars_table");
  body_ada.style.display = "none";
  let body_bnb = document.getElementById("bnb_ars_table");
  body_bnb.style.display = "none";
  let body_sol = document.getElementById("sol_ars_table");
  body_sol.style.display = "none";
  let body_dot = document.getElementById("dot_ars_table");
  body_dot.style.display = "none";
  let body_matic = document.getElementById("matic_ars_table");
  body_matic.style.display = "none";
  boton_dolar.style.opacity = '0.5';
  boton_dai.style.opacity = '0.5';
  boton_btc.style.opacity = '0.5';
  boton_eth.style.opacity = '0.5';
  boton_usdt.style.opacity = '0.5';
  boton_usdc.style.opacity = '0.5';
  boton_ada.style.opacity = '0.5';
  boton_bnb.style.opacity = '0.5';
  boton_sol.style.opacity = '0.5';
  boton_dot.style.opacity = '0.5';
  boton_matic.style.opacity = '0.5';
  boton_earn.style.opacity = '1';
}

let boton_ada = document.getElementById("btnAda");
boton_ada.addEventListener("click", toggle_ada);
function toggle_ada() {
  let body_dai = document.getElementById("dai_ars_table");
  body_dai.style.display = "none";
  let body_btc = document.getElementById("btc_ars_table");
  body_btc.style.display = "none";
  let body_eth = document.getElementById("eth_ars_table");
  body_eth.style.display = "none";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "none";
  let body_usdc = document.getElementById("usdc_ars_table");
  body_usdc.style.display = "none";
  let body_coins = document.getElementById("coins_table");
  body_coins.style.display = "none";
  let body_dolar = document.getElementById("dolar_table");
  body_dolar.style.display = "none";
  let pesos_input = document.getElementById("pesos");
  pesos_input.style.display = "none";
  let dolar_input = document.getElementById("dolar");
  dolar_input.style.display = "none";
  let enter_boton = document.getElementById("boton");
  enter_boton.style.display = "none";
  let oficial = document.getElementById("oficial");
  oficial.style.display = "none";
  let blue = document.getElementById("blue");
  blue.style.display = "none";
  let earn = document.getElementById("earn_table");
  earn.style.display = "none";
  let body_ada = document.getElementById("ada_ars_table");
  body_ada.style.display = "block";
  let body_bnb = document.getElementById("bnb_ars_table");
  body_bnb.style.display = "none";
  let body_sol = document.getElementById("sol_ars_table");
  body_sol.style.display = "none";
  let body_dot = document.getElementById("dot_ars_table");
  body_dot.style.display = "none";
  let body_matic = document.getElementById("matic_ars_table");
  body_matic.style.display = "none";
  boton_dolar.style.opacity = '0.5';
  boton_dai.style.opacity = '0.5';
  boton_btc.style.opacity = '0.5';
  boton_eth.style.opacity = '0.5';
  boton_usdt.style.opacity = '0.5';
  boton_usdc.style.opacity = '0.5';
  boton_ada.style.opacity = '1';
  boton_bnb.style.opacity = '0.5';
  boton_sol.style.opacity = '0.5';
  boton_dot.style.opacity = '0.5';
  boton_matic.style.opacity = '0.5';
  boton_earn.style.opacity = '0.5';
}

let boton_bnb = document.getElementById("btnBnb");
boton_bnb.addEventListener("click", toggle_bnb);
function toggle_bnb() {
  let body_dai = document.getElementById("dai_ars_table");
  body_dai.style.display = "none";
  let body_btc = document.getElementById("btc_ars_table");
  body_btc.style.display = "none";
  let body_eth = document.getElementById("eth_ars_table");
  body_eth.style.display = "none";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "none";
  let body_usdc = document.getElementById("usdc_ars_table");
  body_usdc.style.display = "none";
  let body_coins = document.getElementById("coins_table");
  body_coins.style.display = "none";
  let body_dolar = document.getElementById("dolar_table");
  body_dolar.style.display = "none";
  let pesos_input = document.getElementById("pesos");
  pesos_input.style.display = "none";
  let dolar_input = document.getElementById("dolar");
  dolar_input.style.display = "none";
  let enter_boton = document.getElementById("boton");
  enter_boton.style.display = "none";
  let oficial = document.getElementById("oficial");
  oficial.style.display = "none";
  let blue = document.getElementById("blue");
  blue.style.display = "none";
  let earn = document.getElementById("earn_table");
  earn.style.display = "none";
  let body_ada = document.getElementById("ada_ars_table");
  body_ada.style.display = "none";
  let body_bnb = document.getElementById("bnb_ars_table");
  body_bnb.style.display = "block";
  let body_sol = document.getElementById("sol_ars_table");
  body_sol.style.display = "none";
  let body_dot = document.getElementById("dot_ars_table");
  body_dot.style.display = "none";
  let body_matic = document.getElementById("matic_ars_table");
  body_matic.style.display = "none";
  boton_dolar.style.opacity = '0.5';
  boton_dai.style.opacity = '0.5';
  boton_btc.style.opacity = '0.5';
  boton_eth.style.opacity = '0.5';
  boton_usdt.style.opacity = '0.5';
  boton_usdc.style.opacity = '0.5';
  boton_ada.style.opacity = '0.5';
  boton_bnb.style.opacity = '1';
  boton_sol.style.opacity = '0.5';
  boton_dot.style.opacity = '0.5';
  boton_matic.style.opacity = '0.5';
  boton_earn.style.opacity = '0.5';
}

let boton_sol = document.getElementById("btnSol");
boton_sol.addEventListener("click", toggle_sol);
function toggle_sol() {
  let body_dai = document.getElementById("dai_ars_table");
  body_dai.style.display = "none";
  let body_btc = document.getElementById("btc_ars_table");
  body_btc.style.display = "none";
  let body_eth = document.getElementById("eth_ars_table");
  body_eth.style.display = "none";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "none";
  let body_usdc = document.getElementById("usdc_ars_table");
  body_usdc.style.display = "none";
  let body_coins = document.getElementById("coins_table");
  body_coins.style.display = "none";
  let body_dolar = document.getElementById("dolar_table");
  body_dolar.style.display = "none";
  let pesos_input = document.getElementById("pesos");
  pesos_input.style.display = "none";
  let dolar_input = document.getElementById("dolar");
  dolar_input.style.display = "none";
  let enter_boton = document.getElementById("boton");
  enter_boton.style.display = "none";
  let oficial = document.getElementById("oficial");
  oficial.style.display = "none";
  let blue = document.getElementById("blue");
  blue.style.display = "none";
  let earn = document.getElementById("earn_table");
  earn.style.display = "none";
  let body_ada = document.getElementById("ada_ars_table");
  body_ada.style.display = "none";
  let body_bnb = document.getElementById("bnb_ars_table");
  body_bnb.style.display = "none";
  let body_sol = document.getElementById("sol_ars_table");
  body_sol.style.display = "block";
  let body_dot = document.getElementById("dot_ars_table");
  body_dot.style.display = "none";
  let body_matic = document.getElementById("matic_ars_table");
  body_matic.style.display = "none";
  boton_dolar.style.opacity = '0.5';
  boton_dai.style.opacity = '0.5';
  boton_btc.style.opacity = '0.5';
  boton_eth.style.opacity = '0.5';
  boton_usdt.style.opacity = '0.5';
  boton_usdc.style.opacity = '0.5';
  boton_ada.style.opacity = '0.5';
  boton_bnb.style.opacity = '0.5';
  boton_sol.style.opacity = '1';
  boton_dot.style.opacity = '0.5';
  boton_matic.style.opacity = '0.5';
  boton_earn.style.opacity = '0.5';
}


let boton_dot = document.getElementById("btnDot");
boton_dot.addEventListener("click", toggle_dot);
function toggle_dot() {
  let body_dai = document.getElementById("dai_ars_table");
  body_dai.style.display = "none";
  let body_btc = document.getElementById("btc_ars_table");
  body_btc.style.display = "none";
  let body_eth = document.getElementById("eth_ars_table");
  body_eth.style.display = "none";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "none";
  let body_usdc = document.getElementById("usdc_ars_table");
  body_usdc.style.display = "none";
  let body_coins = document.getElementById("coins_table");
  body_coins.style.display = "none";
  let body_dolar = document.getElementById("dolar_table");
  body_dolar.style.display = "none";
  let pesos_input = document.getElementById("pesos");
  pesos_input.style.display = "none";
  let dolar_input = document.getElementById("dolar");
  dolar_input.style.display = "none";
  let enter_boton = document.getElementById("boton");
  enter_boton.style.display = "none";
  let oficial = document.getElementById("oficial");
  oficial.style.display = "none";
  let blue = document.getElementById("blue");
  blue.style.display = "none";
  let earn = document.getElementById("earn_table");
  earn.style.display = "none";
  let body_ada = document.getElementById("ada_ars_table");
  body_ada.style.display = "none";
  let body_bnb = document.getElementById("bnb_ars_table");
  body_bnb.style.display = "none";
  let body_sol = document.getElementById("sol_ars_table");
  body_sol.style.display = "none";
  let body_dot = document.getElementById("dot_ars_table");
  body_dot.style.display = "block";
  let body_matic = document.getElementById("matic_ars_table");
  body_matic.style.display = "none";
  boton_dolar.style.opacity = '0.5';
  boton_dai.style.opacity = '0.5';
  boton_btc.style.opacity = '0.5';
  boton_eth.style.opacity = '0.5';
  boton_usdt.style.opacity = '0.5';
  boton_usdc.style.opacity = '0.5';
  boton_ada.style.opacity = '0.5';
  boton_bnb.style.opacity = '0.5';
  boton_sol.style.opacity = '0.5';
  boton_dot.style.opacity = '1';
  boton_matic.style.opacity = '0.5';
  boton_earn.style.opacity = '0.5';
}

let boton_matic = document.getElementById("btnMatic");
boton_matic.addEventListener("click", toggle_matic);
function toggle_matic() {
  let body_dai = document.getElementById("dai_ars_table");
  body_dai.style.display = "none";
  let body_btc = document.getElementById("btc_ars_table");
  body_btc.style.display = "none";
  let body_eth = document.getElementById("eth_ars_table");
  body_eth.style.display = "none";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "none";
  let body_usdc = document.getElementById("usdc_ars_table");
  body_usdc.style.display = "none";
  let body_coins = document.getElementById("coins_table");
  body_coins.style.display = "none";
  let body_dolar = document.getElementById("dolar_table");
  body_dolar.style.display = "none";
  let pesos_input = document.getElementById("pesos");
  pesos_input.style.display = "none";
  let dolar_input = document.getElementById("dolar");
  dolar_input.style.display = "none";
  let enter_boton = document.getElementById("boton");
  enter_boton.style.display = "none";
  let oficial = document.getElementById("oficial");
  oficial.style.display = "none";
  let blue = document.getElementById("blue");
  blue.style.display = "none";
  let earn = document.getElementById("earn_table");
  earn.style.display = "none";
  let body_ada = document.getElementById("ada_ars_table");
  body_ada.style.display = "none";
  let body_bnb = document.getElementById("bnb_ars_table");
  body_bnb.style.display = "none";
  let body_sol = document.getElementById("sol_ars_table");
  body_sol.style.display = "none";
  let body_dot = document.getElementById("dot_ars_table");
  body_dot.style.display = "none";
  let body_matic = document.getElementById("matic_ars_table");
  body_matic.style.display = "block";
  boton_dolar.style.opacity = '0.5';
  boton_dai.style.opacity = '0.5';
  boton_btc.style.opacity = '0.5';
  boton_eth.style.opacity = '0.5';
  boton_usdt.style.opacity = '0.5';
  boton_usdc.style.opacity = '0.5';
  boton_ada.style.opacity = '0.5';
  boton_bnb.style.opacity = '0.5';
  boton_sol.style.opacity = '0.5';
  boton_dot.style.opacity = '0.5';
  boton_matic.style.opacity = '1';
  boton_earn.style.opacity = '0.5';
}






// let boton_wallet = document.getElementById("btnWallet");
// boton_wallet.addEventListener("click", toggle_wallet);
// function toggle_wallet() {
//   let body_dai = document.getElementById("dai_ars_table");
//   body_dai.style.display = "none";
//   let body_btc = document.getElementById("btc_ars_table");
//   body_btc.style.display = "none";
//   let body_eth = document.getElementById("eth_ars_table");
//   body_eth.style.display = "none";
//   let body_coins = document.getElementById("coins_table");
//   body_coins.style.display = "none";
//   let body_dolar = document.getElementById("dolar_table");
//   body_dolar.style.display = "none";
//   let pesos_input = document.getElementById("pesos_input");
//   pesos_input.style.display = "none";
//   let dolar_input = document.getElementById("dolar_input");
//   dolar_input.style.display = "none";
//   let enter_boton = document.getElementById("enter_boton");
//   enter_boton.style.display = "none";
//   let oficial = document.getElementById("oficial_input");
//   oficial.style.display = "none";
//   let blue = document.getElementById("blue_input");
//   blue.style.display = "none";
//   let earn = document.getElementById("earn_table");
//   earn.style.display = "none";
//   let belo_qr = document.getElementById("belo_qr");
//   belo_qr.style.display = "none";
//   let buenbit_qr = document.getElementById("buenbit_qr");
//   buenbit_qr.style.display = "none";
//   let ripio_qr = document.getElementById("ripio_qr");
//   ripio_qr.style.display = "none";
//   let satoshi_qr = document.getElementById("satoshi_qr");
//   satoshi_qr.style.display = "none";
//   let body_belo = document.getElementById("btnBelo");
//   let body_buenbit = document.getElementById("btnBuenbit");
//   let body_ripio = document.getElementById("btnRipio");
//   let body_satoshi = document.getElementById("btnSatoshi");
//   if (body_belo.style.display == "none") {
//     body_belo.style.display = "inline";
//     body_buenbit.style.display = "inline";
//     body_ripio.style.display = "inline";
//     body_satoshi.style.display = "inline";
//   }
//   else {
//     body_belo.style.display = "none";
//     body_buenbit.style.display = "none";
//     body_ripio.style.display = "none";
//     body_satoshi.style.display = "none";
//   }
// }



let boton_belo = document.getElementById("btnBelo");
boton_belo.addEventListener("click", toggle_belo);
function toggle_belo() {
  let belo_qr = document.getElementById("belo_qr");
  belo_qr.style.display = "block";
  let ripio_qr = document.getElementById("ripio_qr");
  ripio_qr.style.display = "none";
  let buenbit_qr = document.getElementById("buenbit_qr");
  buenbit_qr.style.display = "none";
  let satoshi_qr = document.getElementById("satoshi_qr");
  satoshi_qr.style.display = "none";
}
let boton_ripio = document.getElementById("btnRipio");
boton_ripio.addEventListener("click", toggle_ripio);
function toggle_ripio() {
  let belo_qr = document.getElementById("belo_qr");
  belo_qr.style.display = "none";
  let ripio_qr = document.getElementById("ripio_qr");
  ripio_qr.style.display = "block";
  let buenbit_qr = document.getElementById("buenbit_qr");
  buenbit_qr.style.display = "none";
  let satoshi_qr = document.getElementById("satoshi_qr");
  satoshi_qr.style.display = "none";
}
let boton_buenbit = document.getElementById("btnBuenbit");
boton_buenbit.addEventListener("click", toggle_buenbit);
function toggle_buenbit() {
  let belo_qr = document.getElementById("belo_qr");
  belo_qr.style.display = "none";
  let ripio_qr = document.getElementById("ripio_qr");
  ripio_qr.style.display = "none";
  let buenbit_qr = document.getElementById("buenbit_qr");
  buenbit_qr.style.display = "block";
  let satoshi_qr = document.getElementById("satoshi_qr");
  satoshi_qr.style.display = "none";
}
let boton_satoshi = document.getElementById("btnSatoshi");
boton_satoshi.addEventListener("click", toggle_satoshi);
function toggle_satoshi() {
  let belo_qr = document.getElementById("belo_qr");
  belo_qr.style.display = "none";
  let ripio_qr = document.getElementById("ripio_qr");
  ripio_qr.style.display = "none";
  let buenbit_qr = document.getElementById("buenbit_qr");
  buenbit_qr.style.display = "none";
  let satoshi_qr = document.getElementById("satoshi_qr");
  satoshi_qr.style.display = "block";
}



















////////////////////////// ORDENA POR LA COLUMNA COMPRA EN DAI ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_dai_compra' ) {
    sortCompraDai();
  };
} );
function sortCompraDai() {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("dai_ars_table");
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
}
//////////////////////// ORDENA POR LA COLUMNA VENTA EN DAI ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_dai_venta' ) {
    sortVentaDai();
  };
} );
function sortVentaDai() {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("dai_ars_table");
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
}





////////////////////////// ORDENA POR LA COLUMNA COMPRA EN USDT ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_usdt_compra' ) {
    sortCompraUsdt();
  };
} );
function sortCompraUsdt() {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("usdt_ars_table");
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
}
//////////////////////// ORDENA POR LA COLUMNA VENTA EN USDT ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_usdt_venta' ) {
    sortVentaUsdt();
  };
} );
function sortVentaUsdt() {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("usdt_ars_table");
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
}


////////////////////////// ORDENA POR LA COLUMNA COMPRA EN USDC ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_usdc_compra' ) {
    sortCompraUsdc();
  };
} );
function sortCompraUsdc() {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("usdc_ars_table");
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
}
//////////////////////// ORDENA POR LA COLUMNA VENTA EN USDC ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_usdc_venta' ) {
    sortVentaUsdc();
  };
} );
function sortVentaUsdc() {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("usdc_ars_table");
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
}




//////////////////////// ORDENA POR LA COLUMNA COMPRA EN BTC ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_btc_compra' ) {
    sortCompraBtc();
  };
} );
function sortCompraBtc() {
  let table2, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table2 = document.getElementById("btc_ars_table");
  for (let i = 1; i <= len_btc ; i++) {
    trs = table2.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_num = Number.parseInt((trs_compra).toLocaleString().replace(/\./g,''));
    venta_to_num = Number.parseInt((trs_venta).toLocaleString().replace(/\./g,''));
    trs.children[1].innerHTML = compra_to_num;
    trs.children[2].innerHTML = venta_to_num;
  }
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table2.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
  for (let i = 1; i <= len_btc ; i++) {
    trs = table2.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_str = Number.parseInt(trs_compra).toLocaleString().replace(/,/g, ".");
    venta_to_str = Number.parseInt(trs_venta).toLocaleString().replace(/,/g, ".");
    trs.children[1].innerHTML = compra_to_str;
    trs.children[2].innerHTML = venta_to_str;
  }    
}
//////////////////////// ORDENA POR LA COLUMNA VENTA EN BTC ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_btc_venta' ) {
    sortVentaBtc();
  };
} );
function sortVentaBtc() {
  let table3, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table3 = document.getElementById("btc_ars_table");
  for (let i = 1; i <= len_btc ; i++) {
    trs = table3.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_num = Number.parseInt((trs_compra).toLocaleString().replace(/\./g,''));
    venta_to_num = Number.parseInt((trs_venta).toLocaleString().replace(/\./g,''));
    trs.children[1].innerHTML = compra_to_num;
    trs.children[2].innerHTML = venta_to_num;
  }
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table3.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
  for (let i = 1; i <= len_btc ; i++) {
    trs = table3.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_str = Number.parseInt(trs_compra).toLocaleString().replace(/,/g, ".");
    venta_to_str = Number.parseInt(trs_venta).toLocaleString().replace(/,/g, ".");
    trs.children[1].innerHTML = compra_to_str;
    trs.children[2].innerHTML = venta_to_str;
  }    
}












//////////////////////// ORDENA POR LA COLUMNA COMPRA EN ETH ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_eth_compra' ) {
    sortCompraEth();
  };
} );
function sortCompraEth() {
  let table5, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table5 = document.getElementById("eth_ars_table");
  for (let i = 1; i <= len_eth ; i++) {
    trs = table5.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_num = Number.parseInt((trs_compra).toLocaleString().replace(/\./g,''));
    venta_to_num = Number.parseInt((trs_venta).toLocaleString().replace(/\./g,''));
    trs.children[1].innerHTML = compra_to_num;
    trs.children[2].innerHTML = venta_to_num;
  }
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table5.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
  for (let i = 1; i <= len_eth ; i++) {
    trs = table5.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_str = Number.parseInt(trs_compra).toLocaleString().replace(/,/g, ".");
    venta_to_str = Number.parseInt(trs_venta).toLocaleString().replace(/,/g, ".");
    trs.children[1].innerHTML = compra_to_str;
    trs.children[2].innerHTML = venta_to_str;
  }    
}
//////////////////////// ORDENA POR LA COLUMNA VENTA EN ETH ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_eth_venta' ) {
    sortVentaEth();
  };
} );
function sortVentaEth() {
  let table6, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table6 = document.getElementById("eth_ars_table");
  for (let i = 1; i <= len_eth ; i++) {
    trs = table6.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_num = Number.parseInt((trs_compra).toLocaleString().replace(/\./g,''));
    venta_to_num = Number.parseInt((trs_venta).toLocaleString().replace(/\./g,''));
    trs.children[1].innerHTML = compra_to_num;
    trs.children[2].innerHTML = venta_to_num;
  }
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table6.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
  for (let i = 1; i <= len_eth ; i++) {
    trs = table6.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_str = Number.parseInt(trs_compra).toLocaleString().replace(/,/g, ".");
    venta_to_str = Number.parseInt(trs_venta).toLocaleString().replace(/,/g, ".");
    trs.children[1].innerHTML = compra_to_str;
    trs.children[2].innerHTML = venta_to_str;
  }    
}









////////////////////////// ORDENA POR LA COLUMNA COMPRA EN ADA ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_ada_compra' ) {
    sortCompraAda();
  };
} );
function sortCompraAda() {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("ada_ars_table");
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
}
//////////////////////// ORDENA POR LA COLUMNA VENTA EN ADA ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_ada_venta' ) {
    sortVentaAda();
  };
} );
function sortVentaAda() {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("ada_ars_table");
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
}





////////////////////////// ORDENA POR LA COLUMNA COMPRA EN MATIC ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_matic_compra' ) {
    sortCompraMatic();
  };
} );
function sortCompraMatic() {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("matic_ars_table");
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
}
//////////////////////// ORDENA POR LA COLUMNA VENTA EN MATIC ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_matic_venta' ) {
    sortVentaMatic();
  };
} );
function sortVentaMatic() {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("matic_ars_table");
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
}




//////////////////////// ORDENA POR LA COLUMNA COMPRA EN BNB ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_bnb_compra' ) {
    sortCompraBnb();
  };
} );
function sortCompraBnb() {
  let table11, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table11 = document.getElementById("bnb_ars_table");
  for (let i = 1; i <= len_bnb ; i++) {
    trs = table11.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_num = Number.parseInt((trs_compra).toLocaleString().replace(/\./g,''));
    venta_to_num = Number.parseInt((trs_venta).toLocaleString().replace(/\./g,''));
    trs.children[1].innerHTML = compra_to_num;
    trs.children[2].innerHTML = venta_to_num;
  }
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table11.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
  for (let i = 1; i <= len_bnb ; i++) {
    trs = table11.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_str = Number.parseInt(trs_compra).toLocaleString().replace(/,/g, ".");
    venta_to_str = Number.parseInt(trs_venta).toLocaleString().replace(/,/g, ".");
    trs.children[1].innerHTML = compra_to_str;
    trs.children[2].innerHTML = venta_to_str;
  }    
}
//////////////////////// ORDENA POR LA COLUMNA VENTA EN BNB ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_bnb_venta' ) {
    sortVentaBnb();
  };
} );
function sortVentaBnb() {
  let table9, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table9 = document.getElementById("bnb_ars_table");
  for (let i = 1; i <= len_bnb ; i++) {
    trs = table9.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_num = Number.parseInt((trs_compra).toLocaleString().replace(/\./g,''));
    venta_to_num = Number.parseInt((trs_venta).toLocaleString().replace(/\./g,''));
    trs.children[1].innerHTML = compra_to_num;
    trs.children[2].innerHTML = venta_to_num;
  }
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table9.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
  for (let i = 1; i <= len_bnb ; i++) {
    trs = table9.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_str = Number.parseInt(trs_compra).toLocaleString().replace(/,/g, ".");
    venta_to_str = Number.parseInt(trs_venta).toLocaleString().replace(/,/g, ".");
    trs.children[1].innerHTML = compra_to_str;
    trs.children[2].innerHTML = venta_to_str;
  }    
}





//////////////////////// ORDENA POR LA COLUMNA COMPRA EN SOL ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_sol_compra' ) {
    sortCompraSol();
  };
} );
function sortCompraSol() {
  let table11, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table11 = document.getElementById("sol_ars_table");
  for (let i = 1; i <= len_sol ; i++) {
    trs = table11.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_num = Number.parseInt((trs_compra).toLocaleString().replace(/\./g,''));
    venta_to_num = Number.parseInt((trs_venta).toLocaleString().replace(/\./g,''));
    trs.children[1].innerHTML = compra_to_num;
    trs.children[2].innerHTML = venta_to_num;
  }
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table11.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
  for (let i = 1; i <= len_sol ; i++) {
    trs = table11.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_str = Number.parseInt(trs_compra).toLocaleString().replace(/,/g, ".");
    venta_to_str = Number.parseInt(trs_venta).toLocaleString().replace(/,/g, ".");
    trs.children[1].innerHTML = compra_to_str;
    trs.children[2].innerHTML = venta_to_str;
  }    
}
//////////////////////// ORDENA POR LA COLUMNA VENTA EN SOL ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_sol_venta' ) {
    sortVentaSol();
  };
} );
function sortVentaSol() {
  let table9, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table9 = document.getElementById("sol_ars_table");
  for (let i = 1; i <= len_sol ; i++) {
    trs = table9.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_num = Number.parseInt((trs_compra).toLocaleString().replace(/\./g,''));
    venta_to_num = Number.parseInt((trs_venta).toLocaleString().replace(/\./g,''));
    trs.children[1].innerHTML = compra_to_num;
    trs.children[2].innerHTML = venta_to_num;
  }
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table9.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
  for (let i = 1; i <= len_sol ; i++) {
    trs = table9.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_str = Number.parseInt(trs_compra).toLocaleString().replace(/,/g, ".");
    venta_to_str = Number.parseInt(trs_venta).toLocaleString().replace(/,/g, ".");
    trs.children[1].innerHTML = compra_to_str;
    trs.children[2].innerHTML = venta_to_str;
  }    
}



//////////////////////// ORDENA POR LA COLUMNA COMPRA EN DOT ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_dot_compra' ) {
    sortCompraDot();
  };
} );
function sortCompraDot() {
  let table11, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table11 = document.getElementById("dot_ars_table");
  for (let i = 1; i <= len_dot ; i++) {
    trs = table11.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_num = Number.parseInt((trs_compra).toLocaleString().replace(/\./g,''));
    venta_to_num = Number.parseInt((trs_venta).toLocaleString().replace(/\./g,''));
    trs.children[1].innerHTML = compra_to_num;
    trs.children[2].innerHTML = venta_to_num;
  }
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table11.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
  for (let i = 1; i <= len_dot ; i++) {
    trs = table11.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_str = Number.parseInt(trs_compra).toLocaleString().replace(/,/g, ".");
    venta_to_str = Number.parseInt(trs_venta).toLocaleString().replace(/,/g, ".");
    trs.children[1].innerHTML = compra_to_str;
    trs.children[2].innerHTML = venta_to_str;
  }    
}
//////////////////////// ORDENA POR LA COLUMNA VENTA EN DOT ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_dot_venta' ) {
    sortVentaDot();
  };
} );
function sortVentaDot() {
  let table9, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table9 = document.getElementById("dot_ars_table");
  for (let i = 1; i <= len_dot ; i++) {
    trs = table9.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_num = Number.parseInt((trs_compra).toLocaleString().replace(/\./g,''));
    venta_to_num = Number.parseInt((trs_venta).toLocaleString().replace(/\./g,''));
    trs.children[1].innerHTML = compra_to_num;
    trs.children[2].innerHTML = venta_to_num;
  }
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table9.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
  for (let i = 1; i <= len_dot ; i++) {
    trs = table9.children[i];
    trs_compra = trs.children[1].innerHTML;
    trs_venta = trs.children[2].innerHTML;
    compra_to_str = Number.parseInt(trs_compra).toLocaleString().replace(/,/g, ".");
    venta_to_str = Number.parseInt(trs_venta).toLocaleString().replace(/,/g, ".");
    trs.children[1].innerHTML = compra_to_str;
    trs.children[2].innerHTML = venta_to_str;
  }    
}