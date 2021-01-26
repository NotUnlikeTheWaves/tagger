package main

import (
	"gopkg.in/ini.v1"
)

type IniValue struct {
	Meta  string
	Value string
}

type IniSection struct {
	Entries map[string]IniValue
	Meta    string
}

type IniDocument struct {
	Sections map[string]IniSection
	Filename string
}

// ini_obj["section"]["keypair"]

func readIniFile(path string) (*IniDocument, error) {
	document := new(IniDocument)
	document.Filename = path
	document.Sections = make(map[string]IniSection)

	cfg, err := ini.Load(path)
	if err != nil {
		return nil, err
	}
	for _, section := range cfg.Sections() {
		name := section.Name()

		document.Sections[name] = IniSection{
			Meta:    section.Comment,
			Entries: make(map[string]IniValue),
		}

		for _, key := range section.Keys() {
			keyName := key.Name()
			document.Sections[name].Entries[keyName] = IniValue{
				Value: key.Value(),
				Meta:  key.Comment,
			}
		}

	}

	return document, nil
}
