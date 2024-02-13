// Notas del archivo:
// - Secuencia de comando:
//      - Biomont CS Order Sale (customscript_bio_cs_order_sale)
// - Registro:
//      - Orden de venta (salestaxitem)

/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N'],

    function (N) {

        const { email } = N;
        const { dialog } = N.ui;

        /******************/

        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         *
         * @since 2015.2
         */
        function pageInit(context) {
            var order = context.currentRecord;
            var status = order.getText('orderstatus');
            console.log('Estado:', status);

            if (context.mode == 'edit' && status == 'Facturada') { // context.mode == 'edit' && status == 'Billed'
                dialog.alert({
                    title   : 'Edit Warning',
                    message : 'This order has already been billed. Auditors will be notified of this action.'
                });

                email.send({
                    author     : 26883,
                    recipients : 26883, // [26883, 136]
                    subject    : 'User has edited a billied order',
                    body       : 'Order ' + order.getValue('tranid') + ' has  been recently opened'
                });
            }
        }

        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        function fieldChanged(scriptContext) {

        }

        /**
         * Function to be executed when field is slaved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         *
         * @since 2015.2
         */
        function postSourcing(scriptContext) {

        }

        /**
         * Function to be executed after sublist is inserted, removed, or edited.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        function sublistChanged(scriptContext) {

        }

        /**
         * Function to be executed after line is selected.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        function lineInit(scriptContext) {

        }

        /**
         * Validation function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @returns {boolean} Return true if field is valid
         *
         * @since 2015.2
         */
        function validateField(scriptContext) {

        }

        /**
         * Validation function to be executed when sublist line is committed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateLine(scriptContext) {

        }

        /**
         * Validation function to be executed when sublist line is inserted.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateInsert(scriptContext) {

        }

        /**
         * Validation function to be executed when record is deleted.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateDelete(scriptContext) {

        }

        /**
         * Validation function to be executed when record is saved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @returns {boolean} Return true if record is valid
         *
         * @since 2015.2
         */
        function saveRecord(scriptContext) {

        }

        return {
            pageInit: pageInit                 // FUNCIÓN DE INICIALIZAR PÁGINA (Estas descripciones se obtuvieron de Biomont NetSuite, que ya esta traducido)
            // fieldChanged: fieldChanged,     // FUNCIÓN CAMBIADA DEL CAMPO
            // postSourcing: postSourcing,     // FUNCIÓN POSTERIOR AL ORIGEN
            // sublistChanged: sublistChanged, // FUNCIÓN CAMBIADA DE SUBLISTA
            // lineInit: lineInit,             // FUNCIÓN DE INICIALIZAR LÍNEA
            // validateField: validateField,   // VALIDAR FUNCIÓN DE CAMPO
            // validateLine: validateLine,     // VALIDAR FUNCIÓN DE LÍNEA
            // validateInsert: validateInsert, // VALIDAR FUNCIÓN INSERTAR
            // validateDelete: validateDelete, // VALIDAR FUNCIÓN ELIMINAR
            // saveRecord: saveRecord          // GUARDAR FUNCIÓN DE REGISTRO
        }

    });
