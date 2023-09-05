rule AsciiExample {
strings:
	// A string to match -- default is ascii
	$ascii_string = "hello"

condition:
	// The condition to match
	$ascii_string
}