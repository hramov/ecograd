package validator

import "fmt"

func IsEmail(email string) error {
	return nil
}

func IsLength(str string, length int) error {
	if len(str) > length {
		return fmt.Errorf("Length of the string is more than %d", length)
	}
	return nil
}
