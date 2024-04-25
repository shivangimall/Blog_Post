module.exports.restrict = (role)=>{
    return (req,res,next)=>{
        if(req.user.role!==role)
        {
            return res.status(403).json({
                status:"failed",
                message:"User does not have permission for this action"
            })
        }
        next();
    }
}


//If we have to check for multiple roles we can use this

// module.exports.restrict = (...role)=>{
//     return (req,res,next)=>{
//         if(role.includes(req.user.role))
//         {
//             return res.status(403).json({
//                 status:"failed",
//                 message:"User does not have permission for this action"
//             })
//         }
//         next();
//     }
// }