const moment= require('moment');
  



module.exports = {
    format_time: () => {
     
      return moment().format('YYYY Do HH:MM ');
      // return  new Date().toLocaleTimeString();
    },
   
  

  format_date: () => {
    
    const current =  moment().format('HH:MM');

    if (current < '12'){
      return 'Good Morning';
    
      } else if (current >='12' && current<'17') {
      return 'Good Afternoon';
    
      } else if (current >='17'){
      return 'Good Evening';
      // console.log("Good Morning!")
    }
      // return 'Good Morning';
  }

  
}

 // return  new Date().toLocaleTimeString();
  
 
   // format_date: (date) => {
    //   return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
    //     new Date(date).getFullYear() + 5
    //   }`;
    // },