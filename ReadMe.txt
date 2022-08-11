To Install Express Framework

npm i -g express-generator

express -e -f 
npm install (to install project dependencies)

npm i bcryptjs body-parser dotenv jsonwebtoken mongoose cookie-parser nodemon




-----

  <%if(typeof alert != 'undefined') { %>
    <section>
        <% alert.forEach((error) => { %>
        <lu>
           
            <li> <%= error.msg %> </li>
           
        </lu>
        <% }) %>
    </section>
<% } %>



------

// const errors = validationResult(req)
    // if(!errors.isEmpty()) {
    //   // return res.status(400).json({ errors: errors.array() });
    //   const alert = errors.array()
    //   res.render('register',{
    //     alert
    //   })

  //  }

  ---------

   
    


  
       await User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword

    }).then(user => res.send(user));



    -------
    GET=>

     const userEdit = await User.findOne({ _id: req.params.id})
    res.render('editUser', {editName : userEdit.fullName, editEmail: userEdit.email})
    res.json(userEdit)

    PUT=>

       await User.findByIdAndUpdate({ _id: req.params.id},
       {
        $set: {
          fullName: req.body.fullName,
          email: req.body.email
        }     
      },
         
        {
            upsert: true
        }

    ).then(users => res.json({ users }))
    .catch(error => console.log(error))
    //res.redirect('users')  
    console.log(User)



    ----PUT
    try {
  const updatePost = await User.updateOne(
    {_id: req.params.id},
    { $set: {fullName : require.body.fullName}}
  );
  res.send(updatePost)
  console.log('awwit')
} catch (error) {
  
}

------
  const { fullName , email } = req.body;

  var updated = { fullName, email};

  User.findByIdAndUpdate(
    req.params.id,
    { $set: updated},
    { new: true},
    (err,doc) => {
      if (!err) {
        res.send(doc);
      }else {
        res.send("not found")
      }
    }
  )
})

---
  const { fullName , email } = req.body;

    var updated = { fullName, email};

    User.findByIdAndUpdate(
      req.params.id,
      { $set: updated},
      { new: true},
      (err,doc) => {
        if (!err) {
          res.send(doc);
        }else {
          res.send("not found")
        }
      }
    )


value="<%=editName%>" 
value="<%=editEmail%>" 



------new PUT 
router.get('/:id', async (req, res) => {
  let updateUser = {_id : req.params.id};
  await User.findOne(updateUser)
  .then(user => {
    res.render('editUser', {user: user});
  })
  .catch(err => {
    console.log(err)
  });
}); 

router.put('/:id', async (req, res) => {
  let updateUser = {_id : req.params.id};

 await User.updateOne(updateUser, {$set: {
    fullName: req.body.fullName,
    email: req.body.email
  }})
  .then(user => {
    res.redirect('/users');
  })
  .catch(err => {
    console.log(err);
  })
});


----SHARE
 <% shareUsers.forEach((shareUser)=> {%>
                <tr>
                    <td><%=shareUser.fullName%></td>
                    <td>
                        <a class="delete-doclist-action" href="#share-delete">Remove</a>
                    </td>
                </tr>
          <% }) %> 


     ---- shareUPload
      await Upload.findById(req.params.id)
    .then((upload) => {
        if(upload){
            axios.get(`http://localhost:3000/users/${upload.userId}`).then((response) => {
                let shareUpload = { sharedUser : response.data.fullName, sharedFile: ' ' }

                axios.get(`http://localhost:3000/docList/${upload.fileId}`).then((response) => {
                    shareUpload.sharedFile = response.data.filename;
               
                  
                })
            })
        }else {
            res.status(404).send('orders not found')
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error')
    })