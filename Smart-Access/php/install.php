<?php

/*
 * Developed by ajumalp
 * Contact me @ ajumalp@gmail.com
 * https://owner.erratums.com
 * Date created: 19-Apr-2020
 */

const cSQL_CREATE_TABLE_BOARD = "CREATE TABLE boardtype (
                                 BOARDID INT NOT NULL,
                                 BOARDNAME VARCHAR(50) NOT NULL UNIQUE,
                                 PRIMARY KEY (BOARDID));";
