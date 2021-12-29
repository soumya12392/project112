var speak_data_1;
var speak_data_2;
var meaning_1;
var meaning_2;

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

var camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>'
    });
}

console.log("ml5 version: " + ml5.version);

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/khMFQG7bP/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The meaning of the first hand gesture is " + meaning_1;
    speak_data_2 = "And the meaning of the second hand gesture is " + meaning_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    var img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }

    else {
        console.log(results);
        document.getElementById("result_gesture_name1").innerHTML = results[0].label;
        document.getElementById("result_gesture_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;

        //prediction 1
        if (prediction_1 == "Amazing") {
            document.getElementById("update_emoji1").innerHTML = "&#128076;";
            meaning_1 = "This is amazing!";
        }

        if (prediction_1 == "Best") {
            document.getElementById("update_emoji1").innerHTML = "&#128077;";
            meaning_1 = "All the best!";
        }

        if (prediction_1 == "Victory") {
            document.getElementById("update_emoji1").innerHTML = "&#9996;";
            meaning_1 = "That was a marvelous victory!";
        }

        if (prediction_1 == "Disagree") {
            document.getElementById("update_emoji1").innerHTML = "&#128078;";
            meaning_1 = "I don't agree with it!";
        }

        if (prediction_1 == "Stop") {
            document.getElementById("update_emoji1").innerHTML = "&#9995;";
            meaning_1 = "Don't do that anymore!";
        }

        if (prediction_1 == "Clap") {
            document.getElementById("update_emoji1").innerHTML = "&#128079;";
            meaning_1 = "Clapping!";
        }

        //prediction 2
        if (prediction_2 == "Amazing") {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
            meaning_2 = "This is amazing!";
        }

        if (prediction_2 == "Best") {
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
            meaning_2 = "All the best!";
        }

        if (prediction_2 == "Victory") {
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
            meaning_2 = "That was a marvelous victory!";
        }

        if (prediction_2 == "Disagree") {
            document.getElementById("update_emoji2").innerHTML = "&#128078;";
            meaning_2 = "I don't agree with it!";
        }

        if (prediction_2 == "Stop") {
            document.getElementById("update_emoji2").innerHTML = "&#9995;";
            meaning_2 = "Don't do that anymore!";
        }

        if (prediction_2 == "Clap") {
            document.getElementById("update_emoji2").innerHTML = "&#128079;";
            meaning_2 = "Clapping!";
        }

        speak();
    }
}