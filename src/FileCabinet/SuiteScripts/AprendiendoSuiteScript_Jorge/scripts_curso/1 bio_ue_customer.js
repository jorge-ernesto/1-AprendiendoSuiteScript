/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define([],

    function () {

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        function afterSubmit(context) {
            // Hacer algo
            log.debug('', 'Hola Mundo')
            log.debug('context', context)
        }

        return { afterSubmit };

    });
