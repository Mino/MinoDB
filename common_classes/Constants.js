var count = 0;

var Constants = {
	NO_PERMISSION : count++,
	READ_PERMISSION : count++,
	WRITE_PERMISSION : count++
}

if (typeof module != 'undefined') {
    module.exports = Constants;
}