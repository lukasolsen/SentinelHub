rule AsciiExample {
strings:
	// A string to match -- default is ascii
	$ascii_string = "Creative"

condition:
	// The condition to match
	$ascii_string
}