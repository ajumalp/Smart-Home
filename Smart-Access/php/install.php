<?php
const cSQL_CREATE_TABLE_BOARD = "CREATE TABLE boardtype (
                                 BOARDID INT NOT NULL,
                                 BOARDNAME VARCHAR(50) NOT NULL UNIQUE,
                                 PRIMARY KEY (BOARDID));";
