require('dotenv').config();
class ConectarBD{
    constructor(){
        this.conexion=null;
        this.mysql=require("mysql2/promise");
    }
    async conectarMySql(){
        try{
        this.conexion=await this.mysql.createConnection({
            host:process.env.HOST,
            user:process.env.USER,
            password:process.env.PASSWORD,
            database:process.env.DATABASE,
            port:process.env.PORTMYSQL
        })
        console.log("conectado a Mysql");
        return this.conexion;
    } catch (error){
        console.error("Error al conectar con Mysql" + error);
    }
    }
    async cerrarConexion (){
        if(this.conexion!=null){
            try{
                await this.conexion.end();
                console.log("Conexion de MySql cerrada");
            } catch(error){
                console.error("Error al desconectar de MySql" + error);
            }
        }
    }
}

module.exports=ConectarBD;