var express = require('express');
var someObject = require('./data');
var non_key = someObject.non_key.keyword;
//var sentence = "see you ";
var keyword_sentence = [];
var data = {};
var set_no = 6;
//var object_place = 1;
var app = express();
app.use(express.static('public'));
app.use(express.json()); // built-in middleware for express

app.post('/', function (request, response) {
	let myJson = request.body;      // your JSON
	let myValue = request.body.myKey;	// a value from your JSON
	var sentence = myJson.sentence;
	var res = sentence.split(" ");

	var object_place = myJson.object_place;
	
let myPromise = new Promise(function (myResolve, myReject) {
	res.forEach(check_function);

	myResolve(); 
	myReject();  
});


myPromise.then(
	function (value) {
		var j = 0;
		var max_match = 0;
		var current_match = 0;
		var temp = 0; 
		if (object_place == 1) {
			for (i = 1; i <= set_no; i++) {

				var first_keyword = someObject[i];
				let data_keyword = first_keyword["keyword"];
				//let check = data_keyword.some(i => keyword_sentence.includes(i)); //check is boolean
				
				var matches = keyword_sentence.filter((word) => { return data_keyword.includes(word) }).length;
				current_match = (matches / data_keyword.length * 100).toFixed(4) - .0001;
				console.log(current_match);
				if (max_match < current_match) {					
					max_match = current_match;					
					temp = i;
				}
			}

			if (max_match) {
				keyword_sentence=[];
				console.log(max_match + '%');
				first_keyword = someObject[temp];
				data = {
					object_place: first_keyword["type"],
					sentence: first_keyword["answer"]
				};
				sentto(data);
				console.log(first_keyword["answer"]);
				console.log(first_keyword["type"]);
			} else { console.log("not found"); }

		} else {
			if (object_place in someObject) {
			
				var first_keyword = someObject[object_place];
				let check = first_keyword["answer"];

				
				if (check) {
					console.log(first_keyword["answer"]);
					data = {
						object_place: first_keyword["type"],
						sentence: first_keyword["answer"]
					};
					sentto(data);
				} else {
					console.log("not found");
				}

			} else {
				console.log("Error in type");
			}
		} 

	},
	function (error) { /* code if some error */ }
);



	function sentto(data) {
		response.send(data);
    }
		 // echo the result back
});

app.listen(3000);

function check_function(item) {
	var n = non_key.includes(item)
	
	if (!n) {
		keyword_sentence.push(item);
	}
	 (keyword_sentence);
}
