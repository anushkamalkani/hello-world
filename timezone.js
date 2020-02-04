

var CandTime, CandDate;
var TotalSlots = 0;
var RecTime, RecDate ;
var UTCCand =[]
var CandAvailableSlots =[]
var UTCRec =[]
var RecAvailableSlots = [];

  RecTime = prompt("Enter the UTC +/- hours of the Recruiter \n");
 console.log("Enter the Available time slots of Recruiter in 24 hours(full hours only)\n"); 
  for (let i=0; i<10; i++){
      RecAvailableSlots[i]=prompt(`Enter ${i+1} time`);
    }

  RecDate=prompt("Enter the available date of the Recruiter \n");

  CandTime = prompt("Enter the UTC +/- hours of the Candidate \n");
 console.log("Enter the Available time slots of Candidate in 24 hours(full hours only)\n");
  for (let j=0; j<10; j++){
      CandAvailableSlots[j] = prompt(`Enter ${j+1} time `);
  }
  CandDate= prompt("Enter the available date of the Candidate \n");
  
  //Converting time leto same format for comparision
  for (let k=0; k<10; k++) {
      if(RecTime>=0){
      
      UTCRec[k]= RecAvailableSlots[k]+RecTime;
      if (UTCRec[k]>24){
          RecDate=RecDate+1;
          UTCRec[k]=UTCRec[k]%24;
      }
      if (UTCRec[k]<0){
          RecDate=RecDate-1;
          UTCRec[k]=UTCRec[k]+24;
      }
  }
  
 else {
      
      UTCRec[k]= RecAvailableSlots[k]-RecTime;
      if (UTCRec[k]>24){
          RecDate=RecDate+1;
          UTCRec[k]=UTCRec[k]%24;
      }
      if (UTCRec[k]<0){
          RecDate=RecDate-1;
          UTCRec[k]=UTCRec[k]+24;
      }
  }
  }
  
  for (let l=0; l<10; l++) {
      if(CandTime>=0){
      UTCCand[l]= CandAvailableSlots[l]+CandTime;
      if (UTCCand[l]>24){
          CandDate=CandDate+1;
          UTCCand[l]=UTCCand[l]-24;
      }
      if (UTCCand[l]<0){
          CandDate=CandDate-1;
          UTCCand[l]=UTCCand[l]+24;
      }
    }
      else
      {
      UTCCand[l]= CandAvailableSlots[l]-CandTime;
      if (UTCCand[l]>24){
          CandDate=CandDate+1;
          UTCCand[l]=UTCCand[l]-24;
      }
      if (UTCCand[l]<0){
          CandDate=CandDate-1;
          UTCCand[l]=UTCCand[l]+24;
      }
    }
  }
  //Comparing the time zones
  for(let a=0; a<10; a++){
      for (let b=0; b<10;b++){
          if((UTCRec[a]===UTCCand[b]) && RecDate===CandDate){
          
        console.log("Available slot "<<UTCCand[b]+CandTime<<"\n");
           TotalSlots +=1;
          }
          
    

      }
  }
    if(TotalSlots===0)
     console.log("No available matching slots\n");
    else
     console.log("Total available slots "<<TotalSlots<<"\n");
    


