package controller

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

func Abort(f func(int, interface{}), err error) {
	f(200, gin.H{"data": nil, "error": err.Error()})
}

func GetID(c *gin.Context) (uint64, error) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	return id, err
}
