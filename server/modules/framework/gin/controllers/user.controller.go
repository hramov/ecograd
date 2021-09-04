package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golobby/container/v3"
	"github.com/hramov/gin_ecograd/domains/dto"
	"github.com/hramov/gin_ecograd/domains/jwt"
	"github.com/hramov/gin_ecograd/domains/ports"
)

type UserController struct{}

func (uc *UserController) Login(c *gin.Context) {

	var userEntity ports.UserEntityPort
	container.NamedResolve(&userEntity, "UserEntity")

	loginData, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err})
		return
	}

	loginDto := &dto.LoginDto{}
	err = json.Unmarshal(loginData, &loginDto)
	if err != nil {
		c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err})
		return
	}

	user, token, err := userEntity.Login(loginDto)
	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err.Error()})
		return
	}
	c.JSON(200, gin.H{
		"data": gin.H{
			"user":  user,
			"token": token,
		}, "error": nil})
}

func (uc *UserController) Register(c *gin.Context) {

	var userEntity ports.UserEntityPort
	container.NamedResolve(&userEntity, "UserEntity")

	file, err := c.FormFile("file")

	if err != nil {
		registerData := c.Request.FormValue("expert")
		registerDto := dto.RegisterDto{}
		err := json.Unmarshal([]byte(registerData), &registerDto)
		user, token, err := userEntity.Register(&registerDto)
		if err != nil {
			abort(c, err)
			return
		}
		c.JSON(200, gin.H{
			"data": gin.H{
				"user":  user,
				"token": token,
			}, "error": nil})
		return
	}

	registerData := c.Request.FormValue("expert")
	registerDto := dto.RegisterDto{}
	err = json.Unmarshal([]byte(registerData), &registerDto)

	fileArray := strings.Split(file.Filename, ".")
	fileResolution := fileArray[len(fileArray)-1]

	dst := "/uploads/avatars/" + registerDto.Email + "." + fileResolution
	err = c.SaveUploadedFile(file, dst)

	if err != nil {
		fmt.Println(err)
		abort(c, err)
		return
	}

	registerDto.ImageUrl = dst
	user, token, err := userEntity.Register(&registerDto)
	if err != nil {
		abort(c, err)
		return
	}
	c.JSON(200, gin.H{
		"data": gin.H{
			"user":  user,
			"token": token,
		}, "error": nil})
}

func (uc *UserController) Get(c *gin.Context) {
	var userEntity ports.UserEntityPort
	container.NamedResolve(&userEntity, "UserEntity")

	users, err := userEntity.Get()
	if err != nil {
		abort(c, err)
		return
	}

	c.JSON(200, gin.H{
		"users": users,
	})
}

func (uc *UserController) GetExperts(c *gin.Context) {
	var userEntity ports.UserEntityPort
	container.NamedResolve(&userEntity, "UserEntity")

	experts, err := userEntity.GetExperts()
	if err != nil {
		abort(c, err)
		return
	}

	c.JSON(200, gin.H{
		"experts": experts,
	})
}

func (uc *UserController) CheckJwt(c *gin.Context) {
	var userEntity ports.UserEntityPort
	container.NamedResolve(&userEntity, "UserEntity")

	token, err := jwt.GetTokenFromHeader(c.Request.Header.Get("Authorization"))
	if err != nil {
		abort(c, err)
		return
	}
	_, err = userEntity.CheckJwt(token)
	if err != nil {
		abort(c, err)
		return
	}

	c.JSON(200, gin.H{"data": true, "error": nil})
}

func abort(c *gin.Context, err error) {
	c.AbortWithStatusJSON(200, gin.H{"data": nil, "error": err.Error()})
}

func (uc *UserController) DeleteExpert(c *gin.Context) {
	var userEntity ports.UserEntityPort
	container.NamedResolve(&userEntity, "UserEntity")

	expert_id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	expert, err := userEntity.DeleteExpert(expert_id)
	if err != nil {
		abort(c, err)
	}
	c.JSON(200, gin.H{"data": expert, "error": nil})
}
