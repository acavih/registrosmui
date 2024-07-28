declare module 'mohair' {
    interface TableBasicOperations {
        sql: () => string
        params: () => any[]
    }
    interface TableEntity extends TableBasicOperations {
        where: (any) => TableEntityWithUpdateAndDelete
        insertMany: (any) => TableInsert
        insert: (any) => TableInsert
        delete: () => any
    }
    interface TableEntityWithUpdateAndDelete extends TableEntity {
        update: (any) => TableBasicOperations
        delete: () => TableBasicOperations
    }
    interface TableInsert extends TableBasicOperations {}

    export function table(tableName: string): TableEntity
    export function raw(sql: string): any
}