const API = '50829f186efe811c3f0ae5f16d746fef'
const coord ={}

let options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

function success(pos) {
	let crd = pos.coords;
	coord.lat =crd.latitude.toFixed(2);
	coord.lon = crd.longitude.toFixed(2);
}

function error(err) {
	console.warn(`ERROR(${err.code}): ${err.message}`);
}
navigator.geolocation.getCurrentPosition(success, error, options);

export {coord, API}
