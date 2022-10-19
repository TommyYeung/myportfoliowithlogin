/*
File name: style.js
Student’s Name: Pok Hei Yeung
StudentID: 301240885
Date: 16/10/2022
*/


   /*
   File name: style.js
   Student’s Name: Pok Hei Yeung
   StudentID: 301240885
   Date: 28/09/2022
   */

   console.log("linked js!!");

   // Get button:
   let toTheTop = document.getElementById("toTopButton");
   /*
   // scrolls down 20px ->show the button
   window.onscroll = function() {scrollFunction()};
   
   function scrollFunction() {
     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
       toTheTop.style.display = "block";
     } else {
       toTheTop.style.display = "none";
     }
   }
   */
   //to top
   function toTop() {
   
     document.documentElement.scrollTop = 0;
   }
   
   ////contactMe////
   //reset button
   function reset(){
   document.getElementById("form").reset();
   }
   /////
   
   
   
   
   



