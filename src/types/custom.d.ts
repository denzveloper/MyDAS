declare module 'nocodb-sdk' {
  export class Api {
    constructor(config: { baseURL: string; headers: Record<string, string> })
    dbTableRow: {
      list: (
        project: string,
        table: string,
        query?: Record<string, any>
      ) => Promise<{ list: any[] }>
    }
    dbViewRow: {
      list: (
        project: string,
        table: string,
        view: string,
        fieldSet?: string,
        query?: Record<string, any>
      ) => Promise<{ list: any[] }>
    }
  }
}
