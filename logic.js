$( document ).ready(function(){
var database = firebase.database()
var todaysDate = "2018-02-25T12:00:00-06:00"
var todaysWorkout= ""
var workouts = ["Bi's Tri's Calves & Run","Core Butt & Run","Chest Back & Run","Shoulders Forearms & Run","Legs Squats & Deadlifts"]
var gymQuant = [0,0,1,1,0,1,0,0,1,0]
var gymQual  = [0,0,4,2,0,4,0,0,5,0]
var mealQuant= [3,3,3,2,3,2,3,3,3,2]
var mealQual = [4,3,2,3,4,5,4,2,3,3]
var weight = [155,155,155,155,155]
var x = 0
var workOutToday = false

database.ref().set({
	gymQuant:gymQuant,
	gymQual:gymQual,
	mealQuant:mealQuant,
	mealQual:mealQual,
	x:x,
	weight:weight,
	todaysDate:todaysDate,
	workOutToday:workOutToday
	})

database.ref().on("value",function(snapshot){
	x=snapshot.val().x
	gymQuant=snapshot.val().gymQuant
	gymQual=snapshot.val().gymQual
	mealQuant=snapshot.val().mealQuant
	mealQual=snapshot.val().mealQual
	todaysDate=snapshot.val().todaysDate
	weight=snapshot.val().weight
	workOutToday=snapshot.val().workOutToday
	console.log(todaysDate)
	var todaysDateReadable = moment(todaysDate).format("dddd MMM Do")
	$("#date").html(todaysDateReadable)
	$("#currentWorkout").html(workouts[x])
	getAveGymQuant()
	getAveGymQual()
	getAveMealQuant()
	getAveMealQual()
	getAveWeight()
});

//-----------------------calculating and display gym attendence

function getAveGymQuant() {
	var totalA=0
	for (var i=0; i<gymQuant.length; i++) {
		totalA=totalA+gymQuant[i]
	}
	aveGymQuant=Math.round((totalA/7)*100)+"%"
	$("#aveGymQuant").html(aveGymQuant)
}

//--------------------calculating and displaying gym quality
function getAveGymQual() {
	var totalB=0
	var totalb=0
	for (var i=0; i<gymQuant.length; i++) {
		if (gymQuant[i]===1) {
			totalb=totalb+1
			totalB=totalB+gymQual[i]
		}
	}
	aveGymQual=Math.round((totalB/totalb)*10)/10
	$("#aveGymQual").html(aveGymQual)
}

//--------------------calculating and displaying meal quantity

function getAveMealQuant() {
	var totalC=0
	for (var i=0; i<mealQuant.length; i++) {
		totalC=totalC+mealQuant[i]
	}
	aveMealQuant=Math.round((totalC/60)*100)+"%"
	$("#aveMealQuant").html(aveMealQuant)
}

//--------------------calculating and displaying meal quality
function getAveMealQual() {
	var totalD=0
	for (var i=0; i<mealQual.length; i++) {
		totalD=totalD+mealQual[i]
	}
	aveMealQual=Math.round((totalD/10)*10)/10
	$("#aveMealQual").html(aveMealQual)
}

//--------------------calculating and displaying weight
function getAveWeight() {
	var totalE=0
	for (var i=0; i<weight.length; i++) {
		totalE=totalE+weight[i]
	}
	aveWeight=Math.round((totalE/5)*10)/10
	$("#aveWeight").html(aveWeight)
}

//------------------------------------upon LOGGING WORKOUT
$("#logWorkout").on("click",function(){
if ($("#gymRating").val()>0) {
	workOutToday=true
	gymQuant.splice(0,1)
	gymQuant.push(1)
	gymQual.splice(0,1)
	var arb = $("#gymRating").val()
	$("#gymRating").val("")
	gymQual.push(Number(arb))
	console.log(gymQuant)
	console.log(gymQual)
	if (x===workouts.length-1) {
		x=0
		$("#currentWorkout").html(workouts[x])
	}
	else {
		x++
		$("#currentWorkout").html(workouts[x])
	}
	getAveGymQuant()
	getAveGymQual()
	$("#aveGymQuant").html(aveGymQuant)
	$("#aveGymQual").html(aveGymQual)
	database.ref().set({
		gymQuant:gymQuant,
		gymQual:gymQual,
		mealQuant:mealQuant,
		mealQual:mealQual,
		x:x,
		weight:weight,
		todaysDate:todaysDate,
		workOutToday:workOutToday
	})
}
})

//-------------------------------------upon LOGGING MEALS
$("#submitMeals").on("click",function(){
	if ($("#weight").val()>0) {
	todaysDate = moment(todaysDate).add(1, 'day').format()
	todaysDateReadable = moment(todaysDate).format("dddd MMM Do")
	$("#date").html(todaysDateReadable)
	mealQuant.splice(0,1)
	var arb1 = $("#mealCount").val()
	$("#mealCount").val("")
	mealQuant.push(Number(arb1))
	mealQual.splice(0,1)
	var arb2 = $("#nutritionRating").val()
	$("#nutritionRating").val("")
	mealQual.push(Number(arb2))
	weight.splice(0,1)
	var arb3 = $("#weight").val()
	$("#weight").val("")
	weight.push(Number(arb3))
	console.log(mealQuant,mealQual,weight)
	getAveMealQuant()
	getAveMealQual()
	getAveWeight()
	if(workOutToday===false) {
		gymQuant.splice(0,1)
		gymQuant.push(0)
		gymQual.splice(0,1)
		gymQual.push(0)
		console.log(gymQuant)
		console.log(gymQual)
		getAveGymQuant()
		getAveGymQual()
		$("#aveGymQuant").html(aveGymQuant)
		$("#aveGymQual").html(aveGymQual)
	}
	else {
		workOutToday=false
	}
	database.ref().set({
		gymQuant:gymQuant,
		gymQual:gymQual,
		mealQuant:mealQuant,
		mealQual:mealQual,
		x:x,
		weight:weight,
		todaysDate:todaysDate,
		workOutToday:workOutToday
	})
	}
})
})