// Notas del archivo:
// - Secuencia de comando:
//      - Biomont SL Update Employee Notes (customscript_bio_sl_update_emp_notes)

/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N'],

    function (N) {

        const { record, redirect } = N
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
            var request = context.request;
            var response = context.response;

            /****************** FORMULARIO ******************/
            // Crear formulario
            var form = serverWidget.createForm({
                title: 'Update Employee Notes',
                hideNavBar: false
            });
            var nameFld = form.addField({
                id: 'custpage_bio_emp_name',
                type: serverWidget.FieldType.TEXT,
                label: 'Name'
            });
            var notesFld = form.addField({
                id: 'custpage_bio_notes',
                type: serverWidget.FieldType.TEXTAREA,
                label: 'Notes'
            });
            var empIdFld = form.addField({
                id: 'custpage_bio_emp_id',
                type: serverWidget.FieldType.TEXT,
                label: 'Employee ID'
            });
            form.addSubmitButton('Continue');

            // Actualizar comportamiento de los inputs del formulario
            nameFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE
            });
            empIdFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN
            });

            // Manejo de solicitudes HTTP
            if (request.method === 'GET') {
                log.debug('method', 'GET')

                // Datos obtenidos por GET
                var name = request.parameters.bio_name;
                var notes = request.parameters.bio_notes;
                var empId = request.parameters.bio_empId;

                // Setear valores al formulario
                nameFld.defaultValue = name;
                notesFld.defaultValue = notes;
                empIdFld.defaultValue = empId;

                // Renderizar formulario
                response.writePage(form);
            } else { // POST
                log.debug('method', 'POST')
                log.debug('record.Type', record.Type);

                // Datos obtenidos por POST
                var name = request.parameters.custpage_bio_emp_name;
                var notes = request.parameters.custpage_bio_notes;
                var empId = request.parameters.custpage_bio_emp_id;

                // Setear valores al formulario
                nameFld.defaultValue = name;
                notesFld.defaultValue = notes;
                empIdFld.defaultValue = empId;

                /****************** SUBLISTA ******************/
                // Agregar sublist
                if (true) {
                    var sublist = form.addSublist({
                        id: 'customlist',
                        type: serverWidget.SublistType.LIST,
                        label: 'Mi Lista Personalizada'
                    });

                    // Setear cabecera a sublista
                    sublist.addField({
                        id: 'column1',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Columna 1'
                    });

                    sublist.addField({
                        id: 'column2',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Columna 2'
                    });

                    // Setear datos a sublista
                    sublist.setSublistValue({
                        id: 'column1',
                        line: 0,
                        value: 'Valor 1'
                    });

                    sublist.setSublistValue({
                        id: 'column2',
                        line: 0,
                        value: 'Valor 2'
                    });

                    sublist.setSublistValue({
                        id: 'column1',
                        line: 1,
                        value: 'Valor 3'
                    });

                    sublist.setSublistValue({
                        id: 'column2',
                        line: 1,
                        value: 'Valor 4'
                    });
                }

                // Renderizar formulario
                response.writePage(form);

                if (empId) {
                    // Obtener empleado
                    var employee = record.load({
                        type: record.Type.EMPLOYEE,
                        id: empId // empId o 26883
                    });
                    log.debug('employee', employee);

                    // Actualizar empleado
                    employee.setValue('comments', notes);
                    employee.save();

                    // Redirigir a Registro de tipo Empleado
                    // redirect.toRecord({
                    //     type : record.Type.EMPLOYEE,
                    //     id   : empId
                    // });
                }
            }
        }

        return { onRequest };

    });
