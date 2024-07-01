const ruta=require("express").Router();
const UsuarioClase=require("../clases/usuarioClase");
const usuarioBD=require("../bd/usuariosBD");
const Usuario = require("../clases/usuarioClase");
const usuariosBD = require("../bd/usuariosBD");

ruta.get("/", async(req,res)=>{
    const usuariosBD = new usuarioBD();
    const usuariosMySql= await usuariosBD.mostrarUsuarios();
    var usuariosCorrectos=[];
    usuariosMySql.forEach(usuario => {
        var usuario1 = new UsuarioClase(usuario);
        if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
            usuariosCorrectos.push(usuario);
        }
    });
    console.log(usuariosCorrectos);
    res.render("mostarUsuarios", {usuariosCorrectos});
})

ruta.post("/agregarUsuario",(req,res)=>{
    var usuario1=new UsuarioClase(req.body);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        const usuariosBD = new usuarioBD();
        usuariosBD.nuevoUsuario(usuario1.mostrarDatos);
        // usuarioBD.nuevoUsuario(usuario1.mostrardatos);
        res.render("inicio", usuario1.mostrarDatos);
    }else{
        res.render("error");
    }
})

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formulario");
});

ruta.get("/editarUsuario/:idUsuario", async (req,res)=>{
    try{
    const usuariobd = new usuarioBD();
    const usuario = await usuariobd.usuaioId(req.params.idUsuario);
    //console.log(usuario);
    res.render("editarUsuario", usuario);
    } catch(error){
        console.log(error)
        res.end;
    }
});

ruta.post("/editarUsuario", async(req,res)=>{
    try{
        const usuariobd= new usuarioBD();
        //console.log(req.body);
        await usuariobd.editarUsuario(req.body);
        console.log("Usuario editado correctamente");
        res.redirect("/");
    } catch(error){
        console.log("Error al editar el usuario");
    }
});

ruta.get("/borrarUsuario/:id", async(req,res)=>{
    try{
        const usuariobd=new usuarioBD();
        await usuariobd.borrarUsuario(req.params.id);
        res.redirect("/");
    }catch(error){
        console.error(error);
    }
})

module.exports=ruta;