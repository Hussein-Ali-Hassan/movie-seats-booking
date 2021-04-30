const movie = document.getElementById('movie');
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')

populateUI();

let moviePrice = +movie.value


movie.addEventListener('change', (e) => {
    moviePrice = +e.target.value
    movieIndex = e.target.selectedIndex
    
    updateSelectedSeatsAndCount()
    storeMovieData(movieIndex,moviePrice)
})


seats.forEach(seat => {
    seat.addEventListener('click', () => {
        if (seat.classList.contains('selected')) 
            seat.classList.remove('selected')   
        else 
            seat.classList.add('selected')      
        updateSelectedSeatsAndCount()
    })

})

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');


    if (selectedSeats !== null && selectedSeats.length > 0)
    {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) >-1)
                seat.classList.add('selected')
        })
    }
    
    movie.selectedIndex = selectedMovieIndex
    
}

function storeMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)    
    localStorage.setItem('selectedMoviePrice', moviePrice) 
    updateSelectedSeatsAndCount()
}

function updateSelectedSeatsAndCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    // getting the index of the seats
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    // adding to local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    count.innerText = selectedSeats.length;
    total.innerText = moviePrice * selectedSeats.length;
}
   
updateSelectedSeatsAndCount()