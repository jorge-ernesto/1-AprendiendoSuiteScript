/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define([],

    function () {

        function beforeSubmit(context) {
            log.debug('Punto de Entrada', 'beforeSubmit');
            log.debug('context', context);
            log.debug('context.UserEventType', context.UserEventType);

            // Factura de Venta
            var facturaVenta = context.newRecord
            var facTerminos = facturaVenta.getValue('terms')
            var facFecha = facturaVenta.getValue('trandate')
            var facFechaVencimiento = facturaVenta.getValue('duedate')

            var data = {
                'Terminos': facTerminos,
                'Fecha': facFecha,
                'Fecha de Vencimiento': facFechaVencimiento
            }
            log.debug('Factura de Venta', data)

            // Validacion
            if (facTerminos == 7) { // Es contado                
                var facFechaObj = new Date(facFecha);
                var facFechaVencimientoObj = new Date(facFechaVencimiento);

                var facFechaDia = facFechaObj.getDate();
                var facFechaVencimientoDia = facFechaVencimientoObj.getDate();

                if (facFechaDia !== facFechaVencimientoDia) { // Las fechas no son iguales
                    throw new Error('La fecha y la fecha de vencimiento deben ser iguales.');
                }
            }
        }

        return { beforeSubmit };

    });
