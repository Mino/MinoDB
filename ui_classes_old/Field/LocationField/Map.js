function MercatorProjection() {
	var TILE_SIZE = 256;

	this.pixelOrigin_ = new google.maps.Point(TILE_SIZE / 2, TILE_SIZE / 2);
	this.pixelsPerLonDegree_ = TILE_SIZE / 360;
	this.pixelsPerLonRadian_ = TILE_SIZE / (2 * Math.PI);
}

function bound(value, opt_min, opt_max) {
	if (opt_min != null) value = Math.max(value, opt_min);
	if (opt_max != null) value = Math.min(value, opt_max);
	return value;
}	

MercatorProjection.prototype.fromLatLngToPoint = function(latLng, opt_point) {
	var me = this;
	var point = opt_point || new google.maps.Point(0, 0);
	var origin = me.pixelOrigin_;

	point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;

	// Truncating to 0.9999 effectively limits latitude to 89.189. This is
	// about a third of a tile past the edge of the world tile.
	var siny = bound(Math.sin(Map.degreesToRadians(latLng.lat())), -0.9999,
	0.9999);
	point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) *
	-me.pixelsPerLonRadian_;

	return point;
};

MercatorProjection.prototype.fromPointToLatLng = function(point) {
	var me = this;
	var origin = me.pixelOrigin_;
	var lng = (point.x - origin.x) / me.pixelsPerLonDegree_;
	var latRadians = (point.y - origin.y) / -me.pixelsPerLonRadian_;
	var lat = Map.radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);
	return new google.maps.LatLng(lat, lng);
};

function Map(){

	Map.geocoder = new google.maps.Geocoder();

	var map = this;
	map.element = $("<div />").addClass("googleMap").css("height","200px").css("clear","left")
	.data("map",map);
	
	map.markerMoved = function(lat,lon){

	};

	map.markerMoveEnded = function(lat,lon){

	};
}

Map.prototype.initialize = function(lat,lon) {
	var map = this;
	if(lat==null){
		//Golden Gate Bridge
		lat = 37.811;
		lon = -122.4775;
	}
	var pos = new google.maps.LatLng(lat,lon);
	var mapOptions = {
		zoom: 15,
		center: pos,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map.visualMap = new google.maps.Map(map.element[0], mapOptions);

	map.marker = new google.maps.Marker({
		title: 'Point A',
		position: pos,
		map: map.visualMap,
		draggable: true
	});

	google.maps.event.addListener(map.marker, 'drag', function() {
		var pos = map.marker.getPosition();
		map.markerMoved(pos.lat(), pos.lng());
	});

	google.maps.event.addListener(map.marker, 'dragend', function() {
		var pos = map.marker.getPosition();
		console.log(pos);
		map.markerMoveEnded(pos.lat(), pos.lng());
	});

	google.maps.event.trigger(map.visualMap, 'resize')
}

Map.prototype.setDraggableMarker = function(set){
	var map = this;
	map.marker.setDraggable(set);
}

Map.prototype.findLatLonForAddress = function(address,callback){
	var map = this;

	Map.geocoder.geocode( { 'address': address}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
			console.log(results[0].geometry.location);
			var lat = results[0].geometry.location.lat();
			var lon = results[0].geometry.location.lon();
			map.setCenter(lat,lon);
			callback(lat,lon);
	    } else {
			//alert('Geocode was not successful for the following reason: ' + status);
			callback(null,null);
	    }
	});
}

Map.prototype.findAddressForLatLon = function(lat,lon, callback){
	var map = this;

	var pos = new google.maps.LatLng(lat,lon);

	Map.geocoder.geocode({
		latLng: pos
	}, function(responses) {
		if (responses && responses.length > 0) {
			callback(responses[0].formatted_address);
		} else {
			callback(null);
		}
	});
}

Map.prototype.setCenter = function(lat,lon){
	console.log(lat + " , "+lon)
	var map = this;
	var pos = new google.maps.LatLng(lat,lon);
	map.visualMap.setCenter(pos);

	map.marker.setPosition(pos);
}

Map.degreesToRadians = function(deg) {
  return deg * (Math.PI / 180);
}

Map.radiansToDegrees = function(rad) {
  return rad / (Math.PI / 180);
}