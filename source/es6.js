"use strict"
/*function* generator() {
	yield 1
	yield 2
	yield 3
}

var g = generator()

var r = g.next()
while (!r.done) {
	console.log(r.value)
	r = g.next()
}*/

/*function wrapper(generatorFunc) {
	return function(...args) {
		let g = generatorFunc(...args)
		g.next()
		return g
	}
}
function* generator(){
	console.log(`hello ${yield}`)
	return 'hello'
}

const wrap = wrapper(generator)()
console.log(wrap.next('react'))*/

/*function funk(func) {
	return function(...args) {
		var new_args = args.concat(next)
		var g = func(new_args)

		function next() {
			var r = g.next()
			if (r.done) {
				return 
			} else {
				console.log(r.value)
				next()
			}
		}
		next()
	}
}

funk(function* () {
	yield 1
	yield 2
	yield 3
})()

function funk2(func) {
	return function(...args) {
		var new_args = args.concat(next)
		var g = func(new_args)

		function next() {
			var r = g.next()
			if (r.done) {
				return 
			} else {
				r.value.then(function(data) {
					console.log(data)
					next()
				})
			}
		}
		next()
	}
}

funk2(function* () {
	yield Promise.resolve(1)
	yield Promise.resolve(2)
	yield Promise.resolve(3)
})()*/