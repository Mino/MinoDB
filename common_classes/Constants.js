var constant_count = 0;

var Constants = {
	NO_PERMISSION : constant_count++,
	READ_PERMISSION : constant_count++,
	WRITE_PERMISSION : constant_count++
}

if (typeof module != 'undefined') {
    module.exports = Constants;
}