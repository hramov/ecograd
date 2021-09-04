package service

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
)

func ParseConfig(fileName string) (Config, error) {
	data := make([]byte, 1000)
	config := Config{}
	rawData, err := os.Open(fmt.Sprintf("data/%s.json", fileName))
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	defer rawData.Close()
	fmt.Printf("Successfully opened %s.json\n", fileName)
	n, err := rawData.Read(data)
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	data = data[:n]
	json.Unmarshal(data, &config)
	return config, nil
}

func FindConfig(config Config, service string) (*ServiceConfig, error) {
	for i := 0; i < len(config); i++ {
		if config[i].Service == service {
			return &config[i], nil
		}
	}
	return nil, fmt.Errorf("No such service in the config")
}

func CountPages() {}
func IsNextPage() {}
func NextPage()   {}
