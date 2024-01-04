// Notas del archivo:
// - Secuencia de comando:
//      - Biomont UE Employee (customscript_bio_ue_employee)
// - Registro:
//      - Empleado (employee)

/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N'],

    function (N) {

        const { record, redirect } = N;

        /******************/

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        function afterSubmit(context) {
            log.debug('Punto de Entrada', 'afterSumit');
            log.debug('context', context);
            log.debug('context.UserEventType', context.UserEventType);
            log.debug('record.Type', record.Type);

            if (context.type == context.UserEventType.EDIT || context.type == context.UserEventType.CREATE) {
                // Hacer algo
                log.debug('', 'Entro al modo Crear o Editar')

                // Metodos de Campos:
                // - context.newRecord                   : Get record object reference                                 : Obtener referencia de objeto de registro
                // - record.getValue(<scriptId>)         : Get field value or id                                       : Obtener valor de campo o id
                // - record.setValue(<scriptId>, <value>): Set field value                                             : Establecer valor de campo
                // - record getText(<opitons>)           : Get displayed text (List/Record fields only)                : Obtener texto mostrado (solo campos de lista/registro)
                // - record.setText(<options>)           : Set the value via the display text (List/Record fields only): Establezca el valor a través del texto de la pantalla (solo campos de lista/registro)
                // - log.debud(<title>, <description>)   : Write debug logs                                            : Escribir registros de depuración

                var employee = context.newRecord
                var empCode = employee.getValue('custentity_bio_employee_code')
                var supervisorId = employee.getValue('supervisor')
                var supervisorName = (context.type == context.UserEventType.EDIT) ? employee.getText('supervisor') : ''; // getText al parecer no se puede usar en modo "CREAR" con el punto de entrada "afterSubmit", genera un error, esto no pasa en modo "EDITAR", probar en modo "CREAR" los puntos de entrada "beforeLoad" y "beforeSubmit".
                var customformId = employee.getValue('customform')
                var customformName = (context.type == context.UserEventType.EDIT) ? employee.getText('customform') : '';

                // Recordar que afterSubmit ocurre despues del guardar el registro en la BD, por lo que no importa si seteamos el valor, no habra cambios al guardar porque ya se guardo
                // employee.setValue('custentity_bio_employee_code', 'EMP002')

                var data = {
                    'Employee Code': empCode,
                    'Supervisor ID': supervisorId,
                    'Supervisor Name': supervisorName,
                    'Formulario ID': customformId,
                    'Formulario Name': customformName,
                }
                log.debug('Empleado', data)
            }

            if (context.type == context.UserEventType.CREATE) {
                // Registrar Llamada telefónica
                if (false) {
                    // Crear un registro
                    var phoneCall = record.create({
                        type: record.Type.PHONE_CALL,
                        defaultValues: {
                            customform: -150
                        }
                    })

                    // Establecer valores
                    var employee = context.newRecord
                    phoneCall.setValue('title', 'Call RH for benefits');
                    phoneCall.setValue('assigned', employee.id);

                    // Guardar registro
                    phoneCall.save();
                }

                // Registrar Evento de calendario
                if (false) {
                }

                // Redirigir a Formulario de Suitelet
                if (true) {
                    var data = {
                        'Prueba undefined': undefined,
                        'Prueba string': '0',
                        'Prueba boolean': false
                    }
                    log.debug('Verificar tipo de datos', data)

                    var data = {
                        'Employee Name': employee.getValue('entityid'),
                        'Employee Notes': employee.getValue('comments'),
                        'Employee ID': employee.id // Si desea obtener el ID interno de la referencia del registro, puede utilizar solo "id", aunque tambien puede usar employee.getValue('id'),
                    }
                    log.debug('Empleado Data Suitelet', data)

                    // Redirigir a Suitelet 'bio_sl_update_emp_notes'
                    redirect.toSuitelet({
                        scriptId      : 'customscript_bio_sl_update_emp_notes',
                        deploymentId  : 'customdeploy_bio_sl_update_emp_notes',
                        parameters    : {
                            bio_name  : employee.getValue('entityid'),
                            bio_notes : employee.getValue('comments'),
                            bio_empId : employee.id
                        }
                    });
                }
            }
        }

        return { afterSubmit };

    });
