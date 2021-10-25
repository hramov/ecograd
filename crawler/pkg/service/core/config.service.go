package service_core

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
)

func ParseConfig(fileName string) (Config, error) {
	data := make([]byte, 10000)
	rawData, err := os.Open(fmt.Sprintf("data/%s.json", fileName))
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	defer rawData.Close()
	log.Printf("Successfully opened %s.json\n", fileName)
	n, err := rawData.Read(data)
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	data = data[:n]
	config := Config{}
	err = json.Unmarshal(data, &config)
	if err != nil {
		log.Fatal(err)
	}
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
