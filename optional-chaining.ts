const fetchedUserData = {
  id: 1,
  name: 'Han',
  job: {
    title: 'CEO',
    description: 'Founded this company',
  }
}

function printTitle(userData) {
  /* 
    How do I make sure that userData.job exists 
    BEFORE diving into userData.job.title?  If I don't do this check,
    I expose myself to runtime errors 
  */
  console.log(userData.job && userData.job.title); // JS way to do it
  console.log(userData.job?.title); // TS way to do it
}

printTitle(fetchedUserData);