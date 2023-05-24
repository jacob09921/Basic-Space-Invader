const container = document.querySelector('.container')
let currentPosition = 202
let width = 15
let movement = 1
let confirmation = true;
let storage = []
let shot;
let entries = 0
let moves = 0

for (let i = 0; i < 255; i++) {
    const square = document.createElement('div')

    container.appendChild(square)

}

const invader = [0, 1, 2, 3, 4, 5, 6,
    7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39]

const square = Array.from(document.querySelectorAll('.container div'))





function draw() {
    for (let i = 0; i < invader.length; i++) {
        if (!storage.includes(i)) {
            square[invader[i]].classList.add('invader')
        }

    }
}

function remove() {
    for (let i = 0; i < invader.length; i++) {
        square[invader[i]].classList.remove('invader')
    }
}

draw()

square[currentPosition].classList.add('shooter')

function moveShooter(data) {
    if (data === 'ArrowRight') {
        if (currentPosition != 209) {
            square[currentPosition].classList.remove('shooter')
            currentPosition++
            square[currentPosition].classList.add('shooter')
        } else {
            currentPosition = 209;
        }
    }
    else if (data === 'ArrowLeft') {
        if (currentPosition != 195) {
            square[currentPosition].classList.remove('shooter')
            currentPosition--
            square[currentPosition].classList.add('shooter')
        } else {
            currentPosition = 195;
        }
    } else if (data === 'ArrowUp') {
        shoot()


    }
}
// Windows Control
window.addEventListener('keydown', (evt) => {
    moveShooter(evt.code)
})

// Mobile Phone Control
window.addEventListener('touchmove', (evt) => {
    if (parseInt(evt.touches[0].clientX) < 200) {
        if (currentPosition != 195) {
            square[currentPosition].classList.remove('shooter')
            currentPosition--
            square[currentPosition].classList.add('shooter')
        } else {
            currentPosition = 195;
        }

    } else if (parseInt(evt.touches[0].clientX) > 200) {
        if (currentPosition != 209) {
            square[currentPosition].classList.remove('shooter')
            currentPosition++
            square[currentPosition].classList.add('shooter')
        } else {
            currentPosition = 209;
        }

    }
    shoot()
})




function moveInvader() {
    const left = invader[0] % width === 0 // edges
    const right = invader[invader.length - 1] % width === width - 1
    remove() // it removes in the first place

    if (right && confirmation) {
        for (let i = 0; i < invader.length; i++) {
            invader[i] += (width + 1)
            movement = -1
            confirmation = false
            moves++
        }
    } else if (left && confirmation === false) {
        for (let i = 0; i < invader.length; i++) {
            invader[i] += width - 1
            movement = 1
            confirmation = true
            moves++
        }
    }

    for (let i = 0; i < invader.length; i++) { // 30 times of looping 
        invader[i] += movement
    }
    draw()


    if (square[currentPosition].classList.contains('invader', 'shooter')) {
        clearInterval(interval)
        remove()
        alert('Game Over')
        location.reload();
    } else if (entries === 30) {
        clearInterval(interval)
        alert('You Have Won')
        location.reload();
    }
    else if (moves === 420) {
        moves = 0
        location.reload()
    }
    console.log(entries)
    console.log(moves)

}

let interval = setInterval(moveInvader, 150)


function shoot() {
    let beamIndex = currentPosition // scope // the currentPosition will change also the variable named beam index
    function move() {
        square[beamIndex].classList.remove('beam')
        setTimeout(() => {
            beamIndex -= width
            square[beamIndex].classList.add('beam')
            if (square[beamIndex].classList.contains('invader')) {
                square[beamIndex].classList.remove('invader')
                entries++

            }
            const removal = invader.indexOf(beamIndex)
            storage.push(removal)
        }, 600)


    }
    shot = setInterval(move, 200) // its like loop 
}




