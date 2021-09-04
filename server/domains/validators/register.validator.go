package validator

import (
	"fmt"
	"strings"

	"github.com/hramov/gin_ecograd/domains/dto"
)

type RegisterValidator struct {
	RegisterDto *dto.RegisterDto
	Errors      []string
}

func (rv *RegisterValidator) Validate() error {
	err := IsEmail(rv.RegisterDto.Email)
	if err != nil {
		rv.Errors = append(rv.Errors, err.Error())
	}
	err = IsLength(rv.RegisterDto.Email, 20)
	if err != nil {
		rv.Errors = append(rv.Errors, err.Error())
	}

	if len(rv.Errors) > 0 {
		return fmt.Errorf("%s", strings.Join(rv.Errors, ";"))
	}
	return nil
}
