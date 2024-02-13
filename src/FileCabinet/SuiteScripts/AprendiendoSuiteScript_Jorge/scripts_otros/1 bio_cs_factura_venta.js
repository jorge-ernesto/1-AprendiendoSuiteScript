/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([],

    function () {

        function pageInit(context) {
            var currentRecord = context.currentRecord;

            // Verificar si el formulario está en modo edición
            if (context.mode === 'edit') {
                // Mostrar un mensaje en la consola del navegador
                console.log('El formulario de factura de venta se ha cargado en modo edición.');
            }
            console.log('Prueba Suite Script.');
            console.log('context', context);
            // Cerrar

            /*
            // Obtener el nombre de la sublist de detalle de artículos
            var sublistName = 'item'; // Reemplaza 'item' con el nombre de tu sublist de detalle de artículos

            // Obtener el número total de registros en la sublist
            var lineCount = currentRecord.getLineCount({ sublistId: sublistName });
            console.log('lineCount', lineCount);
            console.log('lineCount', lineCount - 1);

            // Obtener sublista
            sublist = currentRecord.getSublist({ sublistId: sublistName });
            console.log('sublist', sublist);
            */

            /*
            // Acceder a los datos de la sublist
            for (var i = 0; i < lineCount; i++) {
                var columnValue = currentRecord.getSublistValue({
                    sublistId: sublistName,
                    fieldId: 'field_id', // Reemplaza 'field_id' con el ID del campo en la sublist
                    line: i
                });

                // Hacer algo con el valor obtenido
                console.log(columnValue);
            }
            */
        }

        // Tipos de Punto de Entrada:
        // - afterSubmit: Se ejecuta cada vez que el usuario guarda el registro.
        // - beforeLoad: Se ejecuta cada vez que se carga un registro.
        // - beforeSubmit: Se ejecuta antes de guardar el registro.
        return {
            pageInit: pageInit
        };

    });
