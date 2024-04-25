const client = require("../db")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const util = require("util");



module.exports.register = async(req,res)=>{
    try{

        const {id, username ,  password, role} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await client.user.create({
            data:{
                id,
                username,
                password:hashedPassword, 
                role
            }
            });

            const token  = jwt.sign({id,username,role}, process.env.SECRET_KEY, { expiresIn:process.env.JWT_EXPIRY})
        console.log(newUser, "User created");
        res.status(201).json({
            status : 'success',
            data:newUser,
            token
        })

    }catch(err)
    {
        console.log(err);
        res.status(400).json({
            status:"failed",
            message:"Failed to create new user"
        })
    }
}


module.exports.login =  async(req,res)=>{
    try{

        const {username ,  password} = req.body;

        if(!username || !password)
        {
            return res.status(401).json({
                status:"failed",
                message:"Both username and passwords are required to login"
            })
        }

        const user = await client.user.findUnique({
            where:{
                username:username
            }
        });

        // const check = await bcrypt.compare(password, user.password);

        if(!user || !await bcrypt.compare(password, user.password))
        {
            return res.status(404).json({
                status:"failed",
                message:"Incorrect username or password"
            })
        }

        console.log(user);
        const {id} = user;

        const token  = jwt.sign({id,username}, process.env.SECRET_KEY, { expiresIn:process.env.JWT_EXPIRY})

        res.status(201).json({
            status : 'success',
            token,
            data:user
        })

    }catch(err)
    {
        console.log(err);
        res.status(400).json({
            status:"failed",
            message:"Failed to login"
        })
    }
}


module.exports.protect = async(req,res,next)=>{
    try{
        const testToken = req.headers.authorization;

        let token;
        if(testToken && testToken.startsWith('Bearer'))
        {
            token = testToken.split(" ")[1];
        }

        console.log(token);

        if(!token)
        {
            return res.status(404).json({
                status:"failed",
                message:"Please Log In"
            })
        }

        const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_KEY);
        console.log(decodedToken);

        const user = await client.user.findUnique({
            where: {
              username: decodedToken.username
            }
          })

          if(!user)
          {
            return res.status(400).json({
                status:"failed",
                message:"User does not exist, Try signing up again"
            })
          }

          req.user = user;

        next();

    }catch(err)
    {
        console.log(err)
        res.status(500).json({
            status:"failed",
            message:"Internal server error, Try again after some time"
        })
    }
}