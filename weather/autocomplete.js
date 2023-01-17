let autocomplete;

function initAutocomplete(){
    var input = document.getElementById('cityName');
    autocomplete = new google.maps.places.Autocomplete(
    input,
        {
            types: ['geocode'],
            fields: ['name']
        });
    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged(){
    var input = document.getElementById('cityName');
    var place = autocomplete.getPlace();
    
    if(!place.geometry){
        input.placeholder = 'Enter a place';
    }else{
        document.getElementById('details').innerHTML = place.name;
    }
    input.value=input.value.split(',')[0]; 
}

//var searchInput = 'cityName';
//
//$(document).ready(function () {
//    var autocomplete;
//    autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
//        types: ['geocode'],
//    });
//
//    google.maps.event.addListener(autocomplete, 'place_changed', function () {
//        var near_place = autocomplete.getPlace();
//    });
//});
