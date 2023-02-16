import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';

class UserController {

    static home =(req,res)=>{
        res.render('index')
    }
    static registration =(req,res)=>{
        res.render('registration')
    }

    // static createUserDoc = async (req,res)=>{
    //     try {
    //         const Doc = new UserModel({
    //             name:req.body.name,
    //             email:req.body.email,
    //             password:req.body.password
    //         })
    //         // saving document
    //         await Doc.save()
    //         res.redirect('/login')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    static createUserDoc = async (req,res)=>{
        const hashpassword = await bcrypt.hash(req.body.password,10)
        try {
            const Doc = new UserModel({
                name:req.body.name,
                email:req.body.email,
                password:hashpassword
            })
            // saving document
            await Doc.save()
            res.redirect('/login')
        } catch (error) {
            console.log(error)
        }
    }


    static login =(req,res)=>{
        res.render('login')
    }

    // static verifylogin = async (req,res)=>{
    //     try {
    //         const {email,password} = req.body
    //         const result = await UserModel.findOne({email:email})
    //         // console.log(result)
    //         if (result != null){
    //             if(result.email == email && result.password == password){
    //                 res.send(`<h1> DashBord ----- ${result} </h1>`)
    //             }else{
    //                 res.send("<h1> Email Or Password is not valid </h1>")
    //             }
    //         }else{
    //             res.send("<h1>You are not a Registred User </h1>")
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    static verifylogin = async (req,res)=>{
        try {
            const {email,password} = req.body
            const result = await UserModel.findOne({email:email})
            // console.log(result)
            if (result != null){
                const isMatch = await bcrypt.compare(password, result.password)
                if(result.email == email && isMatch){
                    res.send(`<h1> DashBord ----- ${result} </h1>`)
                }else{
                    res.send("<h1> Email Or Password is not valid </h1>")
                }
            }else{
                res.send("<h1>You are not a Registred User </h1>")
            }
    } catch (error) {
            console.log(error)
        }    
    }
    
}

export default UserController