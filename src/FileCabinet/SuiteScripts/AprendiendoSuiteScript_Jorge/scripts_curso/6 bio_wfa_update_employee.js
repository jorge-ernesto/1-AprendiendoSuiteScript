// Notas del archivo:
// - Secuencia de comando:
//      - Biomont WFA Update Employee (customscript_bio_wfa_update_employee)

/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N'],

    function (N) {

        const { record, runtime } = N

        /******************/

        /**
         * Defines the WorkflowAction script trigger point.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.workflowId - Internal ID of workflow which triggered this action
         * @param {string} scriptContext.type - Event type
         * @param {Form} scriptContext.form - Current form that the script uses to interact with the record
         * @since 2016.1
         */
        function onAction(context) {

            // Obtener parametros enviados al WorkfloActionScript
            var workflowTotal = runtime.getCurrentScript().getParameter({
                name : 'custscript_bio_wf_total'
            });

            // Obtener newRecord de Informe de Gastos
            var expRep = context.newRecord;

            // Obtener cantidad de lineas de sublista
            var expenseCount = expRep.getLineCount({ sublistId: 'expense' });

            // Obtener id del empleado
            var employeeId = expRep.getValue('entity');

            // Crear notas
            var notes = `Workflow Total : ${workflowTotal}
                         Expense Count  : ${expenseCount}`;

            // Guardar notas en empleado
            var employee = record.load({
                type : record.Type.EMPLOYEE,
                id   : employeeId
            });
            employee.setValue('comments', notes);
            employeeId = employee.save();

            if (!employeeId) {
                return 'failed';
            }

            return 'success';
        }

        return { onAction };
    });
