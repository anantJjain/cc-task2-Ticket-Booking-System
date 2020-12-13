var main = document.querySelector('.main');
var seats = document.querySelectorAll('.seatrow .seat:not(.booked)');
var total = document.getElementById('total');
var bill = document.getElementById('bill');
var choice = document.getElementById('dropdown');
let cost = +choice.value;


function getdata()
{
  var seatschosen = JSON.parse(localStorage.getItem('seatschosen'));
  if(seatschosen !==null && seatschosen.length>0)
  {
    seats.forEach(function(seat, index) 
    {
      if(seatschosen.indexOf(index)>-1)
      {
        seat.classList.add('chosen'); 
      }
    });
  }  
  
  var chosenmovieno = localStorage.getItem('chosenmovieno');
  var chosenmoviecost = localStorage.getItem('chosenmoviecost');
 
    if (chosenmovieno !== null)
     {
       choice.selectedIndex = chosenmovieno ;
     }

    if (chosenmoviecost !== null)
    {
      total.innerText = seatschosen.length;
      bill.innerText = seatschosen.length * +chosenmoviecost;
    }
}

getdata();


function movieinfo(movienumber, moviecost)
{
  localStorage.setItem('chosenmovieno', movienumber);
  localStorage.setItem('chosenmoviecost', moviecost);
} 



function alternumber() 
{
  var seatschosen = document.querySelectorAll('.seatrow .seat.chosen');
  var seatnumber = [...seatschosen].map(function(seat)
  {
    return [...seats] .indexOf(seat);
  });
  
  localStorage.setItem('seatschosen', JSON.stringify(seatnumber));
  var numberofseatschosen = seatschosen.length;
  total.innerText = numberofseatschosen;
  bill.innerText = numberofseatschosen*cost;
}


main.addEventListener('click', function(obj1) 
{
 if(obj1.target.classList.contains('seat') && !obj1.target.classList.contains('booked'))
  {
    obj1.target.classList.toggle('chosen');
    alternumber();
  }
});



choice.addEventListener('change', function(obj2)
{
  cost = +obj2.target.value;
  movieinfo(obj2.target.selectedIndex, obj2.target.value);
  alternumber();
});







 





 
