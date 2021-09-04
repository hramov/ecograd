package jwt

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	jwtgo "github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(hash, password string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err
}

func CreateToken(user_id uint64, user_role string) (string, error) {
	atClaims := jwtgo.MapClaims{}
	atClaims["authorized"] = true
	atClaims["user_id"] = user_id
	atClaims["role"] = user_role
	atClaims["exp"] = time.Now().Add(time.Minute * 600000).Unix()
	at := jwtgo.NewWithClaims(jwtgo.SigningMethodHS256, atClaims)
	token, err := at.SignedString([]byte(os.Getenv("ACCESS_SECRET")))
	if err != nil {
		fmt.Println(err.Error())
		return "", err
	}
	return token, nil
}

func ParseJWT(token string) (jwtgo.MapClaims, error) {
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("ACCESS_SECRET")), nil
	})

	if err != nil {
		return nil, err
	}
	return claims, nil
}

func CheckJwt(token, role string) (bool, error) {
	claims, err := ParseJWT(token)
	if err != nil {
		fmt.Println(err.Error())
		return false, err
	}
	if claims["role"] == role {
		return true, nil
	}
	return false, nil
}

func GetIDFromJWT(token string) (uint64, error) {
	claims, err := ParseJWT(token)
	if err != nil {
		return 0, err
	}
	rawId := claims["user_id"]
	var id uint64 = uint64(rawId.(float64))
	return id, nil
}

func GetRoleFromJWT(token string) (string, error) {
	claims, err := ParseJWT(token)
	if err != nil {
		return "", err
	}
	rawRole := claims["role"]
	var role string = fmt.Sprintf("%v", rawRole)
	return role, nil
}

func GetTokenFromHeader(authHeader string) (string, error) {
	auth := strings.Split(authHeader, " ")
	if len(auth) > 2 {
		return "", fmt.Errorf("Invalid token format")
	}
	if auth[0] != "Bearer" {
		return "", fmt.Errorf("Invalid token (should start with 'Bearer'")
	}
	return auth[1], nil

}
