// Notas del archivo:
// - Secuencia de comando:
//      - Biomont CS Employee (customscript_bio_cs_employee)
// - Registro:
//      - Empleado (employee)

/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([],

    function () {

        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         *
         * @since 2015.2
         */
        function pageInit(scriptContext) {

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
        function fieldChanged(context) {
            var employee = context.currentRecord;

            if (context.fieldId == 'phone') { // Si salimos del campo o dejamos de escribir en el campo phone
                // console.log('Perdio el foco el input');

                var phone = employee.getValue('phone');
                var fax = employee.getValue('fax');
                var homephone = employee.getValue('homephone');

                if (phone == 'Ernesto') {
                    alert('Hola Ernesto, este es un mensaje secreto');
                }

                // Si fax esta vacio
                // if (!fax) {
                //     employee.setValue('fax', phone);
                // }

                // Si telefono particular esta vacio
                // if (!homephone) {
                employee.setValue('homephone', phone);
                // }
            }
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
        function validateField(context) {
            var employee = context.currentRecord;

            if (context.fieldId == 'custentity_bio_employee_code') { // Si salimos del campo o dejamos de escribir en el campo employee code
                // console.log('Perdio el foco el input');

                var empCode = employee.getValue('custentity_bio_employee_code');

                if (empCode == '123') {
                    alert('Invalid Employee Code value');
                    employee.setValue('custentity_bio_employee_code', '');
                    return false; // El focus regresa al mismo campo
                }
            }

            return true;
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
        function saveRecord(context) {
            var employee = context.currentRecord;

            var empCode = employee.getValue('custentity_bio_employee_code');

            if (empCode == 'x') {
                alert('Invalid Employee Code value');
                return false;
            }

            return true;
        }

        return {
            // pageInit: pageInit,             // FUNCIÓN DE INICIALIZAR PÁGINA (Estas descripciones se obtuvieron de Biomont NetSuite, que ya esta traducido)
            fieldChanged: fieldChanged,        // FUNCIÓN CAMBIADA DEL CAMPO
            // postSourcing: postSourcing,     // FUNCIÓN POSTERIOR AL ORIGEN
            // sublistChanged: sublistChanged, // FUNCIÓN CAMBIADA DE SUBLISTA
            // lineInit: lineInit,             // FUNCIÓN DE INICIALIZAR LÍNEA
            validateField: validateField,      // VALIDAR FUNCIÓN DE CAMPO
            // validateLine: validateLine,     // VALIDAR FUNCIÓN DE LÍNEA
            // validateInsert: validateInsert, // VALIDAR FUNCIÓN INSERTAR
            // validateDelete: validateDelete, // VALIDAR FUNCIÓN ELIMINAR
            saveRecord: saveRecord             // GUARDAR FUNCIÓN DE REGISTRO
        }

    });
