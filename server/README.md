# INI Editor

This project aims to create a web-approachable app (service?) that allows for reading, creating, updating, and deleting INI files over a RESTful interface. I will also use it to learn Golang for myself with the Gin framework.

## Goals

The minimum viable product (MVP) looks like

 - It can run as a standalone service.
 - Uses one folder in the working directory to store all INI files. Potentially could support nested folders within that folder, but not part of the MVP.
 - Users can create new INI files, read from them, and delete them.
 - Full CRUD support within the INI file for keys, sections, and comments.
 - Data is returned over JSON in an easy to understand and work with format.
 - Users can duplicate INI files.
 - This service should be able to be run in Docker.
 - There will be no access control of any kind.
 - Ability to download individual INI files.

