const client = require("../db")

module.exports.getAll = async(req,res)=>{
    try{
        let allBlogs = await  client.blogs.findMany();
    //    console.log('all blog, ', allBlogs);
        
        res.status(200).json({
            status:"success",
            data:allBlogs
        })
    }catch(err)
    {
        console.log(err);
        res.status(400).json({
            status:"failed",
            message:"Unable to fetch Blogs"
        })
    }
}

module.exports.create = async(req, res)=>{
    try{

        const {id , title , content , image} = req.body;
        const author = req.user.username;
        const authorId = req.user.id;

        // console.log(client)
        // console.log(title);

        const  newBlog = await client.blogs.create({
            data:{
                title ,
                content ,
                image ,
                author ,
                authorId
            }
        });

        if(!newBlog){
            return res.status(400).json({
                status : "failed",
                message : "Something went wrong while creating the blog!"
            })
        }

        res.status(201).json({
            status : 'success',
            data : newBlog
        })

    }catch(err)
    {
        console.log(err);
        res.status(400).json({
            status:"failed",
            message:"Unable to create blog"
        })
    }
}

module.exports.delete =  async(req,res)=>{
    try{
        // console.log(req.params, "req.params")
        const {id} = req.params
        const blogId = parseInt(id);
        // console.log(id)
        let delBlog = await client.blogs.delete({
            where:{
                id:blogId
            }
        })

        console.log(delBlog)

        if(!delBlog)
        {
            return  res.status(404).json({
                status:"failed",
                message:"Unable to delete at this moment"
            })
        }

        res.status(200).json({
            status:"success",
            message:"Deleted successfully"
        })

    }catch(err)
    {
        console.log(err)
        res.status(400).json({
            status:"failed",
            message:err.message
        })
    }
}

module.exports.update =  async(req,res)=>{
    try{
        const {id} = req.params
        const blogId = parseInt(id);
        const {title, content, image} = req.body;

        const updatedBlog = await client.blogs.update({
            where:{
                id:blogId
            },
            data:{
                title,
                content,
                image
            }
        })

        if(!updatedBlog)
        {
            return res.status(400).json({
                status:"failed",
                message:"Unable to update at the moment"
            })
        }

        res.status(200).json({
            status:"success",
            data:updatedBlog
        })

    }catch(err)
    {
        console.log(err)
        res.status(500).json({
            status:"failed",
            message:err.message
        })
    }
}
