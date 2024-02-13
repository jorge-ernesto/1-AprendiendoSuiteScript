// Notas del archivo:
// - Secuencia de comando:
//      - Biomont SL Report Template (customscript_bio_sl_report_template)

/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N'],

    function (N) {

        const { record, query } = N;
        const { serverWidget } = N.ui;

        /******************/

        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        function onRequest(context) {

            // log.debug('method', context.request.method);
            // log.debug('parameteres', context.request.parameters);

            /****************** FORMULARIO ******************/
            // Crear formulario
            var form = serverWidget.createForm({
                title: 'Consulta de Clientes',
                hideNavBar: false
            });
            var dateFromField = form.addField({
                id: 'custpage_date_from',
                type: serverWidget.FieldType.DATE,
                label: 'Fecha Desde'
            });
            var dateToField = form.addField({
                id: 'custpage_date_to',
                type: serverWidget.FieldType.DATE,
                label: 'Fecha Hasta'
            });
            form.addSubmitButton({ label: 'Consultar' });

            // Obtener fechas actuales
            var today = new Date();
            var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

            // Setear valores al formulario
            dateFromField.defaultValue = firstDayOfMonth;
            dateToField.defaultValue = today;

            // Manejo de solicitudes HTTP
            if (context.request.method === 'GET') {

                // Renderizar formulario
                context.response.writePage(form);
            } else if (context.request.method === 'POST') { // POST

                /****************** BUSQUEDA GUARDADA ******************/
                // Datos obtenidos por POST
                var dateFrom = context.request.parameters['custpage_date_from'];
                var dateTo = context.request.parameters['custpage_date_to'];

                // Setear valores al formulario
                dateFromField.defaultValue = dateFrom;
                dateToField.defaultValue = dateTo;

                // Realizar consulta SQL
                var sql = "SELECT * FROM customer WHERE TO_DATE(datecreated, 'dd/MM/yyyy') BETWEEN '" + dateFrom + "' AND '" + dateTo + "'";
                var queryResults = query.runSuiteQL({
                    query: sql
                }).asMappedResults();
                log.debug('sql', sql);
                log.debug('queryResults', queryResults);

                /****************** SUBLISTA ******************/
                // Agregar sublista
                var sublist = form.addSublist({
                    id: 'custpage_sublist_customer',
                    type: serverWidget.SublistType.LIST,
                    label: 'Clientes'
                });

                // Setear cabecera a sublista
                sublist.addField({
                    id: 'custpage_customer_id',
                    type: serverWidget.FieldType.TEXT,
                    label: 'ID'
                });

                sublist.addField({
                    id: 'custpage_customer_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Nombre'
                });

                // Setear datos a sublista
                for (var i = 0; i < queryResults.length; i++) {
                    sublist.setSublistValue({
                        id: 'custpage_customer_id',
                        line: i,
                        value: queryResults[i].id
                    });

                    sublist.setSublistValue({
                        id: 'custpage_customer_name',
                        line: i,
                        value: queryResults[i].entityid + ' ' + queryResults[i].altname
                    });
                }

                // Renderizar formulario
                context.response.writePage(form);
            }
        }

        return {
            onRequest: onRequest
        };

    });
