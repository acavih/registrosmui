export default function calcularEdad(fechaNacimiento: Date) {
    const hoy = new Date();
    const anioNacimiento = fechaNacimiento.getFullYear();
    const mesNacimiento = fechaNacimiento.getMonth();
    const diaNacimiento = fechaNacimiento.getDate();
    const anioActual = hoy.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();
    let edad = anioActual - anioNacimiento;
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
        edad--;
    }
    return edad;
}