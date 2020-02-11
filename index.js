var express = require('express');
const joi = require('joi');
const app = express();
app.use(express.json());
app.set('view engine', 'pug')


const Client = require('pg').Client;
const client = new Client({
    
    user : "postgres",
    password : "postgres",
    host :"localhost",
    port: 5432,
    database: "postgres"

});

var print;
client.connect()
.then(()=> console.log("connected successfully"))
.then(() => client.query("Select * from PersonalDetails.jobs"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
//.finally(()=> client.end())

app.get('/', async (req,res)=>{
    await res.send('Welcome to RESTAPI');
});

app.get('/api/jobs', async (req,res) =>{
    results= await client.query("Select * from PersonalDetails.jobs")
    console.table(results.rows);
    console.log('\n');
    res.send(results.rows);

});

app.get('/api/candidate/user/:Userid',async (req,res) =>{
    results= await client.query("Select * from PersonalDetails.Candidate where UserID=$1",[req.params.Userid])
    console.table(results.rows)

    if(!results) 
        res.status(404).send(`Sorry!Can't find what you are looking for!`);
    res.send(results.rows);
});

app.get('/api/candidate/skills/:skill',async (req,res) =>{
    results= await client.query("Select * from PersonalDetails.jobs where skills=$1",[req.params.skill])
    console.table(results.rows)

    if(!results) 
        res.status(404).send(`Sorry!Can't find what you are looking for!`);
    res.send(results.rows);
});

app.get('/api/candidate/company/:company',async (req,res) =>{
    results= await client.query("Select * from PersonalDetails.jobs where company=$1",[req.params.company])
    let abc = JSON.stringify(results.rows);
    if(abc ==='[]') {
        res.status(404).send(`Sorry!Can't find what you are looking for!`);}
    res.send(results.rows);}
);



app.post('/api/candidate/jobposting' ,async (req,res)=>{
    let result = {};
    try{
    
   console.log(req.body.job_profile);
    result.success = await createjob(req.body.job_profile, req.body.company, req.body.skills ,req.body.exp, req.body.salary);
    }
    catch(e){
        console.log(e);
        result.success = false;
    }
    finally{
        res.send(result);
        }
})

 async function createjob(job_profile, company, skills, exp, salary){
 try{
     console.log(job_profile);
    await  client.query("Insert into PersonalDetails.jobs (job_profile, company, skills, exp, salary) values ($1, $2, $3 , $4, $5)",[job_profile, company, skills, exp, salary] );
   return  true;
}
    catch (e)
    {
     console.log(e);
     return false;
 }
}
//For Candidate Login

app.put('/api/candidate/login' ,async (req,res)=>{
    let result = {};
    try{
     result.success = await createprofile(req.body.UserID, req.body.name, req.body.password ,req.body.emailid, req.body.id);
    }
    catch(e){
        console.log(e);
        result.success = false;
    }
    finally{
        res.send(result);
        }
})

app.post('/api/candidate/login/post' ,async (req,res)=>{
    let result = {};
    try{
    result.success = await createprofile(req.body.UserID, req.body.name, req.body.password ,req.body.emailid, req.body.id);
    }
    catch(e){
        console.log(e);
        result.success = false;
    }
    finally{
        res.send(result);
        }
})


 async function createprofile(UserID, name, password, emailid, id){
 try{
    
    await  client.query("Insert into PersonalDetails.candidate (UserID, name, password, emailid, id) values ($1, $2, $3 , $4, $5)",[UserID, name, password, emailid, id] );
   return  true;
}
    catch (e)
    {
     console.log(e);
     return false;
 }
 }

//For recruiter login
app.post('/api/recruiter/login' ,async (req,res)=>{
    let result = {};
    try{
     result.success = await createrec(req.body.rec_id, req.body.name, req.body.email ,req.body.password, req.body.company, req.body.jobs_assigned);
    }
    catch(e){
        console.log(e);
        result.success = false;
    }
    finally{
        res.send(result);
        }
})

 async function createrec(rec_id, name, email, password, company, jobs_assigned){
 try{
    
    await  client.query("Insert into PersonalDetails.recruiter (rec_id, name, email, password, company, jobs_assigned) values ($1, $2, $3 , $4, $5, $6)",[rec_id, name, email, password, company, jobs_assigned] );
   return  true;
}
    catch (e)
    {
     console.log(e);
     return false;
 }


 
 }




 app.get('/api/candidate',async (req,res)=>{
     const{error}= await validatejob(req.body);
     if(error){
         res.status(400).send(error.details[0].message)
         return;
     }
});


 
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`))  


