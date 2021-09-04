package validator

import (
	"fmt"
	"strings"

	"github.com/hramov/gin_ecograd/domains/dto"
)

type LoginValidator struct {
	LoginDto *dto.LoginDto
	Errors   []string
}

func (lv *LoginValidator) Validate() error {
	err := IsEmail(lv.LoginDto.Email)
	if err != nil {
		lv.Errors = append(lv.Errors, err.Error())
	}
	err = IsLength(lv.LoginDto.Email, 20)
	if err != nil {
		lv.Errors = append(lv.Errors, err.Error())
	}

	if len(lv.Errors) > 0 {
		return fmt.Errorf("%s", strings.Join(lv.Errors, ";"))
	}
	return nil
}
