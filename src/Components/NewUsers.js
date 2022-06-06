import React, { useEffect, useState } from 'react'
import Axios from 'axios'

const NewUser = () =>{

    const [user,setUser]=useState("")
    const [newage,setage]=useState("")
    const [mobile,setmobile]=useState("")
    const [address,setAddress]=useState("")
    const [userlist,setuserlist]=useState([])

    const [messaage,setmessage]=useState("Enter the User Details")


const save = (e) =>{
    e.preventDefault();
 
    Axios.post("https://mern-nodelogin.herokuapp.com/addUser",{name:user,age:newage,mobile:mobile,address:address})
    .then((response)=>{

        console.log(response.data)
        setuserlist(userlist,response.data)
        setmessage("User Added Succussefully")
    })
    .catch(()=>{
        setmessage("Not able to add the user")
    })
    setUser("")
    setage("")

}

const updateUser = (id) =>{

    const newupdatedAge = prompt("enter new Age")
  

    Axios.put('https://mern-nodelogin.herokuapp.com/updateuser',{newupdatedAge:newupdatedAge,id:id})
    .then(()=>{
        setuserlist(userlist.map((value)=>{
            return value._id === id ? {_id:id,name:value.name,age:newupdatedAge,mobile:value.mobile,address:value.address}:value
        }))
        setmessage("User Updated Succussefully")

    })
    .catch(()=>{
        setmessage("Not able to Update the user")
    })
  

}

const deleteUser=(id) =>{

    alert(id)

        Axios.delete(`https://mern-nodelogin.herokuapp.com/deleteuser/${id}`).then( ()=>{
        setuserlist(userlist.filter((value)=>{
            

            return value._id !== id
        }))
    })
}

useEffect(()=>{

    Axios.get("https://mern-nodelogin.herokuapp.com/getUserList",{headers: {'Access-Control-Allow-Origin': '*'}})
    .then((response)=>{
        setuserlist(response.data)
    })
    .catch(()=>{
       console.log("Not Listed")
    })

},[userlist])

    return(
        <div className="container">
      <div className="row mt-3 p-2">
          <h1 className='text-center bg-info'>ReactJs + ExpressJs+ MongoDb connectivity</h1>
          
            <div className="col-lg-4 mt-5 p-3 shadow">
            <p className='text-center text-danger '>{messaage}</p>
                <h2 className='text-center text-success'>User details</h2>
                <div className='form'>
                  <input className="form-control mt-4 p-3" type="text" placeholder='Enter name' onChange={obj=>setUser(obj.target.value)} value={user}/>
                  <input className="form-control  mt-4 p-3" type="number" placeholder='Enter Age' onChange={obj=>setage(obj.target.value)} value={newage} />
                  <input className="form-control  mt-4 p-3" type="number" placeholder='Enter Mobile' onChange={obj=>setmobile(obj.target.value)} value={mobile} />
                  <input className="form-control mt-4 p-3" type="text" placeholder='Address' onChange={obj=>setAddress(obj.target.value)} value={address}/>
                   
                </div>
                <button className='form-control btn btn-success mt-3' onClick={save}>Save</button>
            </div>
            <div className="col-lg-7 m-5  shadow">
                {
                   <table className='table'>
                       <thead>
                      
                           <th>Name</th>
                           <th>Age</th>
                           <th>Mobile</th>
                           <th>Address</th>
                           <th rowspan="2">Actions</th>
                           
                       </thead>
                       <tbody>
                           {
                                    userlist.map((userlist)=>{
                                        return(
                                         <tr key={userlist._id}>
                                             <td>{userlist.name}</td>
                                             <td>{userlist.age}</td>
                                             <td>{userlist.mobile}</td>
                                             <td>{userlist.address}</td>
                                             <td><button className='btn btn-success' onClick={()=>{updateUser(userlist._id)}}>Update</button></td>
                                             <td><button className='btn btn-danger' onClick={()=>{deleteUser(userlist._id)}}>X</button></td>
                                             
                                         </tr>
                                        )
                                    })

                           }
                      </tbody>
                   </table>
            
                }
            </div>
            
      </div>
     
    </div>
    )
}

export default NewUser