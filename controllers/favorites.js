const Post = require('../models/post')

module.exports = {
    create,
    deleteFavorite,
    favorites
}

async function create(req, res){
 
    try {
        const post = await Post.findById(req.params.id);
        post.favorites.push({username: req.user.username, userId: req.user._id}); //mutating a document
        await post.save()// save it
        res.status(201).json({data: 'favorite added'})
    } catch(err){
       
        res.status(400).json({err})
    }
    
}

async function deleteFavorite(req, res){
    try {
        // Find the Post with the favorite, 'favorites._id' and 'favorites.username' comes from the embedded schema
		// on Post
        const post = await Post.findOne({'favorites._id': req.params.id, 'favorites.username': req.user.username});
        post.favorites.remove(req.params.id) // mutating a document
        // req.params.id is the favorite id 
        await post.save() // after you mutate a document you must save
        // res is an object that can respond to the client
        
        res.json({data: 'favorite removed'})
    } catch(err){
        res.status(400).json({err})
    }
}

async function favorites(req, res){
    try {
      // First find the user using the params from the request
      // findOne finds first match, its useful to have unique usernames!
      const user = await User.findOne({username: req.params.username})
      // Then find all the posts that belong to that user
      if(!user) return res.status(404).json({error: 'User not found'})
  
      // using the post model to find all the users posts (the user from req.params)
      // finding all posts by a user, and populating the user property!
      const posts = await Post.find({user: user._id}).populate("user").exec();
      console.log(posts, ' this posts')
      res.status(200).json({posts: posts, user: user})
    } catch(err){
      console.log(err)
      res.status(400).json({err})
    }
  }