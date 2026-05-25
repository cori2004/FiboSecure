var cuentas = [];
var logos = {
  Google: "G", Facebook: "f", Instagram: "◎", TikTok: "♪", WhatsApp: "W", GitHub: "GH", Banco: "B", Classroom: "C", Outlook: "O", Netflix: "N", Otro: "★"
};

function obtener(id) { return document.getElementById(id); }

function iniciar() {
  cuentas = JSON.parse(localStorage.getItem("fibopass_cuentas")) || [];
  cargarApps();
  renderizarCuentas();
  actualizarResumen();

  obtener("desbloquearBtn").onclick = desbloquear;
  activarEnterClave();
  obtener("bloquearBtn").onclick = bloquear;
  obtener("abrirFormularioBtn").onclick = abrirModal;
  obtener("cerrarModalBtn").onclick = cerrarModal;
  obtener("usarGeneradaBtn").onclick = usarGenerada;
  obtener("copiarGeneradaBtn").onclick = copiarGenerada;
  obtener("limpiarBtn").onclick = limpiarDatos;
  obtener("buscador").oninput = renderizarCuentas;
  obtener("filtroCategoria").onchange = renderizarCuentas;
  obtener("formGenerador").onsubmit = generarPassword;
  obtener("formAnalizador").onsubmit = analizarManual;
  obtener("formCuenta").onsubmit = guardarCuenta;
}

function desbloquear() {
  var clave = obtener("claveMaestra").value;
  if (clave.length < 4) {
    obtener("mensajeBloqueo").innerHTML = "La clave maestra de prueba debe tener mínimo 4 caracteres.";
    return;
  }
  obtener("mensajeBloqueo").innerHTML = "";
  obtener("lockScreen").style.display = "none";
}

function activarEnterClave() {
  obtener("claveMaestra").addEventListener("keyup", function(evento) {
    if (evento.key === "Enter") {
      desbloquear();
    }
  });
}

function bloquear() {
  obtener("claveMaestra").value = "";
  obtener("mensajeBloqueo").innerHTML = "";
  obtener("lockScreen").style.display = "flex";
}

function abrirModal() { obtener("modalCuenta").style.display = "flex"; }
function cerrarModal() { obtener("modalCuenta").style.display = "none"; }

function guardarLocal() { localStorage.setItem("fibopass_cuentas", JSON.stringify(cuentas)); }

function fibonacci(cantidad) {
  var resultado = [];
  var a = 0;
  var b = 1;
  var c = 0;
  for (var i = 0; i < cantidad; i++) {
    resultado.push(b);
    c = a + b;
    a = b;
    b = c;
  }
  return resultado;
}

function esPrimo(numero) {
  if (numero < 2) return false;
  var contador = 0;
  for (var i = 1; i <= numero; i++) {
    if (numero % i == 0) contador++;
  }
  return contador == 2;
}

function generarPassword(evento) {
  evento.preventDefault();
  var base = obtener("palabraBase").value;
  var numero = parseInt(obtener("numeroBase").value);
  var longitud = parseInt(obtener("longitud").value);
  var terminos = parseInt(obtener("terminosFibo").value);
  var usarMayus = obtener("usarMayus").checked;
  var usarMinus = obtener("usarMinus").checked;
  var usarNumeros = obtener("usarNumeros").checked;
  var usarSimbolos = obtener("usarSimbolos").checked;

  var mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var minus = "abcdefghijklmnopqrstuvwxyz";
  var nums = "0123456789";
  var simbolos = "!@#$%&*_-+=?";
  var caracteres = "";

  if (usarMayus) caracteres += mayus;
  if (usarMinus) caracteres += minus;
  if (usarNumeros) caracteres += nums;
  if (usarSimbolos) caracteres += simbolos;
  if (caracteres.length == 0) caracteres = mayus + minus + nums;

  var fibo = fibonacci(terminos);
  var primos = [];
  for (var i = 0; i < fibo.length; i++) {
    if (esPrimo(fibo[i])) primos.push(fibo[i]);
  }
  if (primos.length == 0) primos.push(2, 3, 5);

  var mezcla = base + numero + fibo.join("") + primos.join("");
  var password = "";
  for (var j = 0; j < longitud; j++) {
    var valorFibo = fibo[j % fibo.length];
    var valorPrimo = primos[j % primos.length];
    var letraBase = mezcla.charCodeAt(j % mezcla.length);
    var posicion = (valorFibo + valorPrimo + letraBase + numero + j) % caracteres.length;
    password += caracteres.charAt(posicion);
  }

  if (usarMayus) password = password.substring(0, 1).toUpperCase() + password.substring(1);
  if (usarNumeros && !/[0-9]/.test(password)) password = password.substring(0, password.length - 1) + (numero % 10);
  if (usarSimbolos && !/[!@#$%&*_+=?\-]/.test(password)) password = password.substring(0, password.length - 1) + "#";

  obtener("passwordGenerada").value = password;
  var analisis = analizarFuerza(password);
  mostrarFuerza(analisis);
  obtener("detalleAlgoritmo").innerHTML = "Fibonacci generado: " + fibo.join(", ") + ". Valores primos detectados: " + primos.join(", ") + ".";
}

function analizarFuerza(password) {
  var puntos = 0;
  var razones = [];
  if (password.length >= 8) puntos += 20; else razones.push("Debe tener al menos 8 caracteres.");
  if (password.length >= 12) puntos += 20; else razones.push("Mejora si tiene 12 o más caracteres.");
  if (/[A-Z]/.test(password)) puntos += 15; else razones.push("Agrega mayúsculas.");
  if (/[a-z]/.test(password)) puntos += 15; else razones.push("Agrega minúsculas.");
  if (/[0-9]/.test(password)) puntos += 15; else razones.push("Agrega números.");
  if (/[^A-Za-z0-9]/.test(password)) puntos += 15; else razones.push("Agrega símbolos.");
  if (/(.)\1\1/.test(password)) { puntos -= 15; razones.push("Evita repetir el mismo carácter muchas veces."); }
  if (puntos < 0) puntos = 0;
  if (puntos > 100) puntos = 100;

  var nivel = "Poco segura";
  var clase = "level-low";
  if (puntos >= 85) { nivel = "Muy segura"; clase = "level-strong"; }
  else if (puntos >= 65) { nivel = "Segura"; clase = "level-good"; }
  else if (puntos >= 40) { nivel = "Media"; clase = "level-mid"; }

  return { puntos: puntos, nivel: nivel, razones: razones, clase: clase };
}

function mostrarFuerza(analisis) {
  obtener("barraFuerza").style.width = analisis.puntos + "%";
  obtener("nivelFuerza").innerHTML = analisis.nivel + " — " + analisis.puntos + "%";
}

function analizarManual(evento) {
  evento.preventDefault();
  var password = obtener("passwordAnalizar").value;
  var analisis = analizarFuerza(password);
  var texto = "<strong>Resultado:</strong> " + analisis.nivel + " (" + analisis.puntos + "%).";
  if (analisis.razones.length > 0) texto += "<br><strong>Recomendaciones:</strong> " + analisis.razones.join(" ");
  else texto += "<br>La contraseña tiene buena combinación de longitud, letras, números y símbolos.";
  obtener("resultadoAnalisis").innerHTML = texto;
}

function usarGenerada() {
  var generada = obtener("passwordGenerada").value;
  if (generada == "") {
    obtener("passwordCuenta").value = "Primero genera una contraseña";
    return;
  }
  obtener("passwordCuenta").value = generada;
}

function guardarCuenta(evento) {
  evento.preventDefault();
  var app = obtener("appCuenta").value;
  var categoria = obtener("categoriaCuenta").value;
  var usuario = obtener("usuarioCuenta").value;
  var password = obtener("passwordCuenta").value;
  var nota = obtener("notaCuenta").value;
  var analisis = analizarFuerza(password);

  cuentas.push({
    id: Date.now(), app: app, categoria: categoria, usuario: usuario,
    password: password, nota: nota, nivel: analisis.nivel, puntos: analisis.puntos
  });

  guardarLocal();
  obtener("formCuenta").reset();
  cerrarModal();
  renderizarCuentas();
  actualizarResumen();
}

function renderizarCuentas() {
  var busqueda = obtener("buscador").value.toLowerCase();
  var categoria = obtener("filtroCategoria").value;
  var html = "";
  var visibles = 0;

  for (var i = 0; i < cuentas.length; i++) {
    var c = cuentas[i];
    var coincideBusqueda = c.app.toLowerCase().includes(busqueda) || c.usuario.toLowerCase().includes(busqueda);
    var coincideCategoria = categoria == "Todas" || c.categoria == categoria;
    if (coincideBusqueda && coincideCategoria) {
      visibles++;
      var analisis = analizarFuerza(c.password);
      html += '<article class="account-card">';
      html += '<div class="account-head"><div class="app-logo ' + claseLogo(c.app) + '">' + (logos[c.app] || "★") + '</div><div><h3>' + c.app + '</h3><small>' + c.usuario + '</small></div></div>';
      html += '<p><strong>Categoría:</strong> ' + c.categoria + '</p>';
      html += '<span class="badge-level ' + analisis.clase + '">' + analisis.nivel + ' · ' + analisis.puntos + '%</span>';
      html += '<p id="pass_' + c.id + '">••••••••••••</p>';
      if (c.nota != "") html += '<small>' + c.nota + '</small>';
      html += '<div class="account-actions">';
      html += '<button class="small-btn" type="button" onclick="mostrarPassword(' + c.id + ')">Mostrar</button>';
      html += '<button class="small-btn" type="button" onclick="copiarPassword(' + c.id + ')">Copiar</button>';
      html += '<button class="small-btn" type="button" onclick="eliminarCuenta(' + c.id + ')">Eliminar</button>';
      html += '</div></article>';
    }
  }

  if (visibles == 0) html = '<div class="empty">No hay cuentas para mostrar. Agrega una cuenta o cambia el filtro.</div>';
  obtener("listaCuentas").innerHTML = html;
}

function claseLogo(app) {
  return "logo-" + app.toLowerCase().replace("á", "a").replace(" ", "-");
}

function cargarApps() {
  var apps = ["Google", "Facebook", "Instagram", "TikTok", "WhatsApp", "GitHub", "Banco", "Classroom", "Outlook", "Netflix", "Otro"];
  var html = "";
  for (var i = 0; i < apps.length; i++) {
    html += '<div class="app-badge"><div class="app-logo ' + claseLogo(apps[i]) + '">' + logos[apps[i]] + '</div><small>' + apps[i] + '</small></div>';
  }
  obtener("appsStrip").innerHTML = html;
}

function mostrarPassword(id) {
  for (var i = 0; i < cuentas.length; i++) {
    if (cuentas[i].id == id) obtener("pass_" + id).innerHTML = cuentas[i].password;
  }
}

function copiarPassword(id) {
  for (var i = 0; i < cuentas.length; i++) {
    if (cuentas[i].id == id) navigator.clipboard.writeText(cuentas[i].password);
  }
}

function copiarGenerada() {
  var pass = obtener("passwordGenerada").value;
  if (pass != "") navigator.clipboard.writeText(pass);
}

function eliminarCuenta(id) {
  var nuevas = [];
  for (var i = 0; i < cuentas.length; i++) {
    if (cuentas[i].id != id) nuevas.push(cuentas[i]);
  }
  cuentas = nuevas;
  guardarLocal();
  renderizarCuentas();
  actualizarResumen();
}

function limpiarDatos() {
  localStorage.removeItem("fibopass_cuentas");
  cuentas = [];
  renderizarCuentas();
  actualizarResumen();
}

function actualizarResumen() {
  var total = cuentas.length;
  var suma = 0;
  for (var i = 0; i < cuentas.length; i++) suma += analizarFuerza(cuentas[i].password).puntos;
  var promedio = total == 0 ? 0 : Math.round(suma / total);
  obtener("contadorCuentas").innerHTML = total + (total == 1 ? " cuenta" : " cuentas");
  obtener("puntajeGeneral").innerHTML = promedio + "%";
  obtener("puntajeGeneral").parentElement.style.setProperty("--score", (promedio * 3.6) + "deg");
  obtener("resumenSeguridad").innerHTML = total == 0 ? "Agrega contraseñas para analizar tu bóveda." : "Promedio general de seguridad de tus contraseñas.";
}

window.onload = iniciar;
