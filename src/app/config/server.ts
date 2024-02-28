import express from "express"

export class Server {

    readonly port:number
    app: any

    constructor(port: number) {
        this.port = port
        this.app = express()
    }

    // init express
    start(): any {
        return this.app
    }

    /** listen  */
    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running in port ${this.port}`)
        })
    }
}